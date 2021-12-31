const { addCommand, findCommandList } = require('../service/command.service')

class CommandController {
    async writeCommand(ctx, next) {
        const { user_id, article_id, context } = ctx.request.body
        const res = await addCommand(user_id, article_id, context)

        ctx.body = {
            code: 0,
            message: "添加评论成功",
            result: res
        }
    }

    async getCommandList(ctx) {
        const { article_id } = ctx.request.query
        const res = await findCommandList(article_id)

        ctx.body = {
            code: 0,
            message: "获取文章评论成功",
            result: res
        }
    }
}

module.exports = new CommandController()