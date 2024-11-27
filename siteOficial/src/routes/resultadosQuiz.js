var express = require("express");
var router = express.Router();

var resultadoQuizController = require("../controllers/resultadosQuizController");


router.get('/resultados/:idUsuario', function(req, res){
    resultadoQuizController.listarResultadosPorUsuario(req, res)
});


router.post('/resultado/:idUsuario', function(req, res){
    console.log('Entrei na rota')
    resultadoQuizController.salvarResultado(req, res)
});


module.exports = router;