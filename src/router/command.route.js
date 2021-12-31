const Router = require('koa-router')
const { auth } = require('../middleware/auth.middleware')
const { writeCommand, getCommandList } = require('../controller/command.controller')

const router = new Router({ prefix: '/command' })


//添加评论
//router.post('/add', auth, writeCommand)
router.post('/write', auth, writeCommand)
//获取评论列表
router.get('/get', getCommandList)

module.exports = router