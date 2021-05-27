import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import MenuPermisoRow from "../Data/MenuPermiso/MenuPermisoRow";
import { getMenuPerfilwithPerfilAndMenuByPerfil } from './../../services/AdministracionService';
import { handleChangeInput } from './../../lib/helpers';
import { searchInTable } from '../../lib/searchTable';


function PermisosListComponent({ perfilid, menusPermisos, username }) {

    const [menuPerfil, setMenuPerfil] = useState({mp_usuario_ing:username, mp_terminal_ing:'Newbound 2.0', mp_id_perfil:0, mp_id_menu:0});
    const [menusPerfil, setMenusPerfil] = useState([]);
    const [searchText, setSearchText] = useState({text:''});

    useEffect(()=>{
        getMenuPerfilwithPerfilAndMenuByPerfil(perfilid, setMenusPerfil);
    },[perfilid, setMenusPerfil])

    return (
        <div className="card">
            <h5 className="card-header base-background-gradient text-uppercase text-white">Lista de permisos 
                <input placeholder="Buscar por nombre permiso..." type="text" className="form-control input-search" value={searchText.text} 
                onChange={(e)=>handleChangeInput(e, 'text', searchText, setSearchText)} onKeyUp={()=>searchInTable(searchText.text, "permisosTable")}/>
            </h5>
                
                <Table responsive striped hover borderless className="mt-2" id="permisosTable">
                    <thead className="text-center  border-bottom border-info m-5">
                        <tr>
                            <th className="text-uppercase">Permiso</th>
                            <th className="text-uppercase">Tipo Permiso</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {menusPermisos.map(
                            menuPermiso=>(
                            <MenuPermisoRow key={menuPermiso.m_id} menuPermiso={menuPermiso} 
                            perfilid={perfilid} menuPerfil={menuPerfil} setMenuPerfil={setMenuPerfil} menusPerfil={menusPerfil} setMenusPerfil={setMenusPerfil}/>))}
                    </tbody>
                </Table>
        </div>
    )
}

export default PermisosListComponent;
