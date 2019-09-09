<template>
  <div class="mod-role">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item label="设备名称">
        <el-input v-model="dataForm.equipName" placeholder="设备名称" clearable></el-input>
      </el-form-item>

      <el-form-item>
        <el-button @click="getDataList()" type="warning">查询</el-button>
        <el-button type="primary" @click="addOrUpdateHandle()">添加设备</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">

      <el-table-column
        prop="id"
        header-align="center"
        align="center"
        width="80"
        visible="false"
        v-if="false"
        label="ID">
      </el-table-column>
      <el-table-column
        prop="name"
        header-align="center"
        align="center"
        label="设备名称">
      </el-table-column>
      <el-table-column
        prop="model"
        header-align="center"
        align="center"
        label="型号">
      </el-table-column>
      <el-table-column
        prop="vendor"
        header-align="center"
        align="center"
        label="厂家">
      </el-table-column>
      <el-table-column
        prop="no"
        header-align="center"
        align="center"
        label="编号">
      </el-table-column>
      <el-table-column
        prop="productDate"
        header-align="center"
        align="center"
        label="出厂日期">
      </el-table-column>

      <el-table-column
        prop="collecUnit"
        header-align="center"
        align="center"
        label="采集单位">
      </el-table-column>
      <el-table-column
        prop="collecTypeName"
        header-align="center"
        show-overflow-tooltip
        align="center"
        label="采集数据">
      </el-table-column>

      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">编辑</el-button>
          <el-button type="text" size="small" @click="deleteHandle(scope.row.id)" class="el-button--text-gray">删除
          </el-button>
        </template>
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
  import AddOrUpdate from './equip-add-or-update'
  import { validateDate } from '@/utils/validate'
  import { getFinaceAmount } from '@/utils'

  export default {
    data() {
      return {
        dataForm: {
          equipName: '',
        },
        projectTypes: [],
        dataList: [],
        pageIndex: 1,
        pageSize: 20,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false,
        uploadVisible: false,
        //弹框显示变量
        donatorVisible: false,
        receiverVisible: false,
        pickerValidateStart: this.beginDate(),
        pickerValidateEnd: this.processDate()
      }
    },
    components: {
      AddOrUpdate
    },
    activated() {
      this.getDataList()
    },
    methods: {
      beginDate() {
        let self = this;
        return {
          disabledDate(time) {
            if (time != null && time != '' && self.dataForm.endDate != null && self.dataForm.endDate != '') {
              if (validateDate(time, new Date(self.dataForm.endDate))) {
                return true;
              }
            }
          }
        }
      },

      processDate() {
        let self = this
        return {
          disabledDate(time) {
            if (time != null && time != '' && self.dataForm.startDate != null && self.dataForm.startDate != '') {
              if ((validateDate(new Date(self.dataForm.startDate), time))) {
                return true
              }

            }
          }
        }
      },

      initTypeSelect() {
        this.$http({
          url: this.$http.adornUrl('/project/base/typeSelect'),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({ data }) => {
          this.projectTypes = data && data.code === 0 ? data.list : []
        })
      },
      // 获取数据列表
      getDataList() {
        this.dataListLoading = true

        this.$http({
          url: this.$http.adornUrl('/collect/equipment/list'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'name': this.dataForm.equipName,
            'order': 'DESC'
          })
        }).then(({ data }) => {
          if (data && data.code === 0) {
            this.dataList = data.page.list
            this.totalPage = data.page.totalCount
            this.pageIndex = data.page.currPage
          } else {
            this.dataList = []
            this.pageIndex = 0
            this.totalPage = 0
          }
          this.dataListLoading = false
        })
      },
      // 每页数
      sizeChangeHandle(val) {
        this.pageSize = val
        this.pageIndex = 1
        this.getDataList()
      },
      // 当前页
      currentChangeHandle(val) {
        this.pageIndex = val
        this.getDataList()
      },
      // 多选
      selectionChangeHandle(val) {
        this.dataListSelections = val
      },
      // 新增 / 修改
      addOrUpdateHandle(id) {
        this.addOrUpdateVisible = true
        // 加载typeSelect
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id)
        })
      },
      // 删除
      deleteHandle(id) {
        var ids = id ? [id] : this.dataListSelections.map(item => {
          return item.id
        })
        this.$confirm(`确定要删除此条数据吗？删除后将把相关数据一并删除`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/collect/equipment/delete'),
            method: 'post',
            data: this.$http.adornData(ids, false)
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.getDataList()
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        })
      },

      getValue() {
        return this.dataForm.type
      },// 上传文件
      importHandle() {
        this.uploadVisible = true;
        this.$nextTick(() => {
          this.$refs.upload.init()
        })
      },

      downloadTemplateHandle() {
        var url = this.$http.adornUrl(`/project/base/downloadTemplate?token=${this.$cookie.get('token')}`);
        window.open(url);
      },
      finaceAmountFormat(row, column, cellValue, index) {
        return getFinaceAmount(cellValue);
      },

      showReceivers(receiveId) {
        this.receiverVisible = true
        this.$nextTick(() => {
          this.visible = true
          this.$refs.receiverDetailModal.init(receiveId)
        })
      },
      showDonator(donatorId) {
        this.donatorVisible = true
        this.$nextTick(() => {
          this.visible = true
          this.$refs.donatorDetailModal.init(donatorId)
        })
      }
    },
    mounted() {
      this.initTypeSelect()
    }
  }
</script>
