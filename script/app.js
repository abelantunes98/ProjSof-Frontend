
/**
 * @author Hércules Rodrigues - herculesra - 117210908 - hercules.anselmo@ccc.ufcg.edu.br .
 */

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
    // const url = "http://localhost:8080/api/users/";
    const url = "https://projsof.herokuapp.com/api/users/";

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
    // const url = "http://localhost:8080/api/auth/login";
    const url = "https://projsof.herokuapp.com/api/auth/login";
    
    const corpo = {email: email, password: senha};
    const method = 'POST';
    let response = await authomatizeRequest(url, method, corpo);
    dados = await response.json(); // se não colocar o await ele retorna uma promisse
    
    if(response.ok){
        sessionStorage.setItem("token", dados.token); // guardando o token no sessionStorage, perde a informação quando o browser é fechado.
        alert("Bem vindo!\nLogin efetuado com sucesso!");
        console.log(dados.token);
    }else{
        alert(dados.message);
    } 
}

async function procuraDisciplina(){  
    const $schSubject = document.querySelector("#schSubject");
    let subString = $schSubject.value;
    let dados;

    // Rotas para testar a API
    // const url = "http://localhost:8080/api/subjects/search/" + subString;
    const url = "https://projsof.herokuapp.com/api/subjects/search/" + subString;

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


async function procuraDisciplinaById(){
    const token = sessionStorage.getItem("token");
    if (token != null) {
        const $schSubjectById = document.querySelector("#schSubjectById");
        let subjectId = $schSubjectById.value;
        let dados
        
        // const url = "http://localhost:8080/api/subjects/searchId/" + subjectId; 
        const url = "https://projsof.herokuapp.com/api/subjects/searchId/" + subjectId;
        const method = 'GET';
        const body = null;

        if(subjectId != 0){
            let response = await authomatizeRequest(url, method, body);       
            if(response.ok){
                dados = await response.json();
                console.log(dados);
                // viewDisciplinas(dados);
                viewDisciplinaId(dados);
            }else{                         
                alert("ID inválido da disciplina");
            }
        }else{
            dados = null;
            viewDisciplinas(dados);
        }
    }
}

async function authomatizeRequest(url, method, body){
    const token = sessionStorage.getItem("token");
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

function viewDisciplinas(dados){
    let $resultSearch = document.querySelector("#resultSearch");
    $resultSearch.innerHTML = '';

    const tamanhoArray = dados.length;

    //depois resolvo esse csss
    if(tamanhoArray == 0){
        $resultSearch.innerHTML = "Infelizmente não temos esta disciplina no nosso banco de dados."
    }
    for(i = 0; i < tamanhoArray; i++){
        let html = `<link rel="stylesheet" href="../style/disciplina.css"/>
                    <p class="disciplinas">${dados[i].id} - ${dados[i].subjectName}</p>`
        let novo = document.createElement("div");
        let shadow = novo.attachShadow({"mode": "open"});
        shadow.innerHTML = html;
        $resultSearch.appendChild(novo);
    }
}


function viewDisciplinaId(subject){
    let $disciplina = document.getElementById("resultSearch");
    $disciplina.innerHTML = '';
    let html = `<link rel="stylesheet" href="../style/disciplina.css"/>
                <div class="resultado">
                    <p class="disciplina">${subject.subjectName}</p>
                    <button class="verPerfil">Ver Perfil</button>
                </div>`
    let novo = document.createElement("div");
    let shadow = novo.attachShadow({"mode": "open"});
    shadow.innerHTML = html;
    $disciplina.appendChild(novo);
    
}