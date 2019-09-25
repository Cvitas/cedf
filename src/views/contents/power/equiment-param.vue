<template>
  <div class="mod-role">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item label="设备名称">
        <el-input v-model="dataForm.equipmentName" placeholder="设备名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="采集变量名称">
        <el-input v-model="dataForm.paramName" placeholder="采集变量名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="数据采集项目">
        <el-select v-model="dataForm.collectTypeId" placeholder="请选择" clearable @change="getValue">
          <el-option v-for="item in collectTypeIds" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()" type="primary">查询</el-button>
        <el-button type="primary" @click="addOrUpdateHandle()">添加设备参数</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      style="width: 100%;">

      <el-table-column
        prop="id"
        header-align="center"
        align="center"
        width="80"
        visible="true"
        label="序号">
      </el-table-column>
      <el-table-column
        prop="pipe"
        header-align="center"
        align="center"
        show-overflow-tooltip
        hight="20px"
        label="流量">
      </el-table-column>
      <el-table-column
        prop="loss"
        header-align="center"
        align="center"
        show-overflow-tooltip
        width="180"
        label="管损">
      </el-table-column>
      <el-table-column
        prop="equip"
        header-align="center"
        align="center"
        show-overflow-tooltip
        width="180"
        label="后处理设备">
      </el-table-column>
      <el-table-column
        prop="pwNormal"
        header-align="center"
        align="center"
        show-overflow-tooltip
        width="180"
        label="电费正常模式">
      </el-table-column>
      <el-table-column
        prop="pwHigh"
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="电费峰谷平">
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
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
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
</style>

<script>
  import AddOrUpdate from './equipment-param-update-delete'

  export default {
    data () {
      return {
        dataForm: {
          id: 0,
          equipmentName: '',
          collectTypeId: '',
          paramName: '',
          collectStep: '',
          collectNum: '',
          collectUnit: ''
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 20,
        totalPage: 0,
        dataListLoading: false,
        collectTypeIds: [],
        addOrUpdateVisible: false,
      }
    },
    components: {
      AddOrUpdate
    },
    activated () {
      this.getDataList()
    },
    methods: {
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true

        this.$http({
          url: this.$http.adornUrl('/collect/equipparam/list'),
          method: 'post',
          params: this.$http.adornParams({})
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = data.page.list
            this.totalPage = data.page.totalCount
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
      getValue () {
        return this.dataForm.type
      }
    }
  }
</script>
