import { useState, useEffect } from "react";
import { useSelector, connect } from "react-redux";
import { useGuardaExcel } from "../../hooks/useGuardaExcel";

import { downloadPdf } from "../../redux/actions/downloadbleActions";
import { formatDate, formatDate2, setHoraMinutosSegundos } from "../../lib/dateHelpers";

import ResumenAgentesRow from "./ResumenAgentesRow";


function ResumenAgentesList({
  currentPage,
  ITEMS_PER_PAGE,
  setTotalItems,
  sorting,
  searchText,
  setCurrentPage,

  setDataToBeDownloaded

}) {

  const [excel, setExcel] = useState({ data: [] })

  const { resumenAgentes } = useSelector(state => state.resumenAgentes)

  const [resumenAgenteDatos, setResumenAgenteDatos] = useState([])



  useEffect(() => {
    setExcel((prevFormValues) => ({ data: [], }));
    if (resumenAgentes !== undefined) {

      resumenAgentes.map(data => {
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
        let Tiempo_total_hablado = setHoraMinutosSegundos(data.tiempo_total_hablado?.hours,
          data.tiempo_total_hablado?.minutes, data.tiempo_total_hablado?.seconds)

        let Tiempo_logoff = setHoraMinutosSegundos(data.tiempo_logoff?.hours,
          data.tiempo_logoff?.minutes, data.tiempo_logoff?.seconds)

        let Tiempo_Hablado_Cola = setHoraMinutosSegundos(data.tiempo_hablado_cola?.hours,
          data.tiempo_hablado_cola?.minutes, data.tiempo_hablado_cola?.seconds)

        let Tiempo_Hablado_entrantes = setHoraMinutosSegundos(data.tiempo_hablado_entrantes_directas?.hours,
          data.tiempo_hablado_entrantes_directas?.minutes, data.tiempo_hablado_entrantes_directas?.seconds)

        let Tiempo_Hablado_salientes = setHoraMinutosSegundos(data.tiempo_hablado_salientes_directas?.hours,
          data.tiempo_hablado_salientes_directas?.minutes, data.tiempo_hablado_salientes_directas?.seconds)

        let Tiempo_salientes_campanas = setHoraMinutosSegundos(data.tiempo_salientes_campanas?.hours,
          data.tiempo_salientes_campanas?.minutes, data.tiempo_salientes_campanas?.seconds)


        setExcel((prevFormValues) => ({
          data: [
            ...prevFormValues.data,
            {
              Fecha: formatDate2(data.fecha),
              Login: data.login === null ? "" : formatDate(data.login),
              Logoff: data.logoff === null ? "" : formatDate(data.logoff),
              Agente: data.agente,
              Cantidad_llamadas: data.cant_llamadas,
              Cantidad_llamadas_entrantes:data.llamadas_entrantes,
              Cantidad_llamadas_salientes:data.llamadas_salientes,
              Tiempo_Ready: t_ready === "00:00" ? "-" : t_ready,
              Tiempo_Pause: Tiempo_Pause === "00:00" ? "-" : Tiempo_Pause,
              Tiempo_Hablado_Cola: Tiempo_Hablado_Cola === "00:00" ? "-" : Tiempo_Hablado_Cola,
              Tiempo_Hablado_salientes_Directas: Tiempo_Hablado_salientes === "00:00" ? "-" : Tiempo_Hablado_salientes,
              Tiempo_Hablado_entrantes_Directas: Tiempo_Hablado_entrantes === "00:00" ? "-" : Tiempo_Hablado_entrantes,
              Tiempo_salientes_campanas: Tiempo_salientes_campanas === "00:00" ? "-" : Tiempo_salientes_campanas,
              Tiempo_Admin_Posterior: t_adminp === "00:00" ? "-" : t_adminp,
              Tiempo_total_hablado: Tiempo_total_hablado === "00:00" ? "-" : Tiempo_total_hablado,
              Tiempo_login: Tiempo_login === "00:00" ? "-" : Tiempo_login,
              Tiempo_total: Tiempo_total === "00:00" ? "-" : Tiempo_total,
              Tiempo_logoff: Tiempo_logoff === "00:00" ? "-" : Tiempo_logoff
            },
          ],
        }));
      })

    }
  }, [resumenAgentes])


  useGuardaExcel(excel.data)



  useEffect(() => {
    if (resumenAgentes !== undefined) {

      setDataToBeDownloaded({
        data: resumenAgentes.map(data => [

          formatDate2(data.fecha),
          data.login === null ? "" : formatDate(data.login),
          data.logoff === null ? "" : formatDate(data.logoff),
          data.agente,
          data.cant_llamadas,
          data.llamadas_entrantes,
          data.llamadas_salientes,

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

          //Tiempo Hablado Cola
          setHoraMinutosSegundos(data.tiempo_hablado_cola?.hours,
            data.tiempo_hablado_cola?.minutes, data.tiempo_hablado_cola?.seconds),

          //Tiempo Hablado Salientes
          setHoraMinutosSegundos(data.tiempo_hablado_salientes_directas?.hours,
            data.tiempo_hablado_salientes_directas?.minutes, data.tiempo_hablado_salientes_directas?.seconds),

          //Tiempo Hablado Entrantes
          setHoraMinutosSegundos(data.tiempo_hablado_entrantes_directas?.hours,
            data.tiempo_hablado_entrantes_directas?.minutes, data.tiempo_hablado_entrantes_directas?.seconds),

          //Tiempo Hablado Salientes
          setHoraMinutosSegundos(data.tiempo_salientes_campanas?.hours,
            data.tiempo_salientes_campanas?.minutes, data.tiempo_salientes_campanas?.seconds),

          //posterior
          setHoraMinutosSegundos(data.tiempo_admin_posterior?.hours,
            data.tiempo_admin_posterior?.minutes, data.tiempo_admin_posterior?.seconds) === "00:00" ? "-" :
            setHoraMinutosSegundos(data.tiempo_admin_posterior?.hours,
              data.tiempo_admin_posterior?.minutes, data.tiempo_admin_posterior?.seconds),

          //Tiempo Hablado Salientes
          setHoraMinutosSegundos(data.tiempo_total_hablado?.hours,
            data.tiempo_total_hablado?.minutes, data.tiempo_total_hablado?.seconds),

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
        ]), titulo: 'Resumen de Agentes',
        orientacion: "landscape",
        headers: [
          "Fecha",
          "Login",
          "Logoff",
          "Agente",
          "Total llamadas",
          "Llamadas entrantes",
          "Llamadas salientes",
          "Tiempo Ready",
          "Tiempo Pause",
          "Tiempo Hablado Cola",
          "Tiempo Hablado Salientes Directas",
          "Tiempo Hablado Entrantes Directas",
          "Tiempo Salientes Campañas",
          "Tiempo Admin Posterior",
          "Tiempo Total Hablado",
          "Tiempo login",
          "Tiempo total",
          "Tiempo logoff"
        ],
        fileName: 'Resumen de Agentes'
      })

    }

  }, [resumenAgentes, setDataToBeDownloaded])




  useEffect(() => {
    const datos = ResumenAgentesData()

    setResumenAgenteDatos(datos)

  }, [resumenAgentes, setTotalItems, currentPage, ITEMS_PER_PAGE, searchText])


  useEffect(() => {

    setCurrentPage(1)
  }, [resumenAgentes, setCurrentPage])



  let ResumenAgentesData = () => {

    let computedData = resumenAgentes

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
        resumenAgenteDatos.map(resumenAgentes => (
          <ResumenAgentesRow resumenAgentes={resumenAgentes} />
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


export default connect(mapStateToProps, mapDispatchToProps)(ResumenAgentesList);