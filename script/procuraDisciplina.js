import {authomatizeRequest} from "./util.js";


/**
 * Função Responsável por retorna as disciplinas Pela SubString informada
 * 
 */
async function procuraDisciplina(){  
    const $schSubject = document.querySelector("#schSubject");
    let subString = $schSubject.value;
    let dados;

    // Rotas para testar a API
    //const url = "http://localhost:8080/api/subjects/search/" + subString;
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
 */

async function procuraDisciplinaById(){
    const token = sessionStorage.getItem("token");
    const $schSubjectById = document.querySelector("#schSubjectById");
    let subjectId = $schSubjectById.value;
    
    if (subjectId > 0){
        if (token != null && token != "") {
            let dados
        
            //const url = "http://localhost:8080/api/subjects/searchId/" + subjectId; 
            const url = "https://projsof.herokuapp.com/api/subjects/searchId/" + subjectId;
            const method = 'GET';
            const body = null;

            let response = await authomatizeRequest(url, method, body);       
            if(response.ok){
                dados = await response.json();
                console.log(dados);
                viewDisciplinaId(dados);
            }else{                         
                alert("ID inválido da disciplina");
            }

        }else{                        
           alert("Você precisa estar logado para essa pesquisa!");
        }
    } else {
        dados = null;
        viewDisciplinas(dados);
    }
}

export {procuraDisciplina, procuraDisciplinaById};