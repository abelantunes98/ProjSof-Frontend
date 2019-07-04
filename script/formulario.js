import {authomatizeRequest} from "./util.js";
/**
 * Função responsável por cadastrar um novo usuário.
 * @param name - nome do usuário
 * @param lname - ultimo nome
 * @param email - email do usuário
 * @param senha - senha do usuário
 */
async function cadastro(name, lname, email, senha){
    // Rotas para testar a API
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

/**
 * Função responsável por efetuar o login de um Usuário já cadastrado.
 * retorna um token para ser guardado no sessionStorage do navegador.
 * 
 * @param email - para login
 * @param senha - para login
 */
async function login(email, senha){   
    let dados;

    // Rotas para testar a API
    const url = "https://projsof.herokuapp.com/api/auth/login";
    
    const corpo = {email: email, password: senha};
    const method = 'POST';
    let response = await authomatizeRequest(url, method, corpo);
    dados = await response.json(); // se não colocar o await ele retorna uma promisse
    
    if(response.ok){
        sessionStorage.setItem("token", dados.token); // guardando o token no sessionStorage, perde a informação quando o browser é fechado.
        alert("Bem vindo!\nLogin efetuado com sucesso!");
    }else{
        alert(dados.message);
    } 
}

export {cadastro, login};