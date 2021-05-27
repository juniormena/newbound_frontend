import {contactosTypes} from './contactosTypes';

export const getContactosActions = (datos)=>{

    return (dispatch)=>{
        dispatch(getContactosLoad(datos))
    }
} 
export const getContactosLoad = (datos)=>({
    type:contactosTypes.getContactos,
    payload:datos
})