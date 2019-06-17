
const $name = document.querySelector('#name');
const $lname =  document.querySelector('#lname');
const $email = document.querySelector('#email');
const $senha = document.querySelector('#senha');

//Funcao que envia um POST com um Json formado pelos dados de um usuário que deseja se cadastrar no sistema.
function cadastro(){
    let name = $name.value;
    let lname = $lname.value;
    let email = $email.value;
    let senha = $senha.value;

    const url = "https://projsof.herokuapp.com/api/users/";

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

    console.log("cadastrando...");

    fetch(url, options)
    .then(resp =>{
        console.log('Request feito com sucesso, JSON response: ', resp);
    })
    .catch(function (error){
        console.log('Request falhou', error);
    });
    console.log("cadastrado");
}
    
