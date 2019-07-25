<template>
  <div class="app-container">

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
      <el-table-column class-name="status-col" label="Status"  align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status | statusFilter }}</el-tag>
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
    </el-table>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
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
      // 获取
      this.FeachUserList()
    },

    computed: {
      ...mapGetters(['roles', 'userlist'])
    },

    methods: {
      ...mapActions(['FeachUserList'])
    }
  }
</script>
