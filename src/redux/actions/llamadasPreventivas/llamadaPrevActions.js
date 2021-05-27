import {GET_CAMPANA_REGISTRO_TO_LLAMADAS, GET_CAMPANAS_TO_LLAMADAS,
    GENERATE_CALL, RESET_LLAMADAPREV_STATE, SHOW_ESTADO_LLAMADA} from "./llamadaPrevTypes";

export const getCampanasToLLamadasAction = ()=> GET_CAMPANAS_TO_LLAMADAS;
export const getCampanasRegistrosToLlamadasAction = ()=> GET_CAMPANA_REGISTRO_TO_LLAMADAS;
export const generateCallAction = ()=> GENERATE_CALL;
export const resetLlamadaPrevStateAction = ()=> RESET_LLAMADAPREV_STATE;
export const showEstadoLlamadaAction = ()=> SHOW_ESTADO_LLAMADA;
