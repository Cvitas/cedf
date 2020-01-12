<template>
  <div class='chart-container'>
    <div style="padding-left: 100px">
      <el-date-picker
        placeholder="选择日期"
        v-model="startTime" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
      </el-date-picker>

      <el-button type="primary"  @click="getData()">查询</el-button>
      <el-input
        placeholder="请输入内容"
        v-model="input1"
        :disabled="true" style="width: 30%;padding-left: 100px;color: red">
      </el-input>
    </div>
    <daytemp ref="daytemp" height='calc(100% - 100px)' width='100%'  @transferAgvData="getAvgData"></daytemp>
  </div>
</template>

<script>
  import daytemp from '@/components/Charts/daytemp'

  export default {

    data () {
      return {
        avgData: '',
        input1: '',
        startTime: new Date(),
        endTime: ''
      }
    },
    activated() {
      this.$refs['daytemp'].initChart()
    },
    methods: {
      getAvgData (agvData) {
        var avgstr = '平均温度 ' + agvData + ' m3'
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
        this.$refs.daytemp.initChart(dateStr)
      },
      getChartPdf () {
        this.getPdf(this.$refs['daytemp'].$el, '日流量曲线')
      },
      prefixZero (num, n) {
        return (Array(n).join(0) + num).slice(-n)
      }
    },
    name: 'daytemp1',
    components: { daytemp }
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
