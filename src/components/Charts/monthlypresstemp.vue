<template>

  <div :class="className" :id="monthlyPresstemp" :style="{height:height,width:width}"></div>

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
      monthlyPresstemp: {
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
      var  year = new Date().getFullYear();
      var month =  new Date().getMonth() + 1;
      var day = new Date().getDate();

      var wholeDate = year + "-" +  this.prefixZero(month,2) ;
      this.initChart(wholeDate)
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      this.chart.dispose()
      this.chart = null
    },
    methods: {
      prefixZero (num, n) {
        return (Array(n).join(0) + num).slice(-n)
      },
      trasferAgvData(agvData){
        this.$emit('transferAgvData',agvData);
      },
      initChart(dateStr) {
        this.chart = echarts.init(document.getElementById(this.monthlyPresstemp))
        const days = [];
        this.dataList = [];
        this.xdata = [];
        this.dataListLoading = true
        var showDate = dateStr;

        this.$http({
          url: this.$http.adornUrl(`/collect/line/templd/2/` + date),
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
              text: '月压力漏点曲线',
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
              data: ['日压力漏点', '日平均瞬时流量'],
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
              position: 'top',
              name: '日',
              axisLine: {
                lineStyle: {
                  color: '#57617B'
                }
              },
              data: days,
            }],
            yAxis: [{
              type: 'value',
              name: '℃',
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
                name: '日压力漏点',
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
                name: '日平均瞬时流量',
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
                      color: 'rgba(219, 50, 51, 0.3)'
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
