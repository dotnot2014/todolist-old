const Koa = require('koa')
const KoaRouter = require('koa-router')
const json = require('koa-json')
const logger = require('koa-logger')
const auth = require('./server/routes/auth.js')
const bodyparser = require('koa-bodyparser')

const app = new Koa()

app.use(bodyparser());
app.use(json());
app.use(logger());

app.use(async function (next){
  let start = new Date;
  await next;
  let ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

app.on('error', function(err, ctx){
  console.log('server error', err);
});

// app.use('/auth', auth.routes()); // 挂载到koa-router上，同时会让所有的auth的请求路径前面加上'/auth'的请求路径。

// app.use(koa.routes()); // 将路由规则挂载到Koa上。

app.listen(8889,() => {
  console.log('Koa is listening in 8889');
});

module.exports = app;
