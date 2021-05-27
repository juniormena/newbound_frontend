import { useState, useEffect } from "react";
import Select from "react-select";
import moment from "moment";
import { connect, useDispatch } from "react-redux";
import DateRangePicker from "./../Input/DateRangePicker";
import { getEstadosActividadAgente, getActividadAgente } from "../../services/Reportes/ActividadAgenteService";
import { toast } from "react-toastify";
import { getActividadAgenteAction } from "../../redux/actions/actividadAgenteAction";
import {getUsuarios} from "../../services/Reportes/llamadasService";
import useLoading from "../../hooks/useLoading";

function ActividadAgenteForm({

  currentUser, closeFiltrosComponent,
}) {
 

  const [users, setusers] = useState([]);
  const [colas, setColas] = useState([]);
  const [estados, setEstados] = useState([]);
  const [ActividadResult, setActividadResult] = useState([]);
  const [loading, setLoading] = useLoading();
  const dispatch = useDispatch();


  const [ActividadAgenteData, setActividadAgenteData] = useState({

    periodoDesde: moment(),
    periodoHasta: moment(),
    agente: "",
    colas: [],
    allColas:currentUser.cola_supervision?.data,
    estados: []
  });




  //Use Effects
  useEffect(() => {
    getUsuarios(setusers, currentUser)
  }, [setusers, currentUser])

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



  useEffect(() => {

    getEstadosActividadAgente(setEstados)

  }, [setEstados])



  //Use Effects


  const handleEstados = (e, select) => {

    if (select.action === "select-option") {

      setActividadAgenteData({
        ...ActividadAgenteData,
        estados: [...ActividadAgenteData.estados.concat(select.option.value)]
      })
    }
    if (select.action === "clear") {

      setActividadAgenteData({
        ...ActividadAgenteData,
        estados: []
      })

    }
    if (select.action === "remove-value" ) {

      setActividadAgenteData({
        ...ActividadAgenteData,
        estados: [...ActividadAgenteData.estados.filter(e=>e!==select.removedValue.value )]
      })

    }

  };

  const handleColas = (e, select) => {

    if (select.action === "select-option") {

      setActividadAgenteData({
        ...ActividadAgenteData,
        colas: [...ActividadAgenteData.colas.concat(select.option.value)]
      })

    }
    if (select.action === "clear") {

      setActividadAgenteData({
        ...ActividadAgenteData,
        colas: []
      })

    }
    if (select.action === "remove-value" ) {

      setActividadAgenteData({
        ...ActividadAgenteData,
        colas: [...ActividadAgenteData.colas.filter(e=>e!==select.removedValue.value )]
      })

    }

  };

  const handleChangeDatePickerPeriodo = (periodoDesde, periodoHasta) => {

    setActividadAgenteData((prevDetalleData) => ({
      ...prevDetalleData,
      periodoDesde,
      periodoHasta,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (ActividadAgenteData.agente === "") {
      toast.error("Debe Seleccionar un Agente")
    }
    else {
      let actividadAgente = { ...ActividadAgenteData };
      actividadAgente.periodoDesde = moment.isMoment(actividadAgente.periodoDesde)
          ? actividadAgente.periodoDesde.format()
          : null;

      actividadAgente.periodoHasta = moment.isMoment(actividadAgente.periodoHasta)
          ? actividadAgente.periodoHasta.format()
          : null;

      getActividadAgente(actividadAgente, setActividadResult, setLoading)
      closeFiltrosComponent();
    }

  };

  useEffect(() => {
    dispatch(getActividadAgenteAction(ActividadResult))
  }, [ActividadResult])

  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      height: "500",
      borderBottom: '1px dotted pink',
   
      padding: 20,
    })}

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row ">
        <div className="col-md-6 border-right border-left ">


          <div className="form-group col-md-12 mb-4">
            <label htmlFor="membername" className="font-weight-bold text-uppercase">Agentes</label>

            <Select

              onChange={(e) => setActividadAgenteData({ ...ActividadAgenteData, agente: e.value })}
              maxMenuHeight={200}
              className="mb-2"
              placeholder="Seleccione agente"
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

          <div className="form-group col-md-12 mb-4">
            <label htmlFor="membername" className="font-weight-bold text-uppercase">Estados</label>

            <Select
             maxMenuHeight={200}
              onChange={handleEstados}
              isMulti
              className="mb-2"
              placeholder="Seleccione la cola"
              options={estados}
            />
          </div>

          <div className="form-group col-md-12">


            <label className="font-weight-bold text-uppercase">Periodo</label>

            <DateRangePicker
              className="form-control"
              onChangeDateRange={handleChangeDatePickerPeriodo}
              data={ActividadAgenteData}

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


export default connect(mapStateToProps, null)(ActividadAgenteForm);

