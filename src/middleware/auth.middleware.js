const jwt = require('jsonwebtoken')
const { tokenExpiredError, invalidToken } = require('../constant/err.type')

const auth = async (ctx, next) => {
    const { authorization } = ctx.request.header
    const token = authorization.replace('Bearer ', '')
    try {
        const user = jwt.verify(token, 'czxjs')
        ctx.state.user = user
    } catch (error) {
        switch (error.name) {
            case 'TokenExpiredError':
                console.error('token过期', error)
                return ctx.app.emit('error', tokenExpiredError, ctx)
            case 'JsonWebTokenError':
                console.error('token无效', error)
                return ctx.app.emit('error', invalidToken, ctx)
            default:
                break;
        }
    }

    await next()
}

module.exports = {
    auth
}