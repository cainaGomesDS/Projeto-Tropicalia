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


function abrirForm() {
    document.getElementById('modal').showModal();
    document.getElementById('modal').style.display = 'flex';
}

function fecharForm() {
    document.getElementById('modal').close();
    document.getElementById('modal').style.display = 'none';
}


function enviarVideos() {
    var urlVar = input_url.value
    var tituloVar = input_texto.value
    fetch(`/videos/enviarVideo/${sessionStorage.ID_USUARIO}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            urlServer: urlVar,
            tituloServer: tituloVar
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                throw "Vídeo enviado com sucesso!"

            } else {
                throw "Houve um erro ao tentar enviar o vídeo!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
            finalizarAguardar();
        });

}


function trazerVideo() {
    console.log('Trazendo vídeos para tela de posts');
    var mensagemVideo = ''

    // Usando Fetch API para obter os dados do servidor
    fetch(`/videos/trazerVideo`)
        .then(response => response.json())
        .then(resultado => {
            console.log("Dados recebidos do servidor:", resultado);
            console.log("TA TUDO CERTO NO RECEBIMENTO DOS VIDEOS", resultado);

            resultado.forEach((resultado) => {

                var url = resultado.url;

                // verifica se o link é um link curto do youtube
                if (url.includes("youtu.be")) {
                    // Pega o ID do vídeo do link
                    const videoId = url.split("youtu.be/")[1].split("?")[0];
                    // Converte para o formato embed do YouTube, formato válido
                    url = `https://www.youtube.com/embed/${videoId}`;
                }
                
                mensagemVideo = `
                <iframe width="560" height="315" src="${url}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                `

                divVideos.innerHTML += mensagemVideo;
            });


            
        })
        .catch(error => {
            console.error('Erro ao obter os dados dos videos:', error);
        });


}

