<template>
  <div class='chart-container'>
    <div class="button-bar">
      <el-form ref="form" :model="form" label-width="120px" :inline="true">
        <el-form-item label="选择日期范围">
          <el-date-picker
            v-model="form.value"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
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

  export default {
    name: "eleAirChart",
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
        chart: null,
        form: {
          value: null,
        },
      }
    },
    methods: {
      clernChart() {
        if (this.chart) {
          this.chart.clear();
        }
      },
      initChart() {
        if (!this.form.value) {
          this.$message("请先选择时间范围")
          return false
        }
        this.clernChart()
        this.$http({
          url: this.$http.adornUrl(`/collect/collecstatis/comparisonmutichart/airpower/${this.form.value[0]}/${this.form.value[1]}`),
          method: 'get'
        }).then((data) => {
          const res = data.data
          let legend = []
          let eleData = []
          let airData = []
          res.data.forEach(item => {
            legend.push(item.name + '用气量')
            legend.push(item.name + '用电量')
            eleData.push({ value: item.powerData, name: item.name + '用电量' })
            airData.push({ value: item.data, name: item.name + '用气量' })
          })
          this.chart = echarts.init(this.$refs['chart'], 'default')
          let pie = {
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c}' + res.unitName + ' ({d}%)'
            },
            legend: {
              orient: 'vertical',
              x: 'left',
              data: legend
            },
            series: [
              {
                name: '能耗数据',
                type: 'pie',
                selectedMode: 'single',
                radius: [0, '30%'],

                label: {
                  normal: {
                    position: 'inner'
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                data: eleData
              },
              {
                name: '能耗数据',
                type: 'pie',
                radius: ['40%', '55%'],
                label: {
                  normal: {
                    formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                    backgroundColor: '#eee',
                    borderColor: '#aaa',
                    borderWidth: 1,
                    borderRadius: 4,
                    rich: {
                      a: {
                        color: '#999',
                        lineHeight: 22,
                        align: 'center'
                      },
                      hr: {
                        borderColor: '#aaa',
                        width: '100%',
                        borderWidth: 0.5,
                        height: 0
                      },
                      b: {
                        fontSize: 16,
                        lineHeight: 33
                      },
                      per: {
                        color: '#eee',
                        backgroundColor: '#334455',
                        padding: [2, 4],
                        borderRadius: 2
                      }
                    }
                  }
                },
                data: airData
              }
            ]
          }
          this.chart.setOption(pie)
        })
      },
      drawChart() {
        this.initChart()
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
