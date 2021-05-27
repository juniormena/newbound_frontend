

import {musicaTypes} from '../actions/musicaTypes'



const musicaEsperaReducer= (state=0 , action)=>{
    switch(action.type){
        case musicaTypes.musicaEliminar:
            return{
                ...state,
                musicaEliminada:action.payload
            }
        
        default: return state;
    }

}


export default musicaEsperaReducer;