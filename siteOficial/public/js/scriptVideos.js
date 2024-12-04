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
                var idVideo = resultado.idLinks

                // verifica se o link é um link curto do youtube
                if (url.includes("youtu.be")) {
                    // Pega o ID do vídeo do link
                    const videoId = url.split("youtu.be/")[1].split("?")[0];
                    // Converte para o formato embed do YouTube, formato válido
                    url = `https://www.youtube.com/embed/${videoId}`;
                }
                
                mensagemVideo = `
                <div class="configVideo" id="${idVideo}">
                <h2>${resultado.titulo}<h2>
                <p>Enviado por: ${resultado.nome}</p>
                <iframe width="560" height="315" src="${url}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                <button id="btn ${idVideo}" onclick="curtir(${idVideo})" >Like</button>
                </div>
                `
                divVideos.innerHTML += mensagemVideo;
            });


            
        })
        .catch(error => {
            console.error('Erro ao obter os dados dos videos:', error);
        });


}

var listaIdVideo = [];
function curtir(idVideo){
    var qtdCurtidas = ''
    
    if(listaIdVideo.includes(idVideo)){
        document.getElementById(`btn ${idVideo}`).style.backgroundColor = 'blue'
        listaIdVideo.splice(listaIdVideo[`${idVideo}`])
        
    }else{
        listaIdVideo.push(idVideo)
        qtdCurtidas ++
        document.getElementById(`btn ${idVideo}`).style.backgroundColor = 'red'

        fetch(`/curtidas/enviarCurtida/${idVideo}/${sessionStorage.ID_USUARIO}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                // crie um atributo que recebe o valor recuperado aqui
                // Agora vá para o arquivo routes/usuario.js
                qtdCurtidasServer: qtdCurtidas
            }),
        })
            .then(function (resposta) {
                console.log("resposta: ", resposta);
    
                if (resposta.ok) {
                    throw "Curtida enviada com sucesso!"
    
                } else {
                    throw "Houve um erro ao tentar enviar a curtida no fetch!";
                }
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
                // finalizarAguardar();
            });
    }
    console.log(listaIdVideo)
    console.log(qtdCurtidas)
    
    
}
