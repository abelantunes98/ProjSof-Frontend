
/**
 * @author Hércules Rodrigues - herculesra - 117210908.
 */

var token = null;
 // envia um POST com um Json formado pelos dados de um usuário que deseja se cadastrar no sistema.
async function cadastro(){
    const $name = document.querySelector('#name');
    const $lname =  document.querySelector('#lname');
    const $email = document.querySelector('#email');
    const $senha = document.querySelector('#senha');
    
    let name = $name.value;
    let lname = $lname.value;
    let email = $email.value;
    let senha = $senha.value;

    // Rotas para testar a API
    const url = "http://localhost:8080/api/users/";
    // const url = "https://projsof.herokuapp.com/api/users/";

    const corpo = {firstName: name, lastName: lname, email: email, password: senha};
    const method = 'POST';

    const response = await authomatizeRequest(url, method, corpo);

    if(response.ok){ 
        alert("Entre no seu email para completar o cadastro");
    }else{  // deu erro.
        alert("Por favor insira dados corretos\nError: " + response.status);
    }
}


async function login(){   
    
    const $emailLogin = document.querySelector('#emailLogin');
    const $senhaLogin = document.querySelector('#senhaLogin');
    
    let email = $emailLogin.value;
    let senha = $senhaLogin.value;
    let dados;
    
    // Rotas para testar a API
    const url = "http://localhost:8080/api/auth/login";
    // const url = "https://projsof.herokuapp.com/api/auth/login";
    
    const corpo = {email: email, password: senha};
    const method = 'POST';
    let response = await authomatizeRequest(url, method, corpo);
    dados = await response.json(); // se não colocar o await ele retorna uma promisse
    
    if(response.ok){
        this.token = dados.token;
        alert("Bem vindo!\nLogin efetuado com sucesso!");
        console.log(token);
    }else{
        alert(dados.message);
    } 
}

async function procuraDisciplina(){  
    const $schSubject = document.querySelector("#schSubject");
    let subString = $schSubject.value;
    let dados;

    // Rotas para testar a API
    const url = "http://localhost:8080/api/subjects/search/" + subString;
    // const url = "https://projsof.herokuapp.com/api/subjects/search/" + subString;

    const corpo = null; // Null pois GET não tem body;
    const method = 'GET';
    
    if(subString == ""){
        dados = null;
        viewDisciplinas(dados);
    }else{
        let response = await authomatizeRequest(url, method, corpo);
        
        if(response.ok){ 
            dados = await response.json();
            viewDisciplinas(dados);
        }else{
            alert("Ops! Alguma coisa falhou :(");
            return;
        }
    }
}

function viewDisciplinas(dados){
    const $resultSearch = document.querySelector("#resultSearch");
    let resultado;
    let id, nomeDisciplina;

    if(Array.isArray(dados) && dados.length == 0){
        resultado = "Infelizmente não temos esta disciplina no nosso banco de dados."
    }
    
    else if (Array.isArray(dados)) {    //busca por caracteres
        for(i = 0; i < dados.length; i++){
            id = dados[i].id;
            nomeDisciplina = dados[i].subjectName;
            if(i>0)
            resultado = resultado + `<p>${id} - ${nomeDisciplina}<p>`
            else
            resultado = `<p>${id} - ${nomeDisciplina}<p>`
        }
    }
    else if (dados != null){    //busca pelo ID
        id = dados.id;
        nomeDisciplina = dados.subjectName;
        resultado = `<p>${id} - ${nomeDisciplina}<p>`
    }
    
    else{ //quando dados é null
        resultado = "";
    }
    
    $resultSearch.innerHTML = resultado;
}

async function procuraDisciplinaById(){
    
    if (this.token != null) {
        const $schSubjectById = document.querySelector("#schSubjectById");
        let subjectId = $schSubjectById.value;
        let dados

        const url = "http://localhost:8080/api/subjects/searchId/" + subjectId; 
        // const url = "https://projsof.herokuapp.com/api/subjects/searchId/" + subjectId;
        const method = 'GET';
        const body = null;

        if(subjectId != 0){
            let response = await authomatizeRequest(url, method, body);       
            if(response.ok){
                dados = await response.json();
                console.log(dados);
                viewDisciplinas(dados);
            }else{
                alert("ID inválido da disciplina");
            }
        }
    }
}

async function authomatizeRequest(url, method, body){
    let options;
    const headers = new Headers({
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': `Bearer ${token}`
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
