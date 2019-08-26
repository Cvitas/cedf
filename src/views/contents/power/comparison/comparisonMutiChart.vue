<template>
  <div class='chart-container'>
    <div class="button-bar">
      <el-form ref="form" :model="form" label-width="120px" :inline="true">
        <el-form-item label="比较方式">
          <el-select v-model="form.value" placeholder="请选择" style="width: 250px">
            <el-option
              v-for="item in options"
              :key="item.value.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="form.type" placeholder="请选择" style="width: 250px">
            <el-option
              v-for="item in devices"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
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
    name: "comparisonMutiChart",
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
          type: null
        },
        options: [{
          value: { name: '比较去年', value: 1 },
          label: '比较去年'
        }, {
          value: { name: ['上个月', '当月'], value: 2 },
          label: '比较上个月'
        }, {
          value: { name: ['上个季度', '本季度'], value: 3 },
          label: '比较上个季度'
        }],
        typesItems: [{ legend: ["总能耗", "离心机"] },
          { legend: ["总瞬时流量", "7台设备"] },
          { legend: ["总流量", "7台设备总流量"] },
          { legend: ["总耗电量", "9台其他设备"] }]
      }
    },
    computed: {
      devices: {
        get() {
          return this.$store.state.device.collectTypes
        }
      }
    },
    methods: {
      clernChart() {
        if (this.chart) {
          this.chart.clear()
        }
      },
      initChart() {
        if (!this.form.value || !this.form.type) {
          this.$message("请先选择比较方式类型")
          return false
        }
        this.clernChart()
        this.$http({
          url: this.$http.adornUrl(`/collect/collecstatis//comparisonmutichart/xthb/${this.form.value.value}/${this.form.type}`),
          method: 'get'
        }).then((data) => {
          if (data != null && data.data.code === 0) {
            const res = data.data
            const currentData = res.currentData || {}
            const lastData = res.lastData || {}
            if (this.form.value.value === 2) {
              const chartData = [{ value: currentData.data, name: currentData.name },
                { value: lastData.data, name: lastData.name }]
              this.drawPie({ data: chartData, unitName: res.unitName })
            } else {
              const chartData = [{
                data: [currentData.data, lastData.data],
                type: 'bar',
                name: '数据',
                barWidth: '60%'
              }]
              this.drawBar({
                data: chartData,
                unitName: res.unitName,
                xAxis: [currentData.name, lastData.name]
              })
            }
          }
        })
      },
      drawPie(chartData) {
        let pie = {
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c}' + chartData.unitName + ' ({d}%)'
          },
          legend: {
            left: 'center',
            bottom: '10',
            data: 'dsadsa'
          },
          calculable: true,
          series: [
            {
              name: '分布图',
              type: 'pie',
              center: ['50%', '45%'],
              data: chartData.data,
              animationEasing: 'cubicInOut',
              animationDuration: 1000
            }
          ]
        }
        this.chart = echarts.init(this.$refs['chart'], 'default')
        this.chart.setOption(pie)
      },
      drawBar(chartData) {
        let bar = {
          color: ['#3398DB'],
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            top: 30,
            left: '2%',
            right: '2%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [{
            type: 'category',
            data: chartData.xAxis,
            axisTick: {
              alignWithLabel: true
            }
          }],
          yAxis: [{
            type: 'value',
            name: chartData.unitName,
            axisTick: {
              show: false
            }
          }],
          series: chartData.data
        }
        this.chart = echarts.init(this.$refs['chart'], 'default')
        this.chart.setOption(bar)
      },
      drawChart() {
        this.initChart()
      },
    }
  }
</script>

<style scoped lang="scss">
</style>
