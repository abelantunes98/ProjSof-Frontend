import { darLike, darDeslike, enviaComentario, deletaComentario, responderComentario } from "./perfil.js";


/**
 * Função para mostrar os ids e nomes das disciplinas.
 * @param  dados - ID's e Nomes das disciplinas ques estão no banco de dados.
 */
function viewDisciplinas(dados) {
    let $resultSearch = document.querySelector("#resultSearch");
    $resultSearch.innerHTML = '';
    document.getElementById("resultComentario").innerHTML = '';
    let tamanhoArray = 0;

    if (dados != null) {
        tamanhoArray = dados.length;
    }

    //Resolver esse csss
    if (tamanhoArray == 0 && dados != null) {
        $resultSearch.innerHTML = "Infelizmente não temos esta disciplina no nosso banco de dados."
    }
    for (let i = 0; i < tamanhoArray; i++) {
        let html = `<link rel="stylesheet" href="../style/disciplina.css"/>
                    <p class="disciplina">${dados[i].id} - ${dados[i].subjectName}</p>`
        let novo = document.createElement("div");
        let shadow = novo.attachShadow({ "mode": "open" });
        shadow.innerHTML = html;
        $resultSearch.appendChild(novo);
    }
}

/**
 * Função responsável por mostrar a disciplina com botão para o perfil dela.
 * @param subject - Disciplina buscada pelo ID
 */

function viewDisciplinaId(subject) {
    window.sessionStorage.setItem("subject", JSON.stringify(subject));
    let $disciplina = document.getElementById("resultSearch");
    $disciplina.innerHTML = '';
    document.getElementById("resultComentario").innerHTML = '';
    let html = `<link rel="stylesheet" href="../style/disciplina.css"/>
                <div class="resultado">
                    <p class="disciplina">${subject.name}</p>
                    <button id="btn-verPerfil" class="btn btn-efect">Ver Perfil</button>
                </div>`


    let novo = document.createElement("div");
    novo.setAttribute("id", "mostrar");
    let shadow = novo.attachShadow({ "mode": "open" });
    shadow.innerHTML = html;
    $disciplina.appendChild(novo);
    novo.shadowRoot.querySelector("#btn-verPerfil").onclick = viewPerfil;
}

/**
 * Função responsável por mostrar o Perfil da disciplina.
 */
function viewPerfil() {

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
    novo.setAttribute("id", "mostrar");
    let shadow = novo.attachShadow({ "mode": "open" });
    shadow.innerHTML = html;
    $resultado.appendChild(novo);
    novo.shadowRoot.querySelector("#btn-like").onclick = darLike;
    novo.shadowRoot.querySelector("#btn-deslike").onclick = darDeslike;
    novo.shadowRoot.querySelector("#btn-msgPai").onclick = enviaComentario;
    viewComentario();
}


function viewComentario() {
    let $divComent = document.getElementById("resultComentario");
    let subject = sessionStorage.getItem("subject");
    let comentarios = JSON.parse(subject).comments;
    let html = "";
    let idsBotoes = new Array();
    for (let i = 0; i < comentarios.length; i++) {
        let tamanho_resp = comentarios[i].comments_resp.length;
        let id_button = "btn-comentPai" + comentarios[i].id;
        let respComments = "btn-comentsResp" + comentarios[i].id;
        idsBotoes.push([id_button, comentarios[i].id, respComments]);
        html += `
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
                    <div class="comentarioPai">
                    <p id="msg-pai" class="msg">${comentarios[i].comment_msg}</p>
                    <p id="nome-usuario" class="user-nome">${comentarios[i].user_name}</p>
                    <button id="${id_button}" class="btn-apagar material-icons">delete</button>
                    <time class="hora">Em: ${comentarios[i].data}</time>
                    <button id="${respComments}" class="btn-responder">Respostas</button>
                    </div>`

    }

    $divComent.innerHTML = html;

    idsBotoes.forEach(idVez => {
        document.getElementById(idVez[0]).onclick = (() => { deletaComentario(idVez[1]) });
        document.getElementById(idVez[2]).onclick = (() => { viewRespComentario(idVez[1]) });
    });
}

function viewRespComentario(commentId) {
    let $divComent = document.getElementById("resultComentario");
    let idsBotoes = new Array();
    let subject = sessionStorage.getItem("subject");
    let comentarios = JSON.parse(subject).comments;
    let html = `<button id="voltar" class="material-icons">undo</button>`;
    let comment;
    comentarios.forEach(commentVez => {
        if (commentVez.id == commentId) {
            comment = commentVez;
        }
    });
    let commentsResp = comment.comments_resp;
    let tamanho_resp = commentsResp.length;
    for (let i = 0; i < tamanho_resp; i++) {
        let id_button = "btn-comentFilho" + commentsResp[i].id;
        idsBotoes.push([id_button, commentsResp[i].id]);
        html += `
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
                        <div class="comentarioFilho">
                        <p class="msg">${commentsResp[i].comment_msg}</p>
                        <p class="user-nome">${commentsResp[i].user_name}</p>
                        <button id="${id_button}" class="btn-apagar material-icons">delete</button>
                        <time class="hora">Em:${commentsResp[i].data}</time>
                        </div>`

    }

    $divComent.innerHTML = html;

    idsBotoes.forEach(idVez => {
        document.getElementById(idVez[0]).onclick = (() => { deletaComentario(idVez[1]) });
    });
    document.getElementById("voltar").onclick = () => { viewPerfil(); };
    let shadow = document.getElementById("mostrar");
    shadow.shadowRoot.querySelector("#btn-msgPai").onclick = () => { responderComentario(commentId) };
}


export { viewDisciplinas, viewDisciplinaId, viewPerfil, viewComentario };