<template>
  <el-form :model="dataForm" ref="dataForm" @keyup.enter.native="onSubmit()" label-width="80px">
    <el-form-item label="采集数量" prop="collectNum" style="margin-right: 1200px">
      <el-input type="text" v-model="dataForm.collectNum" style="width:150px">
        <template slot="append">路</template>
      </el-input>
    </el-form-item>
    <el-form-item label="采集步长" prop="collectStep" style="margin-right: 1200px;">
      <el-col :span="24">
        <el-input type="text" v-model="dataForm.collectStep" clearable style="width:150px">
          <template slot="append">秒</template>
        </el-input>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">确认</el-button>
    </el-form-item>
  </el-form>
</template>

<style>
  .el-select .el-input {
    width: 130px;
  }

  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }

  .el-select .el-input {
    width: 130px;
  }

  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
</style>

<style>

</style>
<script>
  export default {
    data () {
      return {
        visible: false,
        roleList: [],
        show: false,
        dataForm: {
          id: '4',
          collectNum: 0,
          collectStep: 0
        }
      }
    },
    activated () {
      this.init()
    },
    methods: {
      init () {
        this.$http({
          url: this.$http.adornUrl(`/collect/collecparam/list`),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          this.$refs['dataForm'].resetFields()
          if (data && data.code === 0) {
            if (data.page.list.length) {
              this.dataForm = {...data.page.list[0]}
            }
          }
        })
      },
      // 表单提交
      onSubmit () {
        this.$http({
          url: this.$http.adornUrl(`/collect/collecparam/update`),
          method: 'post',
          data: this.$http.adornData(this.dataForm)
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1500
            })
            this.init()
          } else {
            this.$message.error(data.msg)
          }
        })
      }
    }
  }
</script>
