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
            <el-form-item label="提醒项：" prop="name">
              <el-select v-model="dataForm.value" placeholder="请选择提醒项">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="14">
          <el-form-item label="最小值：" prop="minValue">
            <el-input-number type="text" v-model.number="dataForm.minValue" placeholder="最小值"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item label="最大值：" prop="maxValue">
            <el-input-number type="text" v-model.number="dataForm.maxValue" placeholder="最大值"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item label="提醒频率：" prop="rate">
            <label>每</label>
            <el-input type="number" v-model.number="dataForm.rate" placeholder="提醒频率" style="width:250px">
              <template slot="append">
                <el-select v-model="dataForm.unit" placeholder="时间单位" style="width: 70px">
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
  export default {
    data() {
      const validateDeliveryNo = function (rule, value, callback) {
        if (!value > 0) {
          callback(new Error('提醒频率必须大于0'))
        } else {
          callback();
        }
      }
      return {
        visible: false,
        projects: [],
        color1: 'rgba(19, 206, 102, 0.8)',
        color: '#FF0000',
        options: [{
          value: '1',
          label: '流量'
        }, {
          value: '2',
          label: '湿度'
        }, {
          value: '3',
          label: '压力'
        }, {
          value: '4',
          label: '能耗'
        }, {
          value: '5',
          label: '离心机故障'
        }, {
          value: '6',
          label: '离心机比功率'
        }],
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
          name: '',
          value: '1',
          minValue: '',
          maxValue: '',
          rate: '',
          unit: 0
        },
        dataRule: {
          rate: [
            { validator: validateDeliveryNo, trigger: 'blur' }
          ],
        }
      }
    },
    methods: {
      toggle() {
        this.visible = !this.visible
      },
      init(item) {
        this.dataForm = { ...this.dataForm, ...item }
      },
      // 表单提交
      dataFormSubmit() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.visible = false
            this.$message('保存成功')
          } else {

          }
        })
      },
      clearDataForm() {
        this.dataForm = {
          id: 0,
          name: '',
          value: '1',
          minValue: '',
          maxValue: '',
          rate: '',
          unit: 0

        }
      }
    }
  }
</script>
