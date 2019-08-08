<template>
    <el-dialog title="收货地址" :visible.sync="data.formVisible" :before-close="handleClose" >
      <el-form  :model="data.form" >
        <el-form-item label="用户名称" :label-width="formLabelWidth">
          <el-input v-model="data.form.user_name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户邮件" :label-width="formLabelWidth">
          <el-input v-model="data.form.user_email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" :label-width="formLabelWidth">
          <el-input v-model="data.form.pass_word" auto-complete="off" :disabled="data.form.user_email && true"></el-input>
        </el-form-item>
        <el-form-item label="用户头像" :label-width="formLabelWidth">
          <el-input v-model="data.form.user_pic" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="data.formVisible = false">取 消</el-button>
        <el-button type="primary" @click="data.formVisible = false">确 定</el-button>
      </div>
    </el-dialog>
</template>

<script>
  export default {
    name: 'ss-form-input',
    props: {
      keyValue: {
        type: Object
      }
    },
    data() {
      return {
        data: {
          formVisible: false,
          form: {
            user_name: '',
            user_email: '',
            pass_word: '',
            user_pic: ''
          }
        },
        formLabelWidth: '110px'
      }
    },
    mounted() { this.data = this.keyValue },
    watch: {
      keyValue(val) {
        if (val !== {} || Object.keys(val).length) {
          this.data = val
        }
      },
      deep: true,
      immediate: true
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            this.data.formVisible = false
            done()
          })
          .catch(_ => {})
      }
    }
  }
</script>
