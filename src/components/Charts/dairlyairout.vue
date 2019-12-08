<template>
  <div :class="className" :id="dayair" :style="{height:height,width:width}"></div>
</template>

<script>
  import echarts from 'echarts'
  import resize from './mixins/dayair'

  export default {
    dataList: [],
    xdata: [],
    mixins: [resize],
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      dayair: {
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
        dataList: [],
        xdata: [],
        avgData: '',
        totalData: ''
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
      trasferAgvData(agvData){
        this.$emit('transferAgvData',agvData);
      },
      initChart (date) {
        this.chart = echarts.init(document.getElementById(this.dayair))

        const days = [];
        this.dataList = [];
        this.xdata = [];
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl(`/collect/line/press/1/` + date),
          method: 'get',
          params: this.$http.adornParams({
            'type': '1'
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
              text: '日排气压力曲线',
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
              name: '时/h',
              axisLine: {
                lineStyle: {
                  color: '#57617B'
                }
              },
              data: days
            }],
            yAxis: [{
              type: 'value',
              name: 'Bar',
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
                name: '排气压力值',
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
                data: this.dataList
              }, {
                name: '压力平均值',
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
                itemStyle: {
                  normal: {
                    color: 'rgb(219,50,51)',
                    borderColor: 'rgba(219,50,51,0.2)',
                    borderWidth: 12
                  }
                },
                data: this.avgData
              }]
          })
        })
      }
    }
  }
</script>
