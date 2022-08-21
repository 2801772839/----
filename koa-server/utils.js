// 引入mysql
const mysql = require('mysql')
const jwt = require('jsonwebtoken')

function __connection() {
  var connection = mysql.createConnection({
    host: 'localhost', // 连接的服务器(代码托管到线上后，需改为内网IP，而非外网)
    database: 'any_manage', // 数据库名称
    user: 'root', // 用户名
    password: '123456', // 用户密码
  })
  connection.connect()
  return connection
}

//对数据库进行增删改查操作的基础
const query = function (sql, parmas = null) {
  // 获取数据库链接对象
  var connection = __connection()
  return new Promise(function (reject, resolve) {
    // 执行SQL语句
    connection.query(sql, parmas, function (error, results, fields) {
      if (error) throw error
      reject(results)
    })
    // 关闭链接
    connection.end()
  })
}

/**
 * 返回信息封装
 * message:请求结果信息
 * data返回给前端的信息
 * 0 1  2
 */
const returnMsg = (errCode, message, data) => {
  return {
    errCode: errCode || 0,
    message: message || '',
    data: data || {},
  }
}
/**
 * 数据库操作的promise封装
 */
const queryFn = sql => {
  return new Promise((resolve, reject) => {
    query(sql, (err, rows) => {
      if (err) reject(err)
      resolve(rows)
    })
  })
}

/**
 * 鉴权
 */
const jwtVerify = token => {
  try {
    //解密  可以得到username  和password
    jwt.verify(token, 'anysg')
  } catch {
    //鉴权失败
    return false
  }
  //鉴权成功
  return true
}
module.exports = {
  query,
  returnMsg,
  queryFn,
  jwtVerify,
}
