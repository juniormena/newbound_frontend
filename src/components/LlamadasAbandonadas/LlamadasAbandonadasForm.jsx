import { useState, useEffect } from "react";

import Select from "react-select";
import moment from "moment";
import { connect, useDispatch } from "react-redux";
import DateRangePicker from "./../Input/DateRangePicker";
import { getLlamadasAbandonadasByFilter } from "../../services/Reportes/LlamadasAbandonadasService";
import { getLlamadasAbandonadasAction } from "../../redux/actions/llamadasAbandonadasActions";
import useLoading from "../../hooks/useLoading";


function LlamadasAbandonadasForm({

  currentUser, closeFiltrosComponent,abandonadasData, setAbandonadasData
}) {

  const [colas, setColas] = useState([]);
  const [abandonadasResult, setAbandonadasResult] = useState([]);
  const [loading, setLoading] = useLoading();
  const dispatch = useDispatch()



  //Use Effects


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

  //Use Effects

  const handleColas = (e, select) => {

    if (select.action === "select-option") {

      setAbandonadasData({
        ...abandonadasData,
        colas: [...abandonadasData.colas.concat(select.option.value)]
      })

    }
    if (select.action === "clear") {

      setAbandonadasData({
        ...abandonadasData,
        colas: []
      })

    }

    if (select.action === "remove-value") {

      setAbandonadasData({
        ...abandonadasData,
        colas: [...abandonadasData.colas.filter(e=>e!==select.removedValue.value  )]
      })
    }


  };


  
  const handleChangeDatePickerPeriodo = (periodoDesde, periodoHasta) => {

    setAbandonadasData((prevDetalleData) => ({
      ...prevDetalleData,
      periodoDesde,
      periodoHasta,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let abandonadas = { ...abandonadasData };
    abandonadas.periodoDesde = moment.isMoment(abandonadas.periodoDesde)
        ? abandonadas.periodoDesde.format()
        : null;

    abandonadas.periodoHasta = moment.isMoment(abandonadas.periodoHasta)
        ? abandonadas.periodoHasta.format()
        : null;

    //getResumenColasByFilters(abandonadas,setAbandonadasResult)
    getLlamadasAbandonadasByFilter(abandonadas,setAbandonadasResult, setLoading)

    closeFiltrosComponent();
  };

/*   console.log(abandonadasResult); */
  useEffect(() => {
    dispatch(getLlamadasAbandonadasAction(abandonadasResult))
    
  }, [abandonadasResult,dispatch])

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row ">
        <div className="col-md-6 border-right border-left ">
        

          <div className="form-group col-md-12">
            <label htmlFor="membername" className="font-weight-bold text-uppercase">COLA</label>

            <Select
             maxMenuHeight={100}
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
              data={abandonadasData}
      
            />

          </div>
       
  
        </div>

      </div>
      <div className="row my-3">
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


export default connect(mapStateToProps, null)(LlamadasAbandonadasForm);

