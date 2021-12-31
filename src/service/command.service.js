const Command = require("../model/command.model")
const User = require("../model/user.model")

class CommandService {
    async addCommand(user_id, article_id, context) {
        const res = await Command.create({
            user_id,
            article_id,
            context,
        })
        return res.dataValues
    }

    async findCommandList(article_id) {
        const article_idNum = Number(article_id)
        const { count, rows } = await Command.findAndCountAll({
            where: {
                article_id: article_idNum
            },
            include: [{
                model: User,
                attributes: ['username', 'avatar'],
                required: false
            }],
        })
        return { count, rows }
    }
}

module.exports = new CommandService()
