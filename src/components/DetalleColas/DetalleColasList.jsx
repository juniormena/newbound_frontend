import { useState,useEffect } from "react";
import { useSelector,connect } from "react-redux";
import { useGuardaExcel } from "../../hooks/useGuardaExcel";
import DetalleColasRow from "./DetalleColasRow";
import { downloadPdf } from "../../redux/actions/downloadbleActions";
import { formatDate, setHoraMinutosSegundos } from "../../lib/dateHelpers";


function DetalleColasList({
  currentPage,
  ITEMS_PER_PAGE,
  setTotalItems,
  sorting,
  searchText,
  setCurrentPage,

  setDataToBeDownloaded

}) {

  const [excel, setExcel] = useState({ data: [] })

  const { colasDetalles } = useSelector(state => state.colas)
  const [colasDetallesDatos, setcolasDetallesDatos] = useState([])


  useEffect(() => {
    setExcel((prevFormValues) => ({ data: [], }));

    if (colasDetalles !== undefined) {

      colasDetalles.map(colaDetalle => {
        setExcel((prevFormValues) => ({
          data: [
            ...prevFormValues.data,
            {

              Fecha: formatDate(colaDetalle.hora),
              Nombre_Cola:colaDetalle.cola,
              Service_Level:colaDetalle.sla,
              Nombre_Agente:colaDetalle.agente,
              Telefono :colaDetalle.telefono,
              Cliente:colaDetalle.cliente,
              Motivo_Cierre:colaDetalle.motivo_cierre,
              Tiempo_Espera:setHoraMinutosSegundos(colaDetalle.tiempo_espera.hours, colaDetalle.tiempo_espera.minutes, colaDetalle.tiempo_espera.seconds),
              Duracion:setHoraMinutosSegundos(colaDetalle.duracion.hours, colaDetalle.duracion.minutes, colaDetalle.duracion.seconds),
              Posicion_Inicial:colaDetalle.posicion_inicial,
            },
          ],
        }));
      })

    }
  }, [colasDetalles])


  useGuardaExcel(excel.data)



  useEffect(() => {
    if (colasDetalles !== undefined) {
     
      setDataToBeDownloaded({
        data: colasDetalles.map(colaDetalle => [
          
    
          formatDate(colaDetalle.hora),
          colaDetalle.cola,
          colaDetalle.sla,
          colaDetalle.agente,
          colaDetalle.telefono,
          colaDetalle.cliente,
          colaDetalle.motivo_cierre,
          setHoraMinutosSegundos(colaDetalle.tiempo_espera.hours, colaDetalle.tiempo_espera.minutes, colaDetalle.tiempo_espera.seconds),
          setHoraMinutosSegundos(colaDetalle.duracion.hours, colaDetalle.duracion.minutes, colaDetalle.duracion.seconds),
          colaDetalle.posicion_inicial,


        ]), titulo: 'Detalle de Colas',
        orientacion: "landscape",
        headers: [
          "Fecha",
          "Nombre Cola",
          "Service Level",
          "Nombre Agente",
          "Telefono",
          "Cliente",
          "Motivo Cierre",
          "TIempo Espera",
          "Duracion",
          "Posicion Inicial"
         ],
        fileName: 'Detale de Colas'
      })

    }

  }, [colasDetalles, setDataToBeDownloaded])




  useEffect(() => {
    const datos = colasDetallesData()
    setcolasDetallesDatos(datos)

  }, [colasDetalles, setTotalItems, currentPage, ITEMS_PER_PAGE, searchText])


  useEffect(() => {

    setCurrentPage(1)
  }, [colasDetalles, setCurrentPage])



  let colasDetallesData = () => {

    let computedData = colasDetalles

    if (searchText) {
      computedData = colasDetalles.filter(
        colaDetalle => {
          if (colaDetalle.telefono !== null) {
            return colaDetalle.telefono.toLowerCase().includes(searchText.toLowerCase().trim());
          }
        }
      )
    }
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
        colasDetallesDatos !== undefined
        &&
        colasDetallesDatos.map(colaData => (
          <DetalleColasRow colaData={colaData} key={colaData.id}/>
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


export default connect(mapStateToProps, mapDispatchToProps)(DetalleColasList);