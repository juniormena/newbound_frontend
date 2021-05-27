import { colasTypes } from "../actions/colasTypes";

const colasReducer = (state = [], action) => {
  switch (action.type) {
    case colasTypes.getColasTypes:
      return {
        ...state,
        colas: action.payload,
      };

    case colasTypes.getColasRulesTypes:
      return {
        ...state,
        colasRules: action.payload,
      };

    case colasTypes.getColasDetalles:
      return {
        ...state,
        colasDetalles: action.payload,
      };

      case colasTypes.getColasResumen:
        return {
          ...state,
          colasResumen: action.payload,
        };
    default:
      return state;
  }
};

export default colasReducer;
