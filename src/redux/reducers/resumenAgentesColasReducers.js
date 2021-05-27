import {resumenAColasTypes} from '../actions/resumenAgenteColasTypes'

const resumenAgentesColasReducer=(state = [], action)=>{
    switch (action.type) {
        case resumenAColasTypes.getResumenAColas:
            return {
                ...state,
                resumenAColas: action.payload,
              };
    
        default:
            return state
    }
}

export default resumenAgentesColasReducer