<template>
  <div class='chart-container'>
    <div style="padding-left: 200px">
      <el-date-picker
        placeholder="选择日期"
        type="month"
        v-model="startTime" value-format="yyyy-MM" format="yyyy-MM">
      </el-date-picker>
      <el-button type="primary">查询</el-button>
      <el-button type="primary" @click="getChartPdf">导出</el-button>
      <el-input

        v-model="input1"
        :disabled="true" style="width: 30%;padding-left: 100px;color: red">
      </el-input>
    </div>
    <monthlyairChart ref="monthlyairChart" height='100%' width='100%'></monthlyairChart>
  </div>
</template>

<script>
  import monthlyairChart from '@/components/Charts/monthlyairtout'

  export default {
    data() {
      return {
        input1: '',
        startTime: new Date(),
      }
    },
    name: 'monthlyair1',
    components: { monthlyairChart },
    methods: {
      getChartPdf() {
        this.getPdf(this.$refs['monthlyairChart'].$el, '月度气压力曲线')
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
