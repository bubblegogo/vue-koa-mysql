<template>
  <div class="app-container">

    <el-form>

      <el-form-item :label="$t('article.type')" :label-width="formLabelWidth">
        <label v-text ="articledetail.typeid" > </label>
      </el-form-item>
      <el-form-item :label="$t('article.title')" :label-width="formLabelWidth">
        <label v-text ="articledetail.title" > </label>
      </el-form-item>
      <el-form-item :label="$t('article.content')" :label-width="formLabelWidth">
        <label type ="textarea"  v-text="articledetail.content"> </label>
      </el-form-item>

      <el-form-item :label="$t('article.description')" :label-width="formLabelWidth">
        <label  v-text="articledetail.description"></label>
      </el-form-item>

      <el-form-item  :label="$t('article.fileuplod')" :label-width="formLabelWidth">

        <a class="style_link" :href=" item.url" target="_blank"  v-for="item in fileList" > {{ item.name }}</a>

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
      ...mapGetters(['articledetail']),
      fileList() {
        return this.articledetail.filesrc ? JSON.parse(this.articledetail.filesrc) : []
      }
    },
    created: function() {
      this.FeachArticleDetail(this.id)
    },
    methods: {
      ...mapActions(['FeachArticleDetail'])
    }
  }
</script>

<style scoped>
  .style_link{
    text-decoration: underline;
    padding: 0 15px;
    color: green;
    font-weight: 700;
  }

</style>
