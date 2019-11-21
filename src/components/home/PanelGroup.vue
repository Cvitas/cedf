<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="8" :lg="8" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData(1)">
        <div class="card-panel-icon-wrapper icon-people">
          <icon-svg :name="icon" class-name="card-panel-icon"/>
        </div>
        <p class="card-panel-title">1#仪用空压机</p>
        <p class="card-panel-temp">电流：<span>10 A</span><br/>干燥剂露点：<span>50℃</span></p>
        <div class="card-panel-description">
          <span>出口压力：</span>
          <count-to :start-val="0" :end-val="55" :suffix="' Bar'" :duration="2600" class="card-panel-num"/>
        </div>

      </div>
    </el-col>
    <el-col :xs="12" :sm="8" :lg="8" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData(2)">
        <div class="card-panel-icon-wrapper icon-people">
          <icon-svg :name="icon" class-name="card-panel-icon"/>
        </div>
        <p class="card-panel-title">2#仪用空压机</p>
        <p class="card-panel-temp">主机温度：<span>60℃</span><br/>电流：<span>10 A</span></p>
        <div class="card-panel-description">
          <span>出口压力：</span>
          <count-to :start-val="0" :end-val="55" :suffix="' Bar'" :duration="2600" class="card-panel-num"/>
        </div>

      </div>
    </el-col>
    <el-col :xs="12" :sm="8" :lg="8" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData(3)">
        <div class="card-panel-icon-wrapper icon-people">
          <icon-svg :name="icon" class-name="card-panel-icon"/>
        </div>
        <p class="card-panel-title">3#仪用空压机</p>
        <p class="card-panel-temp">主机温度：<span>60℃</span><br/>电流：<span>10 A</span></p>
        <div class="card-panel-description">
          <span>出口压力：</span>
          <count-to :start-val="0" :end-val="55" :suffix="' Bar'" :duration="2600" class="card-panel-num"/>
        </div>

      </div>
    </el-col>
    <el-col :xs="12" :sm="8" :lg="8" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData(4)">
        <div class="card-panel-icon-wrapper icon-people">
          <icon-svg :name="icon" class-name="card-panel-icon"/>
        </div>
        <p class="card-panel-title">4#仪用空压机</p>
        <p class="card-panel-temp">主机温度：<span>60℃</span><br/>电流：<span>10 A</span></p>
        <div class="card-panel-description">
          <span>出口压力：</span>
          <count-to :start-val="0" :end-val="55" :suffix="' Bar'" :duration="2600" class="card-panel-num"/>
        </div>

      </div>
    </el-col>
    <el-col :xs="12" :sm="8" :lg="8" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData(5)">
        <div class="card-panel-icon-wrapper icon-people">
          <icon-svg :name="icon" class-name="card-panel-icon"/>
        </div>
        <p class="card-panel-title">1#输灰空压机</p>
        <p class="card-panel-temp">主机温度：<span>60℃</span><br/>电流：<span>10 A</span></p>
        <div class="card-panel-description">
          <span>出口压力：</span>
          <count-to :start-val="0" :end-val="55" :suffix="' Bar'" :duration="2600" class="card-panel-num"/>
        </div>

      </div>
    </el-col>
    <el-col :xs="12" :sm="8" :lg="8" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData(6)">
        <div class="card-panel-icon-wrapper icon-people">
          <icon-svg :name="icon" class-name="card-panel-icon"/>
        </div>
        <p class="card-panel-title">2#输灰空压机</p>
        <p class="card-panel-temp">主机温度：<span>60℃</span><br/>电流：<span>10 A</span></p>
        <div class="card-panel-description">
          <span>出口压力：</span>
          <count-to :start-val="0" :end-val="55" :suffix="' Bar'" :duration="2600" class="card-panel-num"/>
        </div>

      </div>
    </el-col>
    <el-col :xs="12" :sm="8" :lg="8" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData(7)">
        <div class="card-panel-icon-wrapper icon-people">
          <icon-svg :name="icon" class-name="card-panel-icon"/>
        </div>
        <p class="card-panel-title">3#输灰空压机</p>
        <p class="card-panel-temp">主机温度：<span>60℃</span><br/>电流：<span>10 A</span></p>
        <div class="card-panel-description">
          <span>出口压力：</span>
          <count-to :start-val="0" :end-val="55" :suffix="' Bar'" :duration="2600" class="card-panel-num"/>
        </div>

      </div>
    </el-col>
    <el-col :xs="12" :sm="8" :lg="8" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData(8)">
        <div class="card-panel-icon-wrapper icon-people">
          <icon-svg :name="icon" class-name="card-panel-icon"/>
        </div>
        <p class="card-panel-title">4#输灰空压机 <span style="color: red">(异常)</span></p>
        <p class="card-panel-temp">主机温度：<span style="color:red;">88℃</span><br/>电流：<span>10 A</span></p>
        <div class="card-panel-description">
          <span>出口压力：</span>
          <count-to :start-val="0" :end-val="55" :suffix="' Bar'" :duration="2600" class="card-panel-num"/>
        </div>

      </div>
    </el-col>
    <el-col :xs="12" :sm="8" :lg="8" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData(9)">
        <div class="card-panel-icon-wrapper icon-people">
          <icon-svg :name="icon" class-name="card-panel-icon"/>
        </div>
        <p class="card-panel-title">5#输灰空压机 <span style="color: red">(异常)</span></p>
        <p class="card-panel-temp">主机温度：<span>60℃</span><br/>电流：<span>10 A</span></p>
        <div class="card-panel-description">
          <span>出口压力：</span>
          <count-to :start-val="0" :end-val="88" :suffix="' Bar'" :duration="2600" class="card-panel-num" style="color: red"/>
        </div>

      </div>
    </el-col>
  </el-row>
</template>

<script>
  import CountTo from 'vue-count-to'

  export default {
    data () {
      return {
        icon: 'qibeng'
      }
    },
    components: {
      CountTo
    },
    methods: {
      handleSetLineChartData (type) {
        this.$emit('handleSetLineChartData', type)
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
      cursor: pointer;
      font-size: 12px;
      position: relative;
      overflow: hidden;
      color: #666;
      background: #fff;
      box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
      border-color: rgba(0, 0, 0, .05);

      &:hover {
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
      }

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
        top: 0px;
      }
      .card-panel-temp {
        position: absolute;
        left: 100px;
        font-size: 13px;
        top: 60px;
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
