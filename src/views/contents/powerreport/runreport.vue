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
          value-format="yyyy-MM-dd"
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
      @selection-change="selectionChangeHandle"
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
        prop="lxj"
        header-align="center"
        align="center"
        label="离心机(kW·h)">
      </el-table-column>
      <el-table-column
        prop="luogan_1"
        header-align="center"
        align="center"
        label="1#螺杆机(kW·h)">
      </el-table-column>
      <el-table-column
        prop="luogan_2"
        header-align="center"
        align="center"
        label="2#螺杆机(kW·h)">
      </el-table-column>
      <el-table-column
        prop="luogan_3"
        header-align="center"
        align="center"
        label="3#螺杆机(kW·h)">
      </el-table-column>
      <el-table-column
        prop="luogan_4"
        header-align="center"
        align="center"
        label="4#螺杆机(kW·h)">
      </el-table-column>
      <el-table-column
        prop="luogan_5"
        header-align="center"
        align="center"
        label="5#螺杆机(kW·h)">
      </el-table-column>
      <el-table-column
        prop="kongya_2"
        header-align="center"
        align="center"
        label="2#仪表气空压机(kW·h)">
      </el-table-column>
      <el-table-column
        prop="kongya_3"
        header-align="center"
        align="center"
        label="3#仪表气空压机(kW·h)">
      </el-table-column>
      <el-table-column
        prop="kongya_4"
        header-align="center"
        align="center"
        label="4#仪表气空压机(kW·h)">
      </el-table-column>
      <el-table-column
        prop="recordTime"
        header-align="center"
        align="center"
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
  import { validateDate } from '@/utils/validate'
  import { getFinaceAmount } from '@/utils'

  export default {
    name: 'daypowerChart1',
    data() {
      return {
        value: [new Date(2018, 11, 1, 0, 0), new Date(2018, 11, 31, 23, 59)],
        dateType: 3,
        dataList: [],
        pageIndex: 1,
        pageSize: 20,
        totalPage: 0,
        firstVisible: true,
        secondVisible: false,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false,
        uploadVisible: false
      }
    },
    components: {},
    activated() {
      this.getDataList()
    },
    methods: {
      getCountDays() {
        var curDate = new Date()
        /* 获取当前月份 */
        var curMonth = curDate.getMonth()
        curDate.setMonth(curMonth + 1)
        /* 将日期设置为0, 这里为什么要这样设置, 我不知道原因, 这是从网上学来的 */
        curDate.setDate(0)
        /* 返回当月的天数 */
        return curDate.getDate()
      },
      changeDateType(index) {
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

        this.initTypeSelect()
      },
      initTypeSelect() {
        this.$http({
          url: this.$http.adornUrl('/project/base/typeSelect'),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({ data }) => {
          this.projectTypes = data && data.code === 0 ? data.list : []
        })
      },
      // 获取数据列表
      getDataList() {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl(`/collect/collecstatis/comparisonmutichart/airData/${this.value[0]}/${this.value[1]}`),
          method: 'get'
        }).then(({ data }) => {
          this.dataListLoading = false
          if (data && data.code === 0) {
            this.dataList = data.page.list
            this.totalPage = data.page.totalCount
          } else {
            this.dataList = []
            this.totalPage = 0
          }
          //
          // this.dataList = [{
          //   id: 1,
          //   lxj: '21',
          //   luogan_1: '20',
          //   luogan_2: '10',
          //   luogan_3: '15',
          //   luogan_4: '13.5',
          //   luogan_5: '12',
          //   kongya_2: '11',
          //   kongya_3: '9',
          //   kongya_4: '10',
          //   recordTime: '2019-3-1 08:12:20'
          // },
          //   {
          //     id: 1,
          //     lxj: '22',
          //     luogan_1: '25',
          //     luogan_2: '12',
          //     luogan_3: '16',
          //     luogan_4: '15',
          //     luogan_5: '13',
          //     kongya_2: '13',
          //     kongya_3: '12',
          //     kongya_4: '11',
          //     recordTime: '2019-3-1 08:12:50'
          //   },
          //   {
          //     id: 1,
          //     lxj: '23',
          //     luogan_1: '27',
          //     luogan_2: '14',
          //     luogan_3: '17',
          //     luogan_4: '17',
          //     luogan_5: '15',
          //     kongya_2: '15',
          //     kongya_3: '15',
          //     kongya_4: '13',
          //     recordTime: '2019-3-1 08:13:20'
          //   },
          //   {
          //     id: 1,
          //     lxj: '25',
          //     luogan_1: '30',
          //     luogan_2: '16',
          //     luogan_3: '19',
          //     luogan_4: '19',
          //     luogan_5: '17',
          //     kongya_2: '17',
          //     kongya_3: '17',
          //     kongya_4: '15',
          //     recordTime: '2019-3-1 08:13:50'
          //
          //   }];
        }).catch(() => {
          this.dataListLoading = false
        })
      },
      downloadTemplateHandle() {
        var url = this.$http.adornUrl(`/project/base/downloadTemplate?token=${this.$cookie.get('token')}`);
        window.open(url)
      }
    },
    mounted() {
      let date = new Date()
      this.value = [new Date(date.getFullYear(), date.getMonth(), 1, 0, 0), new Date(date.getFullYear(), date.getMonth(), this.getCountDays(), 23, 59, 59)]
      this.initTypeSelect()
    }
  }
</script>
