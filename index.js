const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const Pergunta = require("./database/Pergunta")
const Resposta = require("./database/Resposta")
const connection = require("./database/database")

// Database
connection
    .authenticate()
    .then(() => {
    console.log("Conexao com do DB feita com sucesso")

    })
    .catch((msgErro) => {
        console.log(msgErro)
    })
// use ejs como view engine

app.set('view engine','ejs')
app.use(express.static('public'))

// Body Parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Rotas
app.get("/",(req, res) => {
    // salva os dados do db na var perguntas e ordena
    // raw: true traz apenas dados essenciais 
    Pergunta.findAll( {raw: true, order: [
        ['id','DESC']
    ] }).then(perguntas => {
        res.render("index",{
            perguntas: perguntas
        })
    })
  
})

app.get("/perguntar",(req, res) => {
    res.render("perguntar")
})

app.post("/salvarpergunta",(req, res) => {
    var titulo = req.body.titulo
    var descricao = req.body.descricao
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/")
    })
    
})

app.get("/pergunta/:id",(req, res) => {
    var id = req.params.id
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta => {
        if(pergunta != undefined) { // pergunta encontrada

            Resposta.findAll({
                where: {perguntaId : pergunta.id},
                order: [
                    ['id','desc']
                ]
            }).then(respostas => {

                res.render("pergunta",{
                    pergunta: pergunta,
                    respostas: respostas
                })

            }

            )

            
        } else { // não encontrada
            res.redirect("/")

        }
    })
})

app.post("/salvarresposta",(req,res) => {
    var resposta = req.body.resposta
    var perguntaId = req.body.id_pergunta
    Resposta.create({
        resposta: resposta,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/" + perguntaId)
    }

    )
})

app.listen(4001, () => {
    console.log("App rodando...")
})