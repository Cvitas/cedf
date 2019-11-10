<template>
  <div class="dashboard-editor-container">
    <panel-group @handleSetLineChartData="handleSetLineChartData"/>
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <el-col :span="24">
        <!--<gauge-chart/>-->
        {{deviceName}}
        <el-table
          center
          :data="tableData"
          style="width:100%">
          <el-table-column
            type="index"
            width="120">
            <template slot-scope="scope">
              {{scope.row.name}}
            </template>
          </el-table-column>
          <el-table-column
            v-for="(item,index) in devices"
            :prop="item.value"
            :label="item.name">
            <template slot-scope="scope">
              {{scope.row.data[index]}} {{scope.row.name==='瞬时流量'?'m³/min':'m³'}}
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-col :span="12" style="margin-top: 30px">
      <line-chart :deviceName="deviceName" :chart-data="lineChartData"/>
    </el-col>
    <el-col :span="12" style="margin-top: 30px">
      <line-chart-power :deviceName="deviceName" :chart-data="lineChartData"/>
    </el-col>
    <!--<el-row :gutter="32">-->
    <!--<el-col :span="16">-->
    <!--<div class="chart-wrapper">-->
    <!--<bar-chart/>-->
    <!--</div>-->
    <!--</el-col>-->
    <!--<el-col :span="8">-->
    <!--<div class="chart-wrapper">-->
    <!--<pie-chart/>-->
    <!--</div>-->
    <!--</el-col>-->
    <!--</el-row>-->
  </div>
</template>

<script>
  import PanelGroup from '@/components/home/PanelGroup'
  import LineChart from '@/components/home/LineChart'
  import LineChartPower from '@/components/home/LineChartPower'
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
      LineChartPower,
      PanelGroup,
      LineChart,
      GaugeChart,
      PieChart,
      BarChart
    },
    data () {
      return {
        // tableData: [{name: '空压机1', value: 1}, {name: '空压机2', value: 2}, {name: '空压机3', value: 3}, {
        //   name: '空压机4',
        //   value: 4
        // }, {name: '空压机5', value: 5}, {name: '空压机6', value: 6}, {name: '空压机7', value: 7}, {
        //   name: '空压机8',
        //   value: 8
        // }, {name: '空压机9', value: 9}],
        tableData: [{
          name: '瞬时流量',
          data: [Math.floor(Math.random() * 1000), Math.floor(Math.random() * 1000), Math.floor(Math.random() * 1000),
            Math.floor(Math.random() * 1000), Math.floor(Math.random() * 1000), Math.floor(Math.random() * 1000), Math.floor(Math.random() * 1000),
            Math.floor(Math.random() * 1000), Math.floor(Math.random() * 1000), Math.floor(Math.random() * 1000), Math.floor(Math.random() * 1000), Math.floor(Math.random() * 1000)]
        }, {
          name: '累积流量',
          data: [Math.floor(Math.random() * 1000), Math.floor(Math.random() * 1000), Math.floor(Math.random() * 1000),
            Math.floor(Math.random() * 1000), Math.floor(Math.random() * 1000), Math.floor(Math.random() * 1000), Math.floor(Math.random() * 1000),
            Math.floor(Math.random() * 1000), Math.floor(Math.random() * 1000), Math.floor(Math.random() * 1000), Math.floor(Math.random() * 1000), Math.floor(Math.random() * 1000)]
        }],
        devices: [{
          name: '离心机',
          icon: 'qibeng'
        }, {
          name: '杂用储气罐',
          icon: 'qibeng'
        }, {
          name: '布袋喷吹储气罐',
          icon: 'qibeng'
        }, {
          name: '1#仪用',
          icon: 'qibeng'
        }, {
          name: '2#仪用',
          icon: 'qibeng'
        }, {
          name: '3#仪用',
          icon: 'qibeng'
        }, {
          name: '4#仪用',
          icon: 'qibeng'
        }, {
          name: '5#仪用',
          icon: 'qibeng'
        }, {
          name: '6#仪用',
          icon: 'qibeng'
        }, {
          name: '7#仪用',
          icon: 'qibeng'
        }, {
          name: '8#仪用',
          icon: 'qibeng'
        }, {
          name: '9#仪用',
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
