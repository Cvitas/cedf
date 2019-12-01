<template>
  <div class='chart-container'>
    <div style="padding-left: 100px">
      <el-date-picker
        placeholder="选择日期"
        type="date"
        v-model="startTime" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
      </el-date-picker>

      <el-button type="primary">查询</el-button>
      <el-input
        placeholder="请输入内容"
        v-model="input1"
        :disabled="true" style="width: 30%;padding-left: 100px;color: red">
      </el-input>
    </div>
    <daypipeChart height='calc(100% - 100px)' width='100%'></daypipeChart>
  </div>
</template>

<script>
  import daypipeChart from '@/components/Charts/dairlypipe'

  export default {
    data () {
      return {
        input1: '当日累计 300万m3',
        startTime: new Date(),
      }
    },
    name: 'daypipeChart1',
    components: { daypipeChart }
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
