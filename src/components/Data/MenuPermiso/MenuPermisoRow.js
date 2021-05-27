
import { useEffect, useState} from 'react';
import { isMenuPerfilAssigned } from '../../../lib/helpers';
import { addMenuPerfil } from '../../../services/AdministracionService';
import { getMenuPerfilId } from './../../../lib/helpers';
import { deleteMenuPerfilById } from './../../../services/AdministracionService';

function MenuPermisoRow({ menuPermiso, perfilid, menuPerfil, setMenuPerfil, menusPerfil, setMenusPerfil }) {

    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        setMenuPerfil(prevMenuPerfil=>({...prevMenuPerfil, mp_id_perfil:perfilid.Id}));
    },[perfilid, setMenuPerfil]);

    const assignButton = <button className="btn btn-primary" disabled={loading}
    onClick={()=>{addMenuPerfil(Object.assign({}, menuPerfil, {mp_id_menu:menuPermiso.m_id}), setLoading, setMenusPerfil, perfilid);}} > Asignar </button>;

    const disabledButton = <button className="btn btn-danger" disabled={loading}
    onClick={()=>deleteMenuPerfilById({Id:getMenuPerfilId(menusPerfil,menuPermiso.m_id)}, setLoading, setMenusPerfil, perfilid)}> Quitar </button>

    return (
        <tr className={`make-a-pointer ${isMenuPerfilAssigned(menusPerfil,menuPermiso.m_id) ? 'tr-selected text-white' : ''}`}>
            <td>{menuPermiso?.m_descripcion}</td>
            <td>{menuPermiso.m_cod_tipo_menu === 1 ? 'Menu web site' : 'Permiso'}</td>
            <td>{isMenuPerfilAssigned(menusPerfil,menuPermiso.m_id) ? <>{disabledButton}</> : <>{assignButton}</> }</td>
        </tr>
    )
}


export default MenuPermisoRow;