$email = document.querySelector('#email');
$senha = document.querySelector('#senha');

function login(){   
    let email = $email.value;
    let senha = $senha.value;

    url = "http://localhost:8080/api/auth/login";
    // url = "https://projsof.herokuapp.com/api/auth/login";

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

    fetch(url, options)
    .then(response => {
        console.log("Request feito com sucesso, pegue seu token: ", response);
        alert(`Pegue seu token ${response}`);
    })
    .catch(error =>{
        alert(`"Algo deu errado! ErrorStatus: " ${error}`);
        console.log(error);
    });
    
    console.log("logado com sucesso");

}