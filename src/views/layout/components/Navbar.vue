<template>
  <el-menu class="navbar" mode="horizontal">

    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <breadcrumb style="width: 100%;"></breadcrumb>

    <div style="width: 100%">
      <ul  class="nav-ul" style="list-style: none;">
        <li>
          <el-dropdown :class="['language-container',isActive?'active':'']" @visible-change="lanVisibleChange"  trigger="click" >
            <span class="el-dropdown-link">
              {{this.$i18n.locale == "zh" ? "中文":"英文"}} <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item  @click.native="changeLanguage('zh')" :disabled="$i18n.locale == 'zh'">{{ $t('nav.zh') }}</el-dropdown-item>
              <el-dropdown-item divided @click.native="changeLanguage('en')" :disabled="$i18n.locale == 'en'">{{ $t('nav.en') }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>

        <li>
        <!-- 用户头像 -->
          <div class="user-avator"><img src="static/img/img.jpg"></div>
          <el-dropdown :class="['avatar-container',avaActive?'active':'']" @visible-change="avaVisibleChange"  trigger="click">
            <span class="el-dropdown-link">
              {{this.$store.state.user.name}} <i class="el-icon-arrow-down el-icon--right"></i>
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
        </li>
      </ul>
    </div>
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
      this.isActive = v;
    },
    avaVisibleChange(v) {
      this.avaActive = v;
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

  .user-avator{
    position: relative;
    float: left;
    margin-right: 10px;
  }
  .user-avator img{
      display: inline-block;
      width:36px;
      height:36px;
      border-radius: 50%;
      vertical-align: middle;
    }
  .nav-ul {
    float: right;
    height: 100%;
    background: transparent;
    padding: 0;
    margin: 0;
    li {
      margin: 0 10px;
      float: left;
      list-style: none;
      position: relative;
      cursor: pointer;
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

