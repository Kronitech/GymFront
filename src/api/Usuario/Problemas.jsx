import { urlBackend } from "../urlBackend";

async function listaProblemas(){
    const token=localStorage.getItem("token")
    const result=await fetch(urlBackend+"problemas",{
        method:"GET",
        headers:{
            "Authorization":"Bearer "+token
        }
    })
    return result;
}

export {listaProblemas}