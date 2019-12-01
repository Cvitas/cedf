<template>
  <div class='chart-container'>

    <div style="padding-left: 100px">
      <el-date-picker
        placeholder="选择日期"
        v-model="startTime" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
      </el-date-picker>

      <el-button type="primary">查询</el-button>
      <el-input
        placeholder="请输入内容"
        v-model="input1"
        :disabled="true" style="width: 30%;padding-left: 100px;color: red">
      </el-input>
    </div>
    <daypowerChart height='calc(100% - 100px)' width='100%'></daypowerChart>
  </div>
</template>

<script>
  import daypowerChart from '@/components/Charts/daypower'

  export default {
    data () {
      return {
        input1: ' 当日累计 300kwh',
        startTime: new Date(),
      }
    },
    name: 'daypowerChart1',
    components: { daypowerChart }
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
