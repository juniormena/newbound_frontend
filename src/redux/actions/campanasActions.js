import {campanasTypes}from './campanasType'


export const campanasByEmpresaAction=(datos)=>{

    return (dispatch)=>{
        dispatch(campanasByEmpresaLoad(datos))
    }
}

export const campanasByEmpresaLoad=(datos)=>({
    type:campanasTypes.campanasByEmpresaType,
    payload:datos
})


export const getCampanaRegistroAction=(datos)=>{

    return (dispatch)=>{
        dispatch(getCampanaRegistroLoad(datos))
    }
}

export const getCampanaRegistroLoad=(datos)=>({
    type:campanasTypes.getCampanaRegistro,
    payload:datos
})