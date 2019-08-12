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
        <el-input v-model="articledetail.content" type ="textarea" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item :label="$t('article.description')" :label-width="formLabelWidth">
        <el-input v-model="articledetail.description"  auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item :label="$t('article.createtime')" :label-width="formLabelWidth">
          <el-date-picker type="date" placeholder="选择日期" v-model="articledetail.create_time" style="width: 100%;"></el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">{{$t('confirm.save')}}</el-button>
        <el-button>{{$t('confirm.cancel')}}</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>
<script>
  import { article_type } from '@/utils/constant'
  import { mapGetters, mapActions } from 'vuex'
  export default {
    props: ['id'],
    created: function() {
      if (this.id === 0) {
        this.$store.commit('SET_ARTICLE_DETAIL', {})
      } else {
        this.FeachArticleDetail(this.id)
      }
    },
    data() {
      return {
        formLabelWidth: '110px',
        options: article_type()
      }
    },
    computed: {
      ...mapGetters(['articledetail'])
    },
    methods: {
      ...mapActions(['FeachArticleDetail']),
      onSubmit() {
        console.log('submit!')
      }
    }
  }
</script>
