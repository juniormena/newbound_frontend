import { useState, useEffect } from "react";
import { useSelector, connect } from "react-redux";
import { useGuardaExcel } from "../../hooks/useGuardaExcel";

import { downloadPdf } from "../../redux/actions/downloadbleActions";
import { formatDate, formatDate2, setHoraMinutosSegundos } from "../../lib/dateHelpers";
import ResumenAgentesColasRow from "./ResumenAgentesColasRow";


function ResumenAgentesColasList({
  currentPage,
  ITEMS_PER_PAGE,
  setTotalItems,
  sorting,
  searchText,
  setCurrentPage,

  setDataToBeDownloaded

}) {

  const [excel, setExcel] = useState({ data: [] })

  const { resumenAColas } = useSelector(state => state.resumenAColas)


  const [resumenAgenteDatos, setResumenAgenteDatos] = useState([])



  useEffect(() => {
    setExcel((prevFormValues) => ({ data: [], }));
    console.log(resumenAColas);
    if (resumenAColas !== undefined) {

      resumenAColas.map(data => {
        let t_ready = setHoraMinutosSegundos(data.tiempo_ready?.hours,
          data.tiempo_ready?.minutes, data.tiempo_ready?.seconds)

        let t_adminp = setHoraMinutosSegundos(data.tiempo_admin_posterior?.hours,
          data.tiempo_admin_posterior?.minutes, data.tiempo_admin_posterior?.seconds)

        let Tiempo_Pause = setHoraMinutosSegundos(data.tiempo_pause?.hours,
          data.tiempo_pause?.minutes, data.tiempo_pause?.seconds)

        let Tiempo_login = setHoraMinutosSegundos(data.tiempo_login?.hours,
          data.tiempo_login?.minutes, data.tiempo_login?.seconds)

        let Tiempo_total = setHoraMinutosSegundos(data.tiempo_total?.hours,
          data.tiempo_total?.minutes, data.tiempo_total?.seconds)

        let Tiempo_logoff = setHoraMinutosSegundos(data.tiempo_logoff?.hours,
          data.tiempo_logoff?.minutes, data.tiempo_logoff?.seconds)

        setExcel((prevFormValues) => ({
          data: [
            ...prevFormValues.data,
            {
              Fecha: formatDate2(data.fecha),
              Login: data.login === null ? "" : formatDate(data.login),
              Logoff: data.logoff === null ? "" : formatDate(data.logoff),
              Cola: data.cola,
              Agente: data.agente,
              Cantidad_llamadas: data.cant_llamadas,
              Tiempo_Ready: t_ready === "00:00" ? "-" : t_ready,
              Tiempo_Pause: Tiempo_Pause === "00:00" ? "-" : Tiempo_Pause,
              Hablado_Cola: setHoraMinutosSegundos(data.hablado_cola?.hours,
                data.hablado_cola?.minutes, data.hablado_cola?.seconds),
              Tiempo_Admin_Posterior: t_adminp === "00:00" ? "-" : t_adminp,
              Avg_AHT: setHoraMinutosSegundos(data.avg_aht.hours,
                data.avg_aht.minutes, data.avg_aht.seconds),
              Tiempo_login: Tiempo_login === "00:00" ? "-" : Tiempo_login,
              Tiempo_total: Tiempo_total === "00:00" ? "-" : Tiempo_total,
              Tiempo_logoff: Tiempo_logoff === "00:00" ? "-" : Tiempo_logoff
            },
          ],
        }));
      })

    }
  }, [resumenAColas])


  useGuardaExcel(excel.data)



  useEffect(() => {
    if (resumenAColas !== undefined) {

      setDataToBeDownloaded({
        data: resumenAColas.map(data => [

          formatDate2(data.fecha),
          data.login === null ? "" : formatDate(data.login),
          data.logoff === null ? "" : formatDate(data.logoff),
          data.cola,
          data.agente,
          data.cant_llamadas,

          //Tiempo Ready
          setHoraMinutosSegundos(data.tiempo_ready?.hours,
            data.tiempo_ready?.minutes, data.tiempo_ready?.seconds) === "00:00" ? "-" :
            setHoraMinutosSegundos(data.tiempo_ready?.hours,
              data.tiempo_ready?.minutes, data.tiempo_ready?.seconds),

          //pause
          setHoraMinutosSegundos(data.tiempo_pause?.hours,
            data.tiempo_pause?.minutes, data.tiempo_pause?.seconds) === "00:00" ? "-" :
            setHoraMinutosSegundos(data.tiempo_pause?.hours,
              data.tiempo_pause?.minutes, data.tiempo_pause?.seconds),
          //Hablando Cola
          setHoraMinutosSegundos(data.hablado_cola?.hours,
            data.hablado_cola?.minutes, data.hablado_cola?.seconds),
          //posterior
          setHoraMinutosSegundos(data.tiempo_admin_posterior?.hours,
            data.tiempo_admin_posterior?.minutes, data.tiempo_admin_posterior?.seconds) === "00:00" ? "-" :
            setHoraMinutosSegundos(data.tiempo_admin_posterior?.hours,
              data.tiempo_admin_posterior?.minutes, data.tiempo_admin_posterior?.seconds),
          //AVGAHT
          setHoraMinutosSegundos(data.avg_aht.hours,
            data.avg_aht.minutes, data.avg_aht.seconds),

          //login
          setHoraMinutosSegundos(data.tiempo_login?.hours,
            data.tiempo_login?.minutes, data.tiempo_login?.seconds) === "00:00" ? "-" :
            setHoraMinutosSegundos(data.tiempo_login?.hours,
              data.tiempo_login?.minutes, data.tiempo_login?.seconds),
          //total
          setHoraMinutosSegundos(data.tiempo_total?.hours,
            data.tiempo_total?.minutes, data.tiempo_total?.seconds) === "00:00" ? "-" :
            setHoraMinutosSegundos(data.tiempo_total?.hours,
              data.tiempo_total?.minutes, data.tiempo_total?.seconds),
          //logoff
          setHoraMinutosSegundos(data.tiempo_logoff?.hours,
            data.tiempo_logoff?.minutes, data.tiempo_logoff?.seconds) === "00:00" ? "-" :
            setHoraMinutosSegundos(data.tiempo_logoff?.hours,
              data.tiempo_logoff?.minutes, data.tiempo_logoff?.seconds)
        ]), titulo: 'Resumen de Agentes Por Colas',
        orientacion: "landscape",
        headers: [
          "Fecha",
          "Login",
          "Logoff",
          "Cola",
          "Agente",
          "Cantidad llamadas",
          "Tiempo Ready",
          "Tiempo Pause",
          "Hablado Cola",
          "Tiempo Admin Posterior",
          "Avg_AHT",
          "Tiempo login",
          "Tiempo total",
          "Tiempo logoff"
        ],
        fileName: 'Resumen de Agentes Por Colas'
      })

    }

  }, [resumenAColas, setDataToBeDownloaded])




  useEffect(() => {
    const datos = ResumenAColasData()

    setResumenAgenteDatos(datos)

  }, [resumenAColas, setTotalItems, currentPage, ITEMS_PER_PAGE, searchText])


  useEffect(() => {

    setCurrentPage(1)
  }, [resumenAColas, setCurrentPage])



  let ResumenAColasData = () => {

    let computedData = resumenAColas

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
        resumenAgenteDatos !== undefined
        &&
        resumenAgenteDatos.map((resumenAColasDatos, index) => (
          <ResumenAgentesColasRow resumenAColasDatos={resumenAColasDatos} key={index+1}/>
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


export default connect(mapStateToProps, mapDispatchToProps)(ResumenAgentesColasList);