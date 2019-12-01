<template>
  <div class='chart-container'>
    <div style="padding-left: 200px">
      <el-date-picker type="year" placeholder="年份" v-model="value" style="width: 20%;" value-format="yyyy"
                      format="yyyy"></el-date-picker>
      <el-button type="primary">查询</el-button>
      <el-button type="primary" @click="getChartPdf">导出</el-button>
      <el-input
        placeholder="请输入内容"
        v-model="input1"
        :disabled="true" style="width: 30%;padding-left: 100px;color: red">
      </el-input>
    </div>
    <yearairChart ref="yearairChart" height='calc(100% - 100px)' width='100%'></yearairChart>
  </div>
</template>

<script>
  import yearairChart from '@/components/Charts/yearairout'

  export default {
    data() {
      return {
        value: new Date(),
        input1: '当年累计 300万m'
      }
    },
    name: 'yearairChart1',
    components: { yearairChart },
    methods: {
      getChartPdf() {
        this.getPdf(this.$refs['yearairChart'].$el, '年度气压力曲线')
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

