import React, { useEffect, useState } from "react";
import ModalComponent from "./../Modal/ModalComponent";
import Table from 'react-bootstrap/Table';
import {
  getMenuPerfilwithPerfilAndMenuByPerfil,
  getMenus,
  getMenuUsuarioByUser
} from './../../services/AdministracionService';
import UsuarioPermisosRow from './UsuarioPermisosRow';
import { handleChangeInput } from './../../lib/helpers';
import { searchInTable } from './../../lib/searchTable';

function UsuarioPermisos({ show, handleClose, usuario }) {
  const [menuUsuario, setMenuUsuario] = useState({mu_usuario_in:'Junior', mu_terminal_ing:'192.168.1.45', mu_id_usuario:0, mu_id_menu:0, mu_id_perfil:0});
  const [menusPerfil, setMenusPerfil] = useState([]);
  const [menusPermisos, setMenusPermisos] = useState([]);
  const [menusUsuario,setMenusUsuario] = useState([]);
  const [searchText, setSearchText] = useState({text:''});
  const titulo = "LISTA DE PERMISOS";

  
  useEffect(()=>{
    getMenuPerfilwithPerfilAndMenuByPerfil({Id:usuario.p_id}, setMenusPerfil);
  },[usuario.p_id])

  useEffect(()=>{
    getMenus(setMenusPermisos);
  },[usuario.e_id])

  useEffect(()=>{
    setMenuUsuario(prevMenuUsuario=>({...prevMenuUsuario, mu_id_usuario:usuario.u_id, mu_id_perfil:usuario.p_id}));
  },[usuario.p_id, usuario.u_id]);

  useEffect(()=>{
    getMenuUsuarioByUser({Id:usuario.u_id}, setMenusUsuario);
  },[usuario.u_id])
  

  return (
    <>
      <ModalComponent show={show} handleClose={handleClose} title={titulo}>
      <input placeholder="Buscar por nombre permiso..." type="text" className="form-control mb-2 input-search" value={searchText.text} 
      onChange={(e)=>handleChangeInput(e, 'text', searchText, setSearchText)} onKeyUp={()=>searchInTable(searchText.text, "permisosUsuarioTable")}/>
      <div className="card">
        <Table responsive striped hover borderless className="mt-2" id="permisosUsuarioTable">
          <thead className="text-center  border-bottom border-info m-5">
            <tr>
              <th className="text-uppercase">Permiso</th>
              <th className="text-uppercase">Tipo Permiso</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {menusPermisos.map(
              menuPermiso=>(
              <UsuarioPermisosRow key={menuPermiso.m_id} menuPermiso={menuPermiso} 
                menuUsuario={menuUsuario} menusPerfil={menusPerfil} 
                menusUsuario={menusUsuario} setMenusUsuario={setMenusUsuario}/>))}
          </tbody>
        </Table>
      </div>
      </ModalComponent>
    </>
  );
}

export default UsuarioPermisos;