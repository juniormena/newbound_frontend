import { useState, useEffect } from "react";
import { useSelector, connect } from "react-redux";
import { useGuardaExcel } from "../../hooks/useGuardaExcel";
import ResumenColasRow from "./ResumenColasRow";
import { downloadPdf } from "../../redux/actions/downloadbleActions";
import { formatDate, formatDate2, setHoraMinutosSegundos } from "../../lib/dateHelpers";
import moment from "moment";

function ResumenColasList({
  currentPage,
  ITEMS_PER_PAGE,
  setTotalItems,
  sorting,

  setCurrentPage,
  resumenData, setResumenData,
  setDataToBeDownloaded

}) {

  //console.log(resumenData)

  const [excel, setExcel] = useState({ data: [] })

  const { colasResumen } = useSelector(state => state.colas)



  const [colasResumenDatos, setcolasResumenDatos] = useState([])


  //useEffect Excel

  useEffect(() => {
    setExcel((prevFormValues) => ({ data: [], }));

    if (colasResumen !== undefined) {

      colasResumen.map(colaResumen => {

        if (colaResumen.data !== undefined) {
          colaResumen.data.map(data => {

            setExcel((prevFormValues) => ({
              data: [
                ...prevFormValues.data,
                {
                  Fecha: formatDate2(data.fecha),
                  Nombre_Cola: data.nombre,
                  Cantidad_Llamadas: data.cant_llamadas,
                  Cantidad_Contestadas: data.cant_contestadas,
                  Cantidad_Abandonadas: data.cant_abandonadas,
                  Cantidad_Transferidas: data.cant_transferidas,
                  Porcentaje_Contestadas: data.porc_contestadas,
                  Porcentaje_No_Contestadas: data.porc_no_contestadas,
                  AVG_TIEMPO_ESPERA: setHoraMinutosSegundos(
                    data.avg_tiempo_espera.hours,
                    data.avg_tiempo_espera.minutes,
                    data.avg_tiempo_espera.seconds),
                  AVG_DURACION_LLAMADA: setHoraMinutosSegundos(
                    data.avg_duracion.hours,
                    data.avg_duracion.minutes,
                    data.avg_duracion.seconds),
                  AHT: setHoraMinutosSegundos(
                    data.aht.hours,
                    data.aht.minutes,
                    data.aht.seconds),
                  Tiempo_Espera_Total: setHoraMinutosSegundos(
                    data.tot_tiempo_espera.hours,
                    data.tot_tiempo_espera.minutes,
                    data.tot_tiempo_espera.seconds),
                  Duracion_Total_LLamada: setHoraMinutosSegundos(
                    data.tot_duracion.hours,
                    data.tot_duracion.minutes,
                    data.tot_duracion.seconds),
                  Cantidad_Maxima_Espera: data.max_llam_espera,
                  Service_Level: data.sl,
                  Service_Level_2: data.sl2,

                },
              ],
            }));
          })
        }
      })

    }
  }, [colasResumen])


  useGuardaExcel(excel.data)

  //useEffect PDF

  useEffect(() => {


    let FechaInicio = moment(resumenData.periodoDesde, "DD-MM-YYYY").format("l");
    let FechaFin = moment(resumenData.periodoHasta, "DD-MM-YYYY").format("l");
    let periodoDesde = moment(FechaInicio, "DD-MM-YYYY");
    let periodoHasta = moment(FechaFin, "DD-MM-YYYY");
    let periodo = periodoHasta.diff(periodoDesde, "days");

    if (periodoHasta.diff(periodoDesde, "days") > 30) {
      periodo = periodoHasta.diff(periodoDesde, "months") + " Mes(es)";
    }
    else if (periodoHasta.diff(periodoDesde, "days") > 365) {
      periodo = periodoHasta.diff(periodoDesde, "years") + " Año(s)";
    } else {
      periodo = periodoHasta.diff(periodoDesde, "days") + " Dia(s)";
    }

    if (colasResumen !== undefined) {

      if (colasResumen[0] !== undefined) {


        // Funcion para eliminar elementos repetidos de un array
        var colas = []

        var hash = {};
        colas = colasResumen[0].data.filter(function (current) {
          var exists = !hash[current.nombre];
          hash[current.nombre] = true;
          return exists;
        });
        // Funcion para eliminar elementos repetidos de un array

        setDataToBeDownloaded({

          data: colasResumen[0].data.map(colaResumen => [

            formatDate2(colaResumen.fecha),
            colaResumen.nombre,
            colaResumen.cant_llamadas,
            colaResumen.cant_contestadas,
            colaResumen.cant_abandonadas,
            colaResumen.cant_transferidas,
            colaResumen.porc_contestadas,
            colaResumen.porc_no_contestadas,

            setHoraMinutosSegundos(
              colaResumen.avg_tiempo_espera.hours,
              colaResumen.avg_tiempo_espera.minutes,
              colaResumen.avg_tiempo_espera.seconds),

            setHoraMinutosSegundos(
              colaResumen.avg_duracion.hours,
              colaResumen.avg_duracion.minutes,
              colaResumen.avg_duracion.seconds),

            setHoraMinutosSegundos(
              colaResumen.aht.hours,
              colaResumen.aht.minutes,
              colaResumen.aht.seconds),

            setHoraMinutosSegundos(
              colaResumen.tot_tiempo_espera.hours,
              colaResumen.tot_tiempo_espera.minutes,
              colaResumen.tot_tiempo_espera.seconds),

            setHoraMinutosSegundos(
              colaResumen.tot_duracion.hours,
              colaResumen.tot_duracion.minutes,
              colaResumen.tot_duracion.seconds),

            colaResumen.max_llam_espera,
            colaResumen.sl,
            colaResumen.sl2,


          ]),

          LlamadasTotalesData:
            [
              ["Total de Llamadas:", colasResumen[1].resumenTotales.map(e => e.cant_llamadas)],
              ["LLamadas Contestadas:", colasResumen[1].resumenTotales.map(e => e.cant_contestadas)],
              ["LLamadas Abandonadas:", colasResumen[1].resumenTotales.map(e => e.cant_abandonadas)],
              ["LLamadas Transferidas:", colasResumen[1].resumenTotales.map(e => e.cant_transferidas)],
              ["Porcentaje Contestadas (avg):", colasResumen[1].resumenTotales.map(e => (e.porc_contestadas))],
              ["Porcentaje Abandonadas (avg):", colasResumen[1].resumenTotales.map(e => (e.porc_no_contestadas))],
              ["AHT (avg):", setHoraMinutosSegundos(
                colasResumen[1].resumenTotales[0].aht.hours,
                colasResumen[1].resumenTotales[0].aht.minutes,
                colasResumen[1].resumenTotales[0].aht.seconds)],
              ["Tiempo Espera Total:", setHoraMinutosSegundos(
                colasResumen[1].resumenTotales[0].tot_tiempo_espera.hours,
                colasResumen[1].resumenTotales[0].tot_tiempo_espera.minutes,
                colasResumen[1].resumenTotales[0].tot_tiempo_espera.seconds)],
              ["Duracion Total LLamadas:", setHoraMinutosSegundos(
                colasResumen[1].resumenTotales[0].tot_duracion.hours,
                colasResumen[1].resumenTotales[0].tot_duracion.minutes,
                colasResumen[1].resumenTotales[0].tot_duracion.seconds)],



            ],
          titulo: 'Resumen de Colas',
          extraData: [
            ["Colas:", colas.map(e => (e.nombre)).toString()],
            ["Fecha Inicio:", moment(resumenData.periodoDesde, "DD-MM-YYYY").format("l")],
            ["Fecha Hasta:", moment(resumenData.periodoHasta, "DD-MM-YYYY").format("l")],
            ["Periodo:", periodo],

          ],
          orientacion: "landscape",
          headers: [
            "FECHA",
            "COLA",
            "Cantidad Llamadas",
            "Cant. Contestadas",
            "Cantidad Abandonadas",
            "Cantidad Transferidas",
            "% Contestadas",
            "% No Contestadas",
            "AVG Tiempo espera",
            "AVG Duracion Llamada",
            "AHT",
            "Tiempo Espera Total",
            "Duracion Total Llamada",
            "Cant. Maxima Espera",
            "SL",
            "SL2",
          ],
          fileName: 'Resumen de Colas',


        })


      }
      else {
        setDataToBeDownloaded({

          data: [],
          titulo: 'Resumen de Colas',
          extraData: [],
          orientacion: "landscape",
          headers: [],
          fileName: '',


        })
      }

    }
  }, [colasResumen, setDataToBeDownloaded, resumenData])



  useEffect(() => {
    const datos = colasResumenData()
    setcolasResumenDatos(datos)

  }, [colasResumen, setTotalItems, currentPage, ITEMS_PER_PAGE])


  useEffect(() => {

    setCurrentPage(1)
  }, [colasResumen, setCurrentPage])



  let colasResumenData = () => {


    if (colasResumen) {


      let computedData = colasResumen.map(cola => {
        if (cola.data !== undefined) {
          return cola.data;
        }

      })

      if (computedData[0] !== undefined) {
        setTotalItems(computedData[0].length)


        return computedData[0].slice(
          (currentPage - 1) * ITEMS_PER_PAGE,
          (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
        );
      }
      else {
        setTotalItems(0)
      }
    }

  }


  return (
    <>

      {
        colasResumenDatos !== undefined
        &&
        colasResumenDatos.map((colaData,index) => (
          <ResumenColasRow colaData={colaData} key={index+2}/>
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


export default connect(mapStateToProps, mapDispatchToProps)(ResumenColasList);