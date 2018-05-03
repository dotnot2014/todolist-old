<template>
  <div>
    <button @click="login(1)">用户1</button>
    <button @click="login(2)">用户2</button>
    <button @click="login(3)">用户3</button>
    <br>
    <span>当前用户：{{account}}</span><br>
    <span>登录密码：{{password}}</span>
    <br>
    <button @click="enter">进入ToDoList</button>
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
        login(index){
            var that = this;
            var url = `http://localhost:8889/auth/user/${index}`;
            axios.get(url)
                .then(function (res) {
                    that.account = res.data.user_name;
                    that.password = res.data.password;
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
        enter(){
            this.$router.push('/todolist')
        }
    }
}
</script>

<style>

</style>


