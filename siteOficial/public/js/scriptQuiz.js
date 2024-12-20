function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var idUsuario = sessionStorage.ID_USUARIO;

    console.log(email, idUsuario)

    if (email != null && idUsuario != null) {
        
    } else {
        alert('O login não foi feito, redirecionando para tela de login')
        window.location = "../loginTropicalia.html";
    }
}


const listaDeQuestoes = [

    {
        pergunta: "Quem criou a música Azul de Gal Costa?",
        alternativaA: "Chico Buarque",
        alternativaB: "Matuê",
        alternativaC: "Djavan",
        alternativaD: "Gal Costa",
        alternativaCorreta: "alternativaC"
    },

    {
        pergunta: "Quem foram os criadores do movimento tropicália?",
        alternativaA: "Gal Costa e Nara Leão",
        alternativaB: "Djavan e Chico Buarque",
        alternativaC: "Chitãozinho e Xororó",
        alternativaD: "Caetano Veloso e Gilberto Gil",
        alternativaCorreta: "alternativaD"
    },

    {
        pergunta: 'Complete o trecho da música: "Amar é um deserto e seus _____, vida que vai na sela ______"',
        alternativaA: "temores | dessas dores",
        alternativaB: "amores | dessas cores",
        alternativaC: "cactos | desses cavalos",
        alternativaD: "mares | desses passos",
        alternativaCorreta: "alternativaA"
    },

    {
        pergunta: "O movimento tropicália surgiu como oposição a um ocorrido no Brasil. Qual era esse ocorrido?",
        alternativaA: "Guerra dos Canudos",
        alternativaB: "Ditadura Militar",
        alternativaC: "República",
        alternativaD: "Guerra do Paraguai",
        alternativaCorreta: "alternativaB"
    },

    {
        pergunta: 'Complete o trecho da música: "Você e eu somos um _______, ao som de um ______, dose dupla, _______"',
        alternativaA: "caso médio | violão | filhos da lua",
        alternativaB: "tédio | caramelo | românticos e chuva",
        alternativaC: "caso sério | bolero | românticos de Cuba Libre",
        alternativaD: "caso sério | piano | românticos em muda de flor",
        alternativaCorreta: "alternativaC"
    },

    {
        pergunta: "O MPB vai muito além da época da tropicália, juntando muitos estiilos musicais, dito isso quem é considerado o rei do soul brasileiro?",
        alternativaA: "Djavan",
        alternativaB: "Agnaldo Raiol",
        alternativaC: "Jorge Ben Jor",
        alternativaD: "Tim Maia",
        alternativaCorreta: "alternativaD"
    },

    {
        pergunta: "Na MPB um instrumento foi colocado no meio das músicas, o que a diferenciou muito da Bossa Nova, qual instrumento é esse ?",
        alternativaA: "Guitarra",
        alternativaB: "Gaita",
        alternativaC: "Trompete",
        alternativaD: "Violino",
        alternativaCorreta: "alternativaA"
    },

    {
        pergunta: "Nos anos 80 e 90 uma dupla criou inúmeras músicas de sucesso para grandes artistas, como Tim Maia, Gal Costa e etc. Quais os nomes das lendas?",
        alternativaA: "Roberto e Carlos",
        alternativaB: "Michael Sullivan e Paulo Massadas",
        alternativaC: "Rodrigo Bandeiras e Pedro Luís",
        alternativaD: "Victor Trevaneio e Guilherme Arcanjo",
        alternativaCorreta: "alternativaB"
    },

    {
        pergunta: 'Complete a música: "Você é ______, é tudo pra mim, é _______ baby "',
        alternativaA: "é algo assim | mais que eu esperava",
        alternativaB: "é algo sem fim | um anjo de asas",
        alternativaC: "é algo assim | é como eu sonhava",
        alternativaD: "é algo pra mim | é sempre assim",
        alternativaCorreta: "alternativaC"
    },

    {
        pergunta: 'O que significa a sigla "MPB"?',
        alternativaA: "Música Para Brasileiros",
        alternativaB: "Música Perfeita Brasileira",
        alternativaC: "Música Primeiro Brasil",
        alternativaD: "Música Popular Brasileira",
        alternativaCorreta: "alternativaD"
    }

]

// variáveis globais    
var numeroDaQuestaoAtual = 0
var pontuacaoFinal = 0
var tentativaIncorreta = 0
var certas = 0
var erradas = 0
var quantidadeDeQuestoes = listaDeQuestoes.length

console.log(certas);
// let isUltima = numeroDaQuestaoAtual == quantidadeDeQuestoes-1 ? true : false

function onloadEsconder() {
    document.getElementById('pontuacao').style.display = "none"
    document.getElementById('jogo').style.display = "none"
}

