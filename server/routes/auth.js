// routes/auth.js

const userauth = require('../controllers/user.js'); 
const router = require('koa-router')();

// 用user的auth方法引入router
router.get('/user/:id', userauth.getUserInfo); 
router.post('/user',userauth.postUserAuth);

// 把router规则暴露出去
module.exports = router; 