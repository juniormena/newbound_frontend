import { DeleteGrabaciones } from '../../services/GrabacionesService';
import {grabacionesTypes} from '../actions/grabacionesTypes'

export const getGrabaciones = (datos) => {
 
    return (dispatch) => {
   
      dispatch(getGrabacionesAction(datos));
     
    };
   
  };
  
  const getGrabacionesAction = (datos) => ({
    type: grabacionesTypes.getAllAudios,
    payload: datos,
  });

  export const deleteGrabaciones = (datos) => {
    return (dispatch) => {
     
     DeleteGrabaciones(datos)
      dispatch(deleteGrabacionesAction(datos));
     
    };
   
  };
  
  const deleteGrabacionesAction = (datos) => ({
    type: grabacionesTypes.deleteAudios,
    payload:datos.id
    
  });