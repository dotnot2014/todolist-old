<template>
  <div>
    <el-row class="content">
        <el-col :xs="24" :sm="{span: 6,offset: 9}">
            <span class="title">欢迎登录</span>
            <el-row>
                <el-input 
                    v-model="account"
                    placeholder="账号"
                    type="text"
                ></el-input>
                <el-input 
                    v-model="password"
                    placeholder="密码"
                    type="password"
                ></el-input>
                <el-button type="primary" @click="loginTodo">登录</el-button>
            </el-row>
        </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    data(){
        return{
            account:'',
            password:''
        }
    },
    methods:{
        loginTodo(){
            var that = this;
            let obj = {
                name: that.account,
                password: that.password
            }
            axios.post('http://localhost:8889/auth/user ',obj).then(res=>{
                if(res.data.success){
                    sessionStorage.setItem('todo-token',res.data.token);
                    that.$message({
                        type:'success',
                        message:'登录成功'
                    });
                    that.$router.push('/todolist')
                }else{
                    that.$message.error(res.data.info);
                    sessionStorage.setItem('todo-token',null)
                }
            },(err)=>{
                that.$message.error('请求错误:'+err);
                sessionStorage.setItem('todo-token',null);
            })
            // this.$router.push('/users')
        }
    }
};
</script>

<style lang="stylus" scoped>
  .el-row.content
    padding 16px
  .title
    font-size 28px
  .el-input
    margin 12px 0
  .el-button
    width 100%
    margin-top 12px  
</style>
