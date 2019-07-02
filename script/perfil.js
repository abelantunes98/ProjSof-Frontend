import {authomatizeRequest} from "./util.js";

/**
 * Função responsável por dar o like na disciplina
 */
async function darLike(){
    
    const url = "https://projsof.herokuapp.com/api/actions/setLike/";
    //const url = "http://localhost:8080/api/actions/setLike/";
    let subject = sessionStorage.getItem("subject")
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
    let subject = sessionStorage.getItem("subject")
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