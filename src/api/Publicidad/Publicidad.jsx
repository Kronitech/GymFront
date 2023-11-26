import { urlBackend } from "../urlBackend";

async function saveImagenPublicidad(file){
    const token=localStorage.getItem("token")
    const result=await fetch(urlBackend+"publicidad/upload",{
        method:'POST',
        body:file,
        headers:{
            "Authorization":"Bearer "+token
        }
    })
    return result;

}

async function downloadImagenPublicidad(key){
    const result=await fetch(urlBackend+"publicidad/download?key="+key,{
        method:'GET',
        
    })
    return result;
}
async function listaImagenPublicidad(){
    const result=await fetch(urlBackend+"publicidad",{
        method:'GET',
        
    })
    return result;
}
async function deleteImagenPublicidad(key){
    const token=localStorage.getItem("token")
    const result=await fetch(urlBackend+"publicidad/delete/"+key,{
        method:'DELETE',
        headers:{
            "Authorization":"Bearer "+token
        }
    })
    return result;
}

export {listaImagenPublicidad, downloadImagenPublicidad,saveImagenPublicidad,deleteImagenPublicidad}