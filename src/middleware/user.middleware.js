const bcrypt = require('bcryptjs')
const { getUserInfo } = require('../service/user.service')
const {
    userAlreadyExited,
    userFormateError,
    userRegisterError,
    userDoesNotExit,
    userLoginError,
    invalidPassword,
    userIsNotAllowedLogin
} = require('../constant/err.type')

const userValidator = async (ctx, next) => {
    const { username, password, phoneNumber } = ctx.request.body
    if (!username || !password || !phoneNumber) {
        ctx.app.emit('error', userFormateError, ctx)
    }

    await next()
}

const verifyUser = async (ctx, next) => {
    const { username, phoneNumber } = ctx.request.body
    try {
        const res = await getUserInfo({ username, phoneNumber })
        if (res) {
            console.error('用户名或手机号已存在', { username, phoneNumber })
            ctx.app.emit('error', userAlreadyExited, ctx)
            return
        }
    } catch (error) {
        ctx.app.emit('error', userRegisterError, ctx)
        return
    }

    await next()
}

const crpytPassword = async (ctx, next) => {
    const { password } = ctx.request.body
    if (password) {
        const salt = bcrypt.genSaltSync(10)

        //哈希保存的是密文
        const hash = bcrypt.hashSync(password, salt)
        ctx.request.body.password = hash
        await next()
    } else {
        await next()
    }

}

const verifyLogin = async (ctx, next) => {
    const { phoneNumber, password } = ctx.request.body
    try {
        const res = await getUserInfo({ phoneNumber })
        if (!res) {
            console.error('手机号不存在', { phoneNumber })
            ctx.app.emit('error', userDoesNotExit, ctx)
            return
        }
        if (!bcrypt.compareSync(password, res.password)) {
            ctx.app.emit('error', invalidPassword, ctx)
            return
        }
        if (!res.status) {
            ctx.app.emit('error', userIsNotAllowedLogin, ctx)
            return
        }
    } catch (error) {
        console.error(error)
        ctx.app.emit('error', userLoginError, ctx)
        return
    }
    await next()
}

module.exports = {
    userValidator,
    verifyUser,
    crpytPassword,
    verifyLogin
}