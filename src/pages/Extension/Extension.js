import TableComponent from '../../components/Table/TableComponent';
import ModalComponent from '../../components/Modal/ModalComponent';
import useModal from '../../hooks/useModal';
import ExtensionForm from '../../components/Forms/ExtensionForm';
import ExtensionList from './../../components/Data/Extensiones/ExtensionList';


function Extension() {
    const [show, handleShow, handleClose] = useModal();
    const titulo = "Extensiones";
    const columns= [
        {name:'N Extension', field:'id', sortable:false},
        {name:'Tipo Extension', field:'tipo_extension', sortable:false},
        {name:'Caller id', field:'callerid', sortable:false},
        {name:'Empresa', field:'e_nombre_completo', sortable:false},
        {name:'Nombre',field:'u_nombre_completo', sortable:false},
        {name:'User Name', field:'u_usuario', sortable:false},
        {name:'Acciones', field:'accion', sortable:false}
    ]
   
    return (
        <>
           <TableComponent title={titulo} handleShow={handleShow} columns={columns}>
                {(currentPage,ITEMS_PER_PAGE, setTotalItems,sorting, searchText)=>(<ExtensionList currentPage={currentPage} 
                    ITEMS_PER_PAGE={ITEMS_PER_PAGE} setTotalItems={setTotalItems} sorting={sorting} searchText={searchText}/>)}
            </TableComponent>
            <ModalComponent show={show} handleClose={handleClose} title={titulo}>
                <ExtensionForm/>
            </ModalComponent>
        </>
    )
}

export default Extension;