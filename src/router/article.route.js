const Router = require('koa-router')
const { write, uploadImg, getArticleList, getArticleDetail, searchArticle, getUp } = require('../controller/article.controller')
const { auth } = require('../middleware/auth.middleware')

const router = new Router({ prefix: '/article' })


//上传图片
router.post('/write/upload', auth, uploadImg)

//写文章
router.post('/write', auth, write)

//获取文航列表
router.get('/', getArticleList)

//获取文章详情
router.get('/detail', getArticleDetail)

//文章搜索
router.get('/search', searchArticle)


module.exports = router