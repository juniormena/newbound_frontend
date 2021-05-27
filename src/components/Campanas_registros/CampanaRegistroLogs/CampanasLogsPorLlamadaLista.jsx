
import { useState, useMemo, useEffect } from 'react';

import { useGuardaExcel } from '../../../hooks/useGuardaExcel';

import { connect } from 'react-redux';
import { downloadPdf } from '../../../redux/actions/downloadbleActions';

import { getCampanaLogsRegistroLlamadas, } from '../../../services/campanasService';
import CampanasLogsPorLlamadaRows from './CampanasLogsPorLlamadaRows';
import { formatDate, setHoraMinutosSegundos } from '../../../lib/dateHelpers';


function CampanasLogsPorLlamadaLista({ currentPage,
  ITEMS_PER_PAGE, setTotalItems,
 campanaInfo,columns,LogsState,setLogsState }) {
  const [registrosLogsLlamadas, setLogsRegistrosLlamadas] = useState([])
  const [excel, setExcel] = useState({
    data: []
  })


 

 useEffect(() => {
  if(LogsState==="Por Llamada")
  {
    getCampanaLogsRegistroLlamadas( campanaInfo, setLogsRegistrosLlamadas) 
  }

}, [LogsState])

console.log(LogsState);
  //Excel
   useEffect(() => {
 
    setExcel((prevFormValues) => ({ data: [], }));
 
     if (registrosLogsLlamadas !== undefined) {
    //console.log(registrosLogsLlamadas);
       registrosLogsLlamadas.map(d => {
       
         setExcel((prevFormValues) => ({
           data: [
             ...prevFormValues.data,
             {
               Fecha:formatDate(d?.fecha), 
               Agente:d?.agente,
               Estado:d?.estado,
               Codigo_Referencia:d?.codigo_ref,      
               Numero:  d?.numero,
               Tiempo_Conversacion:setHoraMinutosSegundos(d?.tiempo_total.hours,d?.tiempo_total.minutes,d?.tiempo_total.seconds),
               Tiempo_Total:setHoraMinutosSegundos(d?.tiempo_conversacion.hours,d?.tiempo_total.minutes,d?.tiempo_total.seconds)
             },
           ],
         }));
       })
 
     }
   }, [registrosLogsLlamadas])


  useGuardaExcel(excel.data)



    const campanaRegistroLogsMemo = useMemo(() => {
  
      let computedData = registrosLogsLlamadas
  
      //console.log(computedData);
  
      if (registrosLogsLlamadas!== undefined) {
      
        setTotalItems(computedData.length)
        
        return computedData.slice(
          (currentPage - 1) * ITEMS_PER_PAGE,
          (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
        );
      }
  
    }, [registrosLogsLlamadas, currentPage, ITEMS_PER_PAGE, setTotalItems])
  
/*    console.log(campanaRegistroLogsMemo ); */

  return (
    <>
      {
      registrosLogsLlamadas!== undefined
        &&
        campanaRegistroLogsMemo.map((logs) => (
          <CampanasLogsPorLlamadaRows key={campanaRegistroLogsMemo.id} logs={logs} columns={columns}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(CampanasLogsPorLlamadaLista);