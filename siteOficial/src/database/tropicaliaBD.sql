CREATE DATABASE tropicalia;
USE tropicalia;

CREATE TABLE cadastro(
	idCadastro INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45),
    senha VARCHAR(45),
    email VARCHAR(45)
);

CREATE TABLE links(
	idLinks INT AUTO_INCREMENT,
    url VARCHAR(100),
    fkCadastro INT,
    CONSTRAINT fkLinksCadastros
		FOREIGN KEY (fkCadastro) REFERENCES cadastro(idCadastro),
	PRIMARY KEY(idLinks, fkCadastro),
    dtHora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	titulo VARCHAR(70)
);


CREATE TABLE curtidas(
	idCurtidas INT AUTO_INCREMENT,
    qtdCurtidas INT,
    fkVideos INT,
    fkCadastro INT,
    CONSTRAINT fkCurtidasVideos
		FOREIGN KEY (fkVideos) REFERENCES links(idLinks),
	CONSTRAINT fkCurtidasUsuario
		FOREIGN KEY (fkCadastro) REFERENCES cadastro(idCadastro),
	PRIMARY KEY(idCurtidas, fkVideos, fkCadastro)
);




CREATE TABLE resultadosQuiz(
	idResultado INT AUTO_INCREMENT,
    fkCadastro INT,
    acertos INT,
    erros INT,
    pontuacaoFinal INT,
    PRIMARY KEY(idResultado, fkCadastro),
    CONSTRAINT fkResultadoCadastro
		FOREIGN KEY (fkCadastro) REFERENCES cadastro(idCadastro)
);



select * from links;