function iniciarQuiz() {
    document.getElementById('pontuacao').style.display = "flex"
    document.getElementById('jogo').style.display = "flex"
    document.getElementById('btnIniciarQuiz').style.display = "none"

    document.getElementById('qtdQuestoes').innerHTML = quantidadeDeQuestoes

    preencherHTMLcomQuestaoAtual(0)

    btnSubmeter.disabled = false
    btnProx.disabled = true
    btnTentarNovamente.disabled = true
}

function preencherHTMLcomQuestaoAtual(index) {
    habilitarAlternativas(true)
    const questaoAtual = listaDeQuestoes[index]
    numeroDaQuestaoAtual = index
    console.log("questaoAtual")
    console.log(questaoAtual)
    document.getElementById("spanNumeroDaQuestaoAtual").innerHTML = Number(index) + 1 // ajustando porque o index começa em 0
    document.getElementById("spanQuestaoExibida").innerHTML = questaoAtual.pergunta;
    document.getElementById("labelOpcaoUm").innerHTML = questaoAtual.alternativaA;
    document.getElementById("labelOpcaoDois").innerHTML = questaoAtual.alternativaB;
    document.getElementById("labelOpcaoTres").innerHTML = questaoAtual.alternativaC;
    document.getElementById("labelOpcaoQuatro").innerHTML = questaoAtual.alternativaD;
}

function submeter() {
    const options = document.getElementsByName("option"); // recupera alternativas no html

    let hasChecked = false
    for (let i = 0; i < options.length; i++) {
        if (options[i].checked) {
            hasChecked = true
            break
        }
    }

    if (!hasChecked) {
        alert("Não há alternativas escolhidas. Escolha uma opção.")
    } else {
        btnSubmeter.disabled = true
        btnProx.disabled = false

        habilitarAlternativas(false)

        checarResposta()
    }
}

function habilitarAlternativas(trueOrFalse) {
    let opcaoEscolhida = trueOrFalse ? false : true

    primeiraOpcao.disabled = opcaoEscolhida
    segundaOpcao.disabled = opcaoEscolhida
    terceiraOpcao.disabled = opcaoEscolhida
    quartaOpcao.disabled = opcaoEscolhida

}

function avancar() {
    btnProx.disabled = true
    btnSubmeter.disabled = false

    desmarcarRadioButtons()
    
    if (numeroDaQuestaoAtual < quantidadeDeQuestoes - 1) {
        preencherHTMLcomQuestaoAtual(numeroDaQuestaoAtual)
    } else if (numeroDaQuestaoAtual == quantidadeDeQuestoes - 1) {
        alert("Atenção... a próxima é a ultima questão!")
        preencherHTMLcomQuestaoAtual(numeroDaQuestaoAtual)
    } 
    limparCoresBackgroundOpcoes()
}

function tentarNovamente() {
    // atualiza a página
    window.location.reload()
}

function checarResposta() {
    const questaoAtual = listaDeQuestoes[numeroDaQuestaoAtual] // questão atual 
    const respostaQuestaoAtual = questaoAtual.alternativaCorreta // qual é a resposta correta da questão atual

    const options = document.getElementsByName("option"); // recupera alternativas no html

    let alternativaCorreta = null // variável para armazenar a alternativa correta

    options.forEach((option) => {
        if (option.value === respostaQuestaoAtual) {
            console.log("alternativaCorreta está no componente: " + alternativaCorreta)
            alternativaCorreta = option.labels[0].id
        }
    })

    // verifica se resposta assinalada é correta
    options.forEach((option) => {
        if (option.checked === true && option.value === respostaQuestaoAtual) {
            document.getElementById(alternativaCorreta).classList.add("text-success-with-bg")
            pontuacaoFinal++
            certas++
            // document.getElementById("spanCertas").innerHTML = certas
            numeroDaQuestaoAtual++
        } else if (option.checked && option.value !== respostaQuestaoAtual) {
            const wrongLabelId = option.labels[0].id

            document.getElementById(wrongLabelId).classList.add("text-danger-with-bg")
            document.getElementById(alternativaCorreta).classList.add("text-success-with-bg")
            tentativaIncorreta++
            erradas++
            // document.getElementById("spanErradas").innerHTML = erradas
            numeroDaQuestaoAtual++
        }
    })
}

function limparCoresBackgroundOpcoes() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).classList.remove("text-danger-with-bg")
        document.getElementById(option.labels[0].id).classList.remove("text-success-with-bg")
    })
}

function desmarcarRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

