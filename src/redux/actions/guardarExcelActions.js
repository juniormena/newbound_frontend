import {guardarExcelTypes} from '../actions/guardarExcelTypes'

export const GuardarExcelFunction = (datos) => {
    return (dispatch) => {
    
      dispatch(GuardarExcelAction(datos));
     
    };
   
  };
  
  const GuardarExcelAction = (datos) => ({
    type: guardarExcelTypes.downloadExcel,
    payload:datos
    
  });