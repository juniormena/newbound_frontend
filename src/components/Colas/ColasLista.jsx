
import { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useGuardaExcel } from '../../hooks/useGuardaExcel';
import { ConfirmacionBorrar } from '../../lib/helpers';

import { connect } from 'react-redux';
import { downloadPdf } from '../../redux/actions/downloadbleActions';
import ColasRows from './ColasRows';
import { GetColasByEmpresa } from '../../services/ColasService';
import { getColasAction } from '../../redux/actions/colasActions';

function ColasLista({ currentPage, ITEMS_PER_PAGE, setTotalItems, sorting, setDataToBeDownloaded }) {

  const dispatch = useDispatch()
  const [excel, setExcel] = useState({ data: [] })
  const { colas } = useSelector(state => state.colas)
  const { data } = useSelector(state => state.user.currentUser.userLogin)
  const [datos, setDatos] = useState([])

  useEffect(() => {

    if (data[0] !== undefined) {

      GetColasByEmpresa(data[0].u_id_empresa, setDatos)
    }

  }, [data])


 // console.log(datos);
  useEffect(() => {
    dispatch(getColasAction(datos))
  }, [dispatch, setDatos, datos])

  

  useEffect(() => {
    setExcel((prevFormValues) => ({data: [],}));

    if (colas !== undefined) {
     
      colas.map(cola=>{
        setExcel((prevFormValues) => ({
          data: [
            ...prevFormValues.data,
            {
              ID_COLA:cola.name,
              NOMBRE: cola.nombre,
              SERVICE_LEVEL: cola.servicelevel,
              ESTRATEGIA: cola.strategy,
           
              Musica_en_Espera:cola.musiconhold,
              EMPRESA: cola.e_nombre_completo
            },
          ],
        }));
      })

    }
  }, [colas])


  useGuardaExcel(excel.data)

  useEffect(() => {
    if (colas !== undefined) {
      setDataToBeDownloaded({
        data: colas.map(cola => [
          cola.name,
          cola.nombre,
          cola.servicelevel,
          cola.strategy,
         
          cola.musiconhold,
          cola.e_nombre_completo

        ]), titulo: 'Listado de Colas',
            orientacion: 'portrait',
            headers: ["ID Cola","Nombre de Cola", "Service Level", "Estrategia","Musica en Espera","Empresa"], 
            fileName: 'colas'
      })

    }

  }, [colas, setDataToBeDownloaded])


  const colasData = useMemo(() => {

    let computedColasData = colas;


    if (colas !== undefined) {
      setTotalItems(computedColasData.length)

      return computedColasData.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
      );

    }


  }, [colas, currentPage, ITEMS_PER_PAGE, setTotalItems])


  return (
    <>
      {

        colas !== undefined
        &&
        colasData.map((cola) => (
          <ColasRows key={cola.name} cola={cola} />
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

export default connect(mapStateToProps, mapDispatchToProps)(ColasLista);