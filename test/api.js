// 导入数据
const userdb = require('./userdb.js');

//api
var users = [];

userdb().then(res=>{
    users = res;
});

let api = function(router){
    router.get('/api/users/:id', async (ctx, next) => {
        // 设置Content-Type:
        ctx.response.type = 'application/json';
        // 设置Response Body:
        ctx.response.body = users[ctx.params.id-1];
    });
};

module.exports = api;