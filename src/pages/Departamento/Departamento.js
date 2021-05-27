import TableComponent from './../../components/Table/TableComponent';
import ModalComponent from './../../components/Modal/ModalComponent';
import useModal from './../../hooks/useModal';
import DepartamentoForm from '../../components/Forms/DepartamentoForm';
import DepartamentoList from './../../components/Data/Departamento/DepartamentoList';
import {connect} from "react-redux";

function Departamento({ currentUser }) {
    const [show, handleShow, handleClose] = useModal();
    const titulo = "Departamento";
    const columns= [
        {name:'Nombre Departamento', field:'ds_descripcion',sortable:false},
        {name:'Empresa', field:'e_nombre_completo',sortable:false},
        {name:'Sucursal', field:'se_descripcion', sortable:false},
        {name:'Acciones', field:'accion', sortable:false}
    ]
    return (
        <>
            <TableComponent title={titulo} handleShow={handleShow} columns={columns}>
               {(currentPage,ITEMS_PER_PAGE, setTotalItems,sorting, searchText)=>(<DepartamentoList currentPage={currentPage} ITEMS_PER_PAGE={ITEMS_PER_PAGE} 
               setTotalItems={setTotalItems} sorting={sorting} searchText={searchText}/>)}
            </TableComponent>

            <ModalComponent show={show} handleClose={handleClose} title={titulo}>
                <DepartamentoForm username={currentUser?.userLogin?.data[0]?.u_usuario}/>
            </ModalComponent>
        </>
    )
}

const mapStateToProps = state=>{
    return{
        currentUser:state.user.currentUser
    }
}

export default connect(mapStateToProps, null)(Departamento);
