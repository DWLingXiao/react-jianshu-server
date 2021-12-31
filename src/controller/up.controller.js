const { getUp, isUserUp } = require('../service/up.service')

class UpController {
    async addUp(ctx) {
        const { user_id, article_id } = ctx.request.body

        const res = await getUp(user_id, article_id)

        ctx.body = {
            code: 0,
            message: "点赞成功",
            result: res
        }
    }

    async isUp(ctx) {
        const { user_id, article_id } = ctx.request.query

        const res = await isUserUp(user_id, article_id)

        ctx.body = {
            code: 0,
            result: res
        }

    }
}

module.exports = new UpController()