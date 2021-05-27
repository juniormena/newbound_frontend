

import Select from "react-select";
import { ColasDescriptions } from '../../../lib/ColasHelper';
import TooltipComponent from '../../Toolttip/TooltipComponent';

function AnunciosTab({ formValues, setformValues, grabaciones,anuncio, setAnuncio }) {

    const { periodic_announce, periodic_announce_frequency,
        random_periodic_announce, relative_periodic_announce,
        announce_holdtime, announce_position, announce_to_first_user, announce_position_limit
    } = formValues



    const handleAnuncio = (e,select) => {
        
        if (select.action==="remove-value") {
     
              setAnuncio({
                ...anuncio,
                data:[...anuncio.data.filter(a=>a!==select.removedValue.label)]
            })

        }
   

      if (select.option!==undefined) {
        setAnuncio({
            ...anuncio,
            data:[...anuncio.data.concat(select.option.label)]
        })
  
      }
        
    }

  
    return (
        <div className="tab-pane active" id="formAgentes" role="tabpanel">
           <span className="text-danger ml-1 py-2 card-body row ">Campos con * son requeridos</span>
         
            <div className="card-body row">
                <div className="col-md-6">

                    <label htmlFor="periodic_announce" className="font-weight-bold text-uppercase">Anuncios</label>
                    <TooltipComponent text={ColasDescriptions.periodic_announce} >
                        <i class="fas fa-question-circle ml-2"></i>
                    </TooltipComponent>
                    <Select
                    
                        name='announce'
                        onChange={handleAnuncio}
                        isMulti
                        className="mb-2"
                        placeholder={periodic_announce==="" || periodic_announce===","?  "Anuncios" :periodic_announce}
                        options={grabaciones}
                    />

                    <label htmlFor="periodic_announce_frequency" className="font-weight-bold text-uppercase">
                        Frecuencia  Anuncios personalizados <TooltipComponent text={ColasDescriptions.periodic_announce_frequency} >
                            <i class="fas fa-question-circle ml-2"></i>
                        </TooltipComponent> </label>

                    <input
                        min="0"
                        type="number"
                        value={periodic_announce_frequency}
                        className="form-control mb-2"
                        onChange={(e) =>
                            setformValues({ ...formValues, periodic_announce_frequency: Number(e.target.value) })
                        }
                    />

                    <label htmlFor="random_periodic_announce" className="font-weight-bold text-uppercase">
                        Reproduccion Aleatoria
                        <TooltipComponent text={ColasDescriptions.random_periodic_announce} >
                            <i class="fas fa-question-circle ml-2"></i>
                        </TooltipComponent>
                    </label>

                    <select
                        value={random_periodic_announce}
                        onChange={(e) => setformValues({ ...formValues, random_periodic_announce: e.target.value })}
                        className="custom-select mb-2"
                        defaultValue=""
                    >
                        <option hidden value="">Seleccione una Opcion</option>
                        <option value="yes">Si</option>
                        <option value="no">No</option>
                    </select>

                    <label htmlFor="relative_periodic_announce" className="font-weight-bold text-uppercase">
                        Periodos relativos de anuncio
                        <TooltipComponent text={ColasDescriptions.periodosrelativos} >
                            <i class="fas fa-question-circle ml-2"></i>
                        </TooltipComponent>
                    </label>

                    <select
                        value={relative_periodic_announce}
                        onChange={(e) => setformValues({ ...formValues, relative_periodic_announce: e.target.value })}
                        className="custom-select mb-2"
                        defaultValue=""
                    >
                        <option hidden value="">Seleccione una Opcion</option>
                        <option value="yes">Si</option>
                        <option value="no">No</option>
                    </select>

                </div>
                <div className="col-md-6">

                    <label htmlFor="announce_holdtime" className="font-weight-bold text-uppercase">
                        Anunciar Tiempo en Espera
                        <TooltipComponent text={ColasDescriptions.announce_holdtime} >
                            <i class="fas fa-question-circle ml-2"></i>
                        </TooltipComponent>
                    </label>

                    <select
                        value={announce_holdtime}
                        onChange={(e) => setformValues({ ...formValues, announce_holdtime: e.target.value })}
                        className="custom-select mb-2"
                        defaultValue=""
                    >
                        <option hidden value="">Seleccione una Opcion</option>
                        <option value="yes">Si</option>
                        <option value="no">No</option>
                        <option value="once">Una Vez</option>
                    </select>

                    <label htmlFor="announce_position" className="font-weight-bold text-uppercase">
                        Anunciar las posicion al cliente
                        <TooltipComponent text={ColasDescriptions.announce_position} placement="left">
                            <i class="fas fa-question-circle ml-2"></i>
                        </TooltipComponent>
                    </label>

                    <select
                        value={announce_position}
                        onChange={(e) => setformValues({ ...formValues, announce_position: e.target.value })}
                        className="custom-select mb-2"
                        defaultValue=""
                    >
                        <option hidden value="">Seleccione una Opcion</option>
                        <option value="yes">Si</option>
                        <option value="no">No</option>
                        <option value="more">Mas</option>
                        <option value="limit">Limitado</option>
                    </select>

                    <label htmlFor="announce_to_first_user" className="font-weight-bold text-uppercase">
                        Anunciar Proximo</label>
                    <TooltipComponent text={ColasDescriptions.anunciarproximo}>
                        <i class="fas fa-question-circle ml-2"></i>
                    </TooltipComponent>
                    <select
                        value={announce_to_first_user}
                        onChange={(e) => setformValues({ ...formValues, announce_to_first_user: e.target.value })}
                        className="custom-select mb-2"
                        defaultValue=""
                    >
                        <option hidden value="">Seleccione una Opcion</option>
                        <option value="yes">Si</option>
                        <option value="no">No</option>

                    </select>

                    <label htmlFor="announce_position_limit" className="font-weight-bold text-uppercase">
                        Limite de anuncio</label>
                    <TooltipComponent text={ColasDescriptions.announce_position_limit}>
                        <i class="fas fa-question-circle ml-2"></i>
                    </TooltipComponent>
                    <input
                        type="number"
                        value={announce_position_limit}
                        className="form-control mb-2"
                        onChange={(e) =>
                            setformValues({ ...formValues, announce_position_limit: Number(e.target.value) })
                        }
                    />

                </div>
            </div>
        </div>
    )
}

export default AnunciosTab
