<template>
  <div class='chart-container'>
    <div style="padding-left: 200px;margin-bottom: 20px;" >
      <el-date-picker type="year" placeholder="年份" v-model="startTime" style="width: 20%;" value-format="yyyy" format="yyyy"
      ></el-date-picker>
      <el-button  type="primary">查询</el-button>
      <el-input
        placeholder="请输入内容"
        v-model="input1"
        :disabled="true" style="width: 30%;padding-left: 100px;color: red" >
      </el-input>
    </div>
    <yearpower ref="yearpower" height='calc(100% - 100px)' width='100%'></yearpower>
  </div>
</template>

<script>
  import yearpower from '@/components/Charts/yearpower'
  export default {
    data() {
      return {
        startTime: new Date(),
        input1: '当年累计 300kwh'
      }
    },
    activated() {
      this.$refs['yearpower'].initChart()
    },
    name: 'yearpower1',
    components: { yearpower }
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
