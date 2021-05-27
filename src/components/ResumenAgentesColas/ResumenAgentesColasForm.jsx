import { useState, useEffect } from "react";



import Select from "react-select";
import moment from "moment";
import { connect, useDispatch } from "react-redux";


import DateRangePicker from "./../Input/DateRangePicker";

import { toast } from "react-toastify";
import { getResumenAgenteColas } from "../../services/Reportes/ResumenAgenteColasService";
import { getUsuarios } from "../../services/Reportes/llamadasService";
import { getResumenAColasAction } from "../../redux/actions/resumenAgenteColasActions";
import useLoading from "../../hooks/useLoading";


function ResumenAgentesColasForm({
  currentUser, closeFiltrosComponent,
}) {
 

  const [users, setusers] = useState([]);
  const [colas, setColas] = useState([]);
  const [ResumenAgentesResult, setResumenAgentesResult] = useState([]);
  const [loading, setLoading] = useLoading();
  const dispatch = useDispatch();



  const [ResumenAgentesColasData, setResumenAgentesColasData] = useState({

    periodoDesde: moment(),
    periodoHasta: moment(),
    agentes: [],
    
    colas: [],
    allColas:currentUser.cola_supervision?.data,

  });


  //Use Effects
  useEffect(() => {
    getUsuarios(setusers, currentUser)
  }, [setusers, currentUser])

  useEffect(() => {
    
    setResumenAgentesColasData({...ResumenAgentesColasData,allAgentes: users})
  }, [users])

  useEffect(() => {

    if (currentUser !== undefined) {
      setColas(
        currentUser.cola_supervision?.data.map((data) => ({
          value: data.name,
          label: data.nombre,
        }))
      );

    }

  }, [currentUser, setColas])


  //Use Effects

  const handleMembers = (e, select) => {

    if (select.action === "select-option") {

      setResumenAgentesColasData({
        ...ResumenAgentesColasData,
        agentes: [...ResumenAgentesColasData.agentes.concat(select.option.value)]
      })
    }
    if ( select.action === "clear") {

      setResumenAgentesColasData({
        ...ResumenAgentesColasData,
        agentes: []
      })

    }
    if ( select.action === "remove-value" ) {

      setResumenAgentesColasData({
        ...ResumenAgentesColasData,
        agentes: [...ResumenAgentesColasData.agentes.filter(e=>e!==select.removedValue.value)]
      })

    }

  };

  const handleColas = (e, select) => {

    if (select.action === "select-option") {

      setResumenAgentesColasData({
        ...ResumenAgentesColasData,
        colas: [...ResumenAgentesColasData.colas.concat(select.option.value)]
      })

    }
    if (select.action === "clear") {

      setResumenAgentesColasData({
        ...ResumenAgentesColasData,
        colas: []
      })

    }
    if (select.action === "remove-value" ) {

      setResumenAgentesColasData({
        ...ResumenAgentesColasData,
        colas: [...ResumenAgentesColasData.colas.filter(e=>e!==select.removedValue.value  )]
      })

    }

  };

  const handleChangeDatePickerPeriodo = (periodoDesde, periodoHasta) => {

    setResumenAgentesColasData((prevDetalleData) => ({
      ...prevDetalleData,
      periodoDesde,
      periodoHasta,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let ResumenAgentesColas = { ...ResumenAgentesColasData};
    ResumenAgentesColas.periodoDesde = moment.isMoment(ResumenAgentesColas.periodoDesde)
        ? ResumenAgentesColas.periodoDesde.format()
        : null;

    ResumenAgentesColas.periodoHasta = moment.isMoment(ResumenAgentesColas.periodoHasta)
        ? ResumenAgentesColas.periodoHasta.format()
        : null;

    getResumenAgenteColas(ResumenAgentesColas,setResumenAgentesResult, setLoading)
    closeFiltrosComponent();
   
  };


  useEffect(() => {
    dispatch(getResumenAColasAction(ResumenAgentesResult))

  }, [ResumenAgentesResult])



  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row ">
        <div className="col-md-6 border-right border-left ">


          <div className="form-group col-md-12">
            <label htmlFor="membername" className="font-weight-bold text-uppercase">Agentes</label>

            <Select
               maxMenuHeight={150}
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
              maxMenuHeight={150}
              onChange={handleColas}
              isMulti
              className="mb-2"
              placeholder="Seleccione la cola"
              options={colas}
            />
          </div>

        </div>

        <div className="col-md-6   border-right ">
          <div className="form-group col-md-12">
            <label className="font-weight-bold text-uppercase">Periodo</label>
            <DateRangePicker
              className="form-control"
              onChangeDateRange={handleChangeDatePickerPeriodo}
              data={ResumenAgentesColasData}

            />
          </div>
        </div>

      </div>
      <div className="row  ">
        <div className="col-md-12 my-4">
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


export default connect(mapStateToProps, null)(ResumenAgentesColasForm);

