<template>
  <div :class="className" :id="monthlyair" :style="{height:height,width:width,minHeight:'500px'}"></div>
</template>

<script>
  import echarts from 'echarts'
  import resize from './mixins/airmonthly'

  export default {
    mixins: [resize],
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      monthlyair: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '200px'
      },
      height: {
        type: String,
        default: '500px'
      },
      data: {
        type: Object,
        default: {
          data: [],
          xais: []
        }
      }
    },
    data () {
      return {
        chart: null
      }
    },
    mounted () {
      this.initChart()
    },
    beforeDestroy () {
      if (!this.chart) {
        return
      }
      this.chart.dispose()
      this.chart = null
    },
    methods: {
      initChart () {

        let series = []
        const legends = this.data.data.map(item => {
          series.push({
            name: item.name,
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
              normal: {
                width: 1
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(0, 136, 212, 0.3)'
                }, {
                  offset: 0.8,
                  color: 'rgba(0, 136, 212, 0)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
              }
            },
            itemStyle: {
              normal: {
                color: 'rgb(0,136,212)',
                borderColor: 'rgba(0,136,212,0.2)',
                borderWidth: 12

              }
            },
            data: item.data ? item.data : []
          })
          return item.name
        })
        this.chart = echarts.init(document.getElementById(this.monthlyair))
        this.chart.setOption({
          backgroundColor: 'white',
          title: {
            top: 20,
            text: '月排气曲线',
            // subtext: '空压机1 总用电量32Kwh 总排气量：16000m³\n\r\n 空压机2 总用电量100Kwh 总排气量：26000m³',
            align: 'right',
            x: 'center',
            textStyle: {
              fontWeight: 'normal',
              fontSize: 16,
              color: 'black'
            }
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              lineStyle: {
                color: '#57617B'
              }
            }
          },
          legend: {
            top: 20,
            icon: 'rect',
            itemWidth: 14,
            itemHeight: 5,
            itemGap: 13,
            data: legends,
            right: '4%',
            textStyle: {
              fontSize: 12,
              color: 'black'
            }
          },
          grid: {
            top: 100,
            left: '5%',
            right: '5%',
            bottom: '5%',
            containLabel: true
          },
          xAxis: [{
            type: 'category',
            boundaryGap: false,
            name: '日',
            axisLine: {
              lineStyle: {
                color: '#57617B'
              }
            },
            data: this.data.xais
          }],
          yAxis: [{
            type: 'value',
            name: this.data.unitName,
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#57617B'
              }
            },
            axisLabel: {
              margin: 10,
              name: '日',
              textStyle: {
                fontSize: 14
              }
            },
            splitLine: {
              lineStyle: {
                color: '#57617B'
              }
            }
          }],
          series: series
        })
      }
    }
  }
</script>
