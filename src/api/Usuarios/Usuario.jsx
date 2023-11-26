import { urlBackend } from "../urlBackend";

async function listaUsuarioRol(rol){
    const token=localStorage.getItem("token")
    const result=await fetch(urlBackend+"rol/usuario/"+rol,{
        method:"GET",
        headers:{
            "Authorization":"Bearer "+token
        }
    })
    return result;
}

export {listaUsuarioRol}