import ModalComponent from './../../components/Modal/ModalComponent';
import UsuarioEditForm from '../../components/Forms/UsuarioEditForm';
import { returnToURL } from '../../lib/helpers';
import { useEffect, useState } from 'react';
import { getUsuarioById } from './../../services/AdministracionService';
import { useLocation } from "react-router-dom";
import {connect} from "react-redux";

function UsuarioEdit(props) {
    const titulo = "USUARIO";
    const { Id } = props.match.params;
    const { u_usuario } = props.currentUser?.userLogin?.data[0];
    let location = useLocation();
    const [selectedUsuario,setSelectedUsuario] = useState([{u_usuario_ing:u_usuario, u_terminal_ing:'Newbound 2.0', u_id_empresa:0, u_id_sucursal:0, u_id_departamento:0,
    u_id_documento:'', u_nombre_completo:'', u_sexo:'', u_fecha_nacimiento:'', u_cod_empleado:'', u_usuario:'', u_contrasena:'', u_id_perfil:0, 
    u_correo:'', u_imagen:'', u_extensiones:[], u_clave_llamada:'', u_llamada_internas:'', u_llamada_internacional:'', u_llamada_nacional:'', 
    u_activo_desde: '', u_activo_hasta:'',u_clave_habilitada:false, departamentos_supervisar:[], u_colas_supervision:[],campanas:[]}, {departamentos_supervisar:[]}]);


    useEffect(()=>{
        getUsuarioById({Id}, setSelectedUsuario);
    },[Id])

    return (
        <ModalComponent show={true} handleClose={()=>returnToURL(location?.state?.from)} title={titulo} size="xl">
            <UsuarioEditForm selectedUsuario={selectedUsuario} username={u_usuario}/>
        </ModalComponent>
    )
}

const mapStateToProps = state=>{
    return{
        currentUser:state.user.currentUser
    }
}

export default connect(mapStateToProps, null)(UsuarioEdit);
