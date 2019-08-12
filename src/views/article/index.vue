<template>
  <div class="app-container">
    <div class="filter">
      <div  class="searchIn">
        <el-select placeholder="请选择类型" v-model="selectval">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-input placeholder="请输入内容" v-model="inputval"></el-input>
      </div>
      <el-button @click="HandleClick(0)" >{{$t('article.addarticle')}}</el-button>

    </div>
    <el-table :data="articlelist" v-loading.body="listLoading" element-loading-text="Loading"  fit highlight-current-row>
      <el-table-column align="center" label='ID' >
        <template slot-scope="scope">
          {{scope.row.id}}
        </template>
      </el-table-column>

      <el-table-column :label="$t('article.title')"  align="center">
        <template slot-scope="scope">
          <span>{{scope.row.title}}</span>
        </template>
      </el-table-column>

      <el-table-column  :label="$t('article.user')" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.user_id}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('article.type')" align="center">
        <template slot-scope="scope">
          {{scope.row.typeid}}
        </template>
      </el-table-column>

      <el-table-column :label="$t('article.content')" align="center">
        <template slot-scope="scope">
          {{scope.row.content | hiddenContent }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('article.createtime')">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.create_time}}</span>
        </template>
      </el-table-column>

      <el-table-column  align="center" :label="$t('article.description')" >
        <template slot-scope="scope">
          {{scope.row.description}}
        </template>
      </el-table-column>

      <el-table-column fixed="right" align="center" :label="$t('operation.operation')" width="150">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="HandleClick(scope.row.id)">{{$t('operation.edit')}}</el-button>
          <el-button type="text" size="small" @click="HandleDel(scope.row.id)">{{$t('operation.del')}}</el-button>
        </template>
      </el-table-column>

    </el-table>

    <ss-form-input :key-value="formObject"></ss-form-input>

  </div>
</template>

<script>
  import { article_type } from '@/utils/constant'

  import { mapGetters, mapActions } from 'vuex'
  import ssFormInput from '@/Components/Dialog/formuser'
  export default {
    components: {
      ssFormInput
    },
    data() {
      return {
        list: null,
        listLoading: false,
        formObject: {
          formVisible: false,
          form: {}
        },
        options: article_type(),
        inputval: '',
        selectval: ''
      }
    },
    filters: {
      // 内容过长进行隐藏
      hiddenContent(content) {
        let str = ''
        if (content.length > 20) {
          str = content.substr(0, 20) + '...'
        } else {
          str = content
        }
        return str
      }
    },

    created() {
      // 获取用户列表
      this.FeachArticleList()
    },
    computed: {
      ...mapGetters(['articlelist'])
    },
    methods: {
      ...mapActions(['FeachArticleList']),
      // 编辑与添加新用户
      HandleClick(id) {
        this.$router.push({ path: 'editArticle', query: { id }})
      },
      HandleDel(id) {
        this.DelUser({ 'id': id, 'status': 0 })
      }

    }
  }
</script>

<style scoped>
  .filter{
    display:flex;
    display: -webkit-flex;
    justify-content: space-between;
    padding-bottom: 0.5em;
    border-bottom: 1px solid #ebeef5;
  }
  .searchIn {
    display: flex;display: -webkit-flex
  }


</style>
