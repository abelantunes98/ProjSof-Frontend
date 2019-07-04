import {authomatizeRequest} from "./util.js";
import { viewDisciplinas, viewDisciplinaId} from "./view.js";


/**
 * Função Responsável por retorna as disciplinas Pela SubString informada
 * 
 * @param subString - SubString da pesquisa;
 */
async function procuraDisciplina(subString){  
    let dados;

    // Rotas para testar a API
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

/**
 * Função Responsável por procurar a discipina pelo ID
 * Envia o dado(disciplina) para a view
 * 
 * @param subjectId - Id da disciplina pesquisada
 */

async function procuraDisciplinaById(subjectId){
    const token = sessionStorage.getItem("token");
    
    if (subjectId > 0){
        if (token != null && token != "") {
            let dados
        
            const url = "https://projsof.herokuapp.com/api/subjects/searchId/" + subjectId;
            const method = 'GET';
            const body = null;

            let response = await authomatizeRequest(url, method, body);       
            if(response.ok){
                dados = await response.json();
                viewDisciplinaId(dados);
            }else{                         
                alert("ID inválido da disciplina");
            }

        }else{                        
           alert("Você precisa estar logado para essa pesquisa!");
        }
    } else {
        let dados = null;
        viewDisciplinas(dados);
    }
}

export {procuraDisciplina, procuraDisciplinaById};