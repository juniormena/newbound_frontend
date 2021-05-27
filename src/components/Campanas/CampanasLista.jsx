
import { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useGuardaExcel } from '../../hooks/useGuardaExcel';


import { connect } from 'react-redux';
import { downloadPdf } from '../../redux/actions/downloadbleActions';
import CampanasRows from './CampanasRows';
import { getCampanasByEmpresa, getCampanasSupervisada } from '../../services/campanasService';
import { campanasByEmpresaAction } from '../../redux/actions/campanasActions';
import { formatDate2, setHoraMinutosSegundos } from '../../lib/dateHelpers';

function CampanasLista({ currentPage, ITEMS_PER_PAGE, setTotalItems, sorting,currentUser, setDataToBeDownloaded }) {

/*   console.log(currentUser.campanas_supervision?.data); */

  const { campanasData} = useSelector(state => state.campanas)

  const [campanas, setCampanas] = useState([])
  const dispatch = useDispatch()
  const { data } = useSelector(state => state.user.currentUser.userLogin)
  const [excel, setExcel] = useState({
    data: []
  })

   useEffect(() => {

    getCampanasSupervisada(setCampanas,currentUser.campanas_supervision?.data)

   
  }, [currentUser])
/* 
 console.log(campanas); */

  useEffect(() => {
    dispatch(campanasByEmpresaAction(campanas))
  }, [dispatch, setCampanas, campanas])
 
  //PDF
  useEffect(() => {
   /*  console.log(campanasData); */

    if (campanasData!== undefined) {
      setDataToBeDownloaded({
        data: campanasData.map(d => [
          d?.nombre,
          d?.nombre_empresa, d?.nombre_departamento, 
          formatDate2(d?.fecha_inicio),
          formatDate2(d?.fecha_fin), 
         setHoraMinutosSegundos(d?.hora_inicio?.hours, d?.hora_inicio.minutes, d?.hora_inicio.seconds),
         setHoraMinutosSegundos(d?.hora_fin?.hours, d?.hora_fin.minutes, d?.hora_fin.seconds),
          d?.nombre_cola,d?.troncal,
          d?.contexto,d?.script,d?.reintentos_max,
          setHoraMinutosSegundos(d?.tiempo_entre_llamadas?.hours,
            d?.tiempo_entre_llamadas?.minutes,d?.tiempo_entre_llamadas?.seconds),
       d?.peso,
          d?.usuario

        ]), titulo: 'Newbound- Campañas', orientacion: 'landscape', headers: ["Nombre", 
        "Empresa", "Departamento", "Fecha Inicio", "Fecha Fin", "Hora Inicio","Hora Fin","Cola","Troncal",
        "Contexto","Script","Reintentos Maximos","Tiempo Entre Llamadas","Peso","Usuario"],
        fileName: 'Campañas'
      })

    }

  }, [campanasData])

  //Excel
  useEffect(() => {

    setExcel((prevFormValues) => ({ data: [], }));

    if (campanasData!== undefined) {
   
      campanasData.map(d => {

        setExcel((prevFormValues) => ({
          data: [
            ...prevFormValues.data,
            {
              Nombre:d?.nombre,
              Empresa:d?.nombre_empresa, 
              Departamento:d?.nombre_departamento, 
              Fecha_Inicio:formatDate2(d?.fecha_inicio),
              Fecha_Fin:formatDate2(d?.fecha_fin), 
              Hora_Inicio:setHoraMinutosSegundos(d?.hora_inicio.hours, d?.hora_inicio.minutes, d?.hora_inicio.seconds),
              Hora_Fin:setHoraMinutosSegundos(d?.hora_fin.hours, d?.hora_fin.minutes, d?.hora_fin.seconds),
              Cola:d?.nombre_cola,
              Troncal:d?.troncal,
              Contexto:d?.contexto,
              Script:d?.script,
              Reintentos:d?.reintentos_max,
              Peso:  d.peso,
              Tiempo_Entre_LLamadas:setHoraMinutosSegundos(d?.tiempo_entre_llamadas?.hours,
                d?.tiempo_entre_llamadas?.minutes,d?.tiempo_entre_llamadas?.seconds),
              Usuario:d?.usuario

            },
          ],
        }));
      })

    }
  }, [campanasData])


  useGuardaExcel(excel.data)
  

  const campanaMemo = useMemo(() => {

    let computedData = campanasData

    if (campanasData!== undefined) {

      setTotalItems(computedData.length)
     
      return computedData.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
      );
    }

  }, [campanasData, currentPage, ITEMS_PER_PAGE, setTotalItems])


  return (
    <>
      {
        campanasData!== undefined
        &&
        campanaMemo?.map((campana) => (
          <CampanasRows key={campana.id} campana={campana} />
        ))}
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

export default connect(mapStateToProps, mapDispatchToProps)(CampanasLista);