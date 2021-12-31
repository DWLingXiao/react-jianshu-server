const { DataTypes } = require('sequelize')
const seq = require('../db/seq');
const Article = require('./article.model');
const User = require('./user.model');

const Command = seq.define('command', {
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
    context: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: "评论内容"
    }
})

//Command.sync({ force: true })
Command.belongsTo(Article, { foreignKey: 'article_id', targetKey: 'id' });
Command.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id' });
module.exports = Command