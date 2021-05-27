import {actividadAgenteTypes} from '../actions/actividadAgenteTypes'

const actividadAgenteReducer = (state = [], action) => {
    switch (action.type) {
      case actividadAgenteTypes.getActividadAgenteType:
        return {
          ...state,
          actividadData: action.payload,
        };
  
      default:
        return state;
    }
  };
  
  export default actividadAgenteReducer;
  