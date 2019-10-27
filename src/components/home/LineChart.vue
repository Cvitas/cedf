<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
  import echarts from 'echarts'

  require('echarts/theme/macarons') // echarts theme

  export default {
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
        default: '350px'
      },
      autoResize: {
        type: Boolean,
        default: true
      },
      chartData: {
        type: Object,
        required: true
      },
      deviceName: {
        type: String,
        default: ''
      },
    },
    data () {
      return {
        chart: null,
        sidebarElm: null,
        app: {
          count: 18
        },
        option: {
          title: {
            text: this.deviceName + '动态气电比数据',
            subtext: '实时数据'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#283b56'
              }
            }
          },
          legend: {
            data: ['气量', '电量']
          },
          toolbox: {
            show: true,
            feature: {
              dataView: {readOnly: false},
              restore: {},
              saveAsImage: {}
            }
          },
          dataZoom: {
            show: false,
            start: 0,
            end: 100
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: true,
              data: (function () {
                var now = new Date()
                var res = []
                var len = 10
                while (len--) {
                  res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''))
                  now = new Date(now - 2000)
                }
                return res
              })()
            },
            {
              type: 'category',
              boundaryGap: true,
              data: (function () {
                var res = []
                var len = 10
                while (len--) {
                  res.push(10 - len - 1)
                }
                return res
              })()
            }
          ],
          yAxis: [
            {
              type: 'value',
              scale: true,
              name: '立方米/每分',
              max: 30,
              min: 0,
              boundaryGap: [0.2, 0.2]
            },
            {
              type: 'value',
              scale: true,
              name: '千瓦时',
              max: 1200,
              min: 0,
              boundaryGap: [0.2, 0.2]
            }
          ],
          series: [
            {
              name: '电量',
              type: 'bar',
              xAxisIndex: 1,
              yAxisIndex: 1,
              data: (function () {
                var res = []
                var len = 10
                while (len--) {
                  res.push(Math.round(Math.random() * 1000))
                }
                return res
              })()
            },
            {
              name: '气量',
              type: 'line',
              data: (function () {
                var res = []
                var len = 0
                while (len < 10) {
                  res.push((Math.random() * 10 + 5).toFixed(1) - 0)
                  len++
                }
                return res
              })()
            }
          ]
        }
      }
    },
    watch: {
      chartData: {
        deep: true,
        handler (val) {
          this.setOptions(val)
        }
      }
    },
    mounted () {
      this.initChart()
      if (this.autoResize) {
        this.__resizeHandler = debounce(() => {
          if (this.chart) {
            this.chart.resize()
          }
        }, 100)
        window.addEventListener('resize', this.__resizeHandler)
      }

      // 监听侧边栏的变化
      this.sidebarElm = document.getElementsByClassName('sidebar-container')[0]
      this.sidebarElm && this.sidebarElm.addEventListener('transitionend', this.sidebarResizeHandler)
    },
    beforeDestroy () {
      if (!this.chart) {
        return
      }
      if (this.autoResize) {
        window.removeEventListener('resize', this.__resizeHandler)
      }

      this.sidebarElm && this.sidebarElm.removeEventListener('transitionend', this.sidebarResizeHandler)

      this.chart.dispose()
      this.chart = null
    },
    methods: {
      sidebarResizeHandler (e) {
        if (e.propertyName === 'width') {
          this.__resizeHandler()
        }
      },
      setOptions ({expectedData, actualData} = {}) {
        this.chart.setOption()
      },
      initChart () {
        this.chart = echarts.init(this.$el, 'macarons')
        setInterval(() => {
          const axisData = (new Date()).toLocaleTimeString().replace(/^\D*/, '')

          var data0 = this.option.series[0].data
          var data1 = this.option.series[1].data
          data0.shift()
          data0.push(Math.round(Math.random() * 1000))
          data1.shift()
          data1.push((Math.random() * 10 + 5).toFixed(1) - 0)
          this.option.title.text = this.deviceName + '动态气电比数据'
          this.option.xAxis[0].data.shift()
          this.option.xAxis[0].data.push(axisData)
          this.option.xAxis[1].data.shift()
          this.option.xAxis[1].data.push(this.app.count++)

          this.chart.setOption(this.option)
        }, 2100)
      }
    }
  }
</script>