function finalizarJogo() {
    let textoParaMensagemFinal = null
    let textoParaMensagemImagem = null
    let classComCoresParaMensagemFinal = null
    var imagemQuiz = ''
    const porcentagemFinalDeAcertos = pontuacaoFinal / quantidadeDeQuestoes
    sessionStorage.PORCENTAGEM_PONTOS = porcentagemFinalDeAcertos;
    
    if (porcentagemFinalDeAcertos <= 0.3) {
        textoParaMensagemImagem = "Parece que você não conhece muito a MPB, experimente ouvir mais!..."
        classComCoresParaMensagemFinal = "text-danger-with-bg"
        imagemQuiz = "../assets/imagens/cachorro.jpg"
                
    }
    else if (porcentagemFinalDeAcertos > 0.3 && porcentagemFinalDeAcertos < 0.9) {
        textoParaMensagemImagem = "Foi bem, mas dá para melhorar!"
        imagemQuiz = "../assets/imagens/memeBuarque.jpg"
        classComCoresParaMensagemFinal = "text-warning-with-bg"
    }
    else if (porcentagemFinalDeAcertos >= 0.9) {
        textoParaMensagemImagem = "Você é realmente brasileiro, parabéns!"
        imagemQuiz = "../assets/imagens/brasill.jpg"
        classComCoresParaMensagemFinal = "text-success-with-bg"
    }

    document.getElementById('imagemQuiz').src = imagemQuiz
    textoParaMensagemImagem += "<br> Você acertou " + certas + " questões"
    textoParaMensagemFinal = Math.round((porcentagemFinalDeAcertos)*100) + "%"

    

    document.getElementById('msgImagem').innerHTML = textoParaMensagemImagem
    document.getElementById('msgImagem').classList.add(classComCoresParaMensagemFinal)

    document.getElementById('msgFinal').innerHTML = textoParaMensagemFinal
    document.getElementById('msgFinal').classList.add(classComCoresParaMensagemFinal)
    document.getElementById('jogo').classList.add("text-new-gray") 

   
   


    btnProx.disabled = true
    btnSubmeter.disabled = true
    btnTentarNovamente.disabled = false

}

function enviarResultados() {
    
       var acertosVar = certas;
       var errosvar = erradas;
       var pontuacaoVar = pontuacaoFinal;
   
    fetch(`/resultadosQuiz/resultado/${sessionStorage.ID_USUARIO}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            acertosServer: acertosVar,
            errosServer: errosvar,
            pontuacaoServer: pontuacaoVar
        })
    })
    .then(response => response.json())
    .then(dadosQuiz => {
        console.log("Dados enviados com sucesso:", dadosQuiz);
        // finalizar()
    })
    .catch(error => {
        console.error("Erro ao enviar dados:", error);
    });
}


function abrirForm(){
    document.getElementById('modal').showModal();
    document.getElementById('modal').style.display = 'flex';
}

function fecharForm(){
    document.getElementById('modal').close();
    document.getElementById('modal').style.display = 'none';
}

function plotarGrafico() {
    console.log('iniciando plotagem do gráfico...');

    document.getElementById('graficos').style.display = 'flex';
    document.getElementById('divImagemFinal').style.display = 'none';
    document.getElementById('modal').style.width = '80%'
    document.getElementById('modal').style.height = '60%'

    // Criando estrutura para plotar gráfico - labels
    let labels = [' '];
    let barChartQuiz = {
        labels: labels,
        datasets: [{
            label: 'Seus acertos',
            data: [],
            fill: false,
            backgroundColor: 'rgb(76 ,187, 23)',
            borderColor: 'rgb(76 ,187, 23)',
            tension: 0.1
        },
        {
            label: 'Seus erros',
            data: [],
            fill: false,
            backgroundColor: 'rgb(123, 3, 35)',
            borderColor: 'rgb(123, 3, 35)',
            tension: 0.1
        }
        
    ]
    };
    

    // Usando Fetch API para obter os dados do servidor
    fetch(`/resultadosQuiz/resultados/${sessionStorage.ID_USUARIO}`)
        .then(response => response.json()) 
        .then(resultado => {
            console.log("Dados recebidos do servidor:", resultado);
            console.log("TA TUDO CERTO NO RECEBIMENTO", resultado);
            // Preenchendo os labels e os dados para o gráfico
            resultado.forEach((resultado) => {
                barChartQuiz.datasets[0].data.push(resultado.acertos);
                barChartQuiz.datasets[1].data.push(resultado.erros);

                sessionStorage.ACERTOS = resultado.acertos;
                sessionStorage.ERROS = resultado.erros;
            });

          
            const config = {
                type: 'bar',
                data: barChartQuiz,
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'Seu resultado',
                            font: {
                                weight: 'bold',
                                size: '15px'
                            }
                        }
                    }
                }
            };

        
            let myChart = new Chart(
                document.getElementById('barChartQuiz'),
                config
            );
        })
        .catch(error => {
            console.error('Erro ao obter os dados do quiz:', error);
        });

    
}


