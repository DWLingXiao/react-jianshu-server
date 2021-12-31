const Article = require('../model/article.model')
const User = require('../model/user.model')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class ArticleService {
    async writeArticle({ writer_id, article_title, context, article_img }) {
        const res = await Article.create({
            writer_id,
            article_title,
            context,
            article_img
        })
        return res.dataValues
    }

    async findArticleList(pageNum, pageSize) {
        const offset = (pageNum - 1) * pageSize
        const { count, rows } = await Article.findAndCountAll({
            where: {
                article_status: 1
            },
            include: [{
                model: User,
                attributes: ['username'],
                required: false
            }]
            ,
            offset: offset, limit: pageSize * 1
        })
        return {
            pageNum,
            pageSize,
            total: count,
            list: rows
        }
    }

    async findArticleDetail(id) {
        const res = await Article.findOne({
            where: {
                id: id
            },
            include: [{
                model: User,
                attributes: ['username', 'avatar'],
                required: false
            }]
        })
        const watch = await Article.findOne({
            where: {
                id: id
            },
            attributes: ['watchNum']
        })
        let addWatch = ++watch.dataValues.watchNum
        const updateWatchNum = await Article.update({ watchNum: addWatch }, {
            where: {
                id: id
            }
        })
        return res
    }

    async searchArticleList(title, time) {
        let role = 'watchNum'
        if (time) {
            role = 'createdAt'
        }
        const { count, rows } = await Article.findAndCountAll({
            where: {
                article_title: {
                    [Op.like]: '%' + title + '%'
                }
            },
            include: [{
                model: User,
                attributes: ['username', 'avatar'],
                required: false
            }],
            order: [
                [role, 'DESC']
            ]
        })
        return { count, rows }
    }

}

module.exports = new ArticleService()