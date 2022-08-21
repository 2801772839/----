const Router = require('koa-router')
const router = new Router()
const { returnMsg, queryFn, jwtVerify } = require('../../utils')
const moment = require('moment')
//添加文章
router.post('/', async ctx => {
  //鉴权
  let token = ctx.request.headers['token']

  //鉴权
  if (!jwtVerify(token)) {
    ctx.body = returnMsg(400, 'token过期或没有该用户')
    return
  }
  //查询是否有编辑权限
  let sqledit = `select role,nickname from user where token ='${token}'`

  let resultedit = await queryFn(sqledit)
  // ctx.body = resultedit
  if (resultedit[0].role === 1) {
    //有编辑权限
    let { title, subtitle, content } = ctx.request.body
    if (!title || !content) {
      ctx.body = returnMsg(400, '参数错误')
      return
    }
    //添加文章
    let mydate = moment().format('YYYY-MM-DD')

    let sql = `insert into article values(null,'${title}','${content}','${
      resultedit[0].nickname
    }','${subtitle || ''}','${mydate}')`
    await queryFn(sql)
    ctx.body = returnMsg(200, '文章添加成功')
  } else {
    //没有编辑权限
    ctx.body = returnMsg(400, '您没有权限请联系管理员', resultedit)
    return
  }
})

module.exports = router
