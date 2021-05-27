import ModalComponent from './../../components/Modal/ModalComponent';
import EmpresaEditForm from './../../components/Forms/EmpresaEditForm';
import { useEffect, useState } from 'react';
import { getEmpresaById } from './../../services/AdministracionService';
import { returnToURL } from '../../lib/helpers';
import {connect} from "react-redux";

function EmpresaEdit(props) {
    const titulo = "EMPRESA";
    const { Id } = props.match.params;
    const { u_usuario } = props.currentUser?.userLogin?.data[0];
    const [empresaSelected,setEmpresaSelected] = useState([{e_usuario_ing:u_usuario, e_terminal_ing:'Newbound 2.0', e_descripcion:'',
    e_nombre_completo:'', e_rnc:'', e_rango_extension:'', 
    e_contexto:'', e_contrasena_extension:''}]);
    /*let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" }};*/
    
    useEffect(()=>{
        getEmpresaById({ Id },setEmpresaSelected)
    },[Id]);

    return (
        <ModalComponent show={true} handleClose={()=>returnToURL('/administracion/empresa')} title={titulo}>
            <EmpresaEditForm empresaSelected={empresaSelected} username={u_usuario}/>
        </ModalComponent>
    )
}

const mapStateToProps = state=>{
    return{
        currentUser:state.user.currentUser
    }
}

export default connect(mapStateToProps, null)(EmpresaEdit);
