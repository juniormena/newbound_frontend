
import { useState, useMemo, useEffect } from 'react';
import {  useSelector } from 'react-redux';
import { connect } from 'react-redux';
import { useGuardaExcel } from '../../../hooks/useGuardaExcel';
import { formatDate, setHoraMinutosSegundos } from '../../../lib/dateHelpers';
import { downloadPdf } from '../../../redux/actions/downloadbleActions';

import { getCampanaLogs } from '../../../services/campanasService';
import CampanasRegistrosEstadosRows from './CampanasRegistrosEstadosRows';


function CampanasRegistrosEstadosLista({ currentPage, 
  ITEMS_PER_PAGE, setTotalItems, campanaInfo, columns,LogsState,setLogsState}) {
  const [registrosLogs, setLogsRegistros] = useState([])
  const [excel, setExcel] = useState({
    data: []
  })



  //const { registrosLogs } = useSelector(state => state.campanas)

 
  useEffect(() => {
    if(LogsState==="Por Estados")
    {
      getCampanaLogs(campanaInfo, setLogsRegistros)
    }
    //setExcel((prevFormValues) => ({ data: [], }));
  
  }, [LogsState])


  console.log(LogsState);


  useEffect(() => {
 
    setExcel((prevFormValues) => ({ data: [], }));

    if (registrosLogs !== undefined) {

      registrosLogs.map(d => {
      
        setExcel((prevFormValues) => ({
          data: [
            ...prevFormValues.data,
            {
              Nombre:d?.nombre,
              Codigo_Referencia:d?.codigo_ref, 
              Nombre_Campana:d?.nombre_campana,
              Nombre_Estado:d?.nombre_estado,
              Agente:d?.agente_id,
              Contactos:JSON.stringify(d?.contactos),
              Fecha_Ingreso:formatDate(d?.fecha_ingreso), 
              Fecha_Log:formatDate(d?.fecha_log),
              Llamar_Desde:formatDate(d?.llamar_desde),
              Llamar_Hasta:formatDate(d?.llamar_hasta), 
              Peso:  d?.peso,
              Script:d?.script,
              Reintentos_Maximo:d?.reintentos_max,
              Reintentos_Actuales: d?.reintentos_actuales,
              Ultimo_Acceso:d?.ultimo_acceso,
              

            },
          ],
        }));
      })

    }
  }, [registrosLogs ])


 useGuardaExcel(excel.data)

    const campanaRegistroLogsMemo = useMemo(() => {
  
      let computedData = registrosLogs

  
      if (registrosLogs!== undefined) {
      
        setTotalItems(computedData.length)
        
        return computedData.slice(
          (currentPage - 1) * ITEMS_PER_PAGE,
          (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
        );
      }
  
    }, [registrosLogs, currentPage, ITEMS_PER_PAGE, setTotalItems])
  

  return (
    <>
     { 
       registrosLogs!== undefined
        &&
        campanaRegistroLogsMemo.map((logs) => (
          <CampanasRegistrosEstadosRows key={campanaRegistroLogsMemo.id} logs={logs} columns={columns}/>
        ))
      }
    </>
  )
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

export default connect(mapStateToProps, mapDispatchToProps)(CampanasRegistrosEstadosLista);