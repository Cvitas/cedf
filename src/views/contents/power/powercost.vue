<template>
  <el-card class="box-card">
    <el-form :model="dataForm" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="150px">
      <el-row>
        <el-col :span="24"><h4>电量参数设定</h4></el-col>
        <div class="addForm_gray_bg">
          <el-col :span="10">
            <el-form-item label="用电总量基数上调：" prop="airrate">
              <el-input v-model="dataForm.airrate" placeholder="电量基数上调" style="width:120px">
                <template slot="append">%</template>
              </el-input>
            </el-form-item>

            <el-form-item label="基本电价基数上调：" prop="powerPrice">
              <el-input v-model="dataForm.powerPrice" placeholder="基本电价基数上调" style="width:120px">
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
            <el-form-item label="基础电价：" prop="powerBasePrice">
              <el-input v-model="dataForm.powerBasePrice" placeholder="基础电价" style="width:120px">
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
          </el-col>
        </div>
      </el-row>
    </el-form>
  </el-card>
</template>
<style>
  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 95%;
    height: 400px;
  }
</style>
<script>
  export default {
    data () {
      return {
        show: false,
        dataForm: {
          airrate: '',
          powerBasePrice: '',
          powerPrice: ''
        }
      }
    },
    activated () {
      this.init()
    },
    methods: {
      // init () {
      //   this.dataForm.airrate = 10,
      //     this.dataForm.powerBasePrice = 0.85,
      //     this.dataForm.powerPrice = 12
      // },
      init () {
        this.$http({
          url: this.$http.adornUrl(`/collect/pwprice/list`),
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
          url: this.$http.adornUrl(`/collect/pwprice/update`),
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
