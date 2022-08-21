// 用户信息接口 (查询) (修改)
const Router = require('koa-router')
const router = new Router()
const { returnMsg, queryFn, jwtVerify } = require('../../utils')
//查询用户信息
router.get('/', async ctx => {
  //获取token
  let token = ctx.request.headers.token
  //鉴权
  if (!jwtVerify(token)) {
    ctx.body = returnMsg(400, 'token过期或没有该用户', '查询失败')
    return
  }
  //数据库查询对应用户
  let sql = `  select username,token,avatar from user where token='${token}' `
  let result = await queryFn(sql)
  ctx.body = returnMsg(200, 'token存在且查询成功', result[0])
})

module.exports = router
