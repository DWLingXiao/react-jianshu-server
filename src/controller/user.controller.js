const jwt = require('jsonwebtoken')

const { createUser, getUserInfo, updateById, handleWriterInfo, searchUserList } = require('../service/user.service')
const { userRegisterError } = require('../constant/err.type')

class UserController {
    async register(ctx, next) {
        //获取数据
        const { username, password, phoneNumber } = ctx.request.body
        try {
            const res = await createUser(username, password, phoneNumber)
            ctx.body = {
                code: 0,
                message: '用户注册成功',
                result: {
                    ...res
                }
            }
        } catch (error) {
            console.log(error)
            ctx.app.emit('error', userRegisterError, ctx)
        }


    }

    async login(ctx, next) {
        const { phoneNumber } = ctx.request.body
        //获取用户信息
        try {
            const res = await getUserInfo({ phoneNumber })
            const { password, ...resUser } = res
            ctx.body = {
                code: 0,
                message: '用户登录成功',
                result: {
                    ...resUser,
                    token: jwt.sign(resUser, 'czxjs', { expiresIn: '1d' })
                }
            }
        } catch (error) {
            console.error('用户登录失败', error)
        }
    }

    async changeUserInfo(ctx, next) {
        const { id } = ctx.state.user
        const { username, password, user_sign, avatar, status } = ctx.request.body
        const res = await updateById({ id, username, password, user_sign, avatar, status })
        if (res) {
            ctx.body = {
                code: 0,
                message: '用户修改成功',
                result: ''
            }
        } else {
            ctx.body = {
                code: '10007',
                message: '用户修改失败',
                result: ''
            }
        }
    }

    async getWriterInfo(ctx) {
        const { writer_id } = ctx.request.query
        const res = await handleWriterInfo(writer_id)
        ctx.body = {
            code: 0,
            message: '作者基本信息',
            result: res
        }
    }

    async searchUser(ctx) {
        const { title } = ctx.request.query
        const res = await searchUserList(title)
        ctx.body = {
            code: 0,
            message: '搜索用户成功',
            result: res
        }
    }
}

module.exports = new UserController()