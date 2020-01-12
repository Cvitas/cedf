<template>
  <div class='chart-container'>
    <div style="padding-left: 200px;margin-bottom: 20px;">
      <el-date-picker
        placeholder="选择日期"
        type="month"
        v-model="startTime" value-format="yyyy-MM" format="yyyy-MM">
      </el-date-picker>
      <el-button type="primary">查询</el-button>
      <el-input
        placeholder="请输入内容"
        v-model="input1"
        :disabled="true" style="width: 30%;padding-left: 100px;color: red">
      </el-input>
    </div>
    <monthlypower ref="monthlypower" height='calc(100% - 100px)' width='100%'  @transferAgvData="getAvgData"></monthlypower>
  </div>
</template>

<script>
  import monthlypower from '@/components/Charts/monthlypower'

  export default {
    data () {
      return {
        avgData: '',
        input1:'',
        startTime:new Date(),
        endTime: ''
      }
    },
    activated() {
      this.$refs['monthlypower'].initChart()
    },
    name: 'monthlypower1',
    components: { monthlypower },
    methods: {
      getAvgData (agvData) {
        var avgstr = '平均能耗 ' + agvData + ' Kwh'
        this.avgData = avgstr
      },
      getData () {
        if (!this.startTime) {
          this.$message('请选择需要查询的日期')
          return false
        }
        var dateStr
        if (typeof this.startTime === 'string') {
          dateStr = this.startTime
        } else {
          var month = this.prefixZero(this.startTime.getMonth() + 1, 2)
          var day = this.prefixZero(this.startTime.getDate(), 2)
          dateStr = this.startTime.getFullYear() + '-' + month + '-' + day
        }
        this.$refs.monthlypower.initChart(dateStr)
      },
      getChartPdf () {
        this.getPdf(this.$refs['monthlypower'].$el, '月能耗曲线')
      },
      prefixZero (num, n) {
        return (Array(n).join(0) + num).slice(-n)
      }
    },
  }

</script>

<style scoped>
  .chart-container {
    position: relative;
    padding: 20px;
    width: 100%;
    height: 80vh;
  }
</style>
