<template>
  <div class="app-container">

    <el-form>
      <el-form-item label="用户名称" :label-width="formLabelWidth">
        <el-input v-model="userdetail.user_name" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="用户邮件" :label-width="formLabelWidth">
        <el-input v-model="userdetail.user_email" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="用户密码" :label-width="formLabelWidth">
        <el-input v-model="userdetail.pass_word" auto-complete="off" :disabled="userdetail.user_email && true"></el-input>
      </el-form-item>
      <el-form-item label="用户头像" :label-width="formLabelWidth">
        <el-input v-model="userdetail.user_pic" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="创建时间" :label-width="formLabelWidth">
          <el-date-picker type="date" placeholder="选择日期" v-model="userdetail.create_time" style="width: 100%;"></el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存修改</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    props: ['id'],
    created: function() {
      console.log(this.id)
      if (this.id === 0) {
        this.$store.commit('SET_USER_DETAIL', {})
      } else {
        this.FeachUserDetail(this.id)
      }
    },
    data() {
      return {
        formLabelWidth: '110px'
      }
    },
    computed: {
      ...mapGetters(['userdetail'])
    },
    methods: {
      ...mapActions(['FeachUserDetail']),
      onSubmit() {
        console.log('submit!')
      }
    }
  }
</script>
