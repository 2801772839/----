const Router = require('koa-router')
const router = new Router()
const { returnMsg, queryFn, jwtVerify } = require('../../utils')
const multer = require('@koa/multer') //加载@koa/multer模块

//添加用户
router.post('/add', async ctx => {
  let { username, nickname, address, password } = ctx.request.body
  if (username) {
    let sql = `SELECT * FROM user where username='${username}'`
    let result = await queryFn(sql)
    if (result.length > 0) {
      ctx.body = returnMsg(201, '添加失败', '该用户已存在')
    } else {
      //没有新用户开始注册
      let sql1 = `insert into user values(null,'${username}',${password},null,'avatar.jpg','${address}','${nickname}',0)`
      await queryFn(sql1)
      ctx.body = returnMsg(200, '新用户添加成功')
    }
  } else {
    ctx.body = returnMsg(400, '参数有错误', '参数有问题')
  }
})

//删除用户
router.post(`/del/`, async ctx => {
  let { id } = ctx.request.body
  if (!id) {
    ctx.body = returnMsg(400, '参数错误')
    return
  }
  let sql = `delete from user where id=${id}`
  let result = await queryFn(sql)
  ctx.body = returnMsg(200, '用户删除成功', result)
})
//根据条件查询用户
router.post('/search', async ctx => {
  let { username, address } = ctx.request.body
  console.log('返回数值' + '名字是' + username, '地址是' + address)
  if (username != '' || address != '') {
    let sql = `SELECT * FROM user where username like '%${username}%' and address like '%${address}%'`
    let result = await queryFn(sql)
    ctx.body = returnMsg(200, '查询成功', result)
  } else {
    ctx.body = returnMsg(400, '参数有误')
  }
})
//修改用户权限
router.post(`/update/`, async ctx => {
  let { username } = ctx.request.body
  // //查询是否有编辑权限
  let sqledit = `select username from user where  username='${username}'`
  await queryFn(sqledit)
  if (username === 'admin') {
    //有编辑权限
    let { id, role } = ctx.request.body
    //查询数据是否有这片文章
    let sqlid = `select role from user where id=${id}`
    let resultid = await queryFn(sqlid)
    ctx.body = resultid

    if (resultid[0].role == 0) {
      let sqled = `update user set role=${role + 1}  where id=${id}`
      let result = await queryFn(sqled)
      let sql3 = `select * from user where id=${id}`
      let gitrole = await queryFn(sql3)

      ctx.body = returnMsg(200, '修改成功', gitrole)
    } else if (resultid[0].role == 1) {
      // console.log(resultid[0])
      let sql = `update user set role=${role - 1}  where id=${id}`
      let result1 = await queryFn(sql)
      let sql3 = `select role from user where id=${id}`
      let gitroel = await queryFn(sql3)
      ctx.body = returnMsg(200, '修改成功', gitroel)
      return
    }
  } else {
    //没有编辑权限
    ctx.body = returnMsg(400, '您没有权限编辑')
    return
  }
})
//个人信息
router.post('/info/', async ctx => {
  let { username } = ctx.request.body
  let sql = `select * from user where username='${username}'`
  let result = await queryFn(sql)
  ctx.body = returnMsg(200, '查询成功', result)
})
//更新用户信息
router.post('/updateinfo/', async ctx => {
  //接收前端发来的token
  let token = ctx.request.headers['token']
  //鉴权
  if (!jwtVerify(token)) {
    ctx.body = returnMsg(400, 'token过期或没有该用户')
    console.log(ctx.request.headers)
    return
  }
  //查询是否有编辑权限
  let sqledit = `select role,nickname from user where token ='${token}'`

  await queryFn(sqledit)

  if (token) {
    let { username, token, nickname, address, password, avatar } =
      ctx.request.body
    let sql = `update user set nickname='${nickname}',address='${address}',username='${username}',password='${password}',avatar='${avatar}' where token='${token}'`
    await queryFn(sql)
    let sql2 = `select * from user where token='${token}'`
    let result = await queryFn(sql2)
    ctx.body = returnMsg(200, '更新成功', result[0])
  } else {
    ctx.body = returnMsg(400, '失败', token对应用户不存在)
  }
  // let { username, nickname, address, password } = ctx.request.body
  // let sql = `update user set nickname='${nickname}',address='${address}',password='${password}' where username='${username}'`
  // let result = await queryFn(sql)
  // ctx.body = returnMsg(200, '更新成功', result)
})

module.exports = router
