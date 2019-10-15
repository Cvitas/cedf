<template>
  <div class='chart-container'>
    <div style="padding-left: 100px">
      <el-date-picker
        placeholder="选择日期"
        v-model="startTime" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
      </el-date-picker>
      <el-button type="primary">查询</el-button>
      <el-button type="primary" @click="getChartPdf">导出</el-button>
      <el-input
        placeholder="请输入内容"
        v-model="input1"
        :disabled="true" style="width: 30%;padding-left: 100px;color: red">
      </el-input>
    </div>
    <dayairChart ref="dayairChart" height='100%' width='100%'></dayairChart>
  </div>
</template>

<script>
  import dayairChart from '@/components/Charts/dairlyairout'

  export default {
    data () {
      return {
        input1: '当日平均排气压力0.75Mpa',
        startTime: new Date(),
        endTime: ''
      }
    },
    name: 'dayairChart1',
    components: { dayairChart },
    
    methods: {
      getChartPdf () {
        this.getPdf(this.$refs['dayairChart'].$el, '日气压力曲线')
      }
    }
  }
</script>

<style scoped>
  .chart-container {
    position: relative;
    padding: 20px;
    width: 100%;
    height: 85vh;
  }
</style>
