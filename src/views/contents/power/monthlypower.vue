<template>
  <div class='chart-container'>
    <div style="padding-left: 200px">
      <el-date-picker
        placeholder="选择日期"
        type="month"
        v-model="startTime" value-format="yyyy-MM" format="yyyy-MM">
      </el-date-picker>
      <el-button type="primary">查询</el-button>
      <el-input
        placeholder="请输入内容"
        v-model="input1"
        :disabled="true" style="width: 30%;padding-left: 100px;color: red">
      </el-input>
    </div>
    <monthlypower height='100%' width='100%'></monthlypower>
  </div>
</template>

<script>
  import monthlypower from '@/components/Charts/monthlypower'

  export default {
    data () {
      return {
        input1: ' 当月累计 300kwh',
        startTime: new Date()
      }
    },

    name: 'monthlypower1',
    components: { monthlypower }
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
