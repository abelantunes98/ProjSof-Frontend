/**
 * @author Hércules Rodrigues - herculesra - 117210908 - hercules.anselmo@ccc.ufcg.edu.br .
 */

import { procuraDisciplinaById, procuraDisciplina } from "./procuraDisciplina.js";
import { cadastro, login } from "./formulario.js";
import { rankPorComentario, rankPorLike, rankPorDeslike, rankPorProporcao } from "./rank.js";


async function formularioCadastro() {
    const $name = document.querySelector('#name');
    const $lname = document.querySelector('#lname');
    const $email = document.querySelector('#email');
    const $senha = document.querySelector('#senha');

    let name = $name.value;
    let lname = $lname.value;
    let email = $email.value;
    let senha = $senha.value;

    await cadastro(name, lname, email, senha);

}

async function formularioLogin() {
    const $emailLogin = document.querySelector('#emailLogin');
    const $senhaLogin = document.querySelector('#senhaLogin');

    let email = $emailLogin.value;
    let senha = $senhaLogin.value;

    await login(email, senha);
}

async function getSubjectByString() {
    const $schSubject = document.querySelector("#schSubject");
    let subString = $schSubject.value;
    await procuraDisciplina(subString);
}

async function getSubjectById() {
    const $schSubjectById = document.querySelector("#schSubjectById");
    let subjectId = $schSubjectById.value;
    await procuraDisciplinaById(subjectId);
}


async function init() {
    document.getElementById("btn-cadastro").onclick = formularioCadastro;
    document.getElementById("btn-login").onclick = formularioLogin;
    document.getElementById("schSubject").onkeyup = getSubjectByString;
    document.getElementById("schSubjectById").onkeyup = getSubjectById;
    document.querySelector(".rank-comentario").onclick = rankPorComentario;
    document.querySelector(".rank-like").onclick = rankPorLike;
    document.querySelector(".rank-deslike").onclick = rankPorDeslike;
    document.querySelector(".rank-proporcao").onclick = rankPorProporcao;
}

init();