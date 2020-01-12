<template>
  <div class='chart-container'>
    <div style="padding-left: 200px">
      <el-date-picker type="year" placeholder="年份" v-model="startTime" style="width: 20%;" value-format="yyyy"
                      format="yyyy"
      ></el-date-picker>
      <el-button type="primary" @click="getData()">查询</el-button>
      <el-input
        placeholder="请输入内容"
        v-model="input1"
        :disabled="true" style="width: 30%;padding-left: 100px;color: red">
      </el-input>
    </div>
    <yearpresstemp ref="yearpresstemp" height='calc(100% - 100px)' width='100%'></yearpresstemp>
  </div>
</template>

<script>
  import yearpresstemp from '@/components/Charts/yearpresstemp'

  export default {
    data () {
      return {
        startTime: new Date(),
        avgData: '',
        input1:' ',
        endTime: ''
      }
    },
    activated() {
      this.$refs['yearpresstemp'].initChart()
    },
    methods: {
      getAvgData (agvData) {
        var avgstr = '平均温度 ' + agvData + ' ℃'
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
        this.$refs.yearpresstemp.initChart(dateStr)
      },
      getChartPdf () {
        this.getPdf(this.$refs['yearpresstemp'].$el, '日温度曲线')
      },
      prefixZero (num, n) {
        return (Array(n).join(0) + num).slice(-n)
      }
    },
    name: 'yearpresstemp1',
    components: { yearpresstemp }
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
