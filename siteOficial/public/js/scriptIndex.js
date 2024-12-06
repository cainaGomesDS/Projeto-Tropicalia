function verificarEstatistica() {
    if (!sessionStorage.PORCENTAGEM_PONTOS || sessionStorage.ID_USUARIO == '') {
        alert('Faça o login e jogue o quiz antes de vizualizar suas estatísticas')
        window.location = "loginTropicalia.html";

    } else {
         abrirForm()
    }
}

function abrirForm() {
    document.getElementById('modal').showModal();
    document.getElementById('modal').style.display = 'flex';
}

function fecharForm() {
    document.getElementById('modal').close();
    document.getElementById('modal').style.display = 'none';
}

let myChart;
function plotarGrafico() {

    var porcentagem = sessionStorage.PORCENTAGEM_PONTOS;
    let classComCoresParaMensagemFinal = null

    if (myChart) {
        myChart.destroy()
    } else {

    }

    if (porcentagem <= 0.3) {
        classComCoresParaMensagemFinal = "text-danger-with-bg"
    }
    else if (porcentagem > 0.3 && porcentagem < 0.9) {
        classComCoresParaMensagemFinal = "text-warning-with-bg"
    }
    else if (porcentagem >= 0.9) {
        classComCoresParaMensagemFinal = "text-success-with-bg"
    }


    console.log('iniciando plotagem do gráfico...');

    document.getElementById('graficos').style.display = 'flex';
    document.getElementById('modal').style.width = '80%';
    document.getElementById('modal').style.height = '60%';

    document.getElementById('msgFinal').classList.add(classComCoresParaMensagemFinal)
    textoParaMensagemFinal = Math.round((porcentagem) * 100) + "%"

    document.getElementById('msgFinal').innerHTML = textoParaMensagemFinal;

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
            });


            const config = {
                type: 'bar',
                data: barChartQuiz,
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'Seu último resultado',
                            font: {
                                weight: 'bold',
                                size: '15px'
                            }
                        }
                    }
                }
            };


            myChart = new Chart(
                document.getElementById('barChartQuiz'),
                config
            );
        })
        .catch(error => {
            console.error('Erro ao obter os dados do quiz:', error);
        });


}

var quantidadeVideos = 0

function qtdVideos() {

    fetch(`/videos/qtdVideos/${sessionStorage.ID_USUARIO}`)
        .then(response => response.json())
        .then(resultado => {
            console.log("Dados recebidos do servidor:", resultado);
            console.log("TA TUDO CERTO NO RECEBIMENTO DAS QUANTIDADES", resultado);

            resultado.forEach((resultado) => {

                quantidadeVideos = resultado.qtdVideos
                dataVideo = resultado.dataVideo
            });

            document.getElementById('qtdVideosUsuario').innerHTML = quantidadeVideos;

        })
        .catch(error => {
            console.error('Erro ao obter os dados dos videos:', error);
        });
}
console.log('aaaaaaa', quantidadeVideos)



let myChartVideosLinhas;
function obterDadosVideo() {

    if (myChartVideosLinhas) {
        myChartVideosLinhas.destroy()
    }

    fetch(`/videos/qtdVideos/${sessionStorage.ID_USUARIO}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {

            // se não tiver dado na primeira consulta, ele fica consultando até achar
            if (response.status == 204) {
                setTimeout(() => obterDadosGraficoCorredor(), 2000);
            } else {
                response.json().then((resposta) => {
                    console.log('RESPOsta OBTER DADOS VIDEOS ===========', resposta)


                    plotarGraficoLinhas(`${sessionStorage.ID_USUARIO}`, resposta)
                    console.log(`RESPOSTA OBTER DADOS VIDEO`, resposta)
                });
            }
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}


function plotarGraficoLinhas(idUsuario, resposta) {
    console.log('ENTRANDO NO PLOTAR LINHAS', idUsuario)


    let labelsVideos = [];

    // Criando estrutura para plotar gráfico - dados
    let dadosVideos = {
        labels: labelsVideos,
        datasets: [{
            label: 'Vídeos por dia',
            data: [],
            fill: false,
            backgroundColor: 'rgb(218, 94, 56)',
            borderColor: 'rgb(218, 94, 56)',
            tension: 0.1
        }]
    };


    // Inserindo valores recebidos em estrutura para plotar o gráfico
    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        labelsVideos.push(registro.data);
        dadosVideos.datasets[0].data.push(registro.qtdVideos);
    }


    // Criando estrutura para plotar gráfico - config
    const configVideos = {
        type: 'line',
        data: dadosVideos,
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Quantidade de vídeos postados por dia',
                    font: {
                        weight: 'bold',
                        size: '15px'
                    }
                }
            }
        }
    };

    myChartVideosLinhas = new Chart(
        document.getElementById(`lineChartDash`),
        configVideos
    );

    myChartVideosLinhas.update()

}


