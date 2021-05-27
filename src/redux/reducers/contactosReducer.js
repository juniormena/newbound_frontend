import {contactosTypes} from '../actions/contactosTypes'

export const contactosReducer=(state=[],action)=>{

    switch (action.type) {
        case contactosTypes.getContactos:
            return {
                ...state,
                contactos:action.payload
            }
    
        default:
           return state
    }
}