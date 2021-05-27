import { useState } from 'react';
import EmpresaPersonalTab from './../Tabs/EmpresaPersonalTab';
import UsuarioTab from './../Tabs/UsuarioTab';
import { addUsuario } from './../../services/AdministracionService';
import useLoading from './../../hooks/useLoading';


function UsuarioForm({ username }) {
    const [usuario, setUsuario] = useState({u_usuario_ing:username, u_terminal_ing:'Newbound 2.0', u_id_empresa:0, u_id_sucursal:0, u_id_departamento:0,
        u_id_documento:'', u_nombre_completo:'', u_sexo:'', u_fecha_nacimiento:'', u_cod_empleado:'', u_usuario:'', u_contrasena:'', u_id_perfil:0, 
        u_correo:'', u_imagen:'', u_extensiones:[], u_clave_llamada:'', u_llamada_internas:'', u_llamada_internacional:'', u_llamada_nacional:'', 
        u_activo_desde: '', u_activo_hasta:'',u_clave_habilitada:false, departamentos_supervisar:[], colas_supervision:[],campanas:[]});
    const [loading, setLoading] = useLoading();
    const [departamentos,setDepartamentos] =  useState([]);
    const [colas, setColas] = useState([]);
    const [campanas, setCampanas] = useState([]);
    const [perfilSelected, setPerfilselected] = useState({p_es_supervisor: null})
    

    return (
     <>
        <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item"> 
                <a className="nav-link active" id="agente-tab" data-toggle="tab" href="#agente" role="tab" aria-controls="agente" aria-selected="true">
                    <i className="fa fa-user mr-1"/> Datos de empresa y personales</a>
            </li>

            <li className="nav-item">
                <a className="nav-link" id="usuario-tab" data-toggle="tab" href="#usuario" role="tab" aria-controls="usuario" aria-selected="false">
                    <i className="fa fa-user-plus mr-1"/> Datos de Usuario</a>
            </li>
                <li className="pt-2 ml-auto text-primary">Campos con * son requeridos</li>
            </ul>
            <form noValidate onSubmit={(e)=>addUsuario(e, usuario, setLoading)}>
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="agente" role="tabpanel" aria-labelledby="agente-tab"> 
                        <EmpresaPersonalTab usuario={usuario} setUsuario={setUsuario} departamentos={departamentos} setDepartamentos={setDepartamentos}/>
                    </div>
                    <div className="tab-pane fade" id="usuario" role="tabpanel" aria-labelledby="usuario-tab">
                        <UsuarioTab usuario={usuario} setUsuario={setUsuario} departamentos={departamentos}
                                    perfilSelected={perfilSelected} setPerfilselected={setPerfilselected} colas={colas} setColas={setColas } 
                                    campanas={campanas} setCampanas={setCampanas}/>
                    </div>
                    <button className="btn btn-primary text-uppercase mt-1 mr-4 float-right" disabled={loading}>guardar</button>
                </div>
            </form>
        </>
    )
}

export default UsuarioForm;
