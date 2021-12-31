const Router = require('koa-router')
const { register, login, changeUserInfo, getWriterInfo, searchUser } = require('../controller/user.controller')
const {
    userValidator,
    verifyUser,
    crpytPassword,
    verifyLogin
} = require('../middleware/user.middleware')

const {
    auth
} = require('../middleware/auth.middleware')

const router = new Router({ prefix: '/user' })

//注册接口
router.post('/register', userValidator, verifyUser, crpytPassword, register)

//登录接口
router.post('/login', verifyLogin, login)

//修改接口
router.patch('/update', auth, crpytPassword, changeUserInfo)

//获用户信息
router.get('/get', getWriterInfo)

//用户搜索
router.get('/search', searchUser)



module.exports = router