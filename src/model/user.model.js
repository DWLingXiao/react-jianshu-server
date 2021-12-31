const { DataTypes, INTEGER } = require('sequelize')
const seq = require('../db/seq')

const User = seq.define('user', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    status: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1,
        comment: '账号是否被封禁，1不封禁'
    },
    fans: {
        type: INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: '粉丝数'
    },
    avatar: {
        type: DataTypes.STRING,
        defaultValue: 'defaultAvatar.jpg',
        comment: '头像地址'
    },
    user_sign: {
        type: DataTypes.TEXT,
        defaultValue: '暂无',
        comment: '个性签名'
    }

})

//User.sync({ force: true })

module.exports = User