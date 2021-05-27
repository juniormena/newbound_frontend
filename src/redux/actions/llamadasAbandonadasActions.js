import {LlamadasATypes} from './llamadasAbandonadasTypes'

export const getLlamadasAbandonadasAction=(datos)=>{

    return (dispatch)=>{
        dispatch(getLlamadasAbandonadasLoad(datos))
    }

}

export const getLlamadasAbandonadasLoad=(datos)=>( {
        type:LlamadasATypes.getLlamadasAbandonadas,
        payload: datos
    })