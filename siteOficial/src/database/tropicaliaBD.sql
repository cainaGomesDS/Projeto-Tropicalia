CREATE DATABASE tropicalia;
USE tropicalia;

CREATE TABLE nivel(
	idNivel INT PRIMARY KEY,
    nivel INT
);
RENAME TABLE nivel TO niveis;
ALTER TABLE niveis MODIFY COLUMN nivel VARCHAR(45);
INSERT INTO niveis VALUES
	(1, 'Bronze'),
    (2, 'Prata'),
    (3, 'Ouro'),
    (4, 'Tropicalia');

CREATE TABLE cadastro(
	idCadastro INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45),
    senha VARCHAR(45),
    email VARCHAR(45),
    fkNivel INT,
    CONSTRAINT fkNivelCadastro
		FOREIGN KEY (fkNivel) REFERENCES niveis(idNivel)
);
select * from cadastro;
DELETE FROM cadastro WHERE idCadastro in (6,7);



CREATE TABLE links(
	idLinks INT,
    url VARCHAR(100),
    fkCadastro INT,
    PRIMARY KEY(idLinks, fkCadastro),
    CONSTRAINT fkLinksCadastros
		FOREIGN KEY (fkCadastro) REFERENCES cadastro(idCadastro)
);
ALTER TABLE links MODIFY COLUMN idLinks INT AUTO_INCREMENT;
ALTER TABLE links ADD COLUMN titulo VARCHAR(70);
SELECT nome, idLinks, url, titulo, fkCadastro FROM links as L JOIN cadastro as C ON L.fkCadastro = C.idCadastro ORDER BY idLinks DESC;

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

INSERT INTO curtidas (qtdCurtidas, fkVideos, fkCadastro) VALUES
	(10, 9, 12);
    
select * from curtidas;
truncate table curtidas;

CREATE TABLE resultadosQuiz(
	idResultado INT,
    fkCadastro INT,
    acertos INT,
    erros INT,
    pontuacaoFinal INT,
    PRIMARY KEY(idResultado, fkCadastro),
    CONSTRAINT fkResultadoCadastro
		FOREIGN KEY (fkCadastro) REFERENCES cadastro(idCadastro)
);
ALTER TABLE resultadosQuiz MODIFY COLUMN idResultado INT AUTO_INCREMENT;

select * from resultadosQuiz;
use tropicalia;
SELECT * FROM resultadosQuiz
	    WHERE fkCadastro =2
        ORDER BY idResultado DESC LIMIT 1 ;
INSERT INTO resultadosQuiz VALUES
	(default, 1, 5);

SELECT * FROM resultadosQuiz
	WHERE fkCadastro = 1
        ORDER BY fkCadastro DESC;
