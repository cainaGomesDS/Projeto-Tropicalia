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

function removerCurtida(fkVideos, idUsuario) {
    console.log("ACESSEI A FUNÇÃO REMOVER CURTIDA \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n");

    var instrucaoSql = `
        DELETE FROM curtidas
        WHERE fk_video = ${fkVideos} AND id_usuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


const database = require('../models/database');  // Importa o arquivo de conexão com o banco de dados

// Função para verificar se o usuário já curtiu o vídeo
function verificarCurtida(fkVideos, idUsuario) {
    return new Promise((resolve, reject) => {
        const instrucaoSql = `
            SELECT COUNT(*) AS curtido
            FROM curtidas
            WHERE fk_video = ${fkVideos} AND fk_usuario = ${idUsuario};
        `;

        database.executar(instrucaoSql)
            .then(resultado => {
                if (resultado[0].curtido > 0) {
                    resolve(true);  // Retorna true se já tiver curtido
                } else {
                    resolve(false); // Retorna false se não tiver curtido
                }
            })
            .catch(erro => {
                console.error("Erro ao verificar a curtida:", erro);
                reject(erro);  // Retorna erro em caso de falha
            });
    });
}

module.exports = {
    verificarCurtida
};


module.exports = {
    enviarCurtida,
    removerCurtida
};