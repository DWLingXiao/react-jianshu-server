const { DataTypes } = require('sequelize')
const seq = require('../db/seq');
const User = require('./user.model');

const Follow = seq.define('follow', {
    writer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "作者id"
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "用户id"
    },
    status: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1,
        comment: "关注状态"
    }
})

//Follow.sync({ force: true })
Follow.belongsTo(User, { foreignKey: 'writer_id', targetKey: 'id' })
module.exports = Follow