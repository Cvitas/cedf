<template>
  <div>
    <div id="gaugeContainer" style="width:100%; height:300px"></div>
  </div>
</template>

<style scoped>

</style>

<script>
  import echarts from 'echarts'
  require('echarts/theme/macarons') // echarts theme
  require('echarts/lib/chart/gauge')
  import { debounce } from '@/utils'

  export default {
    name: 'Guage',
    data () {
      return {
        option:{
          tooltip: {
            formatter: "{a} <br/>{b} : {c}℃"
          },
          toolbox: {
            show: false,
            feature: {
              mark: {
                show: true
              },
              restore: {
                //show: true
              },
              saveAsImage: {
                //show: true
              }
            }
          },
          series: [
            {
              name: "空压机1 当前温度",
              type: "gauge",
              detail: {
                formatter: "{value}℃"
              },
              axisLine: { // 坐标轴线
                lineStyle: { // 属性lineStyle控制线条样式
                  color: [
                    [0.2, new echarts.graphic.LinearGradient(
                      1, 0, 0, 1,
                      [
                        { offset: 0, color: '#91c7ae' },
                        { offset: 0.5, color: '#80b09a' },
                        { offset: 0.8, color: '#91c7ae' },
                        { offset: 1, color: '#5c7e6e' }
                      ]
                    )],
                    [0.8, new echarts.graphic.LinearGradient(
                      1, 0, 0, 1,
                      [
                        { offset: 0, color: '#63869e' },
                        { offset: 0.5, color: '#232f38' },
                        { offset: 0.8, color: '#3f5563' },
                        { offset: 1, color: '#63869e' }
                      ]
                    )],
                    [1, new echarts.graphic.LinearGradient(
                      1, 0, 0, 1,
                      [
                        { offset: 0, color: '#c23531' },
                        { offset: 0.5, color: '#d93b37' },
                        { offset: 0.8, color: '#a52d2a' },
                        { offset: 1, color: '#c23531' }
                      ]
                    )]
                  ]
                }
              },
              data: [
                {
                  value: 82,
                  name: "空压机1"
                }
              ]
            }
          ]
        }
      }
    },
    mounted() {
      let myChart = echarts.init(document.getElementById('gaugeContainer'))
      myChart.setOption(this.option);

    }
  }
</script>
