const Router = require('koa-router')
const router = new Router()
const { returnMsg, queryFn } = require('../../utils')
router.post('/', async ctx => {
  let { username, password, nickname } = ctx.request.body
  //判断username和password是否同时存在
  if (username) {
    let sql = `SELECT * FROM user where username='${username}'`
    let result = await queryFn(sql)
    if (result.length > 0) {
      ctx.body = returnMsg(201, '注册失败', '该用户已注册')
    } else {
      //没有用户开始注册

      let sql1 = `insert into user values(null,'${username}',${password},null,'avatar.jpg',null,'${nickname}',0)`
      await queryFn(sql1)
      ctx.body = returnMsg(200, '注册成功')
    }
  } else {
    ctx.body = returnMsg(400, '参数有错误', '参数有问题')
  }
})

module.exports = router
