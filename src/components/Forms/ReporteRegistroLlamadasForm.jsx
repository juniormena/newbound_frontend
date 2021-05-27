import { useState, useEffect } from "react";
import { handleChangeInput } from "../../lib/helpers";
import useLoading from "../../hooks/useLoading";
import InputCheck from "../Input/InputCheck";
import InputIcon from "./../Input/InputIcon";
import DateRangePicker from "./../Input/DateRangePicker";
import moment from "moment";
import Select from "react-select";
import { timeToDurations } from "../../lib/dateHelpers";
import {
  notificationError,
  validateIntervalsWithMessage,
  validateIntervals,
  isTimeBeginAfter,
  isDateBeginAfter,
} from "../../lib/helpers";

import { connect } from "react-redux";

import {
  getLlamadasByFilters,
  getEstadosLlamada,
  getLlamadas,
  getMotivosCierre,
  getPeriodo,
  getTiposLlamada,
  getUsuarios,
} from "../../services/Reportes/llamadasService";
import { hasPermission } from "../../lib/Permissions";
import {reporteLlamadaUsuarioFilter} from "../../lib/permissionVars";

function ReporteRegistroLlamadasForm({
  onChangeRegistroLlamadasByFilters,
  currentUser,getcurrentUser,closeFiltrosComponent
}) {
  const [loading, setLoading] = useLoading([]);
  const [tiposLlamada, setTiposLlamada] = useState([]);
  const [estadosLlamada, setEstadosLlamada] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  const [registroLlamada, setRegistroLlamada] = useState({
    tiposLlamada: null,
    estadosLlamada: null,
    numeroOrigen: null,
    numeroDestino: null,
    periodoDesde: moment(),
    periodoHasta: moment(),

    rangoHoraDesde: null,
    rangoHoraHasta: null,
    duracionDesde: null,
    duracionHasta: null,
    usuarios: null,
  });

  const [error, setErrors] = useState({
    rangoHoraDesde: null,
    rangoHoraHasta: null,
    periodoDesde: null,
    periodoHasta: null,
    duracionDesde: null,
    duracionHasta: null,
    durations: null,
    hours: null,
  });

  /*useEffect(()=>{
    getcurrentUser();
  },[getcurrentUser])*/

  useEffect(() => {
    getEstadosLlamada(setEstadosLlamada);
    getTiposLlamada(setTiposLlamada);
  }, []);

  useEffect(()=>{
    getUsuarios(setUsuarios, currentUser);
  },[currentUser])

  const registroLlamadaValidations = (registroLlamada) => {
    let isValid = true;

    if (
      !validateIntervals(
        registroLlamada.duracionDesde,
        registroLlamada.duracionHasta
      )
    ) {
      setErrors((prevState) => ({
        ...prevState,
        durations: "Duracion desde y hasta deben ser ambos definidos o ninguno",
      }));

      isValid = false;
    } else {

      setErrors((prevState) => ({ ...prevState, durations: null }));
    }

    if (
      !validateIntervals(
        registroLlamada.rangoHoraDesde,
        registroLlamada.rangoHoraHasta
      )
    ) {
      setErrors((prevState) => ({
        ...prevState,
        hours: "Rango Hora  desde y hasta deben ser ambos definidos o ninguno",
      }));
      isValid = false;
    } else {

      setErrors((prevState) => ({ ...prevState, hours: null }));
    }

    if (
      !validateIntervals(
        registroLlamada.periodoDesde,
        registroLlamada.periodoHasta,
        "Periodo  desde y hasta deben ser ambos definidos o ninguno"
      )
    ) {
      isValid = false;
    }

    // if (
    //   isTimeBeginAfter(
    //     registroLlamada.duracionDesde,
    //     registroLlamada.duracionHasta
    //   )
    // ) {
    //   setErrors((prevState) => ({
    //     ...prevState,
    //     duracionDesde: "Duracion Desde no debe ser mayor a Duracion Hasta",
    //   }));
    //   ;
    //   isValid = false;
    // } else {
    //   ;

    //   setErrors((prevState) => ({ ...prevState, duracionDesde: null }));
    // }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!registroLlamadaValidations(registroLlamada)) {
      return null;
    }

    registroLlamada.duracionDesde = parseInt(
      timeToDurations(registroLlamada.duracionDesde)
    );
    registroLlamada.duracionHasta = parseInt(
      timeToDurations(registroLlamada.duracionHasta)
    );

    onChangeRegistroLlamadasByFilters(e, Object.assign({}, registroLlamada, {allUser:usuarios}));
    closeFiltrosComponent();
  };

  const handleSelectMultipleChange = (name) => {
    return (selectedOptions) => {

      setRegistroLlamada((prevRegistroLlamada) => ({
        ...prevRegistroLlamada,
        [name]: selectedOptions?.map((option) => option.value),
      }));
    };
  };

  const handleChangeNumeroDestinoInput = (e) => {
    handleChangeInput(e, "numeroDestino", registroLlamada, setRegistroLlamada);
  };

  const handleChangeNumeroOrigenInput = (e) => {
    handleChangeInput(e, "numeroOrigen", registroLlamada, setRegistroLlamada);
  };
  const handleChangeRangoHoraDesde = (e) => {
    handleChangeInput(e, "rangoHoraDesde", registroLlamada, setRegistroLlamada);
  };
  const handleChangeRangoHoraHasta = (e) => {
    handleChangeInput(e, "rangoHoraHasta", registroLlamada, setRegistroLlamada);
  };
  const handleChangeDuracionHoraDesde = (e) => {
    handleChangeInput(e, "duracionDesde", registroLlamada, setRegistroLlamada);
  };
  const handleChangeDuracionHoraHasta = (e) => {
    handleChangeInput(e, "duracionHasta", registroLlamada, setRegistroLlamada);
  };

  const handleChangeDatePickerPeriodo = (periodoDesde, periodoHasta) => {
    setRegistroLlamada((prevRegistroLlamada) => ({
      ...prevRegistroLlamada,
      periodoDesde,
      periodoHasta,
    }));
  };

  /* console.log(tiposLlamada); */
 
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row ">
        <div className="col-md-6  border-right border-left ">
          <div className="form-group col-md-12">
            <label className="font-weight-bold text-uppercase">
              Tipo de Llamada:
            </label>
            <Select
              name="tiposLlamada"
              onChange={handleSelectMultipleChange("tiposLlamada")}
              isMulti
              placeholder="Tipo de LLamada"
              options={tiposLlamada}
            />
          </div>

          <div className="form-group col-md-12">
            <label className="font-weight-bold text-uppercase">
              Estado de Llamada:
            </label>
            <Select
              onChange={handleSelectMultipleChange("estadosLlamada")}
              isMulti
              placeholder="Estado de Llamada"
              options={estadosLlamada}
            />
          </div>

          <div className="form-group col-md-12">
            <label className="font-weight-bold text-uppercase">
              Usuarios :
            </label>
            <Select
               maxMenuHeight={200}
              onChange={handleSelectMultipleChange("usuarios")}
              isMulti
              placeholder="Estado de Llamada"
              options={usuarios}
              isDisabled={!hasPermission(reporteLlamadaUsuarioFilter, currentUser.permisosUsuario)}
            />
          </div>
          <div className="form-group col-md-12">
            <InputIcon
              titulo="Numero de Origen
