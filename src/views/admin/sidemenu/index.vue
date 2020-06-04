<template>
	<div class="app-container">


    <el-input placeholder="Filter keyword" v-model="filterText" style="margin-bottom:30px;"></el-input>


    <el-collapse accordion v-model="activeRole"  @change="handleChange" >

		  <el-collapse-item :name="item.role_id" :key="index" v-for="(item,index) in rolelist">

        <template slot="title" slot-scope="scope" >
          <el-row :gutter="10">
            <el-col :span="18">{{item.menu_name}}  权限编辑</el-col>
            <el-col :span="4" class="del-font" ><i  @click.stop="delRoleMenu(item.role_id)" class="header-icon el-icon-delete"></i></el-col>
          </el-row>
        </template>

        <div>注意: 展示当前角色下所对应的模块权限功能</div>

        <div class="block">
          <el-tree
            :data="treemenu"
            :props="defaultProps"
            :ref="item.role_id"
            show-checkbox
            node-key="id"
            @check-change="handleCheckChange"
            :default-checked-keys="roleKeys">
          </el-tree>
        </div>

      </el-collapse-item>

		</el-collapse>

	</div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    created() {
      // 在获取个人用户信息中已经请求过所有菜单列表
      // this.FeachList()
    },
    mounted() {
      console.log('mounted mountedmountedmounted')
    },
    computed: {
      ...mapGetters([
        'roles',
        'menulist',
        'rolelist',
        'treemenu'
      ])
    },
    data() {
      return {
        filterText: '',
        activeRole: '',
        roleKeys: [],
        defaultProps: {
          children: 'children',
          label: 'name',
          disabled: 'status'
        }
      }
    },

    methods: {
      ...mapActions(['FeachList', 'updateRole']),
      filterNode(value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },
      // 当选择不同角色的时候 需要 展示不同角色权限
      handleChange() {
        if (this.activeRole !== '') {
          // this.$refs[this.activeRole][0].setCheckedKeys([])
          this.$nextTick(() => {
            const active_menu = this.rolelist.filter(role => role.id === this.activeRole)[0]['menu_id']
            this.$refs[this.activeRole][0].setCheckedKeys(active_menu)
          })
        }
      },
      delRoleMenu(role_id) {
        this.$confirm('此操作将永久删除角色权限以及角色下的所有用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      handleCheckChange(data, checked, indeterminate) {
        const old_menu = this.rolelist.filter(role => role.id === this.activeRole)[0]['menu_id']
        const checkedkeys = this.$refs[this.activeRole][0].getCheckedKeys()

        if (JSON.stringify(old_menu) !== JSON.stringify(checkedkeys)) {
          this.$confirm('此操作将更改角色下的权限模块, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.updateRole({ 'id': this.activeRole, 'menu_id': JSON.stringify(checkedkeys) })
          }).catch(() => {
            this.$refs[this.activeRole][0].setCheckedKeys(old_menu)
            this.$message({
              type: 'info',
              message: '已取消操作'
            })
          })
        }
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val)
      }
    }
  }
</script>



<style scoped>
	.del-font{
    font-size: 1rem;
	}

</style>
