
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
    // const url = "https://projsof.herokuapp.com/api/user/";

    const corpo = {firstName: name, lastName: lname, email: email, password: senha};
    const method = 'POST';

    let response = await authomatizeRequest(url, method, corpo);
    if(response){ // verifica se o response não é null
        alert("Entre no seu email para completar o cadastro");
    }else{  // deu erro.
        alert("Algo deu ruim");
    }
}

async function authomatizeRequest(url, method, body){
    let options;
    const headers = new Headers({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json; charset=utf-8'
    });
        
    const defaults = {
        headers: headers
    };
    if(body == null){
        options = {
          method: method  
        };
    }else{
        options = {
            method: method,
            body: JSON.stringify(body)
        };
    }

    options = Object.assign({}, defaults, options);

    return  await fetch(url, options);
}

async function procuraDisciplina(){  
    const $schSubject = document.querySelector("#schSubject");
    const $resultSearch = document.querySelector("#resultSearch");
    
    let subString = $schSubject.value;
    let resultado = $resultSearch.value;
    let dados, id, name;
    if(subString != ""){
        const url = "http://localhost:8080/api/subjects/search/" + subString;
        // const url = "https://projsof.herokuapp.com/api/subjects/search/" + subString;
        const corpo = null; // Null pois GET não tem body;
        const method = 'GET';
    
        let response = await authomatizeRequest(url, method, corpo);
    
        if(response){ //verifica se a response é null
            console.log(response);
            dados = response.json();
        }else{
            alert("Ops! Alguma coisa falhou :(");
            return;
        }
        console.log(dados);
    }
    // for(i = 0; i < dados.)
    
}

    
