
const $name = document.querySelector('#name');
const $lname =  document.querySelector('#lname');
const $email = document.querySelector('#email');
const $senha = document.querySelector('#senha');
const $btnCadastro = document.querySelector('#btnCadastro');

//Funcao que envia um POST com um Json formado pelos dados de um usuário que deseja se cadastrar no sistema.
function cadastro(){
    let name = $name.value;
    let lname = $lname.value;
    let email = $email.value;
    let senha = $senha.value;

    const url = "https://projsof.herokuapp.com/api/users/";

    const corpo = {firstName: name, lastName: lname, email: email, password: senha};
    
    console.log("cadastrando...");

    fetch(url, {
        method: 'post',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(corpo)
    })
    .then(response.json())
    .then(function(data){
        console.log('Request feito com sucesso, JSON response: ', data);
    })
    .catch(function (error){
        console.log('Request falhou', error);
    });
    console.log("cadastrado");
}

$btnCadastro.onclick = cadastro();
    
