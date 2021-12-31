const { DataTypes } = require('sequelize')
const seq = require('../db/seq');
const User = require('./user.model');

const Article = seq.define('article', {
    writer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "作者id"
    },
    article_title: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: "文章标题"
    },
    context: {
        type: DataTypes.TEXT,
        comment: "文章内容"
    },
    article_img: {
        type: DataTypes.STRING,
        comment: "图片地址"
    },
    watchNum: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: "阅读量"
    },
    likes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: "点赞量"
    },
    article_status: {
        type: DataTypes.TINYINT,
        defaultValue: 1,
        comment: '文章状态'
    }
})
//Article.sync({ force: true })
Article.belongsTo(User, { foreignKey: 'writer_id', targetKey: 'id' });
module.exports = Article