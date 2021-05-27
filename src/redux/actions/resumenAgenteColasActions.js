import {resumenAColasTypes} from '../actions/resumenAgenteColasTypes'

export const getResumenAColasAction =(datos)=>{

    return (dispatch)=>{
        dispatch(getResumenAColasLoad(datos))
    }

}

export const getResumenAColasLoad =(datos)=>({
    type:resumenAColasTypes.getResumenAColas,
    payload:datos
})