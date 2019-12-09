<template>
  <div class='chart-container'>
    <div style="padding-left: 100px;margin-bottom: 20px;">
      <el-date-picker
        placeholder="选择日期"
        type="month"
        v-model="startTime" value-format="yyyy-MM" format="yyyy-MM">
      </el-date-picker>
      <el-button  type="primary">查询</el-button>
      <el-input
        placeholder="请输入内容"
        v-model="input1"
        :disabled="true" style="width: 30%;padding-left: 100px;color: red" >
      </el-input>
    </div>
    <monthlpipe ref="monthlpipe" height='calc(100% - 100px)' width='100%'></monthlpipe>
  </div>
</template>

<script>
  import monthlpipe from '@/components/Charts/monthlypipe'

  export default {

    data() {
      return {
        input1:' 当月累计 300万m3',
        startTime:new Date()
      }
    },
    name: 'monthlpipe1',
    activated() {
      this.$refs['monthlpipe'].initChart()
    },
    components: { monthlpipe }
  }
</script>

<style scoped>
  .chart-container{
    position: relative;
    padding:20px;
    width: 100%;
    height:85vh;
  }
</style>
