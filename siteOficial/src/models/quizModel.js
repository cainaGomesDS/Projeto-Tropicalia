var database = require('../database/config');


// Função para listar os resultados de um quiz específico (resultados por usuário)
function listarResultadosPorUsuario(idUsuario) {
    var instrucaoSql = `
        SELECT * FROM resultadosQuiz
	    WHERE fkCadastro = ${idUsuario}
        ORDER BY idResultado DESC LIMIT 1 ;
    `;
    console.log("Executando a instrução SQL para listar os resultados de um usuário específico: \n" + instrucaoSql);
    return database.executar(instrucaoSql); 
}


function salvarResultadoQuiz(idUsuario, resultado, acertos, erros) {
    var instrucaoSql = `
        INSERT INTO resultadosQuiz (fkCadastro, pontuacaoFinal, acertos, erros)
        VALUES ('${idUsuario}', '${resultado}','${acertos}','${erros}' );
    `;
    console.log("Executando a instrução SQL para salvar o resultado do quiz: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listarResultadosPorUsuario,
    salvarResultadoQuiz
};
