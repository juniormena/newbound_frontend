import {resumenAgentesTypes} from '../actions/resumenAgentesTypes'


export const resumenAgentesAction =(datos)=>{

    return (dispatch)=>{
       dispatch(resumenAgentesLoad(datos))
    }
}


export const resumenAgentesLoad=(datos)=>({
    type:resumenAgentesTypes.getResumenAgentesTypes,
    payload:datos
})