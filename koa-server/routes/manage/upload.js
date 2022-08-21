const Router = require('koa-router')

const router = new Router()
const cors = require('koa2-cors')
const { returnMsg, queryFn, jwtVerify } = require('../../utils')
const multer = require('@koa/multer') //加载@koa/multer模块
const path = require('path')
const fs = require('fs')
//存储文件的名称
let myfilename = ''
// 创建存放头像图片的目录(当头像目录不存在时)
fs.readdir(__dirname + '/images/', function (err, files) {
  if (err) {
    fs.mkdir(__dirname + '/images/', function (err) {
      if (err) {
        console.log(err)
      }
      console.log('目录创建成功。')
    })
  }
})
var storage = multer.diskStorage({
  //文件保存路径
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '/images/'))
  },
  //修改文件名称
  filename: function (req, file, cb) {
    let type = file.originalname.split('.')[1]
    // logo.png -> logo.xxx.png
    myfilename = `${file.fieldname}-${Date.now().toString(16)}.${type}`
    cb(null, myfilename)
  },
})
//文件上传限制
const limits = {
  fields: 10, //非文件字段的数量
  fileSize: 200 * 1024, //文件大小 单位 b
  files: 1, //文件数量
}
const upload = multer({ storage, limits })

router.post('/img/', upload.single('this.form.avatar'), async ctx => {
  //图片上传
  //鉴权
  let token = ctx.request.headers['token']
  //鉴权
  if (!jwtVerify(token)) {
    ctx.body = returnMsg(400, 'token过期或没有该用户', '查询失败')
    return
  }
  let result = await new Promise((resolve, reject) => {
    // 获取token对应的用户
    const sql = `UPDATE user SET avatar='${myfilename}' WHERE token='${token}'`
    query(sql, (err, data) => {
      if (err) reject(err)
      resolve(true)
    })
  })

  if (result) {
    ctx.body = msgFormat(0, '图片上传成功', {
      // 要求前端自行补全域名
      filePath: `${myfilename}`,
    })
  } else {
    ctx.body = msgFormat(1, '操作失败请重试')
  }
})
module.exports = router
