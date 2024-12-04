var curtidasModel = require("../models/curtidasModel");


function enviarCurtida(req, res) {
    console.log('CHEGOU NO CONTROLLER')
    var qtdCurtidas = req.body.qtdCurtidasServer;
    var fkVideos = req.params.fkVideos;
    var idUsuario = req.params.idUsuario;
    // Faça as validações dos valores
    if (fkVideos == undefined) {
        res.status(400).send("Seu id do video está undefined")
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        curtidasModel.enviarCurtida(qtdCurtidas, fkVideos, idUsuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao enviar a curtida! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function trazerCurtida(req, res) {
    var fkVideos = req.params.fkVideos;
    var idUsuario = req.params.idUsuario;
    curtidasModelModel.deletarCorredor()
        .then(resultado => {
            res.status(200).json(resultado);
            console.log(`DADOS DO MODEL RECEBIDOS NO CONTROLLER: ${resultado}`)
        })
        .catch(erro => {
            console.error(erro);
            res.status(500).json({ error: erro.message });
        });
}

function deletar(req, res) {
    var idAviso = req.params.idAviso;

    avisoModel.deletar(idAviso)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao deletar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    enviarCurtida,
    trazerCurtida
}