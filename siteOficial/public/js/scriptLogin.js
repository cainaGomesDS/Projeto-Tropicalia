function validarLogin() {
    var emailVar = input_userEmail.value;
    var senhaVar = input_userSenha.value;

    if (emailVar == '' || senhaVar == '') {
        alert(`Por favor, corrija os erros ou preencha todos os campos e tente novamente.`)
    } else {

        console.log("FORM LOGIN: ", emailVar);
        console.log("FORM SENHA: ", senhaVar);

        fetch("/usuarios/autenticar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                emailServer: emailVar,
                senhaServer: senhaVar
            })
        }).then(function (resposta) {
            console.log("ESTOU NO THEN DO validarLogin()!")
            console.log(resposta)
            if (resposta.ok) {
                console.log(resposta);
                console.log(resposta);
                console.log(resposta);
                console.log(resposta);
                resposta.json().then(json => {
                    console.log(json);
                    console.log(JSON.stringify(json));
                    sessionStorage.ID_USUARIO = json.idCadastro;
                    sessionStorage.EMAIL_USUARIO = json.email;
                    sessionStorage.SENHA_USUARIO = json.senha;
                });
                
                console.log(sessionStorage.ID_USUARIO)
                console.log(sessionStorage.EMAIL_USUARIO)
                setTimeout(() => {
                    window.location = "index.html";
                }, 2000);
            } else {
                alert('Email e/ou senha inválido(s)')
                console.log("Houve um erro ao tentar realizar o login!");

                resposta.text().then(texto => {
                    console.error(texto);
                    // finalizarAguardar(texto);
                });
            }

            

        }).catch(function (erro) {
            console.log(erro);
        })

        return false;
    }
}

