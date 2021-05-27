

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import TableComponentSInHeader from "../../components/Table/TableComponentSInHeader";
import CampanasRegistrosLogsLista from "../../components/Campanas_registros/CampanaRegistroLogs/CampanasRegistrosLogsMain";
import CampanasRegistrosHistoricoLista from "../../components/Campanas_registros/CampanaRegistroHistorico/CampanasRegistrosHistoricoLista";


export default function CampanasRegistrosHistoricos({campanaRegistro}) {


  const { currentUser } = useSelector(state => state.user)


  //console.log(registros);
  const titulo = "Registro de Campañas";
  const columns = [
    { name: 'Fecha log', field: '', sortable: true },
    { name: 'Fecha Ingreso', field: '', sortable: true },
    { name: 'Nombre Campana', field: '', sortable: true },
    { name: 'Cliente', field: 'Telefono', sortable: false },
    { name: 'Llamar Desde', field: '', sortable: true },
    { name: 'Llamar Hasta', field: '', sortable: true },
   /*  { name: 'codigo Referencia', field: 'codigo Referencia', sortable: false }, */
    { name: 'Estado', field: 'peso', sortable: false },
    { name: 'Reintentos max ', field: 'reintentos  max', sortable: false },
    { name: 'Reintentos Actuales', field: 'reintentos actuales', sortable: false },


  ]

  return (
    <>

        <TableComponentSInHeader title={titulo} columns={columns}
          showSearch={false} headerFontSize='11px' showAddButton={false} showExportPdf={false} 
          showExportExcel={false} >
          {(currentPage, ITEMS_PER_PAGE, setTotalItems, sorting, searchText) => (
            <CampanasRegistrosHistoricoLista currentPage={currentPage}
              ITEMS_PER_PAGE={ITEMS_PER_PAGE}
              setTotalItems={setTotalItems} sorting={sorting}
              searchText={searchText} currentUser={currentUser} campanaInfo={campanaRegistro} columns={columns}/>)}
        </TableComponentSInHeader>

    </>
  )
}
