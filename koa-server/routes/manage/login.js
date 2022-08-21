const Router = require('koa-router')
const router = new Router()
const jwt = require('jsonwebtoken')
const { returnMsg, queryFn } = require('../../utils')
router.post('/', async ctx => {
  let { username, password } = ctx.request.body

  if (username && password) {
    //查询数据库 有没有该用户
    let sql = `select * from user where username='${username}' and password='${password}'`
    let result = await queryFn(sql)
    if (result.length > 0) {
      //存在用户 把token存入用户
      // 根据username和password生成token
      let token = jwt.sign(
        { username, password }, // 携带信息
        'anysg', // 秘钥
        { expiresIn: '5h' } // 有效期：5h一小时
      )
      let sql1 = `update user set token='${token}' where username='${username}'`
      //插入token
      await queryFn(sql1)
      //再次查询
      let result1 = await queryFn(sql)
      ctx.body = returnMsg(200, '登录成功', result1[0])
      //
    } else {
      //不存在用户
      ctx.body = returnMsg(404, '用户不存在', '请先注册')
    }
  } else {
    ctx.body = returnMsg(1, '登录失败', '用户名或密码出错')
  }
})


module.exports = router
