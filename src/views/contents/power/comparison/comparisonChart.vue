<template>
  <div class='chart-container'>
    <div class="button-bar">
      <el-form ref="form" :model="form" label-width="120px" :inline="true">
        <el-form-item label="设备类型">
          <el-select v-model="form.deviceType" placeholder="请选择" style="width: 250px" @change="changeTypes">
            <el-option
              v-for="item in deviceTypes"
              :key="item.value.value"
              :label="item.label"
              :value="item.value.value">
            </el-option>
          </el-select>
        </el-form-item>
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
          <el-select v-model="form.type" placeholder="请选择" style="width: 250px">
            <el-option
              v-for="item in types"
              :key="item.value.value"
              :label="item.label"
              :value="item.value.value">
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
          value: [],
          type: 0,
          deviceType: 0
        },
        deviceTypes: [{
          value: { name: '温度', value: 0 },
          label: '温度'
        }, {
          value: { name: '压力', value: 1 },
          label: '压力'
        }],
        types: [{
          value: { name: '当年', value: 0 },
          label: '当年'
        }, {
          value: { name: '当月', value: 1 },
          label: '当月'
        }, {
          value: { name: '本周', value: 2 },
          label: '本周'
        }],
        // options:
        //   [{
        //     value: { name: '产气能耗', value: 1 },
        //     label: '产气能耗'
        //   }, {
        //     value: { name: '总管压力', value: 2 },
        //     label: '总管压力'
        //   }, {
        //     value: { name: '总管温度', value: 3 },
        //     label: '总管温度'
        //   }, {
        //     value: { name: '瞬时温度', value: 4 },
        //     label: '瞬时温度'
        //   }, {
        //     value: { name: '耗电率', value: 5 },
        //     label: '耗电率'
        //   }],
        options: []
      }
    },
    created() {
      this.changeTypes()
    },
    methods: {
      changeTypes() {
        this.form.value = []
        var _deviceName = this.deviceTypes[this.form.deviceType].label
        var options = []
        for (var i = 1; i <= 3; i++) {
          options.push({ value: { name: _deviceName + i + '设备', value: i }, label: _deviceName + i + '设备' })
        }
        this.options = options
      },
      getCountDays() {
        var curDate = new Date()
        /* 获取当前月份 */
        var curMonth = curDate.getMonth()
        curDate.setMonth(curMonth + 1)
        /* 将日期设置为0, 这里为什么要这样设置, 我不知道原因, 这是从网上学来的 */
        curDate.setDate(0)
        /* 返回当月的天数 */
        return curDate.getDate()
      },
      showWeekDays() {
        var date = []
        for (var i = 0; i < 7; i++) {
          var Nowdate = new Date()
          var WeekFirstDay = new Date(Nowdate - (Nowdate.getDay() - i - 1) * 86400000);
          var M = Number(WeekFirstDay.getMonth()) + 1
          date.push(M + '-' + (WeekFirstDay.getDate()))
        }
        return date
      },
      initChart() {
        if (this.form.value.length != 2) {
          this.$message("请先选择对比项")
          return false
        }
        let date = ["2019-1", "2019-2", "2019-3", "2019-4", "2019-5", "2019-6", "2019-7", "2019-8", "2019-9", "2019-10", "2019-11", "2019-12"];
        switch (this.form.type) {
          case 0:
            date = ["2019-1", "2019-2", "2019-3", "2019-4", "2019-5", "2019-6", "2019-7", "2019-8", "2019-9", "2019-10", "2019-11", "2019-12"]
            break
          case 1:
            const day = this.getCountDays()
            date = []
            for (var i = 1; i <= day; i++) {
              date.push(i + '日')
            }
            break
          case 2:
            date = this.showWeekDays()
            break
        }
        this.chart = echarts.init(this.$refs['chart'], 'default')
        this.chart.setOption({
          tooltip: {
            trigger: 'none',
            axisPointer: {
              type: 'cross'
            }
          },
          legend: {
            data: [this.form.value[0].name, this.form.value[1].name]
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
                      + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                  }
                }
              },
              data: date
            }
          ],
          yAxis: [
            {
              name: '流量(m^3/s)',
              type: 'value',
            },
            {
              name: '温度(℃)',
              type: 'value',
            }
          ],
          series: [
            {
              name: this.form.value[0].name,
              type: 'line',
              smooth: true,
              data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
            },
            {
              name: this.form.value[1].name,
              type: 'line',
              smooth: true,
              yAxisIndex: 1,
              data: [3.9, 5.9, 11.1, 18.7, 48.3, 69.2, 231.6, 46.6, 55.4, 18.4, 10.3, 0.7]
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
