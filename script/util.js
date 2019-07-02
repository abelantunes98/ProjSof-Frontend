/**
 * 
 * @param url - URL para fazer a requisição.
 * @param method - Methodos do cabeçalho da requisição (Ex. POST, GET, DELETE...).
 * @param body - corpo da requisição, Dependendo da requisição ele pode ser Null.
 */
async function authomatizeRequest(url, method, body){
    const token = sessionStorage.getItem("token");
    let options;
    const headers = new Headers({
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': `Bearer ${token}`
    });
        
    const defaults = {
        headers: headers
    };
    
    if(body == null){
        options = {
        method: method  
        };
    }else{
        options = {
            method: method,
            body: JSON.stringify(body)
        };
    }

    options = Object.assign({}, defaults, options);
    return  await fetch(url, options);
}


export {authomatizeRequest};