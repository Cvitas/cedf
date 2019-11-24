<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
import echarts from 'echarts'
import moment from 'moment'
import { debounce } from '@/utils'

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
      default: '500px'
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
        title: { text: '' },
        tooltip: {
          trigger: 'item',
          formatter: '温度 : <br/> {b}时: {c}℃ '
        },
        toolbox: {
          feature: {
            dataView: { readOnly: false },
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          name: '时间(h)',
          boundaryGap: false,
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [],
          type: 'line',
          smooth: true,
          color: 'red'
        }]
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
    this.intervalRun()
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
    setOptions ({ expectedData, actualData } = {}) {
      this.chart.setOption()
    },
    intervalRun () {
      window.setInterval(() => {
        setTimeout(this.initChart, 0)
      }, 1000 * 60 )
    },
    initChart () {
      this.chart = echarts.init(this.$el, 'macarons')
      const seriesData = []
      const xAxisData = []
      const curHour = new Date().getHours();

      // 获取温度数据
      this.$http({
        url: this.$http.adornUrl(`/collect/home/totaltemplist`),
        method: 'get'
      }).then(({data}) => {
        if (data && data.code === 0) {
          var map = data.data;
          // for (let i = 0; i < 24; i++) {
          //   xAxisData.push(i)
          // }
          // for (let i = 0; i <= curHour; i++) {
          //   seriesData.push(Math.floor(Math.random() * 20) + 40)
          // }
          this.option.title.text = this.deviceName + '总管温度（℃）' + moment(new Date()).format('YYYY-MM-DD')
          this.option.xAxis.data = map.hours
          this.option.series[0].data = map.data
          this.chart.setOption(this.option)
        }
      })


    }
  }
}
</script>
