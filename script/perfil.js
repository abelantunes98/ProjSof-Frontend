import {authomatizeRequest} from "./util.js";
import { viewPerfil,viewComentario} from "./view.js";

/**
 * Função responsável por dar o like na disciplina
 */
async function darLike(){
    
    const url = "https://projsof.herokuapp.com/api/actions/setLike/";
    //const url = "http://localhost:8080/api/actions/setLike/";
    let subject = sessionStorage.getItem("subject");
    subject = JSON.parse(subject);
    let dados;
    let body = {"like_type":1,"idSubject":subject.id};
    let method = 'POST';

    let response = await authomatizeRequest(url, method, body);

    if(response.ok){
        dados = await response.json();
    }

    let likes = dados.likes;
    let deslikes = dados.unlikes;
    subject.likes = likes;
    subject.unlikes = deslikes;
    window.sessionStorage.setItem("subject", JSON.stringify(subject));
    viewPerfil();
}

/**
 * Função Responsável por dar deslike na disciplina
 */
async function darDeslike(){
    
    const url = "https://projsof.herokuapp.com/api/actions/setLike/";
    //const url = "http://localhost:8080/api/actions/setLike/";
    let subject = sessionStorage.getItem("subject");
    subject = JSON.parse(subject);
    let dados;
    let body = {"like_type":-1,"idSubject":subject.id};
    let method = 'POST';

    let response = await authomatizeRequest(url, method, body);

    if(response.ok){
        dados = await response.json();
    }

    let likes = dados.likes;
    let deslikes = dados.unlikes;
    subject.likes = likes;
    subject.unlikes = deslikes;
    window.sessionStorage.setItem("subject", JSON.stringify(subject));
    viewPerfil();
}

async function enviaComentario(){
    let $mostrar = document.getElementById("mostrar");
    let $comentario = $mostrar.shadowRoot.querySelector("#msgPai");
    

    let msg = $comentario.value;

    let subject = JSON.parse(sessionStorage.getItem("subject"));
    
    const url = "https://projsof.herokuapp.com/api/comments/postComment/";
    const corpo = {"id_subject":subject.id, "comment_msg": msg};
    const method = 'POST';

    let response = await authomatizeRequest(url,method,corpo);

    if(response.ok){
        let dados = await response.json();
        dados.comments[dados.comments.length - 1].comments_resp = [];
        sessionStorage.setItem("subject",JSON.stringify(dados));
        viewPerfil();
    }else{
        alert("Imporssível enviar comentário");
    }

}

async function deletaComentario(idComentario){

    const url = "https://projsof.herokuapp.com/api/comments/deleteComment/"+ idComentario;
    const method = 'DELETE';
    const corpo = null;

    let response = await authomatizeRequest(url,method,corpo);

    if(response.ok){
        let dados = await response.json();
        sessionStorage.setItem("subject",JSON.stringify(dados));
        viewPerfil();
    }else{
        alert("Esse comentario não pode ser apagado por você!");
    }


}

export {darLike, darDeslike, enviaComentario,deletaComentario};