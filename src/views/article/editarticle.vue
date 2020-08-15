<template>
  <div class="app-container">

    <el-form>
      <el-form-item :label="$t('article.type')" :label-width="formLabelWidth">

        <el-select v-model="articledetail.typeid" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>

      </el-form-item>

      <el-form-item :label="$t('article.title')" :label-width="formLabelWidth">
        <el-input v-model="articledetail.title" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item :label="$t('article.content')" :label-width="formLabelWidth">
        <el-input v-model="articledetail.content"  type ="textarea" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item :label="$t('article.description')" :label-width="formLabelWidth">
        <el-input v-model="articledetail.description"  auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item :label="$t('article.createtime')" :label-width="formLabelWidth">
          <el-date-picker type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="articledetail.create_time" style="width: 100%;"></el-date-picker>
      </el-form-item>

      <el-form-item  :label="$t('article.fileuplod')" :label-width="formLabelWidth">

        <el-upload
          class="upload-demo"
          action="/api/file/upload"
          :on-remove="handleRemove"
          :on-success="handleFileSuccess"
           multiple
          :limit="3"
          :file-list="fileList">
          <el-button size="small" type="primary">点击上传</el-button>
          <span style="margin-left: 10px;" slot="tip" class="el-upload__tip">只能上传jpg/png/txt/doc文件，且不超过2M</span>
        </el-upload>

      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">{{$t('confirm.save')}}</el-button>
        <el-button @click="goBack" > {{$t('confirm.cancel')}} </el-button>
      </el-form-item>
    </el-form>
  </div>

</template>
<script>
  import { article_type } from '@/utils/constant'
  import { mapGetters, mapActions } from 'vuex'
  export default {
    props: ['id'],

    data() {
      return {
        formLabelWidth: '110px',
        options: article_type()
      }
    },
    computed: {
      ...mapGetters(['articledetail']),
      fileList() {
        return this.articledetail.filesrc ? JSON.parse(this.articledetail.filesrc) : []
      }
    },
    created: function() {
      if (this.id === 0) {
        this.$store.commit('SET_ARTICLE_DETAIL', {})
      } else {
        this.FeachArticleDetail(this.id)
      }
    },
    methods: {
      ...mapActions(['FeachArticleDetail', 'SaveOrEditArticel']),
      onSubmit() {
        const param = {
          'user_id': this.$store.state.user.obj.id,
          ...this.articledetail
        }
        // if id == 0 add  else edit  表示新增文档 否则就是编辑文档
        this.SaveOrEditArticel(param)
        this.goBack()
      },
      goBack() {
        this.$router.push('/article/list')
      },
      handleRemove(file, fileList) {
        this.articledetail.filesrc = JSON.stringify(fileList.map(item => { return { 'name': item.name, 'url': item.url } }))
      },
      handleFileSuccess(response, file, fileList) {
        this.articledetail.filesrc = JSON.stringify(fileList.map(item => { return { 'name': item.name, 'url': item.url } }))
      }
    }
  }
</script>
