import { isMenuPerfilAssigned } from '../../lib/helpers';
import { addMenuUsuario, deleteMenuUsuarioById } from './../../services/AdministracionService';
import { isMenuUsuarioAssigned, getMenuUsuarioId } from './../../lib/helpers';
import useLoading from './../../hooks/useLoading';
function UsuarioPermisosRow({ menuPermiso, menuUsuario, menusPerfil, menusUsuario,setMenusUsuario }) {
    const [loading, setLoading] = useLoading();

    const assignButton = <button className="btn btn-primary" disabled={loading} 
    onClick={()=>addMenuUsuario(Object.assign({}, menuUsuario, {mu_id_menu:menuPermiso.m_id}), setLoading, menuUsuario.mu_id_usuario,setMenusUsuario)}> 
        Asignar 
    </button>;

    const disabledButton = <button className="btn btn-danger" disabled={loading || isMenuUsuarioAssigned(menusUsuario, menuPermiso.m_id) ? false : true}
    onClick={()=>deleteMenuUsuarioById({Id:getMenuUsuarioId(menusUsuario, menuPermiso.m_id)}, setLoading, menuUsuario.mu_id_usuario,setMenusUsuario)}> 
        Quitar 
    </button>

    return (
        <tr className={`make-a-pointer ${isMenuPerfilAssigned(menusPerfil,menuPermiso.m_id) 
            || isMenuUsuarioAssigned(menusUsuario, menuPermiso.m_id) ? 'tr-selected text-white' : ''}`}>
            <td>{menuPermiso.m_nombre}</td>
            <td>{menuPermiso.m_cod_tipo_menu === 1 ? 'Menu web site' : 'Permiso'}</td>
            <td>{isMenuPerfilAssigned(menusPerfil,menuPermiso.m_id) 
            || isMenuUsuarioAssigned(menusUsuario, menuPermiso.m_id) ? <>{disabledButton}</> : <>{assignButton}</> }</td>
        </tr>
    )
}

export default UsuarioPermisosRow;