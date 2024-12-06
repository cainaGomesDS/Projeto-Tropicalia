var express = require("express");
var router = express.Router();

var videosController = require("../controllers/videosController");


router.post("/enviarVideo/:idUsuario", function (req, res) {
    videosController.enviarVideo(req, res);
});

router.get("/trazerVideo", function (req, res) {
    videosController.trazerVideo(req, res);
});

router.get("/qtdVideos/:idUsuario", function (req, res) {
    videosController.qtdVideos(req, res);
});

// router.post("/autenticar", function (req, res) {
//     usuarioController.autenticar(req, res);
// });

module.exports = router;