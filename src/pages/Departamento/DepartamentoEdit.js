import ModalComponent from './../../components/Modal/ModalComponent';
import { useEffect, useState } from 'react';
import { getDepartamentosSucursalWithSucursalNameById } from './../../services/AdministracionService';
import DepartamentoEditForm from '../../components/Forms/DepartamentoEditForm';
import { returnToURL } from '../../lib/helpers';
import {connect} from "react-redux";

function DepartamentoEdit(props) {
    const titulo = "DEPARTAMENTO";
    const { Id } = props.match.params;
    const { u_usuario } = props.currentUser?.userLogin?.data[0];
    const [departamentoSelected,setDepartamentoSelected] = useState([{ds_usuario_ing:u_usuario, ds_terminal_ing:'Newbound 2.0', ds_descripcion:'', ds_id:0,
    ds_ident_xvoice:'', ds_id_sucursal:0}]);
    /*let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" }};*/
    
    useEffect(()=>{
        getDepartamentosSucursalWithSucursalNameById({ Id }, setDepartamentoSelected);
    },[Id])
    return (
        <ModalComponent show={true} handleClose={()=>returnToURL('/administracion/departamento')} title={titulo}>
            <DepartamentoEditForm departamentoSelected={departamentoSelected} username={u_usuario}/>
        </ModalComponent>
    )
}

const mapStateToProps = state=>{
    return{
        currentUser:state.user.currentUser
    }
}

export default connect(mapStateToProps, null)(DepartamentoEdit);