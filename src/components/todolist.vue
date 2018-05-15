<template>
  <el-row class="content">
    <el-col :xs="{span:20,offset:2}" :sm="{span:8,offset:8}">
      <span>欢迎：{{name}}，你的待办事项为：</span>
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
                      <el-button size="small" type="success" @click="update(index)">完成</el-button>
                      <el-button size="small" type="danger" @click="remove(index)">删除</el-button>
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
                      <el-button size="small" type="primary" @click="update(index)">还原</el-button>
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
import jwt from 'jsonwebtoken';
const serverUrl = 'http://localhost:8889/api/todolist/'

export default {
  created(){
    const userInfo = this.getUserInfo();
    if(userInfo != null){
      this.id = userInfo.id;
      this.name = userInfo.name;
    }else{
      this.id = '';
      this.name = '';
    }
    this.getTodolist();
  },
  data(){
    return{
      id:'',
      name:'dotnot',
      activeName:'first',
      todos:'',
      List:[]
    }
  },
  methods:{
    addTodos(){
      if(this.todos == '')
      return
      let obj={
        status:false,
        content:this.todos,
        id:this.id
      }
      this.$http.post(serverUrl,obj).then((res)=>{
        if(res.status == 200){
          this.$message({
            type:'success',
            message:'创建成功！'
          })
          this.getTodolist();
        }else{
          this.$message.error('创建失败！')
        }
      },(err)=>{
        this.$message.error('创建失败！')
        console.log(err)
      })
      // this.List.push(obj)
      this.todos = ''
    },
    getUserInfo(){
        const token = sessionStorage.getItem('todo-token');
        if( token != 'null' && token != null){
          let decode = jwt.decode(token)
          return decode
        }else{
          return null
        }
    },
    getTodolist(){
      this.$http.get(serverUrl+this.id).then((res)=>{
        if(res.status == 200){
          this.List = res.data
        }else{
          this.$message.error('获取列表失败！')
        }
      },(err)=>{
        this.$message.error('获取列表失败！')
        console.log(err)
      })
    },
    update(index) {
      this.$http.put(serverUrl + this.id + '/' + this.List[index].id + '/' + this.List[index].status)
        .then((res) => {
          if(res.status == 200){
            this.$message({
              type: 'success',
              message: '任务状态更新成功！'
            })
            this.getTodolist();
          }else{
            this.$message.error('任务状态更新失败！')
          }
        }, (err) => {
          this.$message.error('任务状态更新失败！')
          console.log(err)
        })
    },
    remove(index) {
      this.$http.delete(serverUrl + this.id + '/' + this.List[index].id)
        .then((res) => {
          if(res.status == 200){
            this.$message({
              type: 'success',
              message: '任务删除成功！'
            })
            this.getTodolist();
          }else{
            this.$message.error('任务删除失败！')
          }
        }, (err) => {
          this.$message.error('任务删除失败！')
          console.log(err)
        })
    },
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

