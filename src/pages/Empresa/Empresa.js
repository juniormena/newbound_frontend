import TableComponent from './../../components/Table/TableComponent';
import ModalComponent from './../../components/Modal/ModalComponent';
import useModal from './../../hooks/useModal';
import EmpresaForm from '../../components/Forms/EmpresaForm';
import EmpresaList from '../../components/Data/Empresa/EmpresaList';
import {connect} from "react-redux";

function Empresa({ currentUser }) {
    const [show, handleShow, handleClose] = useModal();
    const titulo = "EMPRESA";
    const columns= [
        {name:'Nombre', field:'e_nombre_completo', sortable:false},
        {name:'Rnc', field:'e_rnc', sortable:false},
        {name:'Rango Extension', field:'e_rango_extension', sortable:false},
        {name:'Contexto',field:'e_contexto', sortable:false},
        {name:'Acciones', field:'accion', sortable:false}
    ];

    return (
        <>
            <TableComponent title={titulo} handleShow={handleShow} columns={columns}>
                    {(currentPage,ITEMS_PER_PAGE, setTotalItems,sorting,searchText, displayAlert)=>(<EmpresaList currentPage={currentPage} 
                    ITEMS_PER_PAGE={ITEMS_PER_PAGE} setTotalItems={setTotalItems} sorting={sorting} searchText={searchText}  displayAlert={displayAlert}/>)}
            </TableComponent>
            <ModalComponent show={show} handleClose={handleClose} title={titulo}>
                    <EmpresaForm username={currentUser?.userLogin?.data[0]?.u_usuario}/>
            </ModalComponent>
        </>
    )
}

const mapStateToProps = state=>{
    return{
        currentUser:state.user.currentUser
    }
}

export default connect(mapStateToProps, null)(Empresa);
