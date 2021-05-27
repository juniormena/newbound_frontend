import { combineReducers } from "redux";
import musicaEsperaReducer from "./reducers/musicaEsperaReducer";
import grabacionesReducer from "./reducers/grabacionesReducer";
import usuarioReducer from "./reducers/usuarioReducer";
import guardarExcelReducer from "./reducers/guardarExcelReducer";
import downloadbleReducer from './reducers/downloadbleReducer';
import phoneReducer from "./reducers/phoneReducer";
import colasReducer from "./reducers/colasReducer";
import actividadAgenteReducer from "./reducers/actividadAgenteReducer";
import resumenAgentesColasReducer from "./reducers/resumenAgentesColasReducers";
import { LlamadasAbandonadasReducer } from "./reducers/llamadasAbandonadasReducer";
import { contactosReducer } from "./reducers/contactosReducer";
import { resumenAgentesReducer } from "./reducers/resumenAgentes";
import { campanasReducer} from "./reducers/campanasReducer";
import llamadasPrevReducer from "./reducers/llamadasPrevReducer";


const rootReducer = combineReducers({
  user: usuarioReducer,
  musicaEspera: musicaEsperaReducer,
  grabaciones:grabacionesReducer,
  guardarExcel:guardarExcelReducer,
  downloadble:downloadbleReducer,
  jsSIP:phoneReducer,
  colas:colasReducer,
  activividadAgente:actividadAgenteReducer,
  resumenAColas:resumenAgentesColasReducer,
  llamadasAbandonadas:LlamadasAbandonadasReducer,
  contactos:contactosReducer,
  resumenAgentes:resumenAgentesReducer,
  campanas:campanasReducer,
  llamadasPrev:llamadasPrevReducer

});

export default rootReducer;
