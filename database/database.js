const Sequelize = require('sequelize')

const connection = new Sequelize('guia_perguntas','root','password',{
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection