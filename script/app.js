
const $name = document.querySelector('#name');
const $lname =  document.querySelector('#lname');
const $email = document.querySelector('#email');
const $senha = document.querySelector('#senha');
const $btnCadastro = document.querySelector('#btnCadastro');

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
    options = Object.assign({}, defaults, options);

    // return new Promise((resolve, reject) => {
    console.log("cadastrando...");
    // mudar a URL quando o servidor tiver aceitando a requisição
    fetch("localhost:8080/api/users/", options).then(resp => {  // ta dando problema do cors
        console.log(rest);
    }).catch(error =>{
        console.log(error);
    });

    console.log("cadastrado");
    
    // };
}


$btnCadastro.onclick = cadastro();

