const { Sequelize } = require('sequelize')

const seq = new Sequelize('jianshu', 'root', 'czx7020866', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = seq