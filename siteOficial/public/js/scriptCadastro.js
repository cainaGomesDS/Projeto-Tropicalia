function nomeSelecionado() {
    var nome = document.getElementById('input_userNome').value
    var tamanhoNome = nome.length
    document.getElementById('input_userNome').style.backgroundColor = '#F9F9F9'

    if (tamanhoNome < 4) {
        document.getElementById('nomeRequisitos').style.display = 'block'
        document.getElementById('nomeRequisitos').style.color = 'red'
        document.getElementById('input_userNome').style.borderColor = 'red'

    } else if (tamanhoNome >= 4) {
        document.getElementById('nomeRequisitos').style.display = 'none'
        document.getElementById('input_userNome').style.borderColor = 'green'

    }

}


function validarEmail() {
    var email = document.getElementById('input_userEmail').value;
    var emailRegra = /^[^\s@]+@[^\s@]+\.(com|br|school)$/.test(email);


    document.getElementById('input_userEmail').style.backgroundColor = '#F9F9F9'



    if (emailRegra) {
        document.getElementById('input_userEmail').style.borderColor = 'green'
    } else {
        document.getElementById('input_userEmail').style.borderColor = 'red'
    }

    document.getElementById('emailRegra').style.color = emailRegra ? 'green' : 'red';
}


function mostrarEmailRegra() {
    document.getElementById('emailRequisitos').style.display = 'block';
}


function ocultarEmailRegra() {
    document.getElementById('emailRequisitos').style.display = 'none';
}


function validarSenha() {
    var senha = document.getElementById('input_userSenha').value;

    var senhaMinuscula = /[a-z]/.test(senha); // Verifica se tem pelo menos 
    // uma letra minuscula na senha, /[a-z]/ está representando qualquer letra minúscula 
    //e o .test(senha) aplica na variável a validação.
    var senhaMaiuscula = /[A-Z]/.test(senha);
    var senhaNumero = /[\d]/.test(senha); // Verifica se tem números de 0 a 9 na senha
    var senhaEspecial = /[\W_]/.test(senha); // Verifica se tem caracteres especiais

    document.getElementById('input_userSenha').style.backgroundColor = '#F9F9F9'

    // Exibir os requisitos em vermelho ou verde conforme o usuário digita
    document.getElementById('senhaMinuscula').style.color = senhaMinuscula ? 'green' : 'red';
    document.getElementById('senhaMaiuscula').style.color = senhaMaiuscula ? 'green' : 'red';
    document.getElementById('senhaNumero').style.color = senhaNumero ? 'green' : 'red';
    document.getElementById('senhaEspecial').style.color = senhaEspecial ? 'green' : 'red';


    if (senhaMinuscula && senhaMaiuscula && senhaNumero && senhaEspecial) {
        document.getElementById('input_userSenha').style.borderColor = 'green';
    } else {
        document.getElementById('input_userSenha').style.borderColor = 'red';
    }

}


function mostrarRequisitosSenha() {
    document.getElementById('senhaRequisitos').style.display = 'block';
}


function ocultarRequisitosSenha() {
    document.getElementById('senhaRequisitos').style.display = 'none';
}


function validarSenhasIguais() {
    var senha = document.getElementById('input_userSenha').value
    var validacao = document.getElementById('input_validarSenha').value

    document.getElementById('input_validarSenha').style.backgroundColor = '#F9F9F9'
    if (senha == validacao) {
        document.getElementById('input_validarSenha').style.borderColor = 'green'
    } else {
        document.getElementById('input_validarSenha').style.borderColor = 'red'
    }
}


function validarCadastro() {
    validarEmail();
    validarSenha();
    validarSenhasIguais();

    // Verifica se todos os campos estão verdes (válidos)
    var camposValidos = document.getElementById('input_userNome').style.borderColor === 'green' &&
        document.getElementById('input_userEmail').style.borderColor === 'green' &&
        document.getElementById('input_userSenha').style.borderColor === 'green' &&
        document.getElementById('input_validarSenha').style.borderColor === 'green';

    if (camposValidos) {

        var nomeVar = input_userNome.value
        var emailVar = input_userEmail.value
        var senhaVar = input_userSenha.value

        fetch("/usuarios/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                // crie um atributo que recebe o valor recuperado aqui
                // Agora vá para o arquivo routes/usuario.js
                nomeServer: nomeVar,
                emailServer: emailVar,
                senhaServer: senhaVar
            }),
        })
            .then(function (resposta) {
                console.log("resposta: ", resposta);

                if (resposta.ok) {
                    alert('Cadastro realizado com sucesso!! Redirecionando para tela de login...')

                } else {
                    throw "Houve um erro ao tentar realizar o cadastro!";
                }
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
                finalizarAguardar();
            });
        // Redireciona para a página de login
        setTimeout(() => {
            window.location = "loginTropicalia.html";
        }, "2000");
        
        return false;
    } else {
        alert('Por favor, corrija os erros ou preencha todos os campos e tente novamente.');
    }
}

