import { darLike,darDeslike,enviaComentario,deletaComentario } from "./perfil.js";


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
    window.sessionStorage.setItem("subject", JSON.stringify(subject));
    let $disciplina = document.getElementById("resultSearch");
    $disciplina.innerHTML = '';
    let html = `<link rel="stylesheet" href="../style/disciplina.css"/>
                <div class="resultado">
                    <p class="disciplina">${subject.name}</p>
                    <button id="btn-verPerfil" class="btn btn-efect">Ver Perfil</button>
                </div>`

    
    let novo = document.createElement("div");
    novo.setAttribute("id","mostrar");
    let shadow = novo.attachShadow({"mode": "open"});
    shadow.innerHTML = html;
    $disciplina.appendChild(novo);
    novo.shadowRoot.querySelector("#btn-verPerfil").onclick = viewPerfil;
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
                    <p class="numDeslikes">DESLIKES: ${subject.unlikes}</p>                   
                    <button id="btn-like" class="btn btn-efect material-icons md-light">thumb_up</button>
                    <button id="btn-deslike" class="btn btn-efect material-icons md-light">thumb_down</button>
                    <div id="comentario">
                        <input id="msgPai" type="text" placeholder="Insira um comentário." />
                        <button id="btn-msgPai">Enviar</button>
                    </div>
                </div>`
    let novo = document.createElement("div");
    novo.setAttribute("id","mostrar");
    let shadow = novo.attachShadow({"mode":"open"});
    shadow.innerHTML = html;
    $resultado.appendChild(novo);
    novo.shadowRoot.querySelector("#btn-like").onclick = darLike;
    novo.shadowRoot.querySelector("#btn-deslike").onclick = darDeslike;
    novo.shadowRoot.querySelector("#btn-msgPai").onclick = enviaComentario;
    viewComentario();
}


function viewComentario(){
    let $divComent = document.getElementById("resultComentario");
    let subject = sessionStorage.getItem("subject");
    let comentarios = JSON.parse(subject).comments;
    let html = "";
    for(let i=0; i < comentarios.length; i++){
        let tamanho_resp = comentarios[i].comments_resp.length;
        let id_button = "btn-comentPai"+comentarios[i].id;
        html += `
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
                    <div class="comentarioPai">
                    <p>${comentarios[i].comment_msg}</p>
                    <button id="${id_button}" class="material-icons">delete</button>
                    <time>${comentarios[i].data}</time>
                    <button>Responder</button>
                    </div>
                    <div class="comentarioFilho">`
        for(let j=0; j < tamanho_resp; j++){
            html += `
                    <p>${comentarios[i].comments_resp[j].comment_msg}</p>
                    <button class="material-icons">delete</button>
                    `
        }
        html += `</div>`

        document.getElementById("btn-comentPai"+comentarios[i].id).onclick = (() => {deletaComentario(comentarios[i].id)});
    }

    $divComent.innerHTML = html;
}


export {viewDisciplinas, viewDisciplinaId, viewPerfil, viewComentario};