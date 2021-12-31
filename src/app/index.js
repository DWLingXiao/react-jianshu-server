const Koa = require('koa')
const cors = require('koa2-cors')
const koaBody = require('koa-body')
const koaStatic = require('koa-static')
const path = require('path')
const router = require('../router')
const errHandle = require('./errHandle')

const app = new Koa()

//app.use()
app.use(cors())
// app.use(async (ctx, next) => {
//     ctx.set('Access-Control-Allow-Origin', 'http://localhost:3000');
//     ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild', '');
//     ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
//     if (ctx.method == 'OPTIONS') {
//         ctx.body = 200;
//     } else {
//         await next();
//     }
// });
app.use(koaBody({
    multipart: true,
    formidable: {
        //option的相对路径，相对的是process.cwd()
        uploadDir: path.join(__dirname, '../upload'),
        keepExtensions: true
    }
}))
app.use(koaStatic(path.join(__dirname, '../upload')))
app.use(router.routes()).use(router.allowedMethods())


//统一的错误处理
app.on('error', errHandle)

module.exports = app