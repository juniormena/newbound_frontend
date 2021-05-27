import React from 'react'
import { ColasDescriptions } from '../../../lib/ColasHelper'
import TooltipComponent from '../../Toolttip/TooltipComponent'

function TiemposTab({ formValues, setformValues }) {

    const { timeout, retry, timeoutpriority, wrapuptime, announce_frequency, min_announce_frequency } = formValues

    return (
        <div className="tab-pane active" id="formAgentes" role="tabpanel">
          <span className="text-danger ml-1 py-2 card-body row ">Campos con * son requeridos</span>
         
            <div className="card-body row">
                <div className="col-md-6">
                    <label htmlFor="timeout" className="font-weight-bold text-uppercase">Timeout * </label>
                    <TooltipComponent text={ColasDescriptions.timeout}>
                        <i class="fas fa-question-circle ml-2"></i>
                    </TooltipComponent>
                    <input
                        min="0"
                        type="number"
                        value={timeout}
                        className="form-control mb-2"
                        onChange={(e) =>
                            setformValues({ ...formValues, timeout: Number(e.target.value) })
                        }
                    />

                    <label htmlFor="retry" className="font-weight-bold text-uppercase">Reintento *  </label>
                    <TooltipComponent text={ColasDescriptions.retry}>
                        <i class="fas fa-question-circle ml-2"></i>
                    </TooltipComponent>
                    <input
                        min="0"
                        type="number"
                        value={retry}
                        className="form-control mb-2"
                        onChange={(e) =>
                            setformValues({ ...formValues, retry: Number(e.target.value) })
                        }
                    />

                    <label htmlFor="timeoutpriority" className="font-weight-bold text-uppercase">Prioridad Tiempos * </label>
                    <TooltipComponent text={ColasDescriptions.prioridad} placement='right' >
                        <i class="fas fa-question-circle ml-2"></i>
                    </TooltipComponent>
                    <select
                        value={timeoutpriority}
                        onChange={(e) => setformValues({ ...formValues, timeoutpriority: e.target.value })}
                        className="custom-select mb-2"
                        defaultValue=""
                    >
                        <option hidden value="">Seleccione una Opcion</option>
                        <option value="app">APP</option>
                        <option value="conf">CONF</option>
                    </select>
                </div>
                {/* Segundo Row */}
                <div className="col-md-6">
                    <label htmlFor="wrapuptime" className="font-weight-bold text-uppercase">Tiempo descanso Agente *  <TooltipComponent text={ColasDescriptions.wrapuptime} >
                        <i class="fas fa-question-circle ml-2"></i>
                    </TooltipComponent></label>

                    <input
                        min="0"
                        type="number"
                        value={wrapuptime}
                        className="form-control mb-2"
                        onChange={(e) => setformValues({ ...formValues, wrapuptime: Number(e.target.value) })}
                    />

                    <label htmlFor="announce_frequency" className="font-weight-bold text-uppercase">
                        Frecuencia Anuncio
                        <TooltipComponent text={ColasDescriptions.frecuenciaanuncio} >
                        <i class="fas fa-question-circle ml-2"></i>
                    </TooltipComponent>
                        </label>
                  
                    <input
                        min="0"
                        type="number"
                        value={announce_frequency}
                        className="form-control mb-2"
                        onChange={(e) => setformValues({ ...formValues, announce_frequency: Number(e.target.value) })}
                    />

                    <label htmlFor="min_announce_frequency" className="font-weight-bold text-uppercase">
                        Tiempo minimo entre anuncio
                        <TooltipComponent text={ColasDescriptions.tiempominimofrecuencia} >
                        <i class="fas fa-question-circle ml-2"></i>
                    </TooltipComponent>
                        </label>
                    
                    <input
                        min="0"
                        type="number"
                        value={min_announce_frequency}
                        className="form-control mb-2"
                        onChange={(e) => setformValues({ ...formValues, min_announce_frequency: Number(e.target.value) })}
                    />
                </div>
            </div>
        </div>
    )
}

export default TiemposTab
