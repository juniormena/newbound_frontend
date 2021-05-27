import { useState, useEffect } from "react";

import useLoading from "../../hooks/useLoading";

import Select from "react-select";
import moment from "moment";
import { connect, useDispatch, useSelector } from "react-redux";
import {getUsuarios} from "../../services/Reportes/llamadasService";
import { getDetalleColasByFilters, getMotivoCierre } from "../../services/Reportes/DetalleColaService";
import { getColasActionDetalles } from "../../redux/actions/colasActions";
import DateRangePicker from "./../Input/DateRangePicker";

function DetalleColasForm({

  currentUser, closeFiltrosComponent,
}) {

  const [users, setusers] = useState([]);
  const [colas, setColas] = useState([]);
  const [motivoCierre, setMotivoCierre] = useState([]);
  const [loading, setLoading] = useLoading();
  const [detalleResult, setDetalleResult] = useState([]);

  const dispatch = useDispatch();

  const [detalleData, setdetalleData] = useState({

    hora_desde: null,
    hora_hasta: null,
    duracion_desde: null,
    duracion_hasta: null,
    tiempo_espera_desde: null,
    tiempo_espera_hasta: null,
    periodoDesde: moment(),
    periodoHasta: moment(),
    agentes: [],
 /*    allAgentes: users, */
    colas: [],
    allColas:currentUser.cola_supervision?.data,
    telefono:"",
    motivo_cierre:[]
  });





  //Use Effects
  useEffect(() => {
    getUsuarios(setusers, currentUser)
   
  }, [setusers, currentUser])


  useEffect(() => {

    if (currentUser!== undefined) {
      setColas(
        currentUser.cola_supervision?.data.map((data) => ({
        value: data.name,
        label: data.nombre,
      }))
    );
      
    }

  }, [currentUser, setColas])

  useEffect(() => {
    getMotivoCierre(setMotivoCierre)
  }, [])

  //Use Effects

  useEffect(() => {
    
    setdetalleData({...detalleData,allAgentes: users})
  }, [users])

  //console.log(detalleData);

  const handleMotivoCierre=(e,select)=>{
    if (select.action === "select-option") {

      setdetalleData({
        ...detalleData,
        motivo_cierre: [...detalleData.motivo_cierre.concat(select.option.value)]
      })
    }
    if (select.action === "remove-value") {

      setdetalleData({
        ...detalleData,
        motivo_cierre: [...detalleData.motivo_cierre.filter(e=>e!==select.removedValue.value  )]
      })
    }
    if ( select.action === "clear") {
      setdetalleData({
        ...detalleData,
        motivo_cierre: []
      })
    }

    //console.log(select.removedValue.value);
  }


  const handleMembers = (e, select) => {

    if (select.action === "select-option") {

      setdetalleData({
        ...detalleData,
        agentes: [...detalleData.agentes.concat(select.option.value)]
      })
    }
 
    if (select.action === "clear") {

      setdetalleData({
        ...detalleData,
        agentes: []
      })

    }
  
    if (select.action === "remove-value") {

      setdetalleData({
        ...detalleData,
        agentes: [...detalleData.agentes.filter(e=>e!==select.removedValue.value  )]
      })
    }


  };

  const handleColas = (e, select) => {

    if (select.action === "select-option") {

      setdetalleData({
        ...detalleData,
        colas: [...detalleData.colas.concat(select.option.value)]
      })

    }
    if (select.action === "clear") {

      setdetalleData({
        ...detalleData,
        colas: []
      })

    }

    if (select.action === "remove-value") {

      setdetalleData({
        ...detalleData,
        colas: [...detalleData.colas.filter(e=>e!==select.removedValue.value  )]
      })
    }

  };

  const handleChangeDatePickerPeriodo = (periodoDesde, periodoHasta) => {

    setdetalleData((prevDetalleData) => ({
      ...prevDetalleData,
      periodoDesde,
      periodoHasta,
    }));
  };

  const handleSubmit = (e) => {
    
    e.preventDefault();
   
    let detalles = { ...detalleData };
    detalles.periodoDesde = moment.isMoment(detalles.periodoDesde)
        ? detalles.periodoDesde.format()
        : null;

    detalles.periodoHasta = moment.isMoment(detalles.periodoHasta)
        ? detalles.periodoHasta.format()
        : null;

     getDetalleColasByFilters(detalles,setDetalleResult, setLoading)

    closeFiltrosComponent();
  };

  useEffect(() => {
    dispatch(getColasActionDetalles(detalleResult))
    
  }, [detalleResult])

 

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row ">
        <div className="col-md-6 border-right border-left ">
        

          <div className="form-group col-md-12">
            <label htmlFor="membername" className="font-weight-bold text-uppercase">Agentes</label>

            <Select

              onChange={handleMembers}
              isMulti
              className="mb-2"
              placeholder="Seleccione agentes"
              options={users}
            />
          </div>

          <div className="form-group col-md-12">
            <label htmlFor="membername" className="font-weight-bold text-uppercase">COLA</label>

            <Select
              onChange={handleColas}
              isMulti
              className="mb-2"
              placeholder="Seleccione la cola"
              options={colas}
            />
          </div>

          <div className="form-group col-md-12">
            <div className="row">

              <div className="col-md-12 mb-3 font-weight-bold text-uppercase">
                Filtro por Tiempo en Espera
              </div>
              <div className="form-group col-md-6">
                <label className="font-weight-bold text-uppercase">

                 Desde
                </label>
                <input
                  type="time"
                  step="1"
                  onChange={(e) => setdetalleData({ ...detalleData, tiempo_espera_desde: e.target.value })}
                  className="form-control"
                />
              </div>

              <div className="form-group col-md-6">
                <label className="font-weight-bold text-uppercase">

                  Hasta
                </label>
                <input
                  type="time"
                  step="1"
                  className="form-control"
                  onChange={(e) => setdetalleData({ ...detalleData, tiempo_espera_hasta: e.target.value })}
                />
              </div>
            </div>

          </div>

          
          <div className="form-group col-md-12">
            <label htmlFor="membername" className="font-weight-bold text-uppercase">Telefono</label>

           <input 
           type="text" 
           className="form-control"
           onChange={(e) => setdetalleData({ ...detalleData,telefono: e.target.value })}/>
          </div>

        </div>
        <div className="col-md-6   border-right ">

        <div className="form-group col-md-12">
            <label className="font-weight-bold text-uppercase">Periodo</label>
            {/* <input type="date" className="form-control" placeholder="Periodo" /> */}
            <DateRangePicker
             className="form-control"
              onChangeDateRange={handleChangeDatePickerPeriodo}
              data={detalleData}
            /*   startName="fecha_desde"
              startName="fecha_hasta"  */
            />
          </div>
          
          <div className="form-group col-md-12">
            <label htmlFor="membername" className="font-weight-bold text-uppercase">Motivo Cierre</label>

            <Select
              onChange={handleMotivoCierre}
              isMulti
              className="mb-2"
              placeholder="Seleccione el motivo"
              options={motivoCierre}
            />
          </div>

          <div className="col-md-12 mb-3 font-weight-bold text-uppercase">
            Filtro por TIEMPO
          </div>
          <div className="form-group col-md-12">
            <div className="row">
              <div className="form-group col-md-6">
                <label className="font-weight-bold text-uppercase">

                  Desde
                </label>
                <input
                  type="time"
                  onChange={(e) => setdetalleData({ ...detalleData, hora_desde: e.target.value })}
                  className="form-control"
                />
              </div>

              <div className="form-group col-md-6">
                <label className="font-weight-bold text-uppercase">

                  Hasta
                </label>
                <input
                  type="time"
                  className="form-control"
                  onChange={(e) => setdetalleData({ ...detalleData, hora_hasta: e.target.value })}
                />
              </div>

            </div>
            <div className="row">
              <div className="col-md-12 mb-3 font-weight-bold text-uppercase">
                Filtro por duracion
          </div>
              <div className="form-group col-md-6">

                <label className="font-weight-bold text-uppercase">
                  Duracion Desde
                </label>
                <input
                  type="time"
                  step='1'
                  className="form-control"
                  onChange={(e) => setdetalleData({ ...detalleData, duracion_desde: e.target.value })}
                />
              </div>

              <div className="form-group col-md-6">
                <label className="font-weight-bold text-uppercase">
                  Duracion Hasta
                </label>
                <input
                  type="time"
                  step='1'
                  className="form-control"
                  onChange={(e) => setdetalleData({ ...detalleData, duracion_hasta: e.target.value })}
                />
              </div>
            </div>

          
          </div>
        </div>

      </div>
      <div className="row ">
        <div className="col-md-12 ">
          <button type="submit" className="btn btn-danger float-right ">
            Buscar </button>
        </div>
      </div>
    </form>
  );
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
  };
};


export default connect(mapStateToProps, null)(DetalleColasForm);

