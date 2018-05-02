//koa-router

const Koa = require('koa');
const router = require('koa-router')();
const bodyparser = require('koa-bodyparser');

const app = new Koa();

app.use(bodyparser());

//记录访问事件
app.use(async (ctx,next)=>{
    console.log(`Process ${ctx.method} ${ctx.url}...`);
    console.log(0);
    await next();
});
console.log(1);
//路由配置
// router.get('/hello/:name',async (ctx,next) =>{
//     var name = ctx.params.name;
//     ctx.body = `<h1>hello,${name}</h1>`;
//     console.log(2);
// });

// router.get('/',async (ctx,next)=>{
//     ctx.body = '<h1>Home Page</h1>'
//     console.log(3);
// });

router.get('/', async (ctx, next) => {
    ctx.response.body = `<h1>Index</h1>
        <form action="/signin" method="post">
            <p>Name: <input name="name" value="dotnot"></p>
            <p>Password: <input name="password" type="password"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`;
});

router.post('/signin', async (ctx, next) => {
    var
        name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
    console.log(`signin with name: ${name}, password: ${password}`);
    if (name === 'dotnot' && password === '888888') {
        ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
    } else {
        ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/">Try again</a></p>`;
    }
});

//路由挂载到中间件
app.use(router.routes());
console.log(4);
//服务开启
app.listen(3000);
console.log('app started at port 3000...')