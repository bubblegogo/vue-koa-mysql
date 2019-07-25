<template>
	<div class="app-container">
		<el-input placeholder="Filter keyword" v-model="filterText" style="margin-bottom:30px;"></el-input>

		<el-tree class="filter-tree" :data="data2" :props="defaultProps" default-expand-all :filter-node-method="filterNode" ref="tree2"></el-tree>

		<div class="block">

			<p> 使用 render-content </p>
			<el-tree :data="data4"  class="filter-tree" show-checkbox node-key="id" default-expand-all :expand-on-click-node="false" :render-content="renderContent">
			</el-tree>

		</div>

	</div>
</template>

<script>
  let id = 1000
  export default {
    watch: {
      filterText(val) {
        this.$refs.tree2.filter(val)
      }
    },
    data() {
      const data = [{
        id: 0,
        label: 'Root',
        children: [{
          id: 1,
          label: '菜单一',
          children: []
        }, {
          id: 2,
          label: '菜单二',
          children: [{
            id: 5,
            label: '二级菜单 2-1'
          }, {
            id: 6,
            label: '二级菜单 2-2'
          }]
        }, {
          id: 3,
          label: '菜单三',
          children: [{
            id: 7,
            label: '二级菜单 3-1'
          }, {
            id: 8,
            label: '二级菜单 3-2'
          }]
        }]
      }]
      return {
        data4: JSON.parse(JSON.stringify(data)),
        data2: data,
        filterText: '',
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    methods: {
      filterNode(value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },
      append(data) {
        const newChild = {
          id: id++,
          label: 'testtest',
          children: []
        }
        if (!data.children) {
          this.$set(data, 'children', [])
        }
        data.children.push(newChild)
      },

      remove(node, data) {
        const parent = node.parent
        const children = parent.data.children || parent.data
        const index = children.findIndex(d => d.id === data.id)
        children.splice(index, 1)
      },
      renderContent(h, { node, data, store }) {
        return (
          <span class='custom-tree-node'>
            <span>{node.label}</span>
            <span>
              <el-button size='mini' type='text' on-click={ () => this.append(data) }>Append</el-button>
              <el-button size='mini' type='text' on-click={ () => this.remove(node, data) }>Delete</el-button>
            </span>
          </span>)
      }
    }
  }
</script>
