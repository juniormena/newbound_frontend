import { useState, useEffect } from "react";
import { useSelector, connect } from "react-redux";
import { useGuardaExcel } from "../../hooks/useGuardaExcel";

import { downloadPdf } from "../../redux/actions/downloadbleActions";
import { formatDate, setHoraMinutosSegundos } from "../../lib/dateHelpers";
import ActividadAgenteRow from "./ActividadAgenteRow";


function ActividadAgenteList({
  currentPage,
  ITEMS_PER_PAGE,
  setTotalItems,
  sorting,
  searchText,
  setCurrentPage,

  setDataToBeDownloaded

}) {

  const [excel, setExcel] = useState({ data: [] })

  const { actividadData } = useSelector(state => state.activividadAgente)

  const [actividadAgenteDatos, setActividadAgenteDatos] = useState([]);

  useEffect(() => {
    setExcel((prevFormValues) => ({ data: [], }));

    if (actividadData !== undefined) {

      actividadData.map(data => {
        setExcel((prevFormValues) => ({
          data: [
            ...prevFormValues.data,
            {

              Fecha: formatDate(data.hora),
              Nombre_Agente: data.u_nombre_completo,
              Cola: data.cola,
              Estado: data.as_estado,
              Motivo: data.motivo,
              Tiempo_en_estado: data.tiempo_en_estado !== null ?
                setHoraMinutosSegundos(data.tiempo_en_estado.hours,
                  data.tiempo_en_estado.minutes,
                  data.tiempo_en_estado.seconds) :
                "No hay tiempo disponible",
              Tiempo_Excedido: data.tiempo_excedido === 0 ? " Si" : " No",
              Minutos_Alerta: data.minutos_alerta !== null ?
                setHoraMinutosSegundos(data.minutos_alerta.hours,
                  data.minutos_alerta.minutes,
                  data.minutos_alerta.seconds) :
                "No hay tiempo disponible",

            },
          ],
        }));
      })

    }
  }, [actividadData])


  useGuardaExcel(excel.data)



  useEffect(() => {
    if (actividadData !== undefined) {

      setDataToBeDownloaded({
        data: actividadData.map(data => [

          formatDate(data.hora),
          data.u_nombre_completo,
          data.cola,
          data.as_estado,
          data.motivo,
          data.tiempo_en_estado !== null ?
            setHoraMinutosSegundos(data.tiempo_en_estado.hours,
              data.tiempo_en_estado.minutes,
              data.tiempo_en_estado.seconds) :
            "No hay tiempo disponible",
          data.tiempo_excedido === 0 ? " Si" : " No",
          data.minutos_alerta !== null ?
            setHoraMinutosSegundos(data.minutos_alerta.hours,
              data.minutos_alerta.minutes,
              data.minutos_alerta.seconds) :
            "No hay tiempo disponible",


        ]), titulo: 'Actividad de Agentes',
        orientacion: "landscape",
        headers: [
          "Fecha",
          "Nombre_Agente",
          "Cola",
          "Estado",
          "Motivo",
          "Tiempo_en_estado",
          "Tiempo_Excedido",
          " Minutos_Alerta",

        ],
        fileName: 'Actividad de Agentes'
      })

    }

  }, [actividadData, setDataToBeDownloaded])




  useEffect(() => {
    const datos = ActividadAgenteData()

    setActividadAgenteDatos(datos)

  }, [actividadData, setTotalItems, currentPage, ITEMS_PER_PAGE, searchText])


  useEffect(() => {

    setCurrentPage(1)
  }, [actividadData, setCurrentPage])



  let ActividadAgenteData = () => {

    let computedData = actividadData

    if (computedData !== undefined) {
      setTotalItems(computedData.length)


      return computedData.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
      );
    }


  }


  return (
    <>
      {
        actividadAgenteDatos !== undefined
        &&
        actividadAgenteDatos.map((AgenteDatos,index) => (
          <ActividadAgenteRow AgenteDatos={AgenteDatos} key={index+3} />
        )
        )
      }
    </>
  );
}


const mapStateToProps = state => {
  return {
    dataToBeDownloaded: state.downloadble.dataToBeDownloaded
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setDataToBeDownloaded: (data) => {
      dispatch({ type: downloadPdf(), payload: data })
    },
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ActividadAgenteList);