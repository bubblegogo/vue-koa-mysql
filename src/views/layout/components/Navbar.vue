<template>
  <el-menu class="navbar" mode="horizontal">

    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>

    <breadcrumb></breadcrumb>

    <!-- 用户头像 -->
    <div class="user-avator"><img src="static/img/img.jpg"></div>

    <el-dropdown class="avatar-container" trigger="click">

      <span class="el-dropdown-link">
          杜赛赛 <i class="el-icon-caret-bottom"></i>
      </span>

      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>
            {{ $t('nav.home') }}
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span @click="logout" style="display:block;">LogOut</span>
        </el-dropdown-item>
      </el-dropdown-menu>

    </el-dropdown>

    <el-dropdown class="language-container" trigger="click">
      <span class="el-dropdown-link">
        {{ $t('nav.lang') }}<i class="el-icon-caret-bottom"></i>
      </span>
      <el-dropdown-menu class="language-container" slot="dropdown">
        <el-dropdown-item  @click.native="changeLanguage('zh')" :disabled="$i18n.locale == 'zh'">{{ $t('nav.zh') }}</el-dropdown-item>
        <el-dropdown-item divided @click.native="changeLanguage('en')" :disabled="$i18n.locale == 'en'">{{ $t('nav.en') }}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      message: 2
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
    changeLanguage(lang) {
      if (lang === 'zh') {
        localStorage.setItem('locale', 'zh')
        this.$i18n.locale = localStorage.getItem('locale')
        this.$message({
          message: '切换为中文',
          type: 'success'
        })
      } else if (lang === 'en') {
        localStorage.setItem('locale', 'en')
        this.$i18n.locale = localStorage.getItem('locale')
        this.$message({
          message: 'Switch to English!',
          type: 'success'
        })
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  display: flex;


  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
   .user-avator{
      position: absolute;
      right: 100px;
    }
    .user-avator img{
        display: inline-block;
        width:36px;
        height:36px;
        border-radius: 50%;
        vertical-align: middle;
    }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
  .language-container{
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 200px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;

      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>

