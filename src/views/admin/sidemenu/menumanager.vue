<template>
  <div class="app-container">
    <div class="block">
      <p> 项目菜单管理 </p>
      <el-tree :data="treemenu" :props="defaultProps" node-key="id" default-expand-all :expand-on-click-node="false" :render-content="renderContent">
      </el-tree>
    </div>

    <el-dialog title="新增导航" :visible.sync="formVisible">
      <el-form :model="form" :rules = "rules" ref="ruleForm">
        <el-form-item label="导航名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="导航路径" :label-width="formLabelWidth" prop="path">
          <el-input v-model="form.path" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="导航页面" :label-width="formLabelWidth" prop="selectedOptions" >
          <el-cascader
            :options="options"
            v-model="form.selectedOptions"
            placeholder="试试搜索：指南"
            filterable
            @change="handleChange">
          </el-cascader>
        </el-form-item>

        <el-form-item label="导航隐藏" :label-width="formLabelWidth" prop="hidden">
          <el-switch v-model="form.hidden"></el-switch>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="formVisible = false">取 消</el-button>
        <el-button type="primary" @click="appendSubmit('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import { directoryVue } from '@/utils/template'
  export default {
    created() {
      directoryVue()
    },
    mounted() {
      console.log('mounted')
    },
    computed: {
      ...mapGetters([
        'treemenu'
      ])
    },
    data() {
      return {
        defaultProps: {
          children: 'children',
          label: 'name',
          disabled: 'status'
        },
        formVisible: false,
        formLabelWidth: '100px',
        form: {
          parent_id: 0,
          hidden: false,
          selectedOptions: [],
        },
        options: [],
        rules: {
          name: [
            { required: true, message: '请输入导航名称', trigger: 'blur' },
          ],
          path: [
            { required: true, message: '请输入导航路径', trigger: 'blur' }
          ],
          selectedOptions: [
            { required: true, message: '请选择导航页面' }
          ],
        }
      }
    },
    computed: {
      ...mapGetters([
        'treemenu'
      ])
    },
    created() {
      directoryVue()
    },
    mounted() {
      console.log('mounted')
    },
    methods: {
      ...mapActions(['addOrUpdateMenu', 'deleteMenu', 'FeachList']),
      appendSubmit(rulename) {
        let isubmit = true
        this.$refs[rulename].validate((valid) => {
          if (valid) {
          } else {
            isubmit = false
            return
          }
        })
        if (isubmit) {
          this.formVisible = false
          this.addOrUpdateMenu(this.form)
        }
      },
      append(data) {
        this.formVisible = true
        this.form.parent_id = data.id
        this.options = directoryVue()

        // 新增前输入相对应的路径和名字
        /*if (!data.children) {
          this.$set(data, 'children', [])
        }
        data.children.push(this.form)*/
      },

      remove(node, data) {
        const parent = node.parent
        const children = parent.data.children || parent.data
        const index = children.findIndex(d => d.id === data.id)
        children.splice(index, 1)

        console.log("11111",data.id)
        const res = this.deleteMenu(data.id)

      },
      renderContent(h, { node, data, store }) {
        return (
          <span class='custom-tree-node'>
            <span>{data.name}</span>
            <span>
              <el-button size='mini' type='text' on-click={ () => this.append(data) }> Append </el-button>
              <el-button size='mini' type='text' on-click={ () => this.remove(node, data) }> Delete </el-button>
            </span>
          </span>)
      },
      handleChange(value) {
        this.form.component = value.join('/')
      }
    }
  }
</script>

<style scoped>
  .custom-tree-node{
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  .cascadertip{
    color: red;
    font-size: 12px;
    display: inline-block;
  }

</style>
