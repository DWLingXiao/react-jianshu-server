const Sequelize = require('sequelize')
const Follow = require('../model/follow.model')
const User = require('../model/user.model')
const Op = Sequelize.Op

class FollowService {
    async handleFollow(user_id, writer_id) {
        const res = await Follow.findOne({
            where: {
                user_id: user_id,
                writer_id: writer_id
            }
        })
        const prevFansNum = await User.findOne({
            where: {
                id: writer_id
            },
            attributes: ['fans']
        })
        let newFansNum = prevFansNum.dataValues.fans
        if (res) {
            const curStatus = res.dataValues.status
            if (curStatus === 1) {
                return '用户已关注'

            } else if (curStatus === 0) {
                newFansNum = newFansNum + 1
                const res2 = await Follow.update({ status: 1 }, {
                    where: {
                        user_id: user_id,
                        writer_id: writer_id
                    }
                })
                const res3 = await User.update({ fans: newFansNum }, {
                    where: {
                        id: writer_id
                    }
                })
                return '关注成功'
            }
        }
        const res2 = await Follow.create({
            user_id,
            writer_id
        })
        newFansNum = newFansNum + 1
        const res3 = await User.update({ fans: newFansNum }, {
            where: {
                id: writer_id
            }
        })
        return { res: res2.dataValues }
    }

    async cancelFollow(user_id, writer_id) {
        const res = await Follow.findOne({
            where: {
                user_id: user_id,
                writer_id: writer_id
            }
        })
        if (!res) {
            return '用户不存在'
        }
        const prevFansNum = await User.findOne({
            where: {
                id: writer_id
            },
            attributes: ['fans']
        })
        let newFansNum = prevFansNum.dataValues.fans - 1
        const res2 = await Follow.update({ status: 0 }, {
            where: {
                user_id: user_id,
                writer_id: writer_id
            }
        })
        const res3 = await User.update({ fans: newFansNum }, {
            where: {
                id: writer_id
            }
        })

        return { res: res2.dataValues }
    }

    async getList(user_id) {
        const { count, rows } = await Follow.findAndCountAll({
            where: {
                user_id: user_id,
                status: 1
            },
            include: [
                {
                    model: User,
                    attributes: ['id', 'username'],
                    required: false
                }
            ]
        })
        return {
            count,
            list: rows
        }

    }

    async getTopFansUserList(page) {
        const pageSize = 5
        const { count, rows } = await User.findAndCountAll({
            where: {
                status: 1,
            },
            attributes: ['id', 'username', 'avatar', 'fans', 'status'],
            offset: (page - 1) * pageSize,
            limit: pageSize,
            order: [
                ['fans', 'DESC']
            ]
        })
        return { count, rows }
    }
}

module.exports = new FollowService()