
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

    // const url = "http://localhost:8080/api/users/";
    const url = "https://projsof.herokuapp.com/api/user/";

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
    
    let subString = $schSubject.value;

    let dados;

    if(subString != ""){
        // const url = "http://localhost:8080/api/subjects/search/" + subString;
        const url = "https://projsof.herokuapp.com/api/subjects/search/" + subString;
        const corpo = null; // Null pois GET não tem body;
        const method = 'GET';
    
        let response = await authomatizeRequest(url, method, corpo);
    
        if(response){ //verifica se a response é null
            console.log(response);
            dados = await response.json();
            viewDisciplinas(dados);
        }else{
            alert("Ops! Alguma coisa falhou :(");
            return;
        }
        console.log(dados);
    }
}

function viewDisciplinas(dados){
    const $resultSearch = document.querySelector("#resultSearch");
    let resultado;
    let id, nomeDisciplina;

    for(i = 0; i < dados.length; i++){
        id = dados[i].id;
        nomeDisciplina = dados[i].subjectName;
        if(i>0)
            resultado = resultado + `<p>${id} - ${nomeDisciplina}<p>`
        else
            resultado = `<p>${id} - ${nomeDisciplina}<p>`
    }
    $resultSearch.innerHTML = resultado;
    console.log("executou o for");
}

async function login(){   
    const $emailLogin = document.querySelector('#emailLogin');
    const $senhaLogin = document.querySelector('#senhaLogin');

    let email = $emailLogin.value;
    let senha = $senhaLogin.value;
    let dados;
    let token;

    // const url = "http://localhost:8080/api/auth/login";
    url = "https://projsof.herokuapp.com/api/auth/login";

    const corpo = {email: email, password: senha};
    const method = 'POST';
    let response = await authomatizeRequest(url, method, corpo);
    if(response){
        dados = await response.json(); // se não colocar o await ele retorna uma promisse
        token = dados.token;
        console.log(token);
    }else{
        alert("Ops! Alguma coisa falhou :(");
    } 
}

async function procuraDisciplinaById(){
    
}
