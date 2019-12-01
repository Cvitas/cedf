<template>
  <div class="mod-role">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item label="设备名称">
        <el-select v-model="dataForm.devicesIds" multiple placeholder="请选择设备">
          <el-option
            v-for="item in devices"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="选择时间">
        <el-row>
          <el-button :type="dataForm.dateType ==1?'success':'primary'" @click="changeDateType(1)">当天</el-button>
          <el-button :type="dataForm.dateType ==2?'success':'primary'" @click="changeDateType(2)">本周</el-button>
          <el-button :type="dataForm.dateType ==3?'success':'primary'" @click="changeDateType(3)">本月</el-button>
          <el-button :type="dataForm.dateType ==4?'success':'primary'" @click="changeDateType(4)">本年</el-button>
        </el-row>
      </el-form-item>

      <el-form-item label="">
        <el-date-picker
          v-model="dataForm.value"
          type="datetimerange"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button @click="search()" type="warning">查询</el-button>
        <!--<el-button @click="getDataList()" type="warning">导出报表</el-button>-->
      </el-form-item>
    </el-form>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="图表展示" name="first">
        <!--         <daypowerChart height='100%' width='100%'></daypowerChart> -->
        <monthlyairChart ref="chart" height='calc(100% - 100px)' width='100%' :data="chartData"
                         :monthlyair="'powerChart'"></monthlyairChart>

      </el-tab-pane>
      <el-tab-pane label="列表展示" name="second">
        <el-table
          :data="dataList"
          border
          show-summary
          :summary-method="getSummaries"
          v-loading="dataListLoading"
          style="width: 100%;">
          <el-table-column
            prop="id"
            header-align="center"
            align="center"
            width="80"
            visible="false"
            v-if="false"
            label="ID">
          </el-table-column>
          <el-table-column
            prop="equipName"
            header-align="center"
            align="center"
            label="设备名称">
          </el-table-column>
          <el-table-column
            prop="equipTime"
            header-align="center"
            align="center"
            label="时间">
          </el-table-column>
          <el-table-column
            prop="collectName"
            header-align="center"
            show-overflow-tooltip
            align="center"
            label="用电量(kwh)">
          </el-table-column>
          <el-table-column
            prop="airName"
            header-align="center"
            show-overflow-tooltip
            align="center"
            label="排气量(m³)">
          </el-table-column>
          <el-table-column
            prop="powPrice"
            header-align="center"
            show-overflow-tooltip
            align="center"
            label="电价(元)">
          </el-table-column>
          <el-table-column
            fixed="right"
            header-align="center"
            align="center"
            prop="airRate"
            width="150"
            label="成本(元/m³)">
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="sizeChangeHandle"
          @current-change="currentChangeHandle"
          :current-page="pageIndex"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          :total="totalPage"
          layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<style>
  .el-row {
    margin-bottom: 20px;

  &
  :last-child {
    margin-bottom: 0;
  }

  }
  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    /** background: #99a9bf; */
  }

  .bg-purple {
    /** background: #d3dce6; */
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  .chart-container {
    position: relative;
    padding: 20px;
    width: 100%;
    height: 300px;
  }
</style>

<script>
  import monthlyairChart from '@/components/Charts/monthlyairtout'
  import moment from 'moment'

  export default {
    name: 'powerreport',
    data () {
      return {
        activeName: 'first',
        devices: [],
        dataForm: {
          devicesIds: '',
          dateType: 1,
          value: []
        },
        chartData: {
          data: [],
          xais: []
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 20,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: []
      }
    },
    components: {
      monthlyairChart
    },
    activated () {
    },
    mounted () {
      this.changeDateType(1)
      this.getDevices()
    },
    methods: {
      getCountDays () {
        var curDate = new Date()
        /* 获取当前月份 */
        var curMonth = curDate.getMonth()
        curDate.setMonth(curMonth + 1)
        /* 将日期设置为0, 这里为什么要这样设置, 我不知道原因, 这是从网上学来的 */
        curDate.setDate(0)
        /* 返回当月的天数 */
        return curDate.getDate()
      },
      changeDateType (index) {
        this.dataForm.dateType = index
        let date = new Date()
        switch (this.dataForm.dateType) {
          case 1:
            this.dataForm.value = [new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0), new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59)]
            break
          case 2:
            this.dataForm.value = [new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 1, 0, 0), new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 7, 23, 59, 59)]
            break
          case 3:
            this.dataForm.value = [new Date(date.getFullYear(), date.getMonth(), 1, 0, 0), new Date(date.getFullYear(), date.getMonth(), this.getCountDays(), 23, 59, 59)]
            break
          case 4:
            this.dataForm.value = [new Date(date.getFullYear(), 0, 1, 0, 0), new Date(date.getFullYear(), 11, 31, 23, 59, 59)]
            break
        }
      },
      getDevices () {
        this.$http({
          url: this.$http.adornUrl('/collect/equipment/list'),
          method: 'get',
          params: this.$http.adornParams({
            limit: 1000,
            order: 'DESC'
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.devices = data.page.list
          } else {
            this.$message('还未添加设备，请先添加设备')
          }
        })
      },
      handleClick (tab, event) {
        console.log(tab, event)
        if (tab.name === 'first') {
          this.activeName = 'first'
        } else {
          this.activeName = 'second'
          this.getTableData()
        }
      },
      getSummaries (param) {
        const {columns, data} = param
        const sums = []
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '平均值 (kwh/m³)'
            return
          }
          const values = data.map(item => Number(item[column.property]))
          if (!values.every(value => isNaN(value))) {
            let countValue = 0
            sums[index] = values.reduce((prev, curr) => {
              let value = Number(curr)
              countValue = countValue + 1
              if (!isNaN(value)) {
                return prev + curr
              } else {
                return prev
              }
            }, 0)
            sums[index] = sums[index] / countValue
          } else {
            sums[index] = ''
          }
          if (index === 5) {
            sums[5] = sums[2] / sums[3] * sums[4]
          }
        })
        return sums
      },
      search () {
        this.activeName === 'first' ? this.getDataList() : this.getTableData()
      },
      // 获取数据列表
      getDataList () {
        if (!this.dataForm.devicesIds.length) {
          this.$message('请选择设备')
          return false
        }
        this.dataListLoading = true
        const startDate = moment(this.dataForm.value[0]).format('YYYY-MM-DD')
        const endDate = moment(this.dataForm.value[1]).format('YYYY-MM-DD')
        this.$http({
          url: this.$http.adornUrl(`/collect/collecstatis/comparisonmutichart/airCost/${this.dataForm.dateType}/${this.dataForm.devicesIds.toString()}/${startDate}/${endDate}`),
          method: 'get',
          params: this.$http.adornParams({})
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.chartData = {}
            this.chartData.xais = data.xais
            this.chartData.data = data.data
            this.chartData.unitName = data.unitName
            this.$nextTick(() => {
              this.$refs['chart'].initChart()
            })
          } else {
          }
        })
      },
      // 获取数据列表
      getTableData () {
        if (!this.dataForm.devicesIds.length) {
          this.$message('请选择设备')
          return false
        }
        this.dataListLoading = true
        const startDate = moment(this.dataForm.value[0]).format('YYYY-MM-DD')
        const endDate = moment(this.dataForm.value[1]).format('YYYY-MM-DD')
        this.$http({
          url: this.$http.adornUrl(`/collect/comparisonmutichart/airCostexcel/${this.dataForm.dateType}/${this.dataForm.devicesIds.toString()}/${startDate}/${endDate}`),
          method: 'get',
          params: this.$http.adornParams({})
        }).then(({data}) => {
          if (data && data.code === 0) {
          } else {
          }
          this.dataListLoading = false
        })
      },
      // 每页数
      sizeChangeHandle (val) {
        this.pageSize = val
        this.pageIndex = 1
        this.getDataList()
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.getDataList()
      }
    }
  }
</script>