"
              icon="fa-phone"
              labelClass="font-weight-bold text-uppercase"
            >
              <input
                onChange={handleChangeNumeroOrigenInput}
                type="number"
                className="form-control"
                placeholder=" Numero de Origen"
              />
            </InputIcon>
          </div>
          <div className="form-group col-md-12">
            <InputIcon
              titulo="Numero de Destino"
              icon="fa-phone"
              labelClass="font-weight-bold text-uppercase"
            >
              <input
                type="number"
                className="form-control"
                placeholder="Numero de Destino"
                onChange={handleChangeNumeroDestinoInput}
              />
            </InputIcon>
          </div>
        </div>
        <div className="col-md-6  border-right ">
          <div className="form-group col-md-12">
            <label className="font-weight-bold text-uppercase">Periodo</label>
            {/* <input type="date" className="form-control" placeholder="Periodo" /> */}
            <DateRangePicker
              className="form-control"
              onChangeDateRange={handleChangeDatePickerPeriodo}
              data={registroLlamada}
              startName="periodoDesde"
              startName="periodoHasta"
            />

            <hr />
          </div>
          <div className="col-md-12 mb-3 font-weight-bold text-uppercase">
            Rango de Horas
          </div>
          <div className="form-group col-md-12">
            <div className="row">
              <div className="form-group col-md-6">
                <label className="font-weight-bold text-uppercase">
                  {" "}
                  Desde
                </label>
                <input
                  type="time"
                  onChange={handleChangeRangoHoraDesde}
                  className="form-control"
                />
              </div>

              <div className="form-group col-md-6">
                <label className="font-weight-bold text-uppercase">
                  {" "}
                  Hasta
                </label>
                <input
                  type="time"
                  className="form-control"
                  onChange={handleChangeRangoHoraHasta}
                />
              </div>
              {error.hours && (
                <div className="form-group col-md-12 text-danger">
                  {" "}
                  {error.hours}{" "}
                </div>
              )}
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label className="font-weight-bold text-uppercase">
                  Duracion Desde
                </label>
                <input
                  type="time"
                  className="form-control"
                  onChange={handleChangeDuracionHoraDesde}
                />

                {error.duracionDesde && (
                  <div className="form-group col-md-12 text-danger">
                    {" "}
                    {error.duracionDesde}{" "}
                  </div>
                )}
              </div>

              <div className="form-group col-md-6">
                <label className="font-weight-bold text-uppercase">
                  Duracion Hasta
                </label>
                <input
                  type="time"
                  className="form-control"
                  onChange={handleChangeDuracionHoraHasta}
                />
              </div>

              {error.durations && (
                <div className="form-group col-md-12 text-danger">
                  {" "}
                  {error.durations}{" "}
                </div>
              )}
            </div>
            <hr />
          </div>
        </div>
      </div>
      <div className="row ">
      <div className="col-md-12 ">
            <button type="submit" className="btn btn-danger float-right ">
              Buscar
                   </button>
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


// export default ReporteRegistroLlamadasForm
export default connect(mapStateToProps, null)(ReporteRegistroLlamadasForm);
//
