const Router = require('koa-router')
const { auth } = require('../middleware/auth.middleware')
const { addUp, isUp } = require('../controller/up.controller')

const router = new Router({ prefix: '/up' })


//点赞接口
router.post('/add', auth, addUp)

//判断用户是否已经点赞文章
router.get('/isUp', isUp)

module.exports = router