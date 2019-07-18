<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
  import echarts from 'echarts'

  require('echarts/theme/macarons') // echarts theme
  import { debounce } from '@/utils'

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
        default: '300px'
      }
    },
    data() {
      return {
        chart: null
      }
    },
    mounted() {
      this.initChart()
      this.__resizeHandler = debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 100)
      window.addEventListener('resize', this.__resizeHandler)
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      window.removeEventListener('resize', this.__resizeHandler)
      this.chart.dispose()
      this.chart = null
    },
    methods: {
      initChart() {
        this.chart = echarts.init(this.$el, 'macarons')

        this.chart.setOption({
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            left: 'center',
            bottom: '10',
            data: ['排气口1', '排气口2', '排气口3', '排气口4', '排气口5']
          },
          calculable: true,
          series: [
            {
              name: '用气量分布图',
              type: 'pie',
              roseType: 'radius',
              radius: [15, 95],
              center: ['50%', '38%'],
              data: [
                {
                  value: 320, name: '排气口1', itemStyle: {
                    color: new echarts.graphic.LinearGradient(
                      1, 0, 0, 1,
                      [
                        { offset: 0, color: '#2898f3' },
                        { offset: 0.5, color: '#2489db' },
                        { offset: 0.8, color: '#1f77be' },
                        { offset: 1, color: '#2898f3' }
                      ]
                    )
                  }
                },
                { value: 240, name: '排气口2', itemStyle: {
                    color: new echarts.graphic.LinearGradient(
                      1, 0, 0, 1,
                      [
                        { offset: 0, color: '#2de2b8' },
                        { offset: 0.5, color: '#28caa4' },
                        { offset: 0.8, color: '#2de2b8' },
                        { offset: 1, color: '#21a888' }
                      ]
                    )
                  } },
                { value: 149, name: '排气口3', itemStyle: {
                    color: new echarts.graphic.LinearGradient(
                      1, 0, 0, 1,
                      [
                        { offset: 0, color: '#9cbe6a' },
                        { offset: 0.5, color: '#b9e17d' },
                        { offset: 0.8, color: '#a1c46d' },
                        { offset: 1, color: '#b9e17d' }
                      ]
                    )
                  } },
                { value: 100, name: '排气口4', itemStyle: {
                    color: new echarts.graphic.LinearGradient(
                      1, 0, 0, 1,
                      [
                        { offset: 0, color: '#f3ce2f' },
                        { offset: 0.5, color: '#a58c20' },
                        { offset: 0.8, color: '#f3ce2f' },
                        { offset: 1, color: '#cbac27' }
                      ]
                    )
                  } },
                { value: 59, name: '排气口5', itemStyle: {
                    color: new echarts.graphic.LinearGradient(
                      1, 0, 0, 1,
                      [
                        { offset: 0, color: '#F38A7C' },
                        { offset: 0.5, color: '#b9695f' },
                        { offset: 0.8, color: '#f88d7f' },
                        { offset: 1, color: '#ea8577' }
                      ]
                    )
                  } }
              ],
              animationEasing: 'cubicInOut',
              animationDuration: 2600
            }
          ]
        })
      }
    }
  }
</script>
