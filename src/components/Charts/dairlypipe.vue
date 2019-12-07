<template>

  <div :class="className" :id="dairlyPipe" :style="{height:height,width:width}"></div>

</template>


<script>
import echarts from 'echarts'
import moment from 'moment'
import resize from './mixins/daypipe'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    dairlyPipe: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    }
  },
  data () {
    return {
      chart: null,
      value2: new Date(2016, 9, 10, 18, 40),
      value3: new Date(2016, 9, 10, 18, 40)
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
      this.chart = echarts.init(document.getElementById(this.dairlyPipe))

      this.chart.setOption({
        title: {
          text: '日流量柱状图' + moment().format('YYYY-MM-DD'),
          textStyle: {
            align: 'center',
            color: '#fff',
            fontSize: 20,
          },
          top: '3%',
          left: '10%',
        },
        backgroundColor: '#0f375f',
        grid: {
          top: '25%',
          bottom: '10%'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            label: {
              show: true
            }
          }
        },
        legend: {
          data: ['时流量值', '流量平均值'],
          top: '15%',
          textStyle: {
            color: '#ffffff'
          }
        },
        xAxis: {
          data: ['1', '3', '5', '7', '9', '11', '13', '15', '17', '19', '21', '23'],
          name: '时',
          axisLine: {
            show: true //隐藏X轴轴线
          },
          axisTick: {
            show: true //隐藏X轴刻度
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#ebf8ac' //X轴文字颜色
            }
          },
          axisLine: {
            lineStyle: {
              color: '#01FCE3'
            }
          },
        },
        yAxis: [{
          type: 'value',
          name: '流量/m2',
          nameTextStyle: {
            color: '#ebf8ac'
          },
          splitLine: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: true
          },
          axisLine: {
            show: true
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#ebf8ac'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#FFFFFF'
            }
          },
        }, {
          type: 'value',
          nameTextStyle: {
            color: '#ebf8ac'
          },
          splitLine: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
        }, {
          type: 'value',
          gridIndex: 0,
          min: 50,
          max: 100,
          splitNumber: 8,
          splitLine: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: ['rgba(250,250,250,0.0)', 'rgba(250,250,250,0.05)']
            }
          }
        }
        ],
        series: [{
          name: '流量平均值',
          type: 'line',
          yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
          smooth: true, //平滑曲线显示
          showAllSymbol: true, //显示所有图形。
          symbol: 'circle', //标记的图形为实心圆
          symbolSize: 10, //标记的大小
          itemStyle: {
            //折线拐点标志的样式
            color: '#058cff'
          },
          lineStyle: {
            color: '#058cff'
          },
          areaStyle: {
            color: 'rgba(5,140,255, 0.2)'
          },
          data: [10700, 10700, 10700, 10700, 10700, 10700,
            10700, 10700, 10700, 10700, 10700, 10700]
        },
          {
            name: '时流量值',
            type: 'bar',
            barWidth: 15,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#00FFE3'
                },
                  {
                    offset: 1,
                    color: '#4693EC'
                  }
                ])
              }
            },
            data: [11500, 11200, 11900, 11700, 11750, 11790,
              10950, 10850, 10600, 10750, 10900, 10500]
          }
        ]
      })
    }
  }
}
</script>
