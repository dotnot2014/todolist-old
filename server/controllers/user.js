const user = require('../models/user.js');
const jwt = require('koa-jwt');
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const getUserInfo = async function (ctx){
  const id = ctx.params.id; // 获取url里传过来的参数里的id
  const result = await user.getUserById(id);  // 通过await “同步”地返回查询结果
  ctx.body = result; // 将请求的结果放到response的body里返回
}

const postUserAuth = async function(ctx){
  const data = ctx.request.body;
  console.log(data);
  const userInfo = await user.getUserByName(data.name);

  if(userInfo != null){
    if(!bcrypt.compareSync(data.password, userInfo.password)){
      ctx.body = {
        success: false,
        info:'密码错误'
      }
    }else{
      const userToken = {
        name: userInfo.user_name,
        id: userInfo.id
      }
      const secret = 'vue-koa-todolist';
      const token = jsonwebtoken.sign(userToken,secret);
      ctx.body = {
        success: true,
        token: token
      }
    }
  }else{
    ctx.body = {
      success: false,
      info:'用户不存在'
    }
  }
}

// 把获取用户信息的方法暴露出去
module.exports = {
  getUserInfo,  
  postUserAuth
}
