var express = require("express");
var router = express.Router();

var curtidasController = require("../controllers/curtidasController");


router.post("/enviarCurtida/:fkVideos/:idUsuario", function (req, res) {
    curtidasController.enviarCurtida(req, res);
});

router.delete("/deletarCurtida/:fkVideos/:idUsuario", function (req, res) {
    curtidasController.deletarCurtida(req, res);
});


// router.post("/autenticar", function (req, res) {
//     usuarioController.autenticar(req, res);
// });

module.exports = router;