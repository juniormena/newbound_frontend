import {campanasTypes} from '../actions/campanasType'

export const campanasReducer=(state=[],action)=>{

    switch (action.type) {
        case campanasTypes.campanasByEmpresaType:
            return{
                ...state,
                campanasData:action.payload
            }

        case campanasTypes.getCampanaRegistro:
                return{
                    ...state,
                    CampanaRegistroData:action.payload
                }
                
    
        default:
          return state
    }
}