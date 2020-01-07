<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="8" :lg="8" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData(1)">
        <div class="card-panel-icon-wrapper icon-people">
          <icon-svg :name="icon"  :class="(this.devInfo != null && this.devInfo.devStatus1 == 1)? 'card-panel-green':'card-panel-icon'"/>
        </div>
        <p class="card-panel-title">{{devInfo.devName1}}</p>
        <p class="card-panel-temp">电流：<span>{{devInfo.devPower1}} A</span><br/>干燥机露点：<span>{{devInfo.devLd1}} ℃</span></p>
        <div class="card-panel-description">
          <span>出口压力：{{devInfo.devPress1}} Bar</span>
          <!--<count-to :start-val="0" :end-val="55" :suffix="' Bar'" :duration="2600" class="card-panel-num"/>-->
        </div>

      </div>
    </el-col>
    <el-col :xs="12" :sm="8" :lg="8" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData(2)">
        <div class="card-panel-icon-wrapper icon-people">
          <icon-svg :name="icon"  :class="this.devInfo.devStatus2 == 1? 'card-panel-green':'card-panel-icon'"/>
        </div>
        <p class="card-panel-title">{{devInfo.devName2}}</p>
        <p class="card-panel-temp">主机温度：<span>{{devInfo.devLd2}} ℃</span><br/>电流：<span>{{devInfo.devPower2}} A</span></p>
        <div class="card-panel-description">
          <span>出口压力：{{devInfo.devPress2}} Bar</span>
          <!--<count-to :start-val="0" :end-val="55" :suffix="' Bar'" :duration="2600" class="card-panel-num"/>-->
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="8" :lg="8" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData(3)">
        <div class="card-panel-icon-wrapper icon-people">
          <icon-svg :name="icon"  :class="this.devInfo.devStatus3 == 1? 'card-panel-green':'card-panel-icon'"/>
        </div>
        <p class="card-panel-title">{{devInfo.devName3}}</p>
        <p class="card-panel-temp">主机温度：<span>{{devInfo.devLd3}} ℃</span><br/>电流：<span>{{devInfo.devPower3}} A</span></p>
        <div class="card-panel-description">
          <span>出口压力：{{devInfo.devPress3}} Bar</span>
          <!--<count-to :start-val="0" :end-val="55" :suffix="' Bar'" :duration="2600" class="card-panel-num"/>-->
        </div>

      </div>
    </el-col>
    <el-col :xs="12" :sm="8" :lg="8" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData(4)">
        <div class="card-panel-icon-wrapper icon-people">
          <icon-svg :name="icon"  :class="this.devInfo.devStatus4 == 1? 'card-panel-green':'card-panel-icon'"/>
        </div>
        <p class="card-panel-title">{{devInfo.devName4}}</p>
        <p class="card-panel-temp">主机温度：<span>{{devInfo.devLd4}} ℃</span><br/>电流：<span>{{devInfo.devPower4}} A</span></p>
        <div class="card-panel-description">
          <span>出口压力：{{devInfo.devPress4}}  Bar</span>
          <!--<count-to :start-val="0" :end-val="55" :suffix="' Bar'" :duration="2600" class="card-panel-num"/>-->
        </div>

      </div>
    </el-col>
    <el-col :xs="12" :sm="8" :lg="8" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData(5)">
        <div class="card-panel-icon-wrapper icon-people">
          <icon-svg :name="icon"  :class="this.devInfo.devStatus5 == 1? 'card-panel-green':'card-panel-icon'"/>
        </div>
        <p class="card-panel-title">{{devInfo.devName5}}</p>
        <p class="card-panel-temp">主机温度：<span>{{devInfo.devLd5}}  ℃</span><br/>电流：<span>{{devInfo.devPower5}} A </span></p>
        <div class="card-panel-description">
          <span>出口压力：{{devInfo.devPress5}} Bar</span>
          <!--<count-to :start-val="0" :end-val="55" :suffix="' Bar'" :duration="2600" class="card-panel-num"/>-->
        </div>

      </div>
    </el-col>
    <el-col :xs="12" :sm="8" :lg="8" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData(6)">
        <div class="card-panel-icon-wrapper icon-people">
          <icon-svg :name="icon"  :class="this.devInfo.devStatus6 == 1? 'card-panel-green':'card-panel-icon'"/>
        </div>
        <p class="card-panel-title">{{devInfo.devName6}}</p>
        <p class="card-panel-temp">主机温度：<span>{{devInfo.devLd6}}  ℃</span><br/>电流：<span>{{devInfo.devPower6}} A</span></p>
        <div class="card-panel-description">
          <span>出口压力：{{devInfo.devPress6}} Bar</span>
          <!--<count-to :start-val="0" :end-val="55" :suffix="' Bar'" :duration="2600" class="card-panel-num"/>-->
        </div>

      </div>
    </el-col>
    <el-col :xs="12" :sm="8" :lg="8" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData(7)">
        <div class="card-panel-icon-wrapper icon-people">
          <icon-svg :name="icon"  :class="this.devInfo.devStatus7 == 1? 'card-panel-green':'card-panel-icon'"/>
        </div>
        <p class="card-panel-title">{{devInfo.devName7}}</p>
        <p class="card-panel-temp">主机温度：<span>{{devInfo.devLd7}} ℃</span><br/>电流：<span>{{devInfo.devPower7}}  A </span></p>
        <div class="card-panel-description">
          <span>出口压力：{{devInfo.devPress7}} Bar</span>
          <!--<count-to :start-val="0" :end-val="55" :suffix="' Bar'" :duration="2600" class="card-panel-num"/>-->
        </div>

      </div>
    </el-col>
    <el-col :xs="12" :sm="8" :lg="8" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData(8)">
        <div class="card-panel-icon-wrapper icon-people">
          <icon-svg :name="icon"  :class="this.devInfo.devStatus8 == 1? 'card-panel-green': 'card-panel-icon'"/>
        </div>
        <p class="card-panel-title">{{devInfo.devName8}}</p>
        <p class="card-panel-temp">主机温度：<span >{{devInfo.devLd8}} ℃</span><br/>电流：<span>{{devInfo.devPower8}} A</span></p>
        <div class="card-panel-description">
          <span>出口压力：{{devInfo.devPress8}} Bar</span>
          <!--<count-to :start-val="0" :end-val="55" :suffix="' Bar'" :duration="2600" class="card-panel-num"/>-->
        </div>

      </div>
    </el-col>
    <el-col :xs="12" :sm="8" :lg="8" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData(9)">
        <div class="card-panel-icon-wrapper icon-people">
          <icon-svg :name="icon"  :class="this.devInfo.devStatus9 == 1? 'card-panel-green':'card-panel-icon'"/>
        </div>
        <p class="card-panel-title">{{devInfo.devName9}}</p>
        <p class="card-panel-temp">主机温度：<span>{{devInfo.devLd9}} ℃ </span><br/>电流：<span>{{devInfo.devPower9}} A</span></p>
        <div class="card-panel-description">
          <span>出口压力：{{devInfo.devPress9}} Bar</span>
          <!--<count-to :start-val="0" :end-val="88" :suffix="' Bar'" :duration="2600" class="card-panel-num" style="color: red"/>-->
        </div>
      </div>
    </el-col>
  </el-row>
</template>
<script>
  // import CountTo from 'vue-count-to'
  export default {
    data() {
      return {

        devInfo: {
          devName1: '',
          devPower1: '',
          devLd1: '',
          devPress1: '',
          devStatus1: '',

          devName2: '',
          devPower2: '',
          devLd2: '',
          devPress2: '',
          devStatus2: '',

          devName3: '',
          devPower3: '',
          devLd3: '',
          devPress3: '',
          devStatus3: '',

          devName4: '',
          devPower4: '',
          devLd4: '',
          devPress4: '',
          devStatus4: '',

          devName5: '',
          devPower5: '',
          devLd5: '',
          devPress5: '',
          devStatus5: '',

          devName6: '',
          devPower6: '',
          devLd6: '',
          devPress6: '',
          devStatus6: '',

          devName7: '',
          devPower7: '',
          devLd7: '',
          devPress7: '',
          devStatus7: '',

          devName8: '',
          devPower8: '',
          devLd8: '',
          devPress8: '',
          devStatus8: '',

          devName9: '',
          devPower9: '',
          devLd9: '',
          devPress9: '',
          devStatus9: ''
        },
        icon: 'qibeng'
      }
    },
    components: {
      // CountTo
    },
    mounted(){
      this.handleSetLineChartData(),
      this.intervalRun()
    },
    methods: {

      intervalRun () {
        window.setInterval(() => {
          setTimeout(this.handleSetLineChartData, 0)
        }, 1000 * 60 )
      },
        handleSetLineChartData () {
          this.$http({
            url: this.$http.adornUrl(`/collect/home/list`),
            method: 'get'
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.devInfo = data.data;
            }
          })
        }
   }
  }
</script>

<style lang="scss" scoped>
  .panel-group {
    margin-top: 18px;

    .card-panel-col {
      margin-bottom: 8px;
    }

    .card-panel {
      height: 108px;
      /*cursor: pointer;*/
      font-size: 12px;
      position: relative;
      overflow: hidden;
      color: #666;
      background: #fff;
      box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
      border-color: rgba(0, 0, 0, .05);

      /*&:hover {*/
        /*.card-panel-icon-wrapper {*/
          /*color: #fff;*/
        /*}*/

        /*.icon-people {*/
          /*background: #40c9c6;*/
        /*}*/

        /*.icon-message {*/
          /*background: #36a3f7;*/
        /*}*/

        /*.icon-money {*/
          /*background: #f4516c;*/
        /*}*/

        /*.icon-shopping {*/
          /*background: #34bfa3*/
        /*}*/
      /*}*/

      .icon-people {
        color: #40c9c6;
      }

      .icon-message {
        color: #36a3f7;
      }

      .icon-money {
        color: #f4516c;
      }

      .icon-shopping {
        color: #34bfa3
      }

      .card-panel-icon-wrapper {
        float: left;
        margin: 14px 0 0 14px;
        padding: 16px;
        transition: all 0.38s ease-out;
        border-radius: 6px;
      }

      .card-panel-icon {
        float: left;
        font-size: 48px;
      }
      .card-panel-title {
        position: absolute;
        left: 100px;
        font-size: 18px;
        top: 10px;
        padding: 0;
        margin: 0;
      }
      .card-panel-temp {
        position: absolute;
        left: 100px;
        font-size: 13px;
        top: 50px;
        > span {
          color: green;
        }
      }

      .card-panel-description {
        float: left;
        font-weight: bold;
        margin-top: 40px;
        margin-left: 5px;
        .card-panel-text {
          line-height: 18px;
          color: rgba(0, 0, 0, 0.45);
          font-size: 16px;
          margin-bottom: 12px;
        }

        .card-panel-num {
          font-size: 20px;
        }
      }
    }
    .card-panel-green {
      cursor: pointer;
      font-size: 48px;
      position: relative;
      overflow: hidden;
      color: #666;
      background: #40c9c6;
      box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
      border-color: rgba(0, 0, 0, .05);
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-people {
        background: #40c9c6;
      }
      .icon-message {
        background: #36a3f7;
      }
      .icon-money {
        background: #f4516c;
      }
      .icon-shopping {
        background: #34bfa3
      }
      .card-panel-icon {
        float: left;
        font-size: 48px;
      }
      .card-panel-title {
        position: absolute;
        left: 100px;
        font-size: 18px;
        top: 10px;
        padding: 0;
        margin: 0;
      }
      .card-panel-temp {
        position: absolute;
        left: 100px;
        font-size: 13px;
        top:508px;
        > span {
          color: green;
        }
      }

      .card-panel-description {
        float: left;
        font-weight: bold;
        margin-top: 40px;
        margin-left: 5px;
        .card-panel-text {
          line-height: 18px;
          color: rgba(0, 0, 0, 0.45);
          font-size: 16px;
          margin-bottom: 12px;
        }
        .card-panel-num {
          font-size: 20px;
        }
      }
    }
  }

  @media (max-width: 550px) {
    .card-panel-description {
      display: none;
    }

    .card-panel-icon-wrapper {
      float: none !important;
      width: 100%;
      height: 100%;
      margin: 0 !important;
      .icon-svg {
        display: block;
        margin: 14px auto !important;
        float: none !important;
      }
    }
  }
</style>
