const Router = require('koa-router')
const router = new Router()
const login = require('./login')
const register = require('./register')
const list = require('./list')
const article = require('./article')
const add = require('./add')
const user = require('./user')
const info = require('./info')
const upload = require('./upload')
const { query } = require('../../utils')

//返回所有用户信息
router.get('/', async ctx => {
  let result = await new Promise((resolve, reject) => {
    let sql = `SELECT * FROM user`
    query(sql, (err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  })
  // 将查询结果返回到页面中
  ctx.body = result
})
//删除用户

router.use('/login', login.routes(), login.allowedMethods())
router.use('/register', register.routes(), register.allowedMethods())
router.use('/list', list.routes(), list.allowedMethods())
router.use('/article', article.routes(), article.allowedMethods())
router.use('/info', info.routes(), info.allowedMethods())
router.use('/addedit', add.routes(), add.allowedMethods())
router.use('/user', user.routes(), user.allowedMethods())
router.use('/upload', upload.routes(), upload.allowedMethods())
module.exports = router
