import { useState, useEffect } from "react";
import Select from "react-select";
import moment from "moment";
import { connect, useDispatch } from "react-redux";
import DateRangePicker from "./../Input/DateRangePicker";
import { getUsuarios } from "../../services/Reportes/llamadasService";
import { getResumenAgentes } from "../../services/Reportes/ResumenAgentesService";
import { resumenAgentesAction } from "../../redux/actions/resumenAgentesAction";
import useLoading from "../../hooks/useLoading";


function ResumenAgentesForm({
  currentUser, closeFiltrosComponent,
}) {
 

  const [users, setusers] = useState([]);
  const [ResumenAgentesResult, setResumenAgentesResult] = useState([]);
  const [loading, setLoading] = useLoading();
  const dispatch = useDispatch();


  const [ResumenAgentesData, setResumenAgentesData] = useState({

    periodoDesde: moment(),
    periodoHasta: moment(),
    agentes: [],

  });


  //Use Effects
  useEffect(() => {
    getUsuarios(setusers, currentUser)
  }, [setusers, currentUser])

  useEffect(() => {
    
    setResumenAgentesData({...ResumenAgentesData,allAgentes: users})
  }, [users])

  //Use Effects

  const handleMembers = (e, select) => {

    if (select.action === "select-option") {

      setResumenAgentesData({
        ...ResumenAgentesData,
        agentes: [...ResumenAgentesData.agentes.concat(select.option.value)]
      })
    }
    if ( select.action === "clear") {

      setResumenAgentesData({
        ...ResumenAgentesData,
        agentes: []
      })

    }
    if ( select.action === "remove-value" ) {

      setResumenAgentesData({
        ...ResumenAgentesData,
        agentes: [...ResumenAgentesData.agentes.filter(e=>e!==select.removedValue.value)]
      })

    }

  };



  const handleChangeDatePickerPeriodo = (periodoDesde, periodoHasta) => {

    setResumenAgentesData((prevDetalleData) => ({
      ...prevDetalleData,
      periodoDesde,
      periodoHasta,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let Resumen = { ...ResumenAgentesData};
    Resumen.periodoDesde = moment.isMoment(Resumen.periodoDesde)
        ? Resumen.periodoDesde.format()
        : null;

    Resumen.periodoHasta = moment.isMoment(Resumen.periodoHasta)
        ? Resumen.periodoHasta.format()
        : null;
    getResumenAgentes(Resumen,setResumenAgentesResult, setLoading)
    closeFiltrosComponent();
   
  };


  useEffect(() => {
    dispatch(resumenAgentesAction(ResumenAgentesResult))

  }, [ResumenAgentesResult])


  console.log(ResumenAgentesResult);

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row ">
        <div className="col-md-6 border-right border-left ">


          <div className="form-group col-md-12">
            <label htmlFor="membername" className="font-weight-bold text-uppercase">Agentes</label>

            <Select
               maxMenuHeight={120}
              onChange={handleMembers}
              isMulti
              className="mb-2"
              placeholder="Seleccione agentes"
              options={users}
            />
          </div>

        </div>

        <div className="col-md-6   border-right ">
          <div className="form-group col-md-12">
            <label className="font-weight-bold text-uppercase">Periodo</label>
            <DateRangePicker
              className="form-control"
              onChangeDateRange={handleChangeDatePickerPeriodo}
              data={ResumenAgentesData}

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


export default connect(mapStateToProps, null)(ResumenAgentesForm);

