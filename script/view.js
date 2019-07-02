import { darLike,darDeslike } from "./perfil.js";


/**
 * Função para mostrar os ids e nomes das disciplinas.
 * @param  dados - ID's e Nomes das disciplinas ques estão no banco de dados.
 */
function viewDisciplinas(dados){
    let $resultSearch = document.querySelector("#resultSearch");
    $resultSearch.innerHTML = '';
    let tamanhoArray = 0;

    if(dados != null) { 
        tamanhoArray = dados.length;
    }

    //Resolver esse csss
    if(tamanhoArray == 0 && dados != null){
        $resultSearch.innerHTML = "Infelizmente não temos esta disciplina no nosso banco de dados."
    }
    for(let i = 0; i < tamanhoArray; i++){
        let html = `<link rel="stylesheet" href="../style/disciplina.css"/>
                    <p class="disciplinas">${dados[i].id} - ${dados[i].subjectName}</p>`
        let novo = document.createElement("div");
        let shadow = novo.attachShadow({"mode": "open"});
        shadow.innerHTML = html;
        $resultSearch.appendChild(novo);
    }
}

/**
 * Função responsável por mostrar a disciplina com botão para o perfil dela.
 * @param subject - Disciplina buscada pelo ID
 */

function viewDisciplinaId(subject){
    // debugger;
    window.sessionStorage.setItem("subject", JSON.stringify(subject));
    let $disciplina = document.getElementById("resultSearch");
    $disciplina.innerHTML = '';
    let html = `<link rel="stylesheet" href="../style/disciplina.css"/>
                <div class="resultado">
                    <p class="disciplina">${subject.name}</p>
                    <button id="btn-verPerfil" class="btn btn-efect" >Ver Perfil</button>
                </div>`

    
    let novo = document.createElement("div");
    novo.setAttribute("id","mostrar");
    let shadow = novo.attachShadow({"mode": "open"});
    shadow.innerHTML = html;
    $disciplina.appendChild(novo);
    document.getElementById("btn-verPerfil").onclick = viewPerfil;
    // document.getElementById("btn-verPerfil").onclick = this.viewPerfil(); // Não sei se precisa de algum tratamento diferente pois a função está aqui
}

/**
 * Função responsável por mostrar o Perfil da disciplina.
 */
function viewPerfil(){
   
    let subject = sessionStorage.getItem("subject")
    subject = JSON.parse(subject);
    let $resultado = document.getElementById("resultSearch");
    $resultado.innerHTML = '';
    
    let html = `<link href="../style/disciplina.css" rel="stylesheet"/>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
                <div class="resultado">
                    <p class="disciplina">${subject.name}</p>
                    <p class="numLikes">LIKES: ${subject.likes}</p>
                    <p class="numUnlikes">UNLIKES: ${subject.unlikes}</p>                   
                    <button id="btn-like" class="btn btn-efect material-icons md-light">thumb_up</button>
                    <button id="btn-deslike" class="btn btn-efect material-icons md-light">thumb_down</button>
                </div>`
    let novo = document.createElement("div");
    let shadow = novo.attachShadow({"mode":"open"});
    shadow.innerHTML = html;
    $resultado.appendChild(novo);
    document.getElementById("btn-like").onclick = darLike; // falta importar
    document.getElementById("btn-deslike").onclick = darDeslike; // falta importar

}

export {viewDisciplinas, viewDisciplinaId, viewPerfil};