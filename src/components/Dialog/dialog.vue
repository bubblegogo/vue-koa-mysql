<template>
    <el-dialog
      :title="data.title"
      :visible.sync="data.dialogVisible"
      width="30%"
      :before-close="handleClose">

      <div v-if="data.html" v-html="data.content"></div>
      <div v-else> <span>{{data.content}}</span></div>

      <span slot="footer" class="dialog-footer">
      <el-button @click="data.dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="data.dialogVisible = false">确 定</el-button>
    </span>
    </el-dialog>
</template>

<script>
  export default {
    name: 'ss-dialog',
    props: {
      keyValue: {
        type: Object
      }
    },
    data() {
      return {
        data: {}
      }
    },
    mounted() { this.data = this.keyValue },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {})
      }
    }
  }
</script>
