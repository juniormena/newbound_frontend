
import { guardarExcelTypes } from "../actions/guardarExcelTypes";

const guardarExcelReducer = (state = [], action) => {
  switch (action.type) {
    case guardarExcelTypes.downloadExcel:
      return {
        ...state,
        datos: action.payload,
      };
  
    default:
      return state;
  }
};

export default guardarExcelReducer;
