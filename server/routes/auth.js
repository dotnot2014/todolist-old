// routes/auth.js

const userauth = require('../controllers/user.js'); 
const router = require('koa-router')();

console.log(userauth.getUserInfo);

router.get('/user/:id', userauth.getUserInfo); // 定义url的参数是id,用user的auth方法引入router

module.exports = router; // 把router规则暴露出去