import ModalComponent from './../../components/Modal/ModalComponent';
import { useEffect, useState } from 'react';
import { getEmpresaSucursalesById } from './../../services/AdministracionService';
import SucursalEditForm from '../../components/Forms/SucursalEditForm';
import { returnToURL } from '../../lib/helpers';
import {connect} from "react-redux";

function SucursalEdit(props) {
    const titulo = "SUCURSAL";
    const { Id } = props.match.params;
    const { u_usuario } = props.currentUser?.userLogin?.data[0];
    const [sucursalSelected,setSucursalSelected] = useState([{se_usuario_ing:u_usuario, se_terminal_ing:'Newbound 2.0',
    se_id:0, se_descripcion:'',se_id_empresa:0}]);

    useEffect(()=>{
        getEmpresaSucursalesById({ Id }, setSucursalSelected)
    },[Id])

    return (
        <ModalComponent show={true} handleClose={()=>returnToURL('/administracion/sucursal')} title={titulo}>
            <SucursalEditForm sucursalSelected={sucursalSelected} username={u_usuario}/>
        </ModalComponent>
    )
}

const mapStateToProps = state=>{
    return{
        currentUser:state.user.currentUser
    }
}

export default connect(mapStateToProps, null)(SucursalEdit);
