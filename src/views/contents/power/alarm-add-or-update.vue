<template>
  <el-dialog
    :title="!dataForm.id ? '添加提醒项信息' : '修改提醒项信息'"
    :close-on-click-modal="false"
    :visible.sync="visible"
    @close="clearDataForm">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
             label-width="120px">
      <el-row>
        <el-col :span="14">
          <el-col :span="14">
            <el-form-item label="提醒项：" prop="tipsMsg">
              <el-select v-model="dataForm.tipsMsg" placeholder="请选择提醒项">
                <el-option
                  v-for="item in collectTypes"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="14">
          <el-form-item label="最小值：" prop="miniValue">
            <el-input-number :min=0 type="text" v-model.number="dataForm.miniValue"
                             placeholder="最小值"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item label="最大值：" prop="maxValue">
            <el-input-number :min="dataForm.miniValue" type="text" v-model.number="dataForm.maxValue"
                             placeholder="最大值"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item label="开始时间：" prop="startTime">
            <el-date-picker
              type="date" placeholder="开始日期"
              v-model="dataForm.startTime"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item label="结束时间：" prop="endTime">
            <el-date-picker
              type="date" placeholder="开始日期"
              v-model="dataForm.endTime"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item label="提醒频率：" prop="period">
            <label>每</label>
            <el-input type="number" min="0" v-model.number="dataForm.period" placeholder="提醒频率" style="width:250px">
              <template slot="append">
                <el-select v-model="dataForm.periodType" placeholder="时间单位" style="width: 70px">
                  <el-option
                    v-for="item in units"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item label="状态：" prop="status">
            <el-radio v-model="dataForm.status" label="1">启用</el-radio>
            <el-radio v-model="dataForm.status" label="0">停用</el-radio>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
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

</style>

<script>
  import moment from 'moment'

  export default {
    data () {
      const validateDeliveryNo = function (rule, value, callback) {
        if (value <= 0) {
          callback(new Error('提醒频率必须大于0'))
        } else {
          callback()
        }
      }
      return {
        visible: false,
        projects: [],
        color1: 'rgba(19, 206, 102, 0.8)',
        color: '#FF0000',
        units: [{
          value: 0,
          label: '秒'
        }, {
          value: 1,
          label: '分'
        }, {
          value: 20,
          label: '时'
        }],
        dataForm: {
          id: 0,
          tipsMsg: 1,
          miniValue: 0,
          maxValue: 0,
          period: '',
          startTime: '',
          endTime: '',
          periodType: 0,
          status: '1'
        },
        dataRule: {
          period: [
            {validator: validateDeliveryNo, trigger: 'blur'}
          ],
          miniValue: [
            {type: 'date', required: true, message: '请选择最小值', trigger: 'change'}
          ],
          maxValue: [
            {type: 'date', required: true, message: '请选择最大值', trigger: 'change'}
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
      toggle () {
        this.visible = !this.visible
      },
      init (item) {
        this.dataForm = {...this.dataForm, ...item}
        this.dataForm.status = this.dataForm.status.toString()
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/collect/tips/${this.dataForm.id ? 'update' : 'save'}`),
              method: 'post',
              data: this.$http.adornParams({
                id: this.dataForm.id,
                tipsMsg: this.dataForm.tipsMsg,
                value: this.dataForm.value,
                miniValue: this.dataForm.miniValue,
                maxValue: this.dataForm.maxValue,
                period: this.dataForm.period,
                startTime: moment(this.dataForm.startTime).format('YYYY-MM-DD'),
                endTime: moment(this.dataForm.endTime).format('YYYY-MM-DD'),
                periodType: this.dataForm.periodType,
                status: this.dataForm.status
              })
            }).then(({data}) => {
              this.visible = false
              if (data && data.code === 0) {
                this.$message('保存成功')
                this.$emit('refreshDataList')
              } else {
                this.$message('保存失敗')
              }
            }).catch(() => {
              this.visible = false
            })
          } else {

          }
        })
      },
      clearDataForm () {
        this.dataForm = {
          id: 0,
          tipsMsg: 1,
          miniValue: 0,
          maxValue: 0,
          period: '',
          startTime: '',
          endTime: '',
          periodType: 0,
          status: '1',
        }
      }
    }
  }
</script>
