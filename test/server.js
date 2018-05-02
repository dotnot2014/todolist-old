const Koa = require('koa');
const router = require('koa-router')();
const api = require('./api.js');
const cors = require('@koa/cors');

const app = new Koa();
app.use(cors());

// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

// add controller:
api(router);

// 挂载路由
app.use(router.routes());

app.listen(3000);
console.log('app started at port 3000...');