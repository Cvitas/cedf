<template>
  <div class="mod-role">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
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
        <el-button type="warning" @click="searchDataList()">导出数据</el-button>
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
        prop="date"
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
          endDate: ''
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
      }
    },
    activated () {
      this.getDataList()
    },
    methods: {
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
          url: this.$http.adornUrl(`/collect/collecstatis/comparisonmutichart/pipeData/${this.dataForm.startDate}/${this.dataForm.endDate}`),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'startDate': this.dataForm.startDate,
            'endDate': this.dataForm.endDate
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = data.data
            this.totalPage = 0
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
    }
  }
</script>
