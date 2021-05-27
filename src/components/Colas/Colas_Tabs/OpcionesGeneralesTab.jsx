
import { useState, useEffect } from 'react';
import { ColasStrategy } from '../../../services/ColasService';
import { musicOnHoldSelect } from '../../../services/MusicaEsperaService'
import PopoverComponent from '../../Popover/PopoverComponent';
import { ColasDescriptions } from '../../../lib/ColasHelper';
import TooltipComponent from '../../Toolttip/TooltipComponent';

export default function OpcionesGeneralesTab({ formValues, setformValues, NombreEmpresa, u_id_empresa, empresaData }) {

 
  const { nombre, servicelevel, musiconhold, strategy, context,id_empresa } = formValues
  const [carpetas, setCarpetas] = useState({ data: [] })
  const [strategyData, setStrategyData] = useState([])


  useEffect(() => {

    musicOnHoldSelect(u_id_empresa, setCarpetas)
  }, [u_id_empresa])

  

  useEffect(() => {
    ColasStrategy(setStrategyData)
  }, [setStrategyData])


  return (
    <div className="tab-pane active" id="formAgentes" role="tabpanel">
       <span className="text-danger ml-1 py-2 card-body row ">Campos con * son requeridos</span>
         
      <div className="card-body row">
        <div className="col-md-6">
          <label htmlFor="Nombre" className="font-weight-bold text-uppercase">Empresa *  </label>

          <select
            //disabled
           // placeholder="Seleccione una empresa"
            name="empresa"
            value={id_empresa }
            onChange={(e) => setformValues({...formValues,id_empresa:Number(e.target.value)})}
            className="custom-select mb-2"
            defaultValue=""
          >
            <option hidden value={u_id_empresa}>{NombreEmpresa}</option>

            {empresaData !== undefined &&
              empresaData.map((emp) => (
                <>
                  <option hidden value="">
                    Seleccione una Empresa
                    </option>
                  <option key={emp.e_nombre_completo} value={emp.e_id}>
                    {emp.e_nombre_completo}
                  </option>
                </>
              ))}
          </select>


          <label htmlFor="Nombre" className="font-weight-bold text-uppercase">Nombre *  </label>
          <input

            required
            type="text"
            //placeholder="Inserte el nombre de la cola"
            value={nombre}
            className="form-control mb-2"
            onChange={(e) =>
              setformValues({ ...formValues, nombre: e.target.value })
            }
          />

          <label htmlFor="strategy" className="font-weight-bold text-uppercase">ESTRATEGIA * </label>
          <PopoverComponent text={ColasDescriptions.strategy} placement="right">
            <i class="fas fa-question-circle ml-2"></i>
          </PopoverComponent>
          <select
           //placeholder="Seleccione una opcion"
            required
            value={strategy}
            onChange={(e) => setformValues({ ...formValues, strategy: e.target.value })}
            className="custom-select mb-2"
            defaultValue=""
          >
            <option hidden value="">
              Seleccione una Opcion
                    </option>
            {
              strategyData.map(estrategia => (
                <option value={estrategia}>{estrategia}</option>))

            }
          </select>


        </div>

        {/*   Segundo Row */}
        <div className="col-md-6">
          <label htmlFor="servicelevel" className="font-weight-bold text-uppercase">SERVICE LEVEL * </label>
          <TooltipComponent text={ColasDescriptions.servicelevel} >
            <i class="fas fa-question-circle ml-2"></i>
          </TooltipComponent>
          <input
          // placeholder="Inserte el service level"
            required
            type="number"
            min="0"
            value={servicelevel}
            className="form-control mb-2"
            onChange={(e) =>
              setformValues({ ...formValues, servicelevel: Number(e.target.value) })
            }
          />

          <label htmlFor="musiconHold" className="font-weight-bold text-uppercase">MUSICA EN ESPERA * </label>
          <TooltipComponent text={ColasDescriptions.musicaonhold}>
            <i class="fas fa-question-circle ml-2"></i>
          </TooltipComponent>
          <select
            //disabled
            required
            value={musiconhold}
            onChange={(e) => setformValues({ ...formValues, musiconhold: e.target.value })}
            className="custom-select mb-2"
            defaultValue=""
          >
            {
              carpetas.data.map((carpeta) => (
                <>
                  <option hidden value="">
                    Seleccione una Opcion
                    </option>
                  {<option key={carpeta.name} value={carpeta.name}>
                    {carpeta.name}
                  </option>

                  }

                </>
              ))}
          </select>

          <label htmlFor="context" className="font-weight-bold text-uppercase">Contexto </label>
          <TooltipComponent text={ColasDescriptions.contexto}>
            <i class="fas fa-question-circle ml-2"></i>
          </TooltipComponent>
          <textarea
          //placeholder="Ingrese un contexto"
            //required
            rows="1"
            value={context}
            className="form-control mb-2"
            onChange={(e) =>
              setformValues({ ...formValues, context: e.target.value })
            }
          ></textarea>
        </div>
      </div>
    </div>
  )
}
