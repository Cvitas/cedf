<template>
  <div class="dashboard-editor-container">
    <panel-group @handleSetLineChartData="handleSetLineChartData"/>
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <el-col :span="24">
        <!--<gauge-chart/>-->
        {{deviceName}}
        <el-table
          :data="tableData"
          style="width:100%">
          <el-table-column
            v-for="item in devices"
            prop="value"
            :label="item.name">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-col :span="24">
      <line-chart :deviceName="deviceName" :chart-data="lineChartData"/>
    </el-col>
    <el-row :gutter="32">
      <el-col :span="16">
        <div class="chart-wrapper">
          <bar-chart/>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="chart-wrapper">
          <pie-chart/>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import PanelGroup from '@/components/home/PanelGroup'
  import LineChart from '@/components/home/LineChart'
  import PieChart from '@/components/home/PieChart'
  import BarChart from '@/components/home/BarChart'
  import GaugeChart from '@/components/home/GaugeChart'

  const lineChartData = {
    newVisitis: {
      expectedData: [100, 120, 161, 134, 105, 160, 165],
      actualData: [120, 82, 91, 154, 162, 140, 145]
    },
    messages: {
      expectedData: [200, 192, 120, 144, 160, 130, 140],
      actualData: [180, 160, 151, 106, 145, 150, 130]
    },
    purchases: {
      expectedData: [80, 100, 121, 104, 105, 90, 100],
      actualData: [120, 90, 100, 138, 142, 130, 130]
    },
    shoppings: {
      expectedData: [130, 140, 141, 142, 145, 150, 160],
      actualData: [120, 82, 91, 154, 162, 140, 130]
    }
  }

  export default {
    name: 'DashboardAdmin',
    components: {
      PanelGroup,
      LineChart,
      GaugeChart,
      PieChart,
      BarChart
    },
    data () {
      return {
        tableData: [{value: Math.floor(Math.random() * 1000)}],
        devices: [{
          name: '电机电流',
          value: 1,
          icon: 'qibeng'
        }, {
          name: '总管压力',
          value: 2,
          icon: 'qibeng'
        }, {
          name: '排气压力',
          value: 3,
          icon: 'qibeng'
        }, {
          name: '瞬间流量',
          value: 4,
          icon: 'qibeng'
        }, {
          name: '累计流量',
          value: 5,
          icon: 'qibeng'
        }, {
          name: '压力露点',
          value: 6,
          icon: 'qibeng'
        }, {
          name: '运行电量',
          value: 7,
          icon: 'qibeng'
        }, {
          name: '进气温度',
          value: 8,
          icon: 'qibeng'
        }, {
          name: '排气温度',
          value: 9,
          icon: 'qibeng'
        }],
        lineChartData: lineChartData.newVisitis,
        deviceName: ''
      }
    },
    methods: {
      handleSetLineChartData (index) {
        this.tableData = [{value: Math.floor(Math.random() * 1000)}]
        this.deviceName = '空压机' + index
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard-editor-container {
    padding: 10px;
    background-color: rgb(240, 242, 245);
    .chart-wrapper {
      background: #fff;
      padding: 15px 15px 0;
      margin-bottom: 32px;
    }
  }
</style>
