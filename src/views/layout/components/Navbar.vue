<template>
  <div class="navbar">

    <div class="left-menu">
      <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
      <breadcrumb></breadcrumb>
    </div>

    <div class="right-menu">

      <div class="right-menu-item">
        <el-dropdown :class="['language-container',isActive?'active':'']" @visible-change="lanVisibleChange"  trigger="click" >
              <span class="el-dropdown-link">
                {{this.$i18n.locale == "zh" ? "中文":"英文"}} <i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>
              </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item  @click.native="changeLanguage('zh')" :disabled="$i18n.locale == 'zh'">{{ $t('nav.zh') }}</el-dropdown-item>
            <el-dropdown-item divided @click.native="changeLanguage('en')" :disabled="$i18n.locale == 'en'">{{ $t('nav.en') }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <div class="right-menu-item">
        <div class="user-avator"><img src="static/img/img.jpg"></div>
        <el-dropdown :class="['avatar-container',avaActive?'active':'']" @visible-change="avaVisibleChange"  trigger="click">
            <span class="el-dropdown-link">
              {{this.$store.state.user.obj.name}} <i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>
            </span>
          <el-dropdown-menu  slot="dropdown">
            <router-link class="inlineBlock" to="/">
              <el-dropdown-item> {{ $t('nav.home') }} </el-dropdown-item>
            </router-link>
            <el-dropdown-item divided>
              <span @click="logout" style="display:block;">LogOut</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

    </div>

  </div>
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
        message: 2,
        isActive: false,
        avaActive: false

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
      },
      lanVisibleChange(v) {
        this.isActive = v
      },
      avaVisibleChange(v) {
        this.avaActive = v
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .navbar {
    height: auto;
    line-height: 50px;
    border-radius: 0px !important;
    overflow: hidden;
    box-shadow: 0 1px 4px rgba(0,21,41,.08);
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .left-menu{
      display: flex;
      flex-wrap: wrap;
      justify-content:flex-start;
      .hamburger-container {
        line-height: 58px;
        height: 50px;
        float: left;
        padding: 0 .8rem;
      }
    }

    .user-avator{
      position: relative;
      float: left;
      margin-right: .8rem;
    }
    .user-avator img{
      display: inline-block;
      width:36px;
      height:36px;
      border-radius: 50%;
      vertical-align: middle;
    }
    .right-menu {
      height: 100%;
      background: transparent;
      padding: 0;
      margin: 0;
      display: flex;
      flex-wrap: wrap;
      .right-menu-item {
        margin: 0 .8rem;
        position: relative;
        cursor: pointer;
        color: #888;

        .active {
          i {
            transform: rotate(180deg) translateY(2px);
          }
        }
        .language-container {
          i {
            transition: .2s;
          }
        }
        .avatar-container {
          i {
            transition: .2s;
          }
        }
      }
    }
  }
</style>
