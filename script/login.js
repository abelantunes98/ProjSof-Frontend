const $email = document.querySelector('#email');
const $senha = document.querySelector('#senha');


async function login(){   
    let email = $email.value;
    let senha = $senha.value;
    let dados;
    let token;

    // const url = "http://localhost:8080/api/auth/login";
    url = "https://projsof.herokuapp.com/api/auth/login";

    const corpo = {email: email, password: senha};

    const headers = new Headers({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    });
    
    const defaults = {
        headers: headers
    }

    let options = {
        method: 'POST',
        body: JSON.stringify(corpo)
    };

    options = Object.assign({}, defaults, options);

    console.log('fazendo login...');

    let response = await fetch(url, options);
    if(response){
        dados = await response.json();
    }else{
        console.log("deu ruim");
        console.log(response);
    }

    token = dados.token; // usar futuramente para rotas privadas
}