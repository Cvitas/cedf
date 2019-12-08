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
        <!--<el-form-item label="类型">-->
          <!--<el-select v-model="form.type" placeholder="请选择" style="width: 250px">-->
            <!--<el-option-->
              <!--v-for="item in types"-->
              <!--:key="item.value.value"-->
              <!--:label="item.label"-->
              <!--:value="item.value">-->
            <!--</el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
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
    name: "airChart",
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
        types: [{
          value: { name: '其他设备', value: 1 },
          label: '其他设备'
        }, {
          value: { name: '离心机', value: 2 },
          label: '离心机'
        }],
        typesItems: [{ legend: ["系统总（6个设备）用气量", "总用气量饼图"] },
          { legend: ["离心机用气量", "总用气量"] }]
      }
    },
    methods: {
      clernChart() {
        if (this.chart) {
          this.chart.clear();
        }
      },
      initChart() {
        if (!this.form.value || !this.form.type) {
          this.$message("请先选择时间范围类型")
          return false
        }
        this.clernChart()
        this.$http({
          url: this.$http.adornUrl(`/collect/collecstatis/comparisonmutichart/yql/${this.form.value[0]}/${this.form.value[1]}`),
          method: 'get',
          params: { collectType: this.form.type.value }
        }).then((data) => {
          if (data != null && data.data.code === 0) {
            const res = data.data
            let legend = []
            const chartData = res.data.map(item => {
              legend.push(item.name)
              return { value: item.data, name: item.name }
            })
            this.chart = echarts.init(this.$refs['chart'], 'default')
            let pie = {
              tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c}' + res.unitName + ' ({d}%)'
              },
              legend: {
                left: 'center',
                bottom: '10',
                data: legend
              },
              calculable: true,
              series: [
                {
                  name: '分布图',
                  type: 'pie',
                  center: ['50%', '45%'],
                  data: chartData,
                  animationEasing: 'cubicInOut',
                  animationDuration: 1000
                }
              ]
            }
            this.chart.setOption(pie)
          }
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
