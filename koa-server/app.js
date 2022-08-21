const Koa = require('koa2')
const cors = require('koa2-cors')
const router = require('./routes')
const bodyParser = require('koa-bodyparser')
const path = require('path')
const static = require('koa-static')
const app = new Koa()
const port = 9000

app.use(cors())
//路由
router.get('/manage', async ctx => {
  ctx.body = '管理系统'
})
router.redirect('/', '/manage')
// 获取静态资源文件夹
app.use(static(path.join(__dirname, '/assets')))

//解决跨域

app.use(cors())
// bodyParser
app.use(bodyParser())
//路由
app.use(router.routes(), router.allowedMethods())
//404跳转

app.use(async (ctx, next) => {
  await next()
  if (parseInt(ctx.status) === 404) {
    ctx.response.redirect('/404')
  }
})
app.listen(port, () => {
  console.log(`服务器运行在  http://localhost:${port}`)
})
