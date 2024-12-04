var database = require("../database/config")

function enviarCurtida(qtdCurtidas, fkVideos, idUsuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function enviarCurtida():")

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO curtidas (qtdCurtidas, fkVideos, fkCadastro) VALUES
	        (${qtdCurtidas}, ${fkVideos}, ${idUsuario});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function trazerCurtida() {
    console.log("ACESSEI O TRAZER VIDEO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function trazerVideo():")
    var instrucaoSql = `
        SELECT nome, idLinks, url, titulo, fkCadastro FROM links as L JOIN cadastro as C ON L.fkCadastro = C.idCadastro ORDER BY idLinks DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    enviarCurtida,
    trazerCurtida
};