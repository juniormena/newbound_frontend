import TableComponent from './../../components/Table/TableComponent';
import ModalComponent from './../../components/Modal/ModalComponent';
import useModal from './../../hooks/useModal';
import SucursalForm from '../../components/Forms/SucursalForm';
import SucursalList from '../../components/Data/Sucursal/SucursalList';
import {connect} from "react-redux";

function Sucursal({ currentUser }) {
    const [show, handleShow, handleClose] = useModal();
    const titulo = "Sucursal";
    const columns= [
        {name:'Nombre sucursal', field:'se_descripcion', sortable:false},
        {name:'Empresa', field:'e_nombre_completo', sortable:false},
        {name:'Acciones', field:'accion', sortable:false}
    ]

    return (
        <>
            <TableComponent title={titulo} handleShow={handleShow} columns={columns}>
                {(currentPage,ITEMS_PER_PAGE, setTotalItems,sorting, searchText)=>(<SucursalList currentPage={currentPage} ITEMS_PER_PAGE={ITEMS_PER_PAGE} 
                setTotalItems={setTotalItems} sorting={sorting} searchText={searchText}/>)}
            </TableComponent>
            <ModalComponent show={show} handleClose={handleClose} title={titulo}>
                <SucursalForm username={currentUser?.userLogin?.data[0]?.u_usuario}/>
            </ModalComponent>
        </>
    )
}

const mapStateToProps = state=>{
    return{
        currentUser:state.user.currentUser
    }
}

export default connect(mapStateToProps, null)(Sucursal);
