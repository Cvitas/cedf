<template>
  <el-card class="box-card">
    <!--<div v-for="o in 4" :key="o" class="text item">-->
    <!--{{'列表内容 ' + o }}-->
    <!-- </div> -->

    <el-form class="power-setting" :model="dataForm" ref="dataForm" @keyup.enter.native="onSubmit()" label-width="80px">
      <el-row :gutter="24">
        <el-col :span="3" style="text-align:center;vertical-align: middle">修正系数:</el-col>
        <el-col :span="6">
          <el-input type="text" v-model="dataForm.pipe">
            <template slot="append">流量</template>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-input type="text" v-model="dataForm.loss">
            <template slot="append">管损</template>
          </el-input>
        </el-col>
        <el-col :span="9">
          <el-input type="text" v-model="dataForm.equip">
            <template slot="append">后处理设备</template>
          </el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="3" style="text-align:center;vertical-align: middle">电费:</el-col>
        <el-col :span="6">
          <el-input type="text" v-model="dataForm.pwNormal" clearable style="width: 100%">
            <template slot="append">正常模式</template>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-input type="text" v-model="dataForm.pwHigh" clearable style="width: 100%">
            <template slot="append">峰谷平</template>
          </el-input>
        </el-col>
      </el-row>
      <el-form-item style="margin-left: 70%;margin-top: 10%">
        <el-button type="primary" @click="onSubmit">确认</el-button>
      </el-form-item>
    </el-form>

  </el-card>
</template>

<style>
  /*.text {*/
  /*font-size: 14px;*/
  /*}*/

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
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
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

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 80%;
    height: 400px;
  }

  .power-setting .el-input-group {
    width: 180px;
  }
</style>
<script>
  export default {
    data () {
      return {
        dataForm: {
          id: 1,
          pipe: '',
          loss: '',
          equip: '',
          pwNormal: '',
          pwHigh: ''
        }
      }
    },
    activated () {
      this.init()
    },
    methods: {
      init () {
        this.$http({
          url: this.$http.adornUrl(`/collect/equipparam/list`),
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
          url: this.$http.adornUrl(`/collect/equipparam/update`),
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
