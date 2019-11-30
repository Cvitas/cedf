<template>
  <div class='chart-container'>
    <div class="button-bar">
      <el-form ref="form" :model="form" label-width="120px" :inline="true">
        <el-form-item label="设备类型">
        <el-select v-model="form.deviceType" placeholder="请选择" style="width: 250px" @change="changeTypes">
          <el-option
            v-for="item in devices"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
        <el-form-item label="选择对比项">
          <el-select v-model="form.value" :multiple-limit="limit" multiple placeholder="请选择" style="width: 250px">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <!--<el-select v-model="form.type" placeholder="请选择" style="width: 250px">-->
          <!--<el-option-->
          <!--v-for="item in types"-->
          <!--:key="item.value.value"-->
          <!--:label="item.label"-->
          <!--:value="item.value.value">-->
          <!--</el-option>-->
          <!--</el-select>-->
          <el-form-item label="选择时间">
            <el-row>
              <el-button @click="changeDateType(1)" :type="form.type ==1?'success':'primary'">当天</el-button>
              <el-button @click="changeDateType(2)" :type="form.type ==2?'success':'primary'">本周</el-button>
              <el-button @click="changeDateType(3)" :type="form.type ==3?'success':'primary'">本月</el-button>
              <el-button @click="changeDateType(4)" :type="form.type ==4?'success':'primary'">本年</el-button>
            </el-row>
          </el-form-item>
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
          deviceType: 1
        },
        options: []
      }
    },
    computed: {
      devices: {
        get() {
          return this.$store.state.device.collectTypes
        }
      }
    },
    created() {
      this.changeTypes()
    },
    methods: {
      changeDateType(index) {
        this.form.type = index
        this.initChart()
      },
      changeTypes(collectType) {
        this.form.value = []
        this.$http({
          url: this.$http.adornUrl(`/collect/equipment/equiplist`),
          method: 'get',
          params: { collecType: collectType }
        }).then((data) => {
          if (data != null && data.data.code === 0) {
            this.options = data.data.data
          }
        })
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
      RandomData(length, n) {
        let data = []
        for (var i = 0; i < length; i++) {
          data.push(Math.random() * 20 + n)
        }
        return data
      },
      initChart() {
        let label = []
        let dataXY = []
        if (!this.form.value.length) {
          this.$message("请先选择对比项")
          return false
        }
        this.$http({
          url: this.$http.adornUrl(`/collect/collecstatis/comparisonmutichart/dbqx/${this.form.deviceType}/${this.form.value.toString()}/${this.form.type}`),
          method: 'get'
        }).then((data) => {
          let res = data.data
          if (res && res.code === 0) {
            if (res.code === 0) {
              const xAxis = res.xais
              const chartData = res.data
              const unitName = res.unitName
              chartData.forEach(item => {
                label.push(item.name)
                dataXY.push({
                  name: item.name,
                  type: 'line',
                  color: item.color,
                  smooth: true,
                  data: item.data
                })
              })

              this.chart = echarts.init(this.$refs['chart'], 'default')
              this.chart.setOption({
                tooltip: {
                  trigger: 'none',
                  axisPointer: {
                    type: 'cross'
                  }
                },
                legend: {
                  data: label
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
                      onZero: false
                    },
                    axisPointer: {
                      label: {
                        formatter: function (params) {
                          return '降水量  ' + params.value
                            + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                        }
                      }
                    },
                    data: xAxis
                  }
                ],
                yAxis: [
                  {
                    name: unitName,
                    type: 'value'
                  }
                ],
                series: dataXY
              })
            }
          }
        })
        // let date = ["2019-1", "2019-2", "2019-3", "2019-4", "2019-5", "2019-6", "2019-7", "2019-8", "2019-9", "2019-10", "2019-11", "2019-12"];
        // switch (this.form.type) {
        //   case 0:
        //     date = ["2019-1", "2019-2", "2019-3", "2019-4", "2019-5", "2019-6", "2019-7", "2019-8", "2019-9", "2019-10", "2019-11", "2019-12"]
        //     break
        //   case 1:
        //     const day = this.getCountDays()
        //     date = []
        //     for (var i = 1; i <= day; i++) {
        //       date.push(i + '日')
        //     }
        //     break
        //   case 2:
        //     date = this.showWeekDays()
        //     break
        //   case 3:
        //     date = ["01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00"]
        //     break
        // }
      },
      drawChart() {
        this.initChart()
      },
    }
  }
</script>

<style scoped lang="scss">
</style>
