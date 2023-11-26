import { urlBackend } from "../urlBackend";


async function saveUser(usuario){
    const result=await fetch(urlBackend+"users/register",{
        method:'POST',
        body:JSON.stringify(usuario),
        headers:{
            "Content-type":"application/json"
        }
    })
    return result;
}

export {saveUser}