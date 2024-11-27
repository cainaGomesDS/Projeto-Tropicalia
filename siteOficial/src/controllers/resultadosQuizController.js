var quizModel = require("../models/quizModel");


function listarResultadosPorUsuario(req, res) {
    var idUsuario = req.params.idUsuario;
    quizModel.listarResultadosPorUsuario(idUsuario)
        .then(resultado => {
            res.status(200).json(resultado);
        })
        .catch(erro => {
            console.error(erro);
            res.status(500).json({ error: erro.message });
        });
}


function salvarResultado(req, res) {
    var idUsuario = req.params.idUsuario;
    var resultado = req.body.pontuacaoServer;
    var acertos = req.body.acertosServer;
    var erros = req.body.errosServer;
    console.log(resultado)
    quizModel.salvarResultadoQuiz(idUsuario, resultado, acertos, erros)
        .then(resultado => {
            res.status(201).json({ message: "Resultado salvo com sucesso!", data: resultado });
        })
        .catch(erro => {
            console.error(erro);
            res.status(500).json({ error: erro.message });
        });
}

module.exports = {
    listarResultadosPorUsuario,
    salvarResultado
};