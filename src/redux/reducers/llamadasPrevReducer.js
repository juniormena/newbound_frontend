import {
    GET_CAMPANA_REGISTRO_TO_LLAMADAS,
    GET_CAMPANAS_TO_LLAMADAS,
    GENERATE_CALL,
    RESET_LLAMADAPREV_STATE,
    SHOW_ESTADO_LLAMADA
} from "../actions/llamadasPreventivas/llamadaPrevTypes";

const llamadasPrev = {};

const llamadasPrevReducer = (state = llamadasPrev, action)=>{
    switch(action.type){
        case GET_CAMPANAS_TO_LLAMADAS:
           return Object.assign({}, state, {campanasData:action.payload});

        case GET_CAMPANA_REGISTRO_TO_LLAMADAS:
            return Object.assign({}, state, {campanaRegistroData:action.payload});

        case GENERATE_CALL:
            return Object.assign({},state, {generatedCall:action.payload});

        case SHOW_ESTADO_LLAMADA:
            return Object.assign({}, state, {showEstadoLlamada:action.payload});

        case RESET_LLAMADAPREV_STATE:
            return action.payload;

        default: return state;
    }

}


export default llamadasPrevReducer;