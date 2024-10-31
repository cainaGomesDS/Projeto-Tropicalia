function validarEmail() {
    var email = document.getElementById('input_userEmail').value;
    var emailValido = /^[^\s@]+@[^\s@]+\.(com|br|school)$/.test(email);


    if (email) {
        document.getElementById('input_userEmail').style.backgroundColor = "#f9f9f9"
    } else {

    }


    if (emailValido) {
        document.getElementById('input_userEmail').style.borderColor = "green"
    } else {
        document.getElementById('input_userEmail').style.borderColor = "red"
    }
}

function validarSenha(){
    var senha = document.getElementById('input_userSenha').value;

    var senhaMinuscula = /[a-z]/.test(senha); // Verifica se tem pelo menos 
    // uma letra minuscula na senha, /[a-z]/ está representando qualquer letra minúscula 
    //e o .test(senha) aplica na variável a validação.
    var senhaMaiuscula = /[A-Z]/.test(senha);
    var senhaNumero = /[\d]/.test(senha); // Verifica se tem números de 0 a 9 na senha
    var senhaEspecial = /[\W_]/.test(senha); // Verifica se tem caracteres especiais


    // Exibir os requisitos em vermelho ou verde conforme o usuário digita
    document.getElementById("senhaMinuscula").style.color = senhaMinuscula ? "green" : "red";
    document.getElementById("senhaMaiuscula").style.color = senhaMaiuscula ? "green" : "red";
    document.getElementById("senhaNumero").style.color = senhaNumero ? "green" : "red";
    document.getElementById("senhaEspecial").style.color = senhaEspecial ? "green" : "red";


    if(senha){
        document.getElementById('input_userSenha').style.backgroundColor = '#f9f9f9'
    }


    if (senhaMinuscula && senhaMaiuscula && senhaNumero && senhaEspecial) {
        document.getElementById('input_userSenha').style.borderColor = "green";
    } else {
        document.getElementById('input_userSenha').style.borderColor = "red";
    }

}


function mostrarRequisitosSenha(){
    document.getElementById("senhaRequisitos").style.display = "block";
}

function ocultarRequisitosSenha() {
    document.getElementById("senhaRequisitos").style.display = "none";
}

function validarSenhasIguais(){
    var senha = document.getElementById('input_userSenha').value
    var validacao = document.getElementById('input_validarSenha').value

    if(senha == validacao){
        document.getElementById('input_validarSenha').style.borderColor = 'green'
    }else{
        document.getElementById('input_validarSenha').style.borderColor = 'red'
    }
}

function validarCadastro() {
    validarEmail();
    validarSenha();
    validarSenhasIguais();

    // Verifica se todos os campos estão verdes (válidos)
    var camposValidos = document.getElementById('input_userName').value !== ""
                        document.getElementById('input_userEmail').style.borderColor === "green" &&
                        document.getElementById('input_userSenha').style.borderColor === "green" &&
                        document.getElementById('input_validarSenha').style.borderColor === "green";

    if (camposValidos) {
        // Redireciona para a página de login
        window.location.href = "./lista11_ex_02.html";
    } else {
        alert("Por favor, corrija os erros ou preencha todos os campos e tente novamente.");
    }
}