<template>
  <div class="app-container">
    <div class="filter">
      <div  class="searchIn">
        <el-select placeholder="请选择类型" clearable v-model="selectval" @change="handleChange">

          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-input placeholder="请输入内容" clearable @change="handleChange" v-model="inputval"></el-input>
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
          <span>{{scope.row.user_name}}</span>
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
          <span>{{scope.row.create_time | timeFormat }}</span>
        </template>
      </el-table-column>

      <el-table-column  align="center" :label="$t('article.description')" >
        <template slot-scope="scope">
          {{scope.row.description}}
        </template>
      </el-table-column>

      <el-table-column fixed="right" align="center" :label="$t('operation.operation')" width="120">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="HandleClick(scope.row.id)">{{$t('operation.edit')}}</el-button>
          <el-button type="text" size="small" @click="HandleDel(scope.row.id)">{{$t('operation.del')}}</el-button>
        </template>
      </el-table-column>

    </el-table>
      <div class="block">
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, prev, pager, next"
        :current-page="pageobj.current_page"
        :page-size="pageobj.page_size"
        :total="pageobj.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import { article_type } from '@/utils/constant'
  import { mapGetters, mapActions } from 'vuex'
  import { timeStampToYMd } from '@/utils/date'
  export default {
    components: {
    },
    data() {
      return {
        list: null,
        listLoading: false,
        options: article_type(),
        selectval: '',
        inputval: ''
      }
    },
    computed: {
      ...mapGetters(['articlelist', 'pageobj'])
    },
    created() {
      // 获取用户列表
      this.FeachArticleList(this.feachParam())
    },
    methods: {
      ...mapActions(['FeachArticleList', 'DelArticle', 'setCurrentPage', 'setPageSize']),
      // 编辑与添加新用户
      HandleClick(id) {
        this.$router.push({ path: 'editArticle', query: { id }})
      },
      feachParam() {
        const param = {
          id: this.$store.state.user.obj.id,
          current_page: this.pageobj.current_page,
          page_size: this.pageobj.page_size,
          typeid: this.selectval,
          search: this.inputval
        }
        return param
      },
      HandleDel(id) {
        this.DelArticle({ 'id': id, 'status': 0 })
        // 获取列表
        this.FeachArticleList(this.feachParam())
      },
      // search select option or input val
      handleChange(val) {
        this.FeachArticleList(this.feachParam())
      },

      handleSizeChange(val) {
        this.setPageSize(val)
        this.FeachArticleList(this.feachParam())
      },
      handleCurrentChange(val) {
        this.setCurrentPage(val)
        this.FeachArticleList(this.feachParam())
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
      },
      timeFormat(timestr) {
        return timeStampToYMd(timestr)
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
  .block {
    text-align: right;
    margin: 1rem;
  }


</style>
