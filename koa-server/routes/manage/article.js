const Router = require('koa-router')
const router = new Router()
const { returnMsg, queryFn, jwtVerify } = require('../../utils')
//文章列表
router.get('/list', async ctx => {
  let sql = `select id,title,author,content,date,subtitle from article`
  let result = await queryFn(sql)

  ctx.body = returnMsg(200, '文章获取成功', result)
})
//根据id显示当前文章
router.post(`/list/`, async ctx => {
  let { id } = ctx.request.body
  if (!id) {
    ctx.body = returnMsg(400, '参数错误')
    return
  }
  console.log(id)
  let sql = `select * from article where id=${id}`
  let result = await queryFn(sql)

  ctx.body = returnMsg(200, '文章获取成功', result)
})
//文章编辑
router.post('/list/edit', async ctx => {
  //鉴权
  let token = ctx.request.headers['token']
  //鉴权
  if (!jwtVerify(token)) {
    ctx.body = returnMsg(400, 'token过期或没有该用户', '查询失败')
    return
    console.log('报错了')
  }
  // //查询是否有编辑权限
  let sqledit = `select role from user where token ='${token}'`
  let resultedit = await queryFn(sqledit)
  if (resultedit[0].role === 1) {
    //有编辑权限
    let { id, content, author } = ctx.request.body
    console.log(ctx.request.body)
    //查询数据是否有这片文章
    let sqlid = `select * from article where id=${id}`
    let resultid = await queryFn(sqlid)
    ctx.body = resultid
    if (resultid.length > 0) {
      //代表有该文章,就修改该文章
      let sqled = `update article set content='${content}',author='${author}' where id=${id}`
      await queryFn(sqled)
      //如果改完文章,
      // 就返回最新的列表
      let sql = `select * from article where id=${id}`
      let result = await queryFn(sql)
      ctx.body = returnMsg(200, '文章修改成功', result)
    } else {
      //文章不存在
      ctx.body = returnMsg(400, '当前编辑的文章不存在')
      return
    }
  } else {
    //没有编辑权限
    ctx.body = returnMsg(400, '您没有权限编辑')
    return
  }
})
//删除文章
router.post(`/del/`, async ctx => {
  let { id } = ctx.request.body
  if (!id) {
    ctx.body = returnMsg(400, '参数错误')
    return
  }

  let sql = `delete from article where id=${id}`
  let result = await queryFn(sql)
  ctx.body = returnMsg(200, '文章删除成功', result)
})
module.exports = router
