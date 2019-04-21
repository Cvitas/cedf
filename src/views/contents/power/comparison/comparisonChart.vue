<template>
  <div class='chart-container'>
    <div class="button-bar">
      <el-form ref="form" :model="form" label-width="120px" :inline="true">
        <el-form-item label="选择对比项">
          <el-select v-model="form.value" :multiple-limit="limit" multiple placeholder="请选择" style="width: 250px">
            <el-option
              v-for="item in options"
              :key="item.value.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="drawChart">生成</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="chart-content">
      <div ref="chart" :class="className" :style="{height:height,width:width}"/>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'

  const animationDuration = 6000
  export default {
    name: "comparisonChart",
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
        default: '100%'
      }
    },
    data() {
      return {
        limit: 2,
        form: {
          value: []
        },
        options: [ {
          value: { name: '产气能耗', value: 1 },
          label: '产气能耗'
        }, {
          value: { name: '总管压力', value: 2 },
          label: '总管压力'
        }, {
          value: { name: '总管温度', value: 3 },
          label: '总管温度'
        }, {
          value: { name: '瞬时温度', value: 4 },
          label: '瞬时温度'
        }, {
          value: { name: '耗电率', value: 5 },
          label: '耗电率'
        } ],
      }
    },
    methods: {
      initChart() {
        if ( this.form.value.length != 2 ) {
          this.$message("请先选择对比项")
          return false
        }
        this.chart = echarts.init(this.$refs[ 'chart' ], 'default')
        this.chart.setOption({
          tooltip: {
            trigger: 'none',
            axisPointer: {
              type: 'cross'
            }
          },
          legend: {
            data: [ this.form.value[ 0 ].name, this.form.value[ 1 ].name ]
          },
          grid: {
            top: 70,
            bottom: 50
          },
          xAxis: [
            {
              type: 'category',
              axisTick: {
                alignWithLabel: true
              },
              axisLine: {
                onZero: false,
              },
              axisPointer: {
                label: {
                  formatter: function (params) {
                    return '降水量  ' + params.value
                      + (params.seriesData.length ? '：' + params.seriesData[ 0 ].data : '');
                  }
                }
              },
              data: [ "2019-1", "2019-2", "2019-3", "2019-4", "2019-5", "2019-6", "2019-7", "2019-8", "2019-9", "2019-10", "2019-11", "2019-12" ]
            }
          ],
          yAxis: [
            {
              name : '流量(m^3/s)',
              type : 'value',
            },
            {
              name : '温度(℃)',
              type : 'value',
            }
          ],
          series: [
            {
              name: this.form.value[ 0 ].name,
              type: 'line',
              smooth: true,
              data: [ 2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3 ]
            },
            {
              name: this.form.value[ 1 ].name,
              type: 'line',
              smooth: true,
              yAxisIndex: 1,
              data: [ 3.9, 5.9, 11.1, 18.7, 48.3, 69.2, 231.6, 46.6, 55.4, 18.4, 10.3, 0.7 ]
            }
          ]
        })
      },
      drawChart() {
        this.initChart()
      },
    }
  }
</script>

<style scoped lang="scss">
</style>
