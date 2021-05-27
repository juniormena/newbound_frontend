

import { useDispatch, useSelector } from "react-redux";
import CampanasRegistrosLista from "../../components/Campanas_registros/CampanasRegistrosLista";
import { useEffect, useState } from "react";
import { getCampanaEstado, } from "../../services/campanasService";

import TableComponentSInHeader from "../../components/Table/TableComponentSInHeader";

import FiltrosComponent2 from '../../components/Filtros/FiltrosComponent2'
import CampanasRegistroFormFiltros from '../../components/Campanas_registros/CampanasRegistroFormFiltros';


export default function CampanasRegistros({campanaRegistro}) {


  const { currentUser } = useSelector(state => state.user)

/*   const { campanaRegistro } = props.match.params */

/* console.log(object); */

const dispatch = useDispatch()


  const [campanaEstados, setCampanaEstados] = useState([])
  const [registroRadio, setRegistroRadio] = useState('registro')

  const [datos, setDatos] = useState()

  useEffect(() => {

    getCampanaEstado(setCampanaEstados)
  }, [])




  //console.log(registros);
  const titulo = "Registro de Campañas";
  const columns = [
    { name: 'Nombre Campana', field: '', sortable: true },
    { name: 'Cliente', field: 'Telefono', sortable: false },
    { name: 'codigo Referencia', field: 'codigo Referencia', sortable: false },
    { name: 'Estado', field: 'peso', sortable: false },
    { name: 'Reintentos max ', field: 'reintentos  max', sortable: false },
    { name: 'Reintentos Actuales', field: 'reintentos actuales', sortable: false },
    { name: 'Acciones', field: 'contactos', sortable: false },

  ]

  return (
    <>

       {/*  <CampanasRegistrosFilter campanaEstados={campanaEstados} /> */}

        <FiltrosComponent2 titulo="Lista Colas">
            {(closeFiltrosComponent2)=>
            (<CampanasRegistroFormFiltros closeFiltrosComponent2={closeFiltrosComponent2} 
            campanaEstados={campanaEstados} campanaRegistroInfo={campanaRegistro} 
            registroRadio={registroRadio} setRegistroRadio={setRegistroRadio}/>)
            }
        </FiltrosComponent2>

        <TableComponentSInHeader title={titulo} columns={columns}
          showSearch={false} headerFontSize='11px' showAddButton={false} showExportPdf={false} 
          showExportExcel={true} >
          {(currentPage, ITEMS_PER_PAGE, setTotalItems, sorting, searchText,setCurrentPage) => (
            <CampanasRegistrosLista currentPage={currentPage}
              ITEMS_PER_PAGE={ITEMS_PER_PAGE}
              setTotalItems={setTotalItems} sorting={sorting}
              searchText={searchText} currentUser={currentUser} 
              campanaInfo={campanaRegistro} columns={columns}
              registroRadio={registroRadio} setRegistroRadio={setRegistroRadio}
              setCurrentPage={setCurrentPage}/>)}
        </TableComponentSInHeader>

    </>
  )
}
