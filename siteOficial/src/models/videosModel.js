const { qtdVideos } = require("../controllers/videosController");
var database = require("../database/config")

function enviarVideo(url, idUsuario, titulo) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function enviarVideo():", url)
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO links (url, fkCadastro, titulo)VALUES
            ('${url}', '${idUsuario}', '${titulo}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function trazerVideo() {
    console.log("ACESSEI O TRAZER VIDEO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function trazerVideo():")
    var instrucaoSql = `
        SELECT nome, idLinks, url, titulo, fkCadastro FROM links as L JOIN cadastro as C ON L.fkCadastro = C.idCadastro ORDER BY idLinks DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function quantidadeVideos(idUsuario) {
    console.log("ACESSEI O TRAZER VIDEO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function qtdVideos():")
    var instrucaoSql = `
       SELECT count(idLinks) AS qtdVideos, fkCadastro AS usuario, DATE_FORMAT(dtHora, '%d/%m') as data FROM links WHERE fkCadastro = ${idUsuario} GROUP BY fkCadastro, DATE_FORMAT(dtHora, '%d/%m')
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    enviarVideo,
    trazerVideo,
    quantidadeVideos
};