
import { useState, useEffect } from 'react';
import MantPermisosComponent from './../../components/MantPermisos/MantPermisosComponent';
import PerfilesPermisosComponent from './../../components/MantPermisos/PerfilesPermisosComponent';
import PermisosListComponent from './../../components/MantPermisos/PermisosListComponent';
import {
    getEmpresa,
    getEmpresaPerfilByEmpresa,
    getMenus,
    getMenuWithEmpresaByEmpresa
} from './../../services/AdministracionService';
import {connect} from "react-redux";

function MantPermisos({ currentUser }) {
    
    const [empresas, setEmpresas] = useState([]);
    const [perfiles,setPerfiles]=useState([]);
    const [empresaid, setEmpresaid] = useState({Id:0});
    const [perfilid, setPerfilid] = useState({Id:0});
    const [menusPermisos, setMenusPermisos] = useState([]);
    const { u_usuario } = currentUser?.userLogin?.data[0];

    useEffect(()=>{
        getEmpresa(setEmpresas);
    },[]);

    useEffect(()=>{
        getEmpresaPerfilByEmpresa(empresaid,setPerfiles);
        setPerfilid({Id:0});
        getMenus(setMenusPermisos);
    },[empresaid]);


    return (
        <div className="mt-3 ml-5">
        <div className="row">
          <div className="col-sm">
            <MantPermisosComponent empresas={empresas} 
            empresaid={empresaid}  setEmpresaid={setEmpresaid}/>
          </div>
          <div className="col-sm">
            {<PerfilesPermisosComponent empresaid={empresaid} perfiles={perfiles} setPerfiles={setPerfiles} setPerfilid={setPerfilid} perfilid={perfilid} username={u_usuario}/>}
          </div>
          <div className="col-sm">
           <PermisosListComponent perfilid={perfilid} menusPermisos={menusPermisos} username={u_usuario}/>
          </div>
        </div>
      </div>
    )
}

const mapStateToProps = state=>{
    return{
        currentUser:state.user.currentUser
    }
}


export default connect(mapStateToProps, null)(MantPermisos);
