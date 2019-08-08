<template>
  <div class="app-container">

    <div style="float: right;margin-bottom: .5em;">
      <el-button @click="HandleClick(0)" >用户新增</el-button>
    </div>

    <el-table :data="userlist" v-loading.body="listLoading" element-loading-text="Loading"  fit highlight-current-row>
      <el-table-column align="center" label='ID' >
        <template slot-scope="scope">
          {{scope.row.id}}
        </template>
      </el-table-column>

      <el-table-column label="Author"  align="center">
        <template slot-scope="scope">
          <span>{{scope.row.user_name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Email" align="center">
        <template slot-scope="scope">
          {{scope.row.user_email}}
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="Roles"  align="center">
        <template slot-scope="scope">
          {{scope.row.roles | rolesFilter}}
        </template>
      </el-table-column>

      <el-table-column align="center" prop="created_at" label="Display_time" >
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.update_time}}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="Status"  align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status | statusFilter }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column fixed="right" align="center" label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="HandleClick(scope.row.id)">编辑</el-button>
          <el-button type="text" size="small" @click="HandleDel(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>

    <ss-form-input :key-value="formObject"></ss-form-input>

  </div>
</template>

<script>
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
        }
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
      ...mapGetters(['roles', 'userlist'])
    },

    methods: {
      ...mapActions(['FeachUserList', 'SaveUser', 'DelUser']),
      // 编辑与添加新用户
      HandleClick(id) {
        this.$router.push({ path: 'edituser', query: { id }})
      },
      HandleDel(id) {
        this.DelUser({ 'id': id, 'status': 0 })
      }

    }
  }
</script>
