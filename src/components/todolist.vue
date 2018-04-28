<template>
  <el-row class="content">
    <el-col :xs="{span:20,offset:2}" :sm="{span:8,offset:8}">
      <span>欢迎：dotnot，你的待办事项为：</span>
      <el-input placeholder="请输入你的任务" type="text" v-model="todos" @keyup.enter.native="addTodos"></el-input>
      <el-tabs v-model="activeName">
        <el-tab-pane label="待办事宜" name="first">
          <el-col :xs="24">
            <div v-if="List.length!=0">
                <template v-for="(item,index) in List">
                  <div class="todo-list" v-if="item.status == false">
                    <span class="item">
                      {{ index + 1 }}. {{ item.content }}
                    </span>
                    <span class="pull-right">
                      <el-button size="small" type="success" @click="finished(index)">完成</el-button>
                      <el-button size="small" type="danger">删除</el-button>
                    </span>  
                  </div>
                </template>
            </div>
            <div v-else class="todo-list">
                <span>暂无数据</span>
            </div>
          </el-col>          
        </el-tab-pane>
        <el-tab-pane label="完成事项" name="second">
          <el-col :xs="24">
                <template v-for="(item,index) in List">
                  <div class="todo-list" v-if="item.status == true">
                    <span class="item">
                      {{ index + 1 }}. {{ item.content }}
                    </span>
                    <span class="pull-right">
                      <el-button size="small" type="primary" @click="reset(index)">还原</el-button>
                    </span>  
                  </div>
                </template>
          </el-col>  
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data(){
    return{
      activeName:'first',
      todos:'',
      List:[]
    }
  },
  methods:{
    finished(index){
      this.List[index].status = true
    },
    reset(index){
      this.List[index].status = false
    },
    addTodos(){
      if(this.todos == '')
      return
      let obj={
        status:false,
        content:this.todos
      }
      this.List.push(obj)
      this.todos = ''
    }
  }
};
</script>

<style lang="stylus" scoped>
.el-input
  margin 20px auto 
.todo-list
  width 100%
  text-align left 
  border-bottom 1px solid #eee
  margin-top 10px
  padding-bottom 10px 
  overflow hidden
  .item
    font-size 20px
.pull-right 
  float right 

</style>

