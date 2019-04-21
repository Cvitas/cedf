<template>
  <div class='chart-container'>
    <div class="button-bar">
      <el-form ref="form" :model="form" label-width="120px" :inline="true">
        <el-form-item label="比较方式">
          <el-select v-model="form.value" placeholder="请选择" style="width: 250px">
            <el-option
              v-for="item in options"
              :key="item.value.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="form.type" placeholder="请选择" style="width: 250px">
            <el-option
              v-for="item in types"
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

  export default {
    name: "comparisonMutiChart",
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
          type: null
        },
        options: [ {
          value: { name: '比较去年', value: 1 },
          label: '比较去年'
        }, {
          value: { name: [ '上个月', '当月' ], value: 2 },
          label: '比较上个月'
        }, {
          value: { name: [ '上个季度', '本季度' ], value: 3 },
          label: '比较上个季度'
        } ],
        types: [ {
          value: { name: '产气量能耗', value: 0 },
          label: '产气量能耗'
        }, {
          value: { name: '瞬时流量', value: 1 },
          label: '瞬时流量'
        }, {
          value: { name: '累计流量', value: 2 },
          label: '累计流量'
        }, {
          value: { name: '能耗', value: 3 },
          label: '能耗'
        } ],
        typesItems: [ { legend: [ "总能耗", "离心机" ] },
          { legend: [ "总瞬时流量", "7台设备" ] },
          { legend: [ "总流量", "7台设备总流量" ] },
          { legend: [ "总耗电量", "9台其他设备" ] } ]
      }
    },
    methods: {
      clernChart() {
        if ( this.chart ) {
          this.chart.clear();
        }
      },
      initChart() {
        if ( !this.form.value || !this.form.type ) {
          this.$message("请先选择比较方式类型")
          return false
        }
        this.clernChart()
        this.chart = echarts.init(this.$refs[ 'chart' ], 'default')
        let pie = {
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            left: 'center',
            bottom: '10',
            data: this.form.value.name
          },
          calculable: true,
          series: [
            {
              name: '分布图',
              type: 'pie',
              center: [ '50%', '45%' ],
              data: [
                { value: 300 + Math.random() * 320, name: this.form.value.name[ 0 ] },
                { value: Math.random() * 240, name: this.form.value.name[ 1 ] },
              ],
              animationEasing: 'cubicInOut',
              animationDuration: 1000
            }
          ]
        }
        let bar = {
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            top: 30,
            left: '2%',
            right: '2%',
            bottom: '3%',
            containLabel: true
          },
          legend: {
            left: 'center',
            bottom: '10',
            data: [ this.form.type.name, ...this.typesItems[ this.form.type.value ].legend ]
          },
          xAxis: [ {
            type: 'category',
            data: [ "2018", "2019" ],
            axisTick: {
              alignWithLabel: true
            }
          } ],
          yAxis: [ {
            type: 'value',
            name: '气量/m2',
            axisTick: {
              show: false
            }
          } ],
          series: [
            {
              name: this.form.type.name,
              type: 'bar',
              barGap: 0,
              data: [ Math.random() * 53280, Math.random() * 42180 ],
            },
            {
              name: this.typesItems[ this.form.type.value ].legend[ 0 ],
              type: 'bar',
              data: [ Math.random() * 53280, Math.random() * 42180 ],
            },
            {
              name: this.typesItems[ this.form.type.value ].legend[ 1 ],
              type: 'bar',
              data: [ Math.random() * 53280, Math.random() * 42180 ],
            },
          ]
        }
        this.chart.setOption(this.form.value.value !== 1 ? pie : bar)
      },
      drawChart() {
        this.initChart()
      },
    }
  }
</script>

<style scoped lang="scss">
</style>
