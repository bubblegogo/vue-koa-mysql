<template>
	<div class="app-container">

		<el-row :gutter="10" class="row-table">
			<el-col :span="5">roleId</el-col>
			<el-col :span="5">roleName</el-col>
			<el-col :span="5">权限</el-col>
			<el-col :span="5"> 时间 </el-col>
		</el-row>	

		<el-collapse accordion>

		  <el-collapse-item v-for="item in rolelist">
		    <template slot="title">
		    	<el-row :gutter="10">
				  <el-col :span="5">{{item.role_id}}</el-col>
				  <el-col :span="5">{{item.menu_name}}</el-col>
				  <el-col :span="5" class="row-tb-col">{{item.mname}} </el-col>
				  <el-col :span="5">{{item.role_id}} </el-col>
				</el-row>	      
		    </template>

		    <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
		    <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
		  </el-collapse-item>

		</el-collapse>
	
		<el-input placeholder="Filter keyword" v-model="filterText" style="margin-bottom:30px;"></el-input>
		<el-tree class="filter-tree" :data="data2" :props="defaultProps" default-expand-all :filter-node-method="filterNode" ref="tree2">
		</el-tree>


		<div class="block">
			<p> 使用 render-content </p>
			<el-tree :data="data4"  class="filter-tree" show-checkbox node-key="id" default-expand-all :expand-on-click-node="false" :render-content="renderContent">
			</el-tree>
		</div>


	</div>
</template>


<script>
	let id = 1000;

	 import { mapGetters,mapActions } from 'vuex'

	export default {

		created(){
			//获取 
			this.FeachList();
	    },

	    mounted(){
	    	console.log("mounted mountedmountedmounted")
	    },

	    computed: {
			...mapGetters([
                'roles',
                'menulist',
                'rolelist'
            ])
		},

		watch: {
			filterText(val) {
				this.$refs.tree2.filter(val)
			}
		},

		data() {
			const data = [{
			id:0,
			label:"Root ",
			children:[{
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
			}] }];
			
			return {
				data4: JSON.parse(JSON.stringify(data)),
				data2: data,
				filterText: '',
				defaultProps: {
					children: 'children',
					label: 'label'
				},
				
			}
		},
		
		methods: {
			...mapActions(['FeachList']),
			
			filterNode(value, data) {
				if(!value) return true
				return data.label.indexOf(value) !== -1
			},
			append(data) {
				const newChild = {
					id: id++,
					label: 'testtest',
					children: []
				};
				if(!data.children) {
					this.$set(data, 'children', []);
				}
				data.children.push(newChild);
			},

			remove(node, data) {
				const parent = node.parent;
				const children = parent.data.children || parent.data;
				const index = children.findIndex(d => d.id === data.id);
				children.splice(index, 1);
			},

			renderContent(h, {
				node,
				data,
				store
			}) {
				return(
					<span class="custom-tree-node">
	        <span>{node.label}</span>
	        <span>
	          <el-button size="mini" type="text" on-click={ () => this.append(data) }>Append</el-button>
	          <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>Delete</el-button>
	        </span>
	      </span>);
			}
		},

	}
</script>



<style>
	.row-table{
	    line-height: 48px;
	   	color: #909399;
	    cursor: pointer;
	    border-bottom: 1px solid #ebeef5;
	    font-size: 14px;
	    font-weight: bold;
	}
	.row-tb-col{
		overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	}

</style>