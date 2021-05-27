import TableComponent from './../../components/Table/TableComponent';
import ModalComponent from './../../components/Modal/ModalComponent';
import useModal from './../../hooks/useModal';
import UsuarioForm from '../../components/Forms/UsuarioForm';
import UsuarioList from './../../components/Data/Usuario/UsuarioList';
import {connect} from "react-redux";

function Usuario({ currentUser }) {
    const [show, handleShow, handleClose] = useModal();
    const titulo = "Usuario";
    const columns= [
        {name:'Nombre', field:'u_nombre_completo', sortable:false},
        {name:'Empresa', field:'e_nombre_completo', sortable:false},
        {name:'Sucursal', field:'se_descripcion', sortable:false},
        {name:'Departamento', field:'ds_descripcion', sortable:false},
        {name:'Nombre usuario', field:'u_usuario', sortable:false},
        {name:'Perfil', field:'p_descripcion', sortable:false},
        {name:'Correo', field:'u_correo', sortable:false},
        {name:'Ultima entrada', field:'u_ult_entrada', sortable:false},
        {name:'Acciones', field:'accion', sortable:false}
    ]

    return (
        <>
            <TableComponent title={titulo} handleShow={handleShow} columns={columns} headerFontSize='10px' >
            {(currentPage,ITEMS_PER_PAGE, setTotalItems,sorting,searchText)=>(<UsuarioList currentPage={currentPage} 
                    ITEMS_PER_PAGE={ITEMS_PER_PAGE} setTotalItems={setTotalItems} sorting={sorting} searchText={searchText}/>)}
            </TableComponent>
            <ModalComponent show={show} handleClose={handleClose} title={titulo} size="xl">
                <UsuarioForm username={currentUser?.userLogin?.data[0]?.u_usuario}/>
            </ModalComponent>
        </>
    )
}

const mapStateToProps = state=>{
    return{
        currentUser:state.user.currentUser
    }
}

export default connect(mapStateToProps, null)(Usuario);

