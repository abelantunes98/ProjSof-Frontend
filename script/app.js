
const $name = document.querySelector('#name');
const $lname =  document.querySelector('#lname');
const $email = document.querySelector('#email');
const $senha = document.querySelector('#senha');
const $btnCadastro = document.querySelector('#btnCadastro');

//Funcao que envia um POST com um Json formado pelos dados de um usuário que deseja se cadastrar no sistema.
function cadastro(){
    const headers = new Headers({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    });

    const defaults = {
        headers: headers
    };

    const body = {firstName: $name.value, lastName: $lname.value, email: $email.value, password: $senha.value};
    let options = {method: 'POST', body: JSON.stringify(body)};
    console.log(options)
    options = Object.assign({}, defaults, options);

    // return new Promise((resolve, reject) => {
    console.log("cadastrando...");
    // mudar a URL quando o servidor tiver aceitando a requisição
    fetch("https://projsof.herokuapp.com/api/users/", options).then(resp => {  // ta dando problema do cors
        console.log(resp);
    }).catch(error =>{
        console.log(error);
    });

    console.log("cadastrado");
    
    }
    
