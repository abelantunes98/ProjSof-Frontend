$resultado = document.getElementById("resultSearch");
$botao = document.getElementById("btn-enviar");
$botao.onclick = () => {
    $comentario = document.getElementById("comentario");
    let numero = $resultado.childNodes.length;

    let comentario = $comentario.value;
    $comentario.value = '';


    console.log(comentario);
    let html = `
                <p>${comentario}</p>
                <button id="btn-comentario${+ numero}">Responder</button>
                `
        let novo = document.createElement("div");
        novo.setAttribute("id","comentario"+ numero);
        let shadow = novo.attachShadow({"mode": "open"});
        shadow.innerHTML = html;
        $resultado.appendChild(novo);
        novo.shadowRoot.querySelector("#btn-comentario"+numero).onclick = () =>{
            let html = `
            <div>
                <input id="resposta" type="text" />
                <button id="btn-resposta"> enviar</button>
            </div>`
            shadow.innerHTML += html;
            novo.shadowRoot.querySelector("#btn-resposta").onclick = () =>{
            $responder = novo.shadowRoot.querySelector("#resposta");
                let resposta = $responder.value;

                let html= `
                        <p>${resposta}</p>
                        `

                shadow.innerHTML += html;
            }; 
        };
        
}

function responderComentario(){
        
}