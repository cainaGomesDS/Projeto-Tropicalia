var videosModel = require("../models/videosModel");


function enviarVideo(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var url = req.body.urlServer;
    var titulo = req.body.tituloServer;
    var idUsuario = req.params.idUsuario;
    // Faça as validações dos valores
    if (url == undefined) {
        res.status(400).send("Sua url está undefined")
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        videosModel.enviarVideo(url, idUsuario, titulo)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao enviar o vídeo! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function trazerVideo(req, res) {
    videosModel.trazerVideo()
        .then(resultado => {
            res.status(200).json(resultado);
            console.log('DADOS DO MODEL RECEBIDOS NO CONTROLLER:', resultado)
        })
        .catch(erro => {
            console.error(erro);
            res.status(500).json({ error: erro.message });
        });
}

function qtdVideos(req, res) {
    var idUsuario = req.params.idUsuario;
    videosModel.quantidadeVideos(idUsuario)
        .then(resultado => {
            res.status(200).json(resultado);
            console.log('DADOS DO MODEL QTDVIDEOS RECEBIDOS NO CONTROLLER:', resultado)
        })
        .catch(erro => {
            console.error(erro);
            res.status(500).json({ error: erro.message });
        });
}

module.exports = {
    enviarVideo,
    trazerVideo,
    qtdVideos
}