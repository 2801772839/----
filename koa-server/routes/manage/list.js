const Router = require('koa-router')
const router = new Router()
const { returnMsg, queryFn, query } = require('../../utils')
//分页查询
router.post('/', async ctx => {
  let sql1 = `SELECT COUNT(*) id  FROM user `
  let result1 = await queryFn(sql1)
  //total 是获取到的总数
  let total = result1[0].id
  ctx.body = total

  //前端传来的
  // pageNum 表示页码
  // pageSize 表示页码展示多少的个数
  let { pageNum, pageSize } = ctx.request.body
  if (!pageNum || !pageSize) {
    ctx.body = returnMsg(400, '参数错误')
    return
  }

  let sql = `SELECT id,username,nickname,address,role  FROM user limit ${pageNum},${pageSize}`
  // console.log(pageNum)
  // console.log(pageSize)
  let result = await queryFn(sql) //得到pageSize项数据的数组

  ctx.body = returnMsg(200, '分页查询成功', {
    pageNum,
    pageSize,
    total,
    listArr: result,
  })
})

module.exports = router
