

import { useSelector } from "react-redux";
import TableComponentSinBotones from "../../components/Table/TableComponentSinBotones";
import CampanasLogsPorLlamadaLista from "../../components/Campanas_registros/CampanaRegistroLogs/CampanasLogsPorLlamadaLista";
import TableComponentSInHeader from "../../components/Table/TableComponentSInHeader";


export default function CampanasLogsPorLlamada({campanaRegistro,LogsState,setLogsState}) {


  const titulo = "Logs de Registro de llamadas";
  const columns = [
    { name: 'Fecha', field: '', sortable: true },
    { name: 'Estado', field: '', sortable: true },
    { name: 'Agente', field: '', sortable: true },
    { name: 'Numero', field: 'Telefono', sortable: false },
    { name: 'Tiempo Total', field: '', sortable: true },
    { name: 'Tiempo Conversacion', field: '', sortable: true },
    { name: '', field: 'codigo Referencia', sortable: false },
  ]

  return (
    <>
        <TableComponentSInHeader title={titulo} columns={columns}
          showSearch={false} headerFontSize='11px' showAddButton={false} showExportPdf={false} 
          showExportExcel={true} showExtraButton={"/sasfsafsa"}>
          {(currentPage, ITEMS_PER_PAGE, setTotalItems) => (
            <CampanasLogsPorLlamadaLista currentPage={currentPage}
              ITEMS_PER_PAGE={ITEMS_PER_PAGE}
              setTotalItems={setTotalItems}  campanaInfo={campanaRegistro} columns={columns} 
              LogsState={LogsState} setLogsState={setLogsState}/>)}
        </TableComponentSInHeader>
       
    </>
  )
}
