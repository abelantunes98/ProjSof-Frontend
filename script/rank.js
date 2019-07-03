import {viewDisciplinas} from "./view.js";
import {authomatizeRequest} from "./util.js";

/**
 * * Ranquear a pesquisa pela quantidade de comentários que a disciplina possui
 */
async function rankPorComentario(){
    
    const url = "https://projsof.herokuapp.com/api/subjects/orderByNumOfComments";

    const corpo = null;
    const method = 'GET';

    const response = await authomatizeRequest(url, method, corpo);

    if(response.ok){ 
        let dados = await response.json();
        viewDisciplinas(dados);
    }else{
        alert(response.message);
    }
}

/**
 * Ranquear a pesquisa pela quantidade de Likes que a disciplina possui
 */
async function rankPorLike(){
    const url = "https://projsof.herokuapp.com/api/subjects/orderByNumLikes";
    const corpo = null;
    const method = 'GET';

    const response = await authomatizeRequest(url, method, corpo);

    if(response.ok){ 
        let dados = await response.json();
        viewDisciplinas(dados);
    }else{   
        alert(response.message);
    }
}

/**
 * Ranquear a pesquisa pela quantidade de Deslikes que a disciplina possui
 */
async function rankPorDeslike(){
    const url = "https://projsof.herokuapp.com/api/subjects/orderByNumDislikes";
    const corpo = null;
    const method = 'GET';

    const response = await authomatizeRequest(url, method, corpo);

    if(response.ok){ 
        let dados = await response.json();
        viewDisciplinas(dados);
    }else{   
        alert(response.message);
    }
}

/**
 * * Ranquear a pesquisa pela proporcao que a disciplina possui
 */
async function rankPorProporcao(){
    const url = "https://projsof.herokuapp.com/api/subjects/orderByProportionLikesDislikes";
    const corpo = null;
    const method = 'GET';

    const response = await authomatizeRequest(url, method, corpo);

    if(response.ok){ 
        let dados = await response.json();
        viewDisciplinas(dados);
    }else{   
        alert(response.message);
    }
}

export {rankPorComentario, rankPorLike, rankPorDeslike, rankPorProporcao};