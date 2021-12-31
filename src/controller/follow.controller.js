const { handleFollow, cancelFollow, getList, getTopFansUserList } = require('../service/follow.service')

class FollowController {
    async getFollow(ctx, next) {
        const { user_id, writer_id } = ctx.request.body
        const res = await handleFollow(user_id, writer_id)

        ctx.body = {
            code: 0,
            message: '关注成功',
            result: res
        }
    }

    async canFollow(ctx, next) {
        const { user_id, writer_id } = ctx.request.body
        const res = await cancelFollow(user_id, writer_id)

        ctx.body = {
            code: 0,
            message: '取消关注成功',
            return: res
        }
    }

    async getFollowList(ctx) {

        const { user_id } = ctx.request.query
        const res = await getList(user_id)

        ctx.body = {
            code: 0,
            message: '获取关注列表成功',
            result: res
        }
    }

    async getTopFansUser(ctx) {
        let page = ctx.request.query.currentPage || 1
        if (page > 2) {
            page = 1
        }
        const res = await getTopFansUserList(page)

        ctx.body = {
            code: 0,
            message: "获取粉丝数用户列表成功",
            result: res
        }
    }
}

module.exports = new FollowController()