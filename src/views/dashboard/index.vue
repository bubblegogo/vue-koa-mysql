<template>
    <div class="dashboard-container">
        <el-row :gutter="20">
            <el-col :span="8" :xs="{span: 24, offset: 0}">
                <el-row>
                    <el-col>
                        <el-card shadow="hover" class="mgb20">
                            <div class="user-info">
                                <img src="static/img/img.jpg" class="user-avator" alt="">
                                <div class="user-info-cont">
                                    <div class="user-info-name">{{obj.name}}</div>
                                    <div>{{roles == 1 ? 'admin':'user'}}</div>
                                </div>
                            </div>
                            <div class="user-info-list">登录时间：<span>{{obj.time | time_to_ymd}}</span></div>
                            <div class="user-info-list">登录地点：<span>{{obj.ip.cname}}</span></div>
                        </el-card>
                        <el-card shadow="hover">
                            <div slot="header" class="clearfix">
                                <span>语言详情</span>
                            </div>

                            Vue
                            <el-progress :percentage="57.2" color="#42b983"></el-progress>

                            React
                            <el-progress :percentage="30.2" color="#42b983"></el-progress>

                            Angular
                            <el-progress :percentage="50.2" color="#42b983"></el-progress>

                            JavaScript
                            <el-progress :percentage="89.8" color="#f1e05a"></el-progress>

                            CSS
                            <el-progress :percentage="41.9"></el-progress>

                            HTML
                            <el-progress :percentage="99" color="#f56c6c"></el-progress>

                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="16" :xs="{span: 24, offset: 0}">
                <el-row :gutter="20" class="mgb20">

                    <el-col :span="8" :xs="{span: 24, offset: 0}">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-view grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">1234</div>
                                    <div>用户访问量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>

                    <el-col :span="8" :xs="{span: 24, offset: 0}">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-message grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">321</div>
                                    <div>系统消息</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8" :xs="{span: 24, offset: 0}">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-3">
                                <i class="el-icon-goods grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">5000</div>
                                    <div>数量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-card shadow="hover" :body-style="{ height: '304px'}">
                    <div slot="header" class="clearfix">
                        <span>待办事项</span>
                        <el-button style="float: right; padding: 3px 0" type="text">添加</el-button>
                    </div>
                    <el-table :data="todolist" :show-header="false" height="304" style="width: 100%;font-size:14px;">
                        <el-table-column width="40">
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.status"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column>
                            <template slot-scope="scope">
                                <auto-editable :autoeditable = "autoComplete[scope.row.id]" :id="scope.row.id" :status="scope.row.status"  :value="scope.row.content" v-on:input="blurClick" > </auto-editable>
                              <!--  <div class="todo-item"  :contenteditable="autoComplete[scope.row.id]" :ref="scope.row.id"  @blur="blurClick(scope.row,$event)" :class="{'todo-item-del': scope.row.status}" >{{scope.row.content}}</div>
                           -->
                            </template>
                        </el-table-column>
                        <el-table-column width="60">
                            <template slot-scope="scope">
                                <i class="el-icon-edit" @click="HandleEdit(scope.row.id)"></i>
                                <i v-if="!scope.row.status" class="el-icon-delete" @click="HandleClick(scope.row)"></i>
                                <i v-else  class="el-icon-back" @click="HandleClick(scope.row)"></i>
                            </template>
                        </el-table-column>

                    </el-table>
                </el-card>

            </el-col>
        </el-row>
    </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import autoEditable from '@/components/AutoEditable'
  export default {
    name: 'dashboard',
    components: {
      autoEditable
    },
    data() {
      return {
        autoComplete: {}
      }
    },
    created() {
      this.feachToDoList()
    },
    computed: {
      ...mapGetters([
        'obj',
        'roles',
        'todolist'
      ])
    },
    methods: {
      ...mapActions(['feachToDoList', 'delToDoById', 'updateToDoById']),
      HandleClick(row) {
        this.delToDoById({ 'id': row.id, 'status': +!row.status, 'user_id': this.$store.state.user.obj.id })
      },

      HandleEdit(id) {
        Object.keys(this.autoComplete).forEach(item => {
          if (item !== id) {
            this.autoComplete[item] = false
          }
        })
        this.$set(this.autoComplete, id, true)
      },
      blurClick(autoobj) {
        this.updateToDoById(autoobj)
      }
    },
    watch: {
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .dashboard {
      &-container {
        margin: 30px;
      }
      &-text {
        font-size: 30px;
        line-height: 46px;
      }
    }

 .el-row {
        margin:0;
    }

    .grid-content {
        display: flex;
        align-items: center;
        height: 100px;
    }

    .grid-cont-right {
        flex: 1;
        text-align: center;
        font-size: 12px;
        color: #999;
    }

    .grid-num {
        font-size: 30px;
        font-weight: bold;
    }

    .grid-con-icon {
        font-size: 50px;
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        color: #fff;
    }

    .grid-con-1 .grid-con-icon {
        background: rgb(45, 140, 240);
    }

    .grid-con-1 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-2 .grid-con-icon {
        background: rgb(100, 213, 114);
    }

    .grid-con-2 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-3 .grid-con-icon {
        background: rgb(242, 94, 67);
    }

    .grid-con-3 .grid-num {
        color: rgb(242, 94, 67);
    }

    .user-info {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        border-bottom: 2px solid #ccc;
        margin-bottom: 20px;
    }

    .user-avator {
        width: 100%;
        border-radius: 50%;
        max-width: 120px;
        max-height: 120px;
    }

    .user-info-cont {
        padding-left: 10px;
        flex: 1;
        font-size: 14px;
        color: #999;
    }

    .user-info-cont div:first-child {
        font-size: 18px;
        color: #222;
    }

    .user-info-list {
        font-size: 14px;
        color: #999;
        line-height: 25px;
    }
   /* .user-info-list span {
        margin-left: 70px;
    }*/

    .mgb20 {
        margin-bottom: 20px;
    }

    .todo-item {
        font-size: 14px;
        cursor: pointer;
    }

    .todo-item-del {
        text-decoration: line-through;
        color: #999;
    }

</style>
