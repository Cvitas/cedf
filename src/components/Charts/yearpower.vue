<template>

  <div :class="className" :id="yearPower" :style="{height:height,width:width}"></div>

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
      yearPower: {
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
        value3: new Date(2016, 9, 10, 18, 40),
        dataList: [],
        xdata: [],
        avgData: '',
        totalData: ''
      }
    },
    mounted() {
      var  year = new Date().getFullYear();
      var month =  new Date().getMonth() + 1;
      var day = new Date().getDate();

      var wholeDate = year  ;
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
      trasferAgvData(agvData){
        this.$emit('transferAgvData',agvData);
      },
      initChart() {
        this.chart = echarts.init(document.getElementById(this.yearPower))
        const days = [];
        this.dataList = [];
        this.xdata = [];
        this.avgData = 0;
        this.totalData = 0;
        this.trasferAgvData(this.avgData);
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl(`/collect/line/press/3/` + date),
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
            title: {
              text: '年度流量柱状图' + moment().format('YYYY'),
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
              data: ['周耗电量kwh', '周平均耗电量kwh'],
              top: '15%',
              textStyle: {
                color: '#ffffff'
              }
            },
            xAxis: {
              data: days,
              name: '周',
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
              name: '能耗/Kwh',
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
              name: '周平均耗电量kwh',
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
              data: this.dataList
            },
              {
                name: '周耗电量kwh',
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
                data: this.avgData
              }
            ]
          })
        })

      }
    }
  }
</script>
