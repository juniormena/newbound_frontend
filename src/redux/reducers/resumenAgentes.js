import { act } from 'react-dom/test-utils'
import {resumenAgentesTypes} from '../actions/resumenAgentesTypes'

export const resumenAgentesReducer=(state=[],action)=>{

    switch (action.type) {
        case resumenAgentesTypes.getResumenAgentesTypes:
            return{
                ...state,
                resumenAgentes:action.payload
            }
    
        default:
           return state
    }
}