import { useState, useEffect } from "react";

import useLoading from "../../hooks/useLoading";

import Select from "react-select";
import moment from "moment";
import { connect, useDispatch } from "react-redux";
import { getDetalleColasByFilters } from "../../services/Reportes/DetalleColaService";
import {  getColasActionResumen } from "../../redux/actions/colasActions";
import DateRangePicker from "./../Input/DateRangePicker";
import { getResumenColasByFilters } from "../../services/Reportes/ResumenColasService";

function ResumenColasForm({

  currentUser, closeFiltrosComponent,resumenData, setResumenData
}) {

  const [colas, setColas] = useState([]);
  const [resumenResult, setResumenResult] = useState([]);
  const [loading, setLoading] = useLoading();
  const dispatch = useDispatch();


console.log('data setting up',resumenData);

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

      setResumenData({
        ...resumenData,
        colas: [...resumenData.colas.concat(select.option.value)]
      })

    }
    if (select.action === "clear") {

      setResumenData({
        ...resumenData,
        colas: []
      })

    }

    if (select.action === "remove-value") {

      setResumenData({
        ...resumenData,
        colas: [...resumenData.colas.filter(e=>e!==select.removedValue.value  )]
      })
    }


  };


  

  const handleChangeDatePickerPeriodo = (periodoDesde, periodoHasta) => {

    setResumenData((prevDetalleData) => ({
      ...prevDetalleData,
      periodoDesde,
      periodoHasta,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let resumen = { ...resumenData };
    resumen.periodoDesde = moment.isMoment(resumen.periodoDesde)
        ? resumen.periodoDesde.format()
        : null;

    resumen.periodoHasta = moment.isMoment(resumen.periodoHasta)
        ? resumen.periodoHasta.format()
        : null;

    getResumenColasByFilters(resumen,setResumenResult, setLoading)

    closeFiltrosComponent();
  };

  useEffect(() => {
    dispatch(getColasActionResumen(resumenResult))
    
  }, [resumenResult,dispatch])

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
              data={resumenData}
      
            />

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


export default connect(mapStateToProps, null)(ResumenColasForm);

