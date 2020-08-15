<template>
  <div class="app-container">
    <div style="float: right;margin-bottom: .5em;">
      <el-button @click="addOrEditHandleClick()" >用户新增</el-button>
    </div>

    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
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
          <el-tag :type="scope.row.status | statusFilter">{{scope.row.roles}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Display_time" >
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.update_time}}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" align="center" label="操作" width="150">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small" @click="addOrEditHandleClick(scope.row)">编辑</el-button>
          <el-button type="text" size="small" >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <ss-dialog :key-value="dialogObject"></ss-dialog>
    <ss-form-input :key-value="formObject"></ss-form-input>
  </div>
</template>

<script>
import { getList } from '@/api/table'
import ssDialog from '@/Components/Dialog/dialog'
import ssFormInput from '@/Components/Dialog/formuser'

export default {
  components: {
    ssDialog,
    ssFormInput
  },
  data() {
    return {
      list: null,
      listLoading: true,

      dialogObject: {
        title: '测试提示',
        content: '测试内容',
        html: true,
        dialogVisible: false
      },
      formObject: {
        formVisible: false,
        form: {}
      }

    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.list = response.data.result
        this.listLoading = false
      })
    },
    handleClick(row) {
      this.dialogObject.content = `<p> <span> IP地址: </span>` + row.login_ip + `</p>`
      this.dialogObject.dialogVisible = true
    },
    addOrEditHandleClick(row) {
      // this.formObject = {}
      if (row) {
        this.formObject.form = row
      } else {
        this.formObject.form = {}
      }
      this.formObject.formVisible = true
    }

  }
}
</script>
