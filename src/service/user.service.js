const User = require('../model/user.model')
const Article = require('../model/article.model')
const Follow = require('../model/follow.model')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class UserService {
    async createUser(username, password, phoneNumber) {
        //写入数据库
        const res = await User.create({
            username,
            phoneNumber,
            password,
        })
        return res.dataValues
    }

    async getUserInfo({ id, username, phoneNumber }) {
        const whereOpt = {}
        id && Object.assign(whereOpt, { id })
        username && Object.assign(whereOpt, { username })
        phoneNumber && Object.assign(whereOpt, { phoneNumber })
        const res = await User.findOne({
            attributes: ['id', 'username', 'password', 'phoneNumber', 'status', 'avatar', 'user_sign', 'createdAt'],
            where: whereOpt
        })
        return res ? res.dataValues : null
    }

    async updateById({ id, username, password, avatar, user_sign, status }) {
        const whereopt = { id }
        const newUser = {}
        username && Object.assign(newUser, { username })
        password && Object.assign(newUser, { password })
        avatar && Object.assign(newUser, { avatar })
        user_sign && Object.assign(newUser, { user_sign })
        status && Object.assign(newUser, { status })

        const res = await User.update(newUser, { where: whereopt })

        return res[0] > 0 ? true : false
    }

    async handleWriterInfo(writer_id) {
        const { count, rows } = await Article.findAndCountAll({
            where: {
                writer_id: writer_id,
                article_status: 1
            },
            attributes: ['writer_id', 'id', 'article_title', 'watchNum', 'likes', 'article_status', 'article_img', 'context', 'createdAt', 'updatedAt'],
        })
        const writer_info = await User.findOne({
            where: {
                id: writer_id
            },
            attributes: ['username', 'avatar', 'fans', 'user_sign', 'createdAt']
        })
        return { count, rows, writer_info }
    }

    async searchUserList(title) {

        const { count, rows } = await User.findAndCountAll({
            where: {
                username: {
                    [Op.like]: '%' + title + '%'
                },
                status: 1
            },
            attributes: ['id', 'username', 'avatar', 'fans'],
            order: [
                ['fans', 'DESC']
            ]
        })
        return { count, rows }
    }
}

module.exports = new UserService()