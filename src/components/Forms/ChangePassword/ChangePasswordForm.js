import { useState } from "react";
import ModalComponent from "./../../Modal/ModalComponent";
import { handleChangeInput, comparePasswords } from "./../../../lib/helpers";
import { changePassword } from './../../../services/ChangePasswordService';
import useLoading from './../../../hooks/useLoading';

function ChangePasswordForm({ show, handleClose, currentUser, logoutUser }) {
  let { u_id } = currentUser?.userLogin.data[0] || "";
  const [newPassword, setNewPassword] = useState({
    u_newPassword: "",
    u_repeatedPassword: "",
    u_closedSession: false,
  });
  const [loading, setLoading] = useLoading();


  return (
    <ModalComponent
      show={show}
      handleClose={handleClose}
      title="cambiar contraseña"
      size="md"
    >
      <form onSubmit={(e)=>changePassword(e, {u_id, ...newPassword}, logoutUser, setLoading)}>
        <div className="form-group">
          <label className="font-weight-bold text-uppercase">
            Nueva contraseña
          </label>
          <input
            required
            type="password"
            className="form-control"
            value={newPassword.u_newPassword}
            onChange={(e) =>
              handleChangeInput(e, "u_newPassword", newPassword, setNewPassword)
            }
          />
          <small className="form-text text-warning">
            Recomendamos no sea una contraseña similar a la anterior.
          </small>
          {newPassword.u_newPassword.length<6 && newPassword.u_newPassword!=="" &&(
              <small className="form-text text-danger">
                Su contraseña debe tener mas de 6 caracteres. 
              </small>
          )}
        </div>
        <div className="form-group">
          <label className="font-weight-bold text-uppercase">
            Repetir contraseña
          </label>
          <input
            required
            type="password"
            className="form-control"
            value={newPassword.u_repeatedPassword}
            onChange={(e) =>
              handleChangeInput(
                e,
                "u_repeatedPassword",
                newPassword,
                setNewPassword
              )
            }
          />
          {!comparePasswords(
            newPassword.u_newPassword,
            newPassword.u_repeatedPassword
          ) &&
          newPassword.u_newPassword !== "" &&
          newPassword.u_repeatedPassword !== "" ? (
            <small className="form-text text-danger">
              Las contraseñas no coinciden
            </small>
          ) : (
            <></>
          )}
        </div>
        <div className="form-check form-check-inline ">
          <label className="form-check-label font-weight-bold text-uppercase">
            Cerrar sesión
          </label>
          <input
            className="form-check-input ml-1"
            type="checkbox"
            value={newPassword.u_closedSession}
            checked={newPassword.u_closedSession}
            onChange={(e) =>
              handleChangeInput(
                e,
                "u_closedSession",
                newPassword,
                setNewPassword
              )
            }
          />
        </div>
        <button
          type="submit"
          className="btn btn-block btn-primary text-uppercase"
          disabled={
            !comparePasswords(
              newPassword.u_newPassword,
              newPassword.u_repeatedPassword
            ) || newPassword.u_newPassword.length < 6 ? true : false 
            || loading
          }
        >
          Guardar
        </button>
      </form>
    </ModalComponent>
  );
}

export default ChangePasswordForm;
