
import {colasTypes} from '../actions/colasTypes'


//Colas
export const getColasAction = (datos) => {
 
    return (dispatch) => {
   
      dispatch(getColasActionLoad(datos));
     
    };
   
  };
  
  const getColasActionLoad = (datos) => ({
    type: colasTypes.getColasTypes,
    payload: datos,
  });


  //Colas-Rules
  export const getColasRulesAction = (datos) => {
 
    return (dispatch) => {
   
      dispatch(getColasRulesActionLoad(datos));
     
    };
   
  };
  
  const getColasRulesActionLoad = (datos) => ({
    type: colasTypes.getColasRulesTypes,
    payload: datos,
  });


  //Colas Detalles
  export const getColasActionDetalles = (datos) => {

    return (dispatch) => {
   
      dispatch(getColasDetallesActionLoad(datos));
     
    };
   
  };

  
  const getColasDetallesActionLoad = (datos) => ({
    type: colasTypes.getColasDetalles,
    payload: datos,
  });

  //Colas Resumen

  export const getColasActionResumen = (datos) => {

    return (dispatch) => {
   
      dispatch(getColasResumenActionLoad(datos));
     
    };
   
  };

  const getColasResumenActionLoad = (datos) => ({
    type: colasTypes.getColasResumen,
    payload: datos,
  });

