import CampanasRegistrosEstadosLista from "../../components/Campanas_registros/CampanaRegistroLogs/CampanasRegistrosEstadosLista";

import TableComponentSinBotones from "../../components/Table/TableComponentSinBotones";
import TableComponentSInHeader from "../../components/Table/TableComponentSInHeader";

export default function CampanasRegistrosPorEstado({campanaRegistro,LogsState,setLogsState}) {
  
  const titulo = "Registro de Campañas";
  const columns = [
    { name: 'Fecha log', field: '', sortable: true },
    { name: 'Fecha Ingreso', field: '', sortable: true },
    { name: 'Nombre Campana', field: '', sortable: true },
    { name: 'Cliente', field: 'Telefono', sortable: false },
    { name: 'Llamar Desde', field: '', sortable: true },
    { name: 'Llamar Hasta', field: '', sortable: true },
    { name: 'Estado', field: 'peso', sortable: false },
    { name: 'Reintentos max ', field: 'reintentos  max', sortable: false },
    { name: 'Reintentos Actuales', field: 'reintentos actuales', sortable: false },


  ]


  return (
    <>
      
        <TableComponentSInHeader title={titulo} columns={columns}
          showSearch={false} headerFontSize='11px' showAddButton={false} showExportPdf={false} 
          showExportExcel={true} showExtraButton={"/sasfsafsa"}>
          {(currentPage, ITEMS_PER_PAGE, setTotalItems,) => (
            <CampanasRegistrosEstadosLista currentPage={currentPage} 
            ITEMS_PER_PAGE={ITEMS_PER_PAGE} setTotalItems={setTotalItems}  campanaInfo={campanaRegistro} LogsState={LogsState} setLogsState={setLogsState} />)}
        </TableComponentSInHeader>

    </>


  )
}
