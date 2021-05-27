import {actividadAgenteTypes} from '../actions/actividadAgenteTypes'

export const getActividadAgenteAction = (datos) => {
 
    return (dispatch) => {
   
      dispatch(getActividadAgenteLoad(datos));
     
    };
   
  };
  
  const getActividadAgenteLoad = (datos) => ({
    type: actividadAgenteTypes.getActividadAgenteType,
    payload: datos,
  });