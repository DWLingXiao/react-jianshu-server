const Article = require("../model/article.model");
const Up = require("../model/up.model");

class UpService {

    async getUp(user_id, article_id) {
        //点赞状态
        const ttStatus = await Up.findOne({
            where: {
                user_id: user_id,
                article_id: article_id,
            },
        })

        //文章点赞数量
        const upNum = await Article.findOne({
            where: {
                id: article_id
            },
            attributes: ['likes']
        })
        let curUpNum = upNum.dataValues.likes
        let message = ""
        let proUpNum
        if (ttStatus) {
            let proStatus = ttStatus.dataValues.status
            if (proStatus === 1) {
                proStatus = 0
                message = "取消点赞成功"
                proUpNum = curUpNum - 1
                const res1 = await Article.update({ likes: proUpNum }, {
                    where: {
                        id: article_id
                    }
                })
            } else if (proStatus === 0) {
                proStatus = 1
                message = "点赞成功"

                proUpNum = curUpNum + 1
                const res2 = await Article.update({ likes: proUpNum }, {
                    where: {
                        id: article_id
                    }
                })
            }
            const res3 = await Up.update({ status: proStatus }, {
                where: {
                    user_id: user_id,
                    article_id: article_id,
                }
            })
            return { res3, message, proStatus, proUpNum }
        } else {
            const res = await Up.create({
                user_id,
                article_id
            })
            proUpNum = curUpNum++
            await Article.update({ likes: proUpNum }, {
                where: {
                    id: article_id
                }
            })
            const resDav = res.dataValues
            return { resDav, message }
        }
    }

    async isUserUp(user_id, article_id) {
        const status = await Up.findOne({
            where: {
                user_id: user_id,
                article_id: article_id,
                status: 1
            },
        })
        if (status !== null) {
            return status.dataValues
        } else {
            return null
        }
    }

}

module.exports = new UpService()

