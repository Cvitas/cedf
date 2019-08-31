<template>
  <div class="mod-role">
    <el-form :inline="true" @keyup.enter.native="getDataList()">
      <el-form-item label="选择时间">
        <el-row>
          <el-button :type="dateType ==1?'success':'primary'" @click="changeDateType(1)">当天</el-button>
          <el-button :type="dateType ==2?'success':'primary'" @click="changeDateType(2)">本周</el-button>
          <el-button :type="dateType ==3?'success':'primary'" @click="changeDateType(3)">本月</el-button>
          <el-button :type="dateType ==4?'success':'primary'" @click="changeDateType(4)">本年</el-button>
        </el-row>
      </el-form-item>

      <el-form-item label="">
        <el-date-picker
          v-model="value"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button @click="getDataList()" type="warning">查询</el-button>
        <el-button @click="getDataList()" type="warning">导出报表</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      style="width: 100%;">
      <el-table-column v-if="dataList.length"
                       v-for="(item,index) in dataList.length?dataList[0].data:[]"
                       :key="index"
                       header-align="center"
                       align="center"
                       :label="item.name+'('+unitName+')'">
        <template slot-scope="scope">{{scope.row.data[index].data}}</template>
      </el-table-column>
      <el-table-column v-if="dataList.length"
                       prop="date"
                       header-align="center"
                       align="center"
                       width="150"
                       label="记录时间">
      </el-table-column>
    </el-table>

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
  import moment from 'moment'

  export default {
    name: 'daypowerChart1',
    data () {
      return {
        value: [],
        unitName: '',
        dateType: 3,
        dataList: [],
        secondVisible: false,
        dataListLoading: false,
      }
    },
    components: {},
    activated () {
      this.getDataList()
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
        this.dateType = index
        let date = new Date()
        switch (this.dateType) {
          case 1:
            this.value = [new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0), new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59)]
            break
          case 2:
            this.value = [new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 1, 0, 0), new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 7, 23, 59, 59)]
            break
          case 3:
            this.value = [new Date(date.getFullYear(), date.getMonth(), 1, 0, 0), new Date(date.getFullYear(), date.getMonth(), this.getCountDays(), 23, 59, 59)]
            break
          case 4:
            this.value = [new Date(date.getFullYear(), 0, 1, 0, 0), new Date(date.getFullYear(), 11, 31, 23, 59, 59)]
            break
        }
      },
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        const startDate = moment(this.value[0]).format('YYYY-MM-DD')
        const endDate = moment(this.value[1]).format('YYYY-MM-DD')
        this.$http({
          url: this.$http.adornUrl(`/collect/collecstatis/comparisonmutichart/airData/4/${startDate}/${endDate}`),
          method: 'get'
        }).then(({data}) => {
          this.dataListLoading = false
          if (data && data.code === 0) {
            this.dataList = data.data
            this.unitName = data.unitName
          } else {
            this.dataList = []
          }
        }).catch(() => {
          this.dataListLoading = false
        })
      },
      downloadTemplateHandle () {
        var url = this.$http.adornUrl(`/project/base/downloadTemplate?token=${this.$cookie.get('token')}`)
        window.open(url)
      }
    },
    mounted () {
      let date = new Date()
      this.value = [new Date(date.getFullYear(), date.getMonth(), 1, 0, 0), new Date(date.getFullYear(), date.getMonth(), this.getCountDays(), 23, 59, 59)]
    }
  }
</script>
