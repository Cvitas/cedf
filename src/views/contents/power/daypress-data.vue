<!-- 压力曲线数据 -->
<template>
  <div class="mod-role">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item label="设备类型">
        <el-select v-model="dataForm.deviceId" placeholder="请选择" style="width: 250px">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-col class="line" :span="3">选择日期</el-col>
        <el-col :span="8">
          <el-date-picker type="date" placeholder="开始日期" v-model="dataForm.startDate" style="width: 100%;"
                          value-format="yyyy-MM-dd" format="yyyy-MM-dd"
          ></el-date-picker>

        </el-col>
        <el-col class="line" :span="1">至</el-col>
        <el-col :span="8">
          <el-date-picker type="date" placeholder="结束日期" v-model="dataForm.endDate" style="width: 100%;"
                          value-format="yyyy-MM-dd" format="yyyy-MM-dd"
          ></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="warning" @click="searchDataList()">查询</el-button>
        <el-button type="warning" @click="downloadDataHandle()">导出数据</el-button>
        <el-button type="warning" @click="searchDataList()">导入数据</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      style="width: 100%;">

      <el-table-column
        prop="name"
        header-align="center"
        align="center"
        width="200"
        visible="false"
        label="采集数据名称">
      </el-table-column>
      <el-table-column
        prop="dateStr"
        header-align="center"
        align="center"
        label="采集日期">
      </el-table-column>
      <el-table-column
        prop="data"
        header-align="center"
        align="center"
        label="采集结果">
      </el-table-column>
      <el-table-column
        prop="unitName"
        header-align="center"
        align="center"
        label="采集单位">
      </el-table-column>
      <el-table-column
        prop="date"
        header-align="center"
        align="center"
        width="180"
        label="采集时间">
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
  </div>
</template>

<style>
  .el-row {
    margin-bottom: 20px;

  &
  :last-child {
    margin-bottom: 0;
  }

  }
  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    /** background: #99a9bf; */
  }

  .bg-purple {
    /** background: #d3dce6; */
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  .el-input__inner {
    width: 100%;
  }
</style>

<script>
  export default {
    data () {
      return {
        dataForm: {
          projecName: '',
          startDate: '',
          endDate: '',
          deviceId: ''
        },
        options:[],
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
      }
    },
    activated () {
      this.getDataList(),
        this.changeTypes()
    },
    methods: {

      changeTypes() {
        this.options = []
        this.$http({
          url: this.$http.adornUrl(`/collect/equipment/equipnamelist`),
          method: 'get'
        }).then((data) => {
          if (data != null && data.data.code === 0) {
            this.options = data.data.data
          }
        })
      },

      searchDataList () {
        if (!this.dataForm.startDate || !this.dataForm.endDate) {
          this.$message('请选择需要查询的日期范围')
          return false
        }
        this.getDataList()
      },
      // 获取数据列表
      getDataList () {
        if (!this.dataForm.startDate || !this.dataForm.endDate) {
          return false
        }
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl(`/collect/collecstatis/comparisonmutichart/pressData`),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'startDate': this.dataForm.startDate,
            'endDate': this.dataForm.endDate,
            'deviceId': this.dataForm.deviceId
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = data.page.list
            this.totalPage = data.page.totalCount
            this.pageSize = data.page.pageSize
            this.pageIndex = data.page.currPage
          } else {
            this.dataList = []
            this.totalPage = 0
          }
          this.dataListLoading = false
        })
      },
      // 每页数
      sizeChangeHandle (val) {
        this.pageSize = val
        this.pageIndex = 1
        this.getDataList()
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.getDataList()
      },
      downloadDataHandle() {
        var urlPrefix = "/collect/collecstatis/export?type=1";
        var page = this.pageIndex;
        var limit=this.pageSize;
        var startDate=this.dataForm.startDate;
        var endDate=this.dataForm.endDate;
        var token = this.$cookie.get('token');
        var joinStr = "&";
        var urlStr = urlPrefix + joinStr + "page=" + page + joinStr + "limit=" + limit + joinStr + "startDate=" + startDate + joinStr + "endDate=" + endDate + joinStr + "token=" + token;

        var url = this.$http.adornUrl(urlStr);
        window.open(url);
      },
    }
  }
</script>
