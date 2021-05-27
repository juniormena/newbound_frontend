import { Link } from "react-router-dom";
import { getTimeReceived } from "../../../lib/dateHelpers";
import TooltipComponent from "../../Toolttip/TooltipComponent";
import useModal from "./../../../hooks/useModal";
import UsuarioPermisos from "./../../UsuarioPermisos/UsuarioPermisos";
import { hasPermission } from "../../../lib/Permissions";
import { ConfirmacionBorrar } from "../../../lib/helpers";
import { disableUsuario } from "../../../services/AdministracionService";
import useLoading from "../../../hooks/useLoading";
import {asignarUsuario, deshabilitarUsuario, editarUsuario} from "../../../lib/permissionVars";

function UsuarioRow({ usuario, permisosUsuario }) {
  const [show, handleShow, handleClose] = useModal();

  const handleDesahabilitar = (id) => {
    ConfirmacionBorrar(
      "Desea deshabilitar este usuario?",
      "Este usuario no aparecera en los registros",
      () => {
      
        disableUsuario(id)
      }
    );
  };

  
  return (
    <>
      <tr>
        <td>{usuario.u_nombre_completo}</td>
        <td>{usuario.e_nombre_completo}</td>
        <td>{usuario.se_descripcion}</td>
        <td>{usuario.ds_descripcion}</td>
        <td>{usuario.u_usuario}</td>
        <td>{usuario.p_descripcion}</td>
        <td>{usuario.u_correo}</td>
        <td>
          {usuario.u_ult_entrada === null
            ? ""
            : getTimeReceived(usuario.u_ult_entrada)}
        </td>
        <td className="text-right">
          <div className="d-flex justify-content-end">
            {hasPermission(editarUsuario, permisosUsuario) && (
              <TooltipComponent text="Editar">
                <Link
                  to={{pathname:`/administracion/usuario/edit/${usuario.u_id}`, state:{from:window.location.pathname}}}
                  className="btn btn-primary "
                >
                  <i className="fa fa-edit" />
                </Link>
              </TooltipComponent>
            )}

            {hasPermission(asignarUsuario, permisosUsuario) && (
              <TooltipComponent text="Permisos">
                <button className="btn btn-primary mx-2 " onClick={handleShow}>
                  <i className="fa fa-list-ul" />
                </button>
              </TooltipComponent>
            )}

            {hasPermission(deshabilitarUsuario, permisosUsuario) && (<TooltipComponent text="Deshabilitar">
              <button className="btn btn-danger" onClick={()=>handleDesahabilitar(usuario.u_id)}>
                <i className="fas fa-times-circle" />
              </button>
            </TooltipComponent>)}
          </div>
        </td>
      </tr>
      {show ? (
        <UsuarioPermisos
          show={show}
          handleClose={handleClose}
          usuario={usuario}
        />
      ) : (
        <></>
      )}
    </>
  );
}

export default UsuarioRow;
