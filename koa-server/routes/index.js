const Router = require('koa-router')
const manage = require('./manage')
const errorPage = require('./errorPage')
const router = new Router()

router.use('/manage', manage.routes(), manage.allowedMethods())
// 404页面路由
router.use('/404', errorPage.routes(), errorPage.allowedMethods())
module.exports = router
