<template>

  <div :class="className" :id="yearTemp" :style="{height:height,width:width}"></div>

</template>


<script>
  import echarts from 'echarts'
  import resize from './mixins/daypipe'

  export default {
    mixins: [resize],
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      yearTemp: {
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
    data() {
      return {
        chart: null,
        value2: new Date(2016, 9, 10, 18, 40),
        value3: new Date(2016, 9, 10, 18, 40)
      }
    },
    mounted() {
      this.initChart()
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      this.chart.dispose()
      this.chart = null
    },
    methods: {
      initChart() {
        this.chart = echarts.init(document.getElementById(this.yearTemp))

        this.$http({
          url: this.$http.adornUrl(`/collect/line/temp/3/` + date),
          method: 'get',
          params: this.$http.adornParams({
            'type': '3'
          })
        }).then(({data}) => {
          if (data && data.code === 0 && data.data != null) {
            this.dataList = data.data.dataList
            this.xdata = data.data.xDataList
            this.avgData = data.data.avgData
            this.totalData = data.data.totalData
            for (let i = 0; i < this.xdata.length; i++) {
              days.push(this.xdata[i])
            }
            this.trasferAgvData(this.avgData);
          }
          this.dataListLoading = false;

          this.chart.setOption({
            backgroundColor: 'white',
            title: {
              top: 20,
              text: '年温度曲线',
              textStyle: {
                fontWeight: 'normal',
                fontSize: 16,
                color: 'black'
              },
              left: '1%'
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
              data: ['排气温度'],
              right: '4%',
              textStyle: {
                fontSize: 12,
                color: 'black'
              }
            },
            grid: {
              top: 100,
              left: '3%',
              right: '4%',
              bottom: '2%',
              containLabel: true
            },
            xAxis: [{
              type: 'category',
              boundaryGap: false,
              name: '周',
              axisLine: {
                lineStyle: {
                  color: '#5793f3'
                }
              },
              data: days,
            }],
            yAxis: [{
              type: 'value',
              name: '温度值℃',
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
            series: [
              {
                name: '进气温度',
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
                    color: 'rgb(200,136,212)',
                    borderColor: 'rgba(0,136,212,0.2)',
                    borderWidth: 12

                  }
                },
                data: this.dataList
              }, {
                name: '进气平均温度',
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
                      color: 'rgba(10, 60, 51, 0.3)'
                    }, {
                      offset: 0.8,
                      color: 'rgba(219, 50, 51, 0)'
                    }], false),
                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                    shadowBlur: 10
                  }
                },
                itemStyle: {
                  normal: {
                    color: 'blue',
                    borderColor: 'rgba(219,50,51,0.2)',
                    borderWidth: 12
                  }
                },
                data: this.dataList
              }
            ]
          })
        })
      }
    }
  }
</script>
