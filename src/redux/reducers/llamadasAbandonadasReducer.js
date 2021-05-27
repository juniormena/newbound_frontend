import { act } from 'react-dom/test-utils'
import {LlamadasATypes} from '../actions/llamadasAbandonadasTypes'

export const LlamadasAbandonadasReducer=(state=[],action)=>{
    switch (action.type) {
        case LlamadasATypes.getLlamadasAbandonadas:
            return {
                ...state,
                llamadasAbandonadas:action.payload
            }
    
        default:
            return state
    }
}