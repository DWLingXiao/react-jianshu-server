const Router = require('koa-router')
const { auth } = require('../middleware/auth.middleware')
const { getFollow, canFollow, getFollowList, getTopFansUser } = require('../controller/follow.controller')

const router = new Router({ prefix: '/follow' })




//获取粉丝数最多用户
router.get('/all', getTopFansUser)

//获取关注列表
router.get('/get', auth, getFollowList)

//关注接口
router.post('/', auth, getFollow)

//取消关注接口
router.post('/cancel', auth, canFollow)

//

module.exports = router