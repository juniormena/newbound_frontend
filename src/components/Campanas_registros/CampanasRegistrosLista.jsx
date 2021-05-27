
import { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useGuardaExcel } from '../../hooks/useGuardaExcel';


import { connect } from 'react-redux';
import { downloadPdf } from '../../redux/actions/downloadbleActions';

import { formatDate, formatDate2 } from '../../lib/dateHelpers';
import CampanasRegistrosRows from './CampanasRegistrosRows';
import { getCampanaHistorico, getCampanaRegistros } from '../../services/campanasService';
import { getCampanaRegistroAction } from '../../redux/actions/campanasActions';

function CampanasRegistrosLista({ currentPage,
  ITEMS_PER_PAGE, setTotalItems,
  sorting, currentUser, setDataToBeDownloaded, campanaInfo, columns,registroRadio, setRegistroRadio,
setCurrentPage }) {
  const [registros, setRegistros] = useState([])
  const [excel, setExcel] = useState({
    data: []
  })

  const { CampanaRegistroData } = useSelector(state => state.campanas)

  const dispatch = useDispatch()



  useEffect(() => {
    
    if (registroRadio==='registro') {
      getCampanaRegistros(campanaInfo, setRegistros)
    } else {
      getCampanaHistorico(campanaInfo, setRegistros)
    }
    
  }, [registroRadio,setRegistroRadio])


  useEffect(() => {
    dispatch(getCampanaRegistroAction(registros))
  }, [registros, setRegistros])
 
  
  //Excel
   useEffect(() => {
 
     setExcel((prevFormValues) => ({ data: [], }));
 
     if (CampanaRegistroData !== undefined) {
  
       CampanaRegistroData.map(d => {
       
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
               Fecha_Log:registroRadio==="registro" ? "":formatDate(d?.fecha_log),
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
   }, [CampanaRegistroData ])


  useGuardaExcel(excel.data)



    const campanaRegistroMemo = useMemo(() => {
  
      let computedData = CampanaRegistroData
  
      //console.log(computedData);
  
      if (CampanaRegistroData!== undefined) {
      
        setTotalItems(computedData.length)
        
        return computedData.slice(
          (currentPage - 1) * ITEMS_PER_PAGE,
          (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
        );
      }
  
    }, [CampanaRegistroData, currentPage, ITEMS_PER_PAGE, setTotalItems])
  
   
    useEffect(() => {

      setCurrentPage(1)
    }, [CampanaRegistroData, setCurrentPage])
  
  return (
    <>
      {
        CampanaRegistroData!== undefined
        &&
        campanaRegistroMemo.map((campana) => (
          <CampanasRegistrosRows key={campanaRegistroMemo.id} campana={campana} columns={columns}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(CampanasRegistrosLista);