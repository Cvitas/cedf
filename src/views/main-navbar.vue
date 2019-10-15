<template>
  <nav class="site-navbar" :class="'site-navbar--' + navbarLayoutType">
    <div class="site-navbar__header">
      <h1 class="site-navbar__brand" @click="$router.push({ name: 'home' })">
          <a class="site-navbar__brand-lg" href="javascript:;">
            <img style="width: 45px;height: 45px;float: left;margin-left: 15px;" src="~@/assets/img/logo_bg.png" />
            <span class="logo-en">BOYUENERGY</span>
            <span class="logo-ch">上海博御节能环保</span>
          </a>
        <a class="site-navbar__brand-mini" href="javascript:;"> <img src="~@/assets/img/logo.png" /></a>
      </h1>
    </div>
    <div class="site-navbar__body clearfix">
      <el-menu
        class="site-navbar__menu"
        mode="horizontal">
        <el-menu-item class="site-navbar__switch" index="0" @click="sidebarFold = !sidebarFold" >
          <icon-svg name="zhedie"></icon-svg>
        </el-menu-item>
      </el-menu>
      <el-menu
        class="site-navbar__menu site-navbar__menu--right"
        mode="horizontal">
        <!--<el-menu-item index="1" @click="$router.push({ name: 'theme' })">-->
          <!--<template slot="title">-->
            <!--<el-badge value="设置">-->
              <!--<icon-svg name="shezhi" class="el-icon-setting"></icon-svg>-->
            <!--</el-badge>-->
          <!--</template>-->
        <!--</el-menu-item>-->
        <el-menu-item class="site-navbar__switch" index="3">
          值班员: {{ userName }}
        </el-menu-item>
        <el-menu-item class="site-navbar__switch" index="4" @click.native="logoutHandle()">
          <icon-svg name="tuichu"></icon-svg>
        </el-menu-item>
      </el-menu>
      <p style="font-size: 16px;color: #ffffff;text-align: center;">中电神头发电有限公司空压机站节能技术改进与应用</p>
    </div>
    <!-- 弹窗, 修改密码 -->
    <update-password v-if="updatePassowrdVisible" ref="updatePassowrd"></update-password>
  </nav>
</template>

<style lang="scss" scoped>
  .icon-svg {
    width: 1em;
    height: 1em;
  }
  .site-navbar{
    background:#4B90BF;
    background: linear-gradient(to top, #4B90BF 0%, #1e6abf 60%, #1e6abf 50%, #4B90BF 100%);
  }
  .el-menu--horizontal>.el-menu-item:not(.is-disabled):hover, .el-menu--horizontal>.el-submenu .el-submenu__title:hover{
    background:#4B90BF;
  }
</style>

<script>
  import UpdatePassword from './main-navbar-update-password'
  export default {
    data () {
      return {
        updatePassowrdVisible: false
      }
    },
    components: {
      UpdatePassword
    },
    computed: {
      navbarLayoutType: {
        get () { return this.$store.state.common.navbarLayoutType }
      },
      sidebarFold: {
        get () { return this.$store.state.common.sidebarFold },
        set (val) { this.$store.commit('common/updateSidebarFold', val) }
      },
      mainTabs: {
        get () { return this.$store.state.common.mainTabs },
        set (val) { this.$store.commit('common/updateMainTabs', val) }
      },
      userName: {
        get () { return this.$store.state.user.name }
      }
    },
    methods: {
      // 修改密码
      updatePasswordHandle () {
        this.updatePassowrdVisible = true
        this.$nextTick(() => {
          this.$refs.updatePassowrd.init()
        })
      },
      // 退出
      logoutHandle () {
        this.$confirm(`确定进行[退出]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/sys/logout'),
            method: 'post',
            data: this.$http.adornData()
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.$cookie.delete('token')
              this.$router.push({ name: 'login' }, () => {
                location.reload() // 刷新页面, 清空整站临时存储数据
              })
            }
          })
        }).catch(() => {})
      }
    }
  }
</script>
<style lang="scss" scoped>
  .logo-ch{
    position: absolute;
    font-size: 12px;
    bottom: -12px;
    left: 65px;
    letter-spacing: 6px;
  }
  .logo-en{
    position: absolute;
    top: -8px;
    left: 65px;
  }
</style>
