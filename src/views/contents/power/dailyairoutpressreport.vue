<template>
  <div class='chart-container'>
    <div style="padding-left: 100px">
      <el-date-picker
        placeholder="选择日期"
        v-model="startTime" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
      </el-date-picker>

      <el-button type="primary" @click="getData()">查询</el-button>
      <el-button type="primary" @click="getChartPdf">导出</el-button>
      <el-input
        placeholder=""
        v-model="avgData"
        :disabled="true" style="width: 30%;padding-left: 100px;color: red">
      </el-input>
    </div>
    <dayairChart ref="dayairChart" height='calc(100% - 100px)' width='100%' @transferAgvData="getAvgData"></dayairChart>
  </div>
</template>

<script>
  import dayairChart from '@/components/Charts/dairlyairout'

  export default {
    data () {
      return {
        avgData: '',
        startTime: new Date(),
        endTime: ''
      }
    },
    name: 'dayairChart1',
    components: {dayairChart},
    activated() {
      this.getData()
    },
    methods: {
      getAvgData (agvData) {
        var avgstr = '平均排气压力 ' + agvData + ' Mpa'
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
          var month = this.prefixZero(this.startTime.getMonth(), 2)
          var day = this.prefixZero(this.startTime.getDate(), 2)
          dateStr = this.startTime.getFullYear() + '-' + month + '-' + day
        }
        this.$refs.dayairChart.initChart(dateStr)
      },
      getChartPdf () {
        this.getPdf(this.$refs['dayairChart'].$el, '日气压力曲线')
      },
      prefixZero (num, n) {
        return (Array(n).join(0) + num).slice(-n)
      }
    }
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
