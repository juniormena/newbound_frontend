import moment from 'moment';
import React from 'react'
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Select from "react-select";
import { getCampanaRegistroAction } from '../../redux/actions/campanasActions';



import { getCampanaRegistrosByFilter, getCampanaRegistrosHistoricoByFilter } from '../../services/campanasService';



const initialState = {

    estado: 0,
    llamada_desde: moment(),
    llamada_hasta: moment(),

    ultimo_accesoInicio: moment(),
    ultimo_accesoFin: moment(),
    periodoDesde: moment(),
    periodoHasta: moment(),
    cliente: ""

}
function CampanasFormFiltros({ closeFiltrosComponent2, campanaEstados, campanaRegistroInfo,
    registroRadio, setRegistroRadio }) {

    const [datos, setDatos] = useState([])
    const [formValues, setformValues] = useState(initialState)
 

    const {
        llamada_desde,
        llamada_hasta,
        periodoDesde,
        periodoHasta,
        ultimo_accesoInicio,
        ultimo_accesoFin,
        cliente,
    } = formValues

    const dispatch = useDispatch()


    //Submit

    const handleSubmit = (e) => {
        e.preventDefault()

        if (registroRadio==='registro') {
            getCampanaRegistrosByFilter({ formValues, campanaRegistroInfo }, setDatos)
          } else {
            getCampanaRegistrosHistoricoByFilter({ formValues, campanaRegistroInfo }, setDatos)
          }
       
        closeFiltrosComponent2();
    };

    useEffect(() => {
        dispatch(getCampanaRegistroAction(datos))
    }, [datos, setDatos])
    //Coloca nombre de empresa en el select del form

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-row ">
                <div className="col-md-6 border-right border-left ">

                    <div className="form-row">
                        <div className="col-md-12 mb-3 font-weight-bold text-uppercase">
                            Ultimo Accesso
                        </div>
                        <div className="form-group col-md-12 col-lg-6 mb-4">
                            <label className="font-weight-bold text-uppercase">desde</label>
                            <input
                                value={ultimo_accesoInicio}
                                class="form-control"
                                type="date"
                                onChange={(e) => setformValues({ ...formValues, ultimo_accesoInicio: e.target.value })}
                            />

                        </div>
                        <div className="form-group col-md-12 col-lg-6 mb-4">
                            <label className="font-weight-bold text-uppercase">hasta</label>
                            <input
                                value={ultimo_accesoFin}
                                class="form-control"
                                type="date"
                                onChange={(e) => setformValues({ ...formValues, ultimo_accesoFin: e.target.value })}
                            />

                        </div>
                    </div>

                    <div className="row">

                        <div className="form-group col-md-12 col-lg-6 mb-4">
                            <label htmlFor="membername" className="font-weight-bold text-uppercase">Llamada Desde</label>
                            <input
                                value={llamada_desde}
                                class="form-control"
                                type="date"
                                onChange={(e) => setformValues({ ...formValues, llamada_desde: e.target.value })}
                            />
                        </div>

                        <div className="form-group col-md-12 col-lg-6 mb-4">
                            <label htmlFor="membername" className="font-weight-bold text-uppercase">Llamada Hasta</label>
                            <input
                                value={llamada_hasta}
                                class="form-control"
                                type="date"
                                onChange={(e) => setformValues({ ...formValues, llamada_hasta: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-md-12 col-lg-12 ">
                            <label htmlFor="membername" className="font-weight-bold text-uppercase">Clientes</label>

                            <input

                                placeholder="Inserte el nombre del Cliente"
                                //required
                                type="text"
                                value={cliente}
                                className="form-control"
                                onChange={(e) =>
                                    setformValues({ ...formValues, cliente: e.target.value })
                                }
                            />
                        </div>


                    </div>
                </div>

                <div className="col-md-6   border-right ">

                    <div className="form-row">
                        <div className="col-md-12 mb-3 font-weight-bold text-uppercase">
                            Fecha Ingreso
                        </div>
                        <div className="form-group col-md-12 col-lg-6 mb-4">

                            <label className="font-weight-bold text-uppercase">Desde</label>
                            <input

                                value={periodoDesde}
                                class="form-control"
                                type="date"
                                onChange={(e) => setformValues({ ...formValues, periodoDesde: e.target.value })}
                            />

                        </div>

                        <div className="form-group col-md-12 col-lg-6 mb-4">
                            <label className="font-weight-bold text-uppercase">Hasta</label>
                            <input
                                value={periodoHasta}
                                class="form-control"
                                type="date"
                                onChange={(e) => setformValues({ ...formValues, periodoHasta: e.target.value })}
                            />


                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-12 col-lg-12 ">
                            <label htmlFor="membername" className="font-weight-bold text-uppercase">Estado</label>

                            <Select
                                maxMenuHeight={100}
                                onChange={(e => setformValues({ ...formValues, estado: [e.value] }))}
                                className="mb-2"
                                placeholder="Seleccione el estado"
                                options={campanaEstados.length > 0 && campanaEstados}
                            />
                        </div>
                    </div>

                    <div className="form-row ">
                        <div class="form-group col-12 col-lg-3 form-check form-check-inline">
                            <input className="form-check-input" 
                                   type="radio" 
                                   id="registro" 
                                   value="registro" 
                                   name="registro" 
                                   checked={registroRadio==='registro'}
                                   onChange={()=>setRegistroRadio("registro")}/>
                            <label class="form-check-label font-weight-bold text-uppercase" 
                            for="registro">registro</label>
                        </div>
                        <div class="form-group col-12 col-lg-6 form-check form-check-inline">
                            <input className="form-check-input" 
                                   type="radio" 
                                   id="Registro_Historico" 
                                   value="registro_historico" 
                                   name="registro"
                                   checked={registroRadio==="registro_historico"}
                                   onChange={()=>setRegistroRadio("registro_historico")}/>
                            <label class="form-check-label font-weight-bold text-uppercase" 
                            for="Registro_Historico">registro Historico</label>
                        </div>
                        {/* <div className="form-group col-md-12 col-lg-12 ">
                            <label htmlFor="membername" className="font-weight-bold text-uppercase">Estado</label>

                            <Select
                                maxMenuHeight={100}
                                onChange={(e => setformValues({ ...formValues, estado: [e.value] }))}
                                className="mb-2"
                                placeholder="Seleccione el estado"
                                options={campanaEstados.length > 0 && campanaEstados}
                            />
                        </div> */}
                    </div>

                </div>

            </div>



            <div className="row ">
                <div className="col-md-12 mt-2">
                    <button type="submit" className="btn btn-danger float-right ">
                        Buscar
                   </button>
                </div>
            </div>
        </form>
    )
}

export default CampanasFormFiltros

