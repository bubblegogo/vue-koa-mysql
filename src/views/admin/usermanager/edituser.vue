<template>
  <div class="app-container">

    <el-form>
      <el-form-item :label="$t('user.name')"  :label-width="formLabelWidth">
        <el-input v-model="userdetail.user_name" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item :label="$t('user.email')"  :label-width="formLabelWidth">
        <el-input v-model="userdetail.user_email" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item :label="$t('user.password')"  :label-width="formLabelWidth">
        <el-input v-model="userdetail.pass_word" auto-complete="off" :disabled="userdetail.user_email && true"></el-input>
      </el-form-item>
      <el-form-item :label="$t('user.userpic')"  :label-width="formLabelWidth">
        <el-input v-model="userdetail.user_pic" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item :label="$t('user.createtime')"  :label-width="formLabelWidth">
          <el-date-picker type="date" placeholder="选择日期" v-model="userdetail.create_time" style="width: 100%;"></el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">{{$t('confirm.save')}}</el-button>
        <el-button>{{$t('confirm.cancel')}}</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    props: ['id'],
    data() {
      return {
        formLabelWidth: '110px'
      }
    },
    computed: {
      ...mapGetters(['userdetail'])
    },
    created: function() {
      console.log(this.id)
      if (this.id === 0) {
        this.$store.commit('SET_USER_DETAIL', {})
      } else {
        this.FeachUserDetail(this.id)
      }
    },
    methods: {
      ...mapActions(['FeachUserDetail']),
      onSubmit() {
        console.log('submit!')
      }
    }
  }
</script>
