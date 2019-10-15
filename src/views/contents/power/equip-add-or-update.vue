<template>
  <el-dialog
    :title="!dataForm.id ? '添加设备信息' : '修改设备信息'"
    :close-on-click-modal="false"
    :visible.sync="visible"
    @close="clearDataForm">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
             label-width="150px">
      <el-row>
        <el-col :span="14">
          <el-form-item label="设备名称：" prop="name">
            <el-input type="text" v-model.number="dataForm.name" placeholder="设备名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item label="型号：" prop="model">
            <el-input type="text" v-model.number="dataForm.model" placeholder="设备型号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item label="厂家：" prop="vendor">
            <el-input type="text" v-model.number="dataForm.vendor" placeholder="设备厂家"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item label="编号：" prop="no">
            <el-input type="text" v-model.number="dataForm.no" placeholder="设备编号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item label="出厂日期：" prop="productDate">
            <el-date-picker
              placeholder="选择日期"
              type="date"
              v-model="dataForm.productDate" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item label="采集参数：" prop="collecType">
            <el-select v-model="dataForm.collecType" placeholder="请选择采集参数">
              <el-option
                v-for="item in collectTypes"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <div v-for="item in dataForm.detail" v-if="item.collectType == dataForm.collecType">
          <el-col :span="14">
            <el-form-item label="采集单位：" prop="unit" style="margin-left: 50px">
              <el-input type="text" v-model="item.unit" placeholder="采集单位"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="14">
            <el-form-item label="采集变量：" prop="varname" style="margin-left: 50px">
              <el-input type="text" v-model="item.varname" placeholder="采集变量"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="14" prop="color">
            <el-form-item label="选择设备显示颜色：" style="margin-left: 50px">
              <colorPicker v-model="item.color" width="100px"/>
            </el-form-item>
          </el-col>
        </div>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>
<script>
  import { validateLength, isAmount } from '@/utils/validate'

  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          id: null,
          name: '',
          model: '',
          vendor: '',
          collecType: '',
          no: '',
          productDate: '',
          collecUnit: '',
          color: '#00FF00',
          detail: []
        },
        dataRule: {
          no: [
            { required: true, message: '请输入编号', trigger: 'blur' },
            { type: 'number', required: true, message: '请输入数字编号', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入设备名称', trigger: 'blur' }
          ],
          model: [
            { required: true, message: '请输入设备型号', trigger: 'blur' }
          ],
          // varname: [
          //   {required: true, message: '请输入厂家名词', trigger: 'blur'}
          // ],
          productDate: [
            { required: true, message: '请输入正确的出厂日期', trigger: 'change' }
          ]
        }
      }
    },
    computed: {
      collectTypes: {
        get () {
          return this.$store.state.device.collectTypes
        }
      }
    },
    methods: {
      init (id) {
        if (!id) {
          this.collectTypes.forEach((collectType) => {
            this.dataForm.detail.push({
              color: '#00FF00',
              collectType: collectType.id,
              name: collectType.name,
              unit: ''
            })
          })
          this.visible = true
          this.$nextTick(() => {
            this.$refs['dataForm'].resetFields()
            this.dataForm.collecType = this.collectTypes[0].id
          })
          return false
        }
        this.dataForm.id = id || null
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
        })
        this.$http({
          url: this.$http.adornUrl(`/collect/equipment/info/${id}`),
          method: 'get'
        }).then(({ data }) => {
          if (data && data.code === 0) {
            const detail = data.equipment.detail
            this.dataForm = data.equipment
            this.dataForm.detail = []
            this.collectTypes.forEach((collectType) => {
              const __filter = detail.filter((de) => {
                return de.collectType === collectType.id
              })
              if (__filter.length) {
                this.dataForm.detail.push({
                  color: __filter[0].color,
                  collectType: collectType.id,
                  name: collectType.name,
                  unit: __filter[0].unit,
                  varname: __filter[0].varname
                })
                if (!this.dataForm.collecType) this.dataForm.collecType = __filter[0].collectType
              } else {
                this.dataForm.detail.push({
                  color: '#00FF00',
                  collectType: collectType.id,
                  name: collectType.name,
                  unit: '',
                  varname: ''
                })
                // if (!this.dataForm.collecType) this.dataForm.collecType = collectType.id
              }
            })
          }
        })
      },
      changeCollectType () {

      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            console.log(`!${this.dataForm.id ? 'save' : 'update'}`)
            const detail = this.dataForm.detail.filter(de => {
              return de.color && de.unit
            })
            this.$http({
              url: this.$http.adornUrl(`/collect/equipment/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                id: this.dataForm.id,
                model: this.dataForm.model,
                name: this.dataForm.name,
                vendor: this.dataForm.vendor,
                no: this.dataForm.no,
                productDate: this.dataForm.productDate,
                detail: detail
              })
            }).then(({ data }) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        })
      },
      clearDataForm () {
        this.dataForm = {
          id: null,
          name: '',
          model: '',
          vendor: '',
          collecType: '',
          no: '',
          productDate: '',
          collecUnit: '',
          color: '#00FF00',
          detail: []
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .el-form-item {
    margin-bottom: 4px
  }
</style>
