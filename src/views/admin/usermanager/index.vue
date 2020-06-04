<template>
  <div class="app-container">

    <div style="float: right;margin-bottom: .5em;">
      <el-button @click="HandleClick(0)" v-text="$t('user.adduser')"></el-button>
    </div>

    <el-table :data="userlist" v-loading.body="listLoading" element-loading-text="Loading"  fit highlight-current-row>
      <el-table-column align="center" label='ID' >
        <template slot-scope="scope">
          {{scope.row.id}}
        </template>
      </el-table-column>

      <el-table-column :label="$t('user.name')" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.user_name}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('user.email')" align="center">
        <template slot-scope="scope">
          {{scope.row.user_email}}
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" :label="$t('user.roles')"  align="center">
        <template slot-scope="scope">
          {{scope.row.roles | rolesFilter}}
        </template>
      </el-table-column>

      <el-table-column align="center" prop="created_at" :label="$t('user.createtime')" >
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.createtime | time_to_ymd}}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" :label="$t('user.status')"  align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status | statusFilter }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column fixed="right" align="center" :label="$t('operation.operation')" width="150">
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
  import { mapGetters, mapActions } from 'vuex'
  export default {
    components: {
    },
    data() {
      return {
        list: null,
        listLoading: false
      }
    },
    filters: {
      // 用户状态过滤器
      statusFilter(status) {
        const statusMap = {
          '0': 'danger', // 注销
          '1': 'success', // 成功
          '2': 'gray' // 关闭
        }
        return statusMap[status]
      },
      // 用户角色过滤
      rolesFilter(roles) {
        return roles === 1 ? 'administrator' : 'user'
      }
    },

    created() {
      // 获取用户列表
      this.FeachUserList()
    },

    computed: {
      ...mapGetters(['roles', 'userlist', 'pageobj'])
    },

    methods: {
      ...mapActions(['FeachUserList', 'SaveUser', 'DelUser', 'setCurrentPage', 'setPageSize']),
      // 编辑与添加新用户
      HandleClick(id) {
        this.$router.push({ path: 'edituser', query: { id }})
      },
      HandleDel(id) {
        this.DelUser({ 'id': id, 'status': 0 })
      },
      handleSizeChange(val) {
        this.setPageSize(val)
        this.FeachUserList()
      },
      handleCurrentChange(val) {
        this.setCurrentPage(val)
        this.FeachUserList()
      }

    }
  }
</script>

<style scoped>
  .block {
    text-align: right;
    margin: 1rem;
  }
</style>
