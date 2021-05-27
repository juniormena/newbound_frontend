
import { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGuardaExcel } from '../../hooks/useGuardaExcel';
import { connect } from 'react-redux';
import { downloadPdf } from '../../redux/actions/downloadbleActions';
import { getContactos, getContactosByEmpresa } from '../../services/ContactosService';
import { getContactosActions } from '../../redux/actions/contactosActions';
import ContactosRows from './ContactosRows';

function ContactosLista({ currentPage, ITEMS_PER_PAGE, setTotalItems, filterResult, setfilterResult, setDataToBeDownloaded }) {

  const { contactos } = useSelector(state => state.contactos)

  const [datos, setDatos] = useState([])
  const dispatch = useDispatch()
  
  const [excel, setExcel] = useState({
    data: []
  })
  
  const { data } = useSelector(state => state.user.currentUser.userLogin)



  useEffect(() => {

    if (data[0] !== undefined) {
      if (data[0].is_superuser === '1') {
        getContactos(setDatos)
      } else {
        getContactosByEmpresa(data[0].u_id_empresa, setDatos)
      }

    }


  }, [data])

  //console.log(datos);


  useEffect(() => {
    dispatch(getContactosActions(datos))
  }, [dispatch, setDatos, datos])

  //PDF
  useEffect(() => {

    if (contactos !== undefined) {
      setDataToBeDownloaded({
        data: contactos.map(d => [

          d.nombre, d.empresa, d.cargo, d.telefono, d.flota==='1'? "Si":"No", d.usuario
        ]), titulo: 'Newbound- Contactos', orientacion: 'portrait', headers: ["Nombre",
          "Empresa", "Cargo", "Telefono", "Flota", "Usuario"],
        fileName: 'Contactos'
      })

    }

  }, [contactos])


  //Excel
  useEffect(() => {

    setExcel((prevFormValues) => ({ data: [], }));

    if (contactos !== undefined) {


      contactos.map(contacto => {

        setExcel((prevFormValues) => ({
          data: [
            ...prevFormValues.data,
            {

              Nombre: contacto.nombre,
              Empresa: contacto.empresa,
              Cargo: contacto.cargo,
              Telefono: contacto.telefono,
              Flota: contacto.flota==='1'? "Si":"No" ,
              Usuario: contacto.usuario

            },
          ],
        }));
      })

    }
  }, [contactos])



  useGuardaExcel(excel.data)

  const contactosData = useMemo(() => {

    let computedData = contactos;

    if (filterResult!==undefined) {
      if (filterResult.length>0) {
        computedData=filterResult
      }
    }

    if (contactos !== undefined) {

      setTotalItems(computedData.length)
      //Current Page slice
      return computedData.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
      );
    }

  }, [contactos, currentPage, ITEMS_PER_PAGE, setTotalItems, filterResult])

  //console.log(contactosData);


  return (
    <>
      {
        contactosData !== undefined
        &&
        contactosData.map((contacto) => (
          <ContactosRows key={contacto.id} contacto={contacto} />

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

export default connect(mapStateToProps, mapDispatchToProps)(ContactosLista);