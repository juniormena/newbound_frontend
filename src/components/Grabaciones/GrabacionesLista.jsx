
import { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useGuardaExcel } from '../../hooks/useGuardaExcel';
import { ConfirmacionBorrar } from '../../lib/helpers';
import { deleteGrabaciones, getGrabaciones } from '../../redux/actions/grabacionesActions';
import { GrabacionesSelectAll } from '../../services/GrabacionesService';
import GrabacionesRows from './GrabacionesRows';
import { connect } from 'react-redux';

import { downloadPdf } from '../../redux/actions/downloadbleActions';

function GrabacionesLista({ currentPage, ITEMS_PER_PAGE, setTotalItems, sorting, setDataToBeDownloaded }) {

  const { audios } = useSelector(state => state.grabaciones)
  const dispatch = useDispatch()
  const [grabaciones, setGrabaciones] = useState([])
  const [excel, setExcel] = useState({
    data: []
  })
  const { data } = useSelector(state => state.user.currentUser.userLogin)
  const [datos, setDatos] = useState([])



  useEffect(() => {

   if (data[0] !== undefined) {

      GrabacionesSelectAll(data[0].u_id_empresa, setDatos)
    }

  }, [data])



 
  useEffect(() => {

    if ( audios!==undefined) {
      datos.map((d, i) => {
        setExcel((prevFormValues) => ({
    
          data: [
            ...prevFormValues.data,
            {
              ID: d.id, NOMBRE_AUDIO: d.name, DESCRIPCION: d.descripcion, EMPRESA: d.carpeta
            },
          ],
          
        }));
      })
    }
   
    
  }, [datos])


  useGuardaExcel(excel.data)

  useEffect(() => {

    setDataToBeDownloaded({
      data: datos.map(d => [
        d.id, d.name, d.descripcion,d.carpeta
      ]), titulo: 'Listado de Grabaciones', orientacion: 'portrait', headers: ["Id", "Nombre de Audio", "Descripcion","Empresa"],
      fileName: 'Grabaciones'
    })

  }, [datos])


  useEffect(() => {

    dispatch(getGrabaciones(datos))
  }, [dispatch, setDatos, datos])

  const grabacionesdoData = useMemo(() => {

    let computedGrabacionesData = audios;

    if (audios !== undefined) {

      setTotalItems(computedGrabacionesData.length)
      //Current Page slice
      return computedGrabacionesData.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
      );
    }


  }, [audios, currentPage, ITEMS_PER_PAGE, setTotalItems])

  useEffect(() => {

    if (audios !== undefined) {
      setGrabaciones(grabacionesdoData)
    }
  }, [setGrabaciones, audios, grabacionesdoData])



  function handleAudioRemover(id, directory) {

    ConfirmacionBorrar('Seguro de borrar archivo?', "Una vez hecho no prodra revertirlo!", () => {

      dispatch(deleteGrabaciones({ id, directory }))
      setGrabaciones(grabaciones.filter(g => g.id !== id))

      toast.success("Archivo de audio borrado", {
        autoClose: 2500,
      });

    })

  }

  return (
    <>
      {

        grabaciones.map((audio) => (
          <GrabacionesRows key={audio.id} audio={audio} handleAudioRemover={handleAudioRemover} />
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

export default connect(mapStateToProps, mapDispatchToProps)(GrabacionesLista);