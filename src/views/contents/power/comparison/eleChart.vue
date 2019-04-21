<template>
  <div class='chart-container'>
    <div class="button-bar">
      <el-form ref="form" :model="form" label-width="120px" :inline="true">
        <el-form-item label="选择日期范围">
          <el-date-picker
            v-model="form.value"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="drawChart">生成</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="chart-content">
      <div ref="chart" :class="className" :style="{height:height,width:width}"/>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'

  export default {
    name: "eleChart",
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '100%'
      }
    },
    data() {
      return {
        chart: null,
        form: {
          value: null,
        },
      }
    },
    methods: {
      clernChart() {
        if ( this.chart ) {
          this.chart.clear();
        }
      },
      initChart() {
        if ( !this.form.value) {
          this.$message("请先选择时间范围")
          return false
        }
        this.clernChart()
        this.chart = echarts.init(this.$refs[ 'chart' ], 'default')
        let pie = {
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            left: 'center',
            bottom: '10',
            data: [ '系统用电', '离心机用电' ]
          },
          calculable: true,
          series: [
            {
              name: '分布图',
              type: 'pie',
              center: [ '50%', '45%' ],
              data: [
                { value: 300 + Math.random() * 320, name: '系统用电' },
                { value: Math.random() * 240, name: '离心机用电' },
              ],
              animationEasing: 'cubicInOut',
              animationDuration: 1000
            }
          ]
        }
        this.chart.setOption(pie)
      },
      drawChart() {
        this.initChart()
      },
    }
  }
</script>

<style scoped lang="scss">
</style>
