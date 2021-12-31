const path = require('path')
const { ImgUpLoadError } = require('../constant/err.type')
const { writeArticle, findArticleList, findArticleDetail, searchArticleList } = require('../service/article.service')

class ArticleController {

    async write(ctx, next) {

        const { writer_id, article_title, context, article_img } = ctx.request.body
        const res = await writeArticle({ writer_id, article_title, context, article_img })
        ctx.body = {
            code: 0,
            message: '文章发表成功',
            result: ''
        }
    }

    async uploadImg(ctx, next) {
        const { file } = ctx.request.files
        if (file) {
            const baseName = path.basename(file.path)
            ctx.body = {
                code: 0,
                message: '图片上传成功',
                result: {
                    img: baseName
                }
            }

        } else {
            return ctx.app.emit('error', ImgUpLoadError, ctx)
        }
    }

    async getArticleList(ctx, next) {
        const { pageNum = 1, pageSize = 10 } = ctx.request.query
        const res = await findArticleList(pageNum, pageSize)
        ctx.body = {
            code: 0,
            message: '获取文章列表成功',
            result: res
        }
    }

    async getArticleDetail(ctx, next) {
        const { id } = ctx.request.query
        const res = await findArticleDetail(id)
        ctx.body = {
            code: 0,
            message: '获取文章详情成功',
            result: res
        }
    }

    async searchArticle(ctx) {
        const { title, time } = ctx.request.query
        const res = await searchArticleList(title, time)
        ctx.body = {
            code: 0,
            message: '获取文章列表成功',
            result: res
        }
    }

}


module.exports = new ArticleController()