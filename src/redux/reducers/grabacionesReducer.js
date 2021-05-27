import { grabacionesTypes } from "../actions/grabacionesTypes";

const grabacionesReducer = (state = [], action) => {
  switch (action.type) {
    case grabacionesTypes.getAllAudios:
      return {
        ...state,
        audios: action.payload,
      };
    case grabacionesTypes.deleteAudios:
      return {
           ...state
       
      };
    default:
      return state;
  }
};

export default grabacionesReducer;
