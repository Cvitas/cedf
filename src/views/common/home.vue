<template>
  <div class="dashboard-editor-container">
    <panel-group />
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <el-col :span="24">
        <!--<gauge-chart/>-->
        <!--{{deviceName}}-->
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
      tableData: [ ],
      devices: [ ],
      lineChartData: lineChartData.newVisitis,
      deviceName: ''
    }
  },
  mounted(){
    this.handlePipeData(),
      this.intervalRun()
  },
  methods: {

    intervalRun () {
      window.setInterval(() => {
        setTimeout(this.handlePipeData, 0)
      }, 1000 )
    },
    handlePipeData ()  {
      this.$http({
        url: this.$http.adornUrl(`/collect/home/pipelist`),
        method: 'get'
      }).then(({data}) => {
        if (data && data.code === 0) {

          this.tableData = [];
          this.tableData = [];

          var mapss = {};
          mapss['name'] = '瞬时流量';
          mapss['data'] = data.data.ssll;

          var maplj = {};
          maplj['name'] = '累积流量';
          maplj['data'] = data.data.ljll;
          this.tableData.push(maplj);
          this.tableData.push(mapss);
          this.devices = data.data.devices;
        }
      })
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
