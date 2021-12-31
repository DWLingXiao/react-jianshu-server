const { DataTypes } = require('sequelize')
const seq = require('../db/seq');
const Article = require('./article.model');
const User = require('./user.model');

const Up = seq.define('up', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "用户id"
    },
    article_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "文章id"
    },
    status: {
        type: DataTypes.TINYINT,
        allowNull: false,
        comment: "点赞状态",
        defaultValue: 1
    }
})

//Up.sync({ force: true })
Up.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id' })
Up.belongsTo(Article, { foreignKey: 'article_id', targetKey: 'id' })
module.exports = Up