
const $name = document.querySelector('#name');
const $lname =  document.querySelector('#lname');
const $email = document.querySelector('#email');
const $senha = document.querySelector('#senha');

//Funcao que envia um POST com um Json formado pelos dados de um usuário que deseja se cadastrar no sistema.
async function cadastro(){
    let name = $name.value;
    let lname = $lname.value;
    let email = $email.value;
    let senha = $senha.value;

    const url = "http://localhost:8080/api/users/";
    // const url = "https://projsof.herokuapp.com/api/users/";

    const corpo = {firstName: name, lastName: lname, email: email, password: senha};
    
    const headers = new Headers({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    });
        
    const defaults = {
        headers: headers
    };

    let options = {
        method: 'POST', 
        body: JSON.stringify(corpo)};

    options = Object.assign({}, defaults, options);

    let response = await fetch(url, options);
    if(response){ // verifica se o response não é null
        alert("Entre no seu email para completar o cadastro");
    }else{  // deu erro.
        alert("Algo deu ruim");
    }
}
    
