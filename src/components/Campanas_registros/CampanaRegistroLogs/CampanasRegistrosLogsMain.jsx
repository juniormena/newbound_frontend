import { useEffect, useState } from "react";
import CampanasLogsPorLlamada from "../../../pages/CampanasRegistros/CampanasLogsPorLlamada";
import CampanasRegistrosPorEstado from '../../../pages/CampanasRegistros/CampanasRegistrosPorEstado';


function CampanasRegistrosLogsMain({ 
 campanaInfo }) {

const [LogsState, setLogsState] = useState("Por Llamada")




  return (
    <div>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" onClick={()=>setLogsState("Por Llamada")}>
                    <a className="nav-link active" id="llamadas-tab" data-toggle="tab" href="#llamadas" role="tab" aria-controls="llamadas" aria-selected="true">
                        <i className="fas fa-phone-alt mr-1"></i> Por Llamadas</a>
                </li>

                <li className="nav-item" onClick={()=>setLogsState("Por Estados")}>
                    <a className="nav-link" id="estado-tab" data-toggle="tab" href="#estado" role="tab" aria-controls="estado" aria-selected="false">
                        <i className="fas fa-exclamation-circle mr-1"></i>Por Estados</a>
                </li>
             

            </ul>
            <div noValidate className="colasForm" /* onSubmit={handleSubmit} */>
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="llamadas" role="tabpanel" aria-labelledby="llamadas-tab">
                    <CampanasLogsPorLlamada campanaRegistro={campanaInfo}  LogsState={LogsState} setLogsState={setLogsState}/>
                    </div>
                    <div className="tab-pane fade" id="estado" role="tabpanel" aria-labelledby="tiempos-tab">
                        <CampanasRegistrosPorEstado campanaRegistro={campanaInfo} LogsState={LogsState} setLogsState={setLogsState}/>
                    </div>
                   
                </div>
            </div >

        </div>
  )
}



export default CampanasRegistrosLogsMain;