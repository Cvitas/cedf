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
      types: [ {
        value: { name: '总用气量', value: 0 },
        label: '总用气量'
      }, {
        value: { name: '离心机用气量', value: 1 },
        label: '离心机用气量'
      } ],
      // typesItems: [ { legend: [ "系统总（6个设备）用气量", "总用气量饼图" ] },
      //   { legend: [ "离心机用气量", "总用气量" ] } ]
    }
  },
  methods: {
    clernChart() {
      if ( this.chart ) {
        this.chart.clear();
      }
    },
    initChart() {
      if ( !this.form.value ) {
        this.$message("请先选择时间范围类型")
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
          data: ''//this.typesItems[ this.form.type.value ].legend
        },
        calculable: true,
        series: [
          {
            name: '分布图',
            type: 'pie',
            center: [ '50%', '45%' ],
            data: [],
            animationEasing: 'cubicInOut',
            animationDuration: 1000
          }
        ]
      }
      // get 请求获取数据 /comparisonmutichart/yql/{startDate}/{endDate}
      this.$http({
        url: this.$http.adornUrl(`/collect/collecstatis/comparisonmutichart/yql/${this.form.value[0]}/${this.form.value[1]}`),
        method: 'get'
      }).then(({data}) => {
        if (data != null && data.code === 0 && data.data.length > 0) {
          // pie.series[0].data = [  { value: 300 + Math.random() * 320, name: '空压机3' },
          //   { value: Math.random() * 240, name: '空压机4' },]
          pie.series[0].data = data.data
          this.chart.setOption(pie)
        }else{
          pie.series[0].data = []
          this.chart.setOption(pie)
        }
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
