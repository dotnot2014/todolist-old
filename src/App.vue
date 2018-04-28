<template>
  <div id="app">
    <img id="logo" src="./assets/todo2.jpg">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      appTitle: "Todo List"
    };
  },
  methods:{
    login(){
      alert('登录处理')
    },
    reg(){
      alert('注册处理')
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#logo {
  width: 200px;
  height: 200px;
}
</style>
