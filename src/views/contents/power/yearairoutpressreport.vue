<template>
  <div class='chart-container'>
    <div style="padding-left: 200px">
      <el-date-picker type="year" placeholder="年份" v-model="startTime" style="width: 20%;" value-format="yyyy"
                      format="yyyy"></el-date-picker>
      <el-button type="primary" @click="getData">查询</el-button>
      <el-button type="primary" @click="getChartPdf">导出</el-button>
      <el-input
        placeholder="请输入内容"
        v-model="avgData"
        :disabled="true" style="width: 30%;padding-left: 100px;color: red">
      </el-input>
    </div>
    <yearairChart ref="yearairChart" height='calc(100% - 100px)' width='100%'  @transferAgvData="getAvgData"></yearairChart>
  </div>
</template>

<script>
  import yearairChart from '@/components/Charts/yearairout'

  export default {
    data() {
      return {
        avgData: '',
        startTime: new Date(),
        endTime: ''
      }
    },
    name: 'yearairChart1',
    components: { yearairChart },
    mounted () {
     // this.initChart()
    },
    activated() {
       this.getData()
    },
    methods: {
      getAvgData (agvData) {
        var avgstr = '平均排气压力 ' + agvData + ' Bar'
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
          dateStr = this.startTime.getFullYear()
        }
        this.$refs.yearairChart.initChart(dateStr)
      },
      getChartPdf() {
        this.getPdf(this.$refs['yearairChart'].$el, '年度气压力曲线')
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

