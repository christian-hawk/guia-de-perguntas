const Sequelize = require("sequelize");
const connection = require("./database")

const Pergunta = connection.define('perguntas',{
    titulo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false
    }
})

// force não recria a tabela se ela ja estiver criada
Pergunta.sync({force: false}).then(() => {});

module.exports = Pergunta