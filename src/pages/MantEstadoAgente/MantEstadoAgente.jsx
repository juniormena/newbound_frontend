import MantAgenteEstadoinsert from '../../components/MantEstadoAgente/MantAgenteEstadoinsert';
import MantAgenteEstadoList from '../../components/MantEstadoAgente/MantAgenteEstadoList';
import ModalComponent from '../../components/Modal/ModalComponent';
import TableComponent from '../../components/Table/TableComponent';
import useModal from '../../hooks/useModal'

function MantEstadoAgente() {

    const [show, handleShow, handleClose] = useModal();
    const titulo = "ESTADOS DE AGENTE";
    const columns= [
        {name:'Codigo', field:'codigo', sortable:true},
        {name:'Descripcion Larga', field:'descripcionF', sortable:true},
        {name:'Nombre', field:'descripcionC', sortable:false},
        {name:'Empresa',field:'empresa', sortable:true},
        {name:'Estado', field:'estado', sortable:true},
        {name:'Icono', field:'icono', sortable:true},
        {name:'Minutos Espera', field:'minuto', sortable:true},
        {name:'Visible para Agente', field:'visible', sortable:true},
        {name:'Acciones', field:'accion', sortable:true}
    ]

    return (
     <>
      
     
       <TableComponent title={titulo} handleShow={handleShow} columns={columns}>
       {(currentPage,ITEMS_PER_PAGE, setTotalItems,sorting,searchText)=>(<MantAgenteEstadoList currentPage={currentPage} 
                    ITEMS_PER_PAGE={ITEMS_PER_PAGE} setTotalItems={setTotalItems} sorting={sorting} searchText={searchText}/>)}
       </TableComponent>
       <ModalComponent show={show} handleClose={handleClose} title={titulo}>
            <MantAgenteEstadoinsert titulo={titulo}/>
       </ModalComponent>
     </>
    )
}

export default MantEstadoAgente