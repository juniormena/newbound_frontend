//import user from '../../assets/images/defaul-profile.svg';
import { FaLock,FaKey, FaUser } from 'react-icons/fa';
import { httpApiURL } from '../../config.json';
import useModal from './../../hooks/useModal';
import ChangePasswordForm from '../Forms/ChangePassword/ChangePasswordForm';
import userPhoto from '../../assets/images/defaul-profile.png'
import ColaStatus from "./ColaStatus";
import {notificationError} from "../../lib/helpers";
import {Link} from "react-router-dom";

function UserInfo({ currentUser, logoutUser, sip }) {

    const [show, handleShow, handleClose] = useModal();

    function closeSession(){
        if(sip.sip.isLoginToCola==='SI'){
           notificationError({message:'Estas Logueado en una cola, no podemos cerrar tu sesion'}, 3000);
        }
        else{
            logoutUser();
        }
    }

    return (
      <>
          {((currentUser?.isDynamicMember?.success && sip?.sip?.success) || sip.sip.sipStatus==='motivoCallCenter')  && <ColaStatus currentUser={currentUser}/>}
        <li className="nav-item dropdown">
            <a className="nav-link" href="/"  role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img width="42" className="rounded-circle pr-2" src={currentUser?.userLogin.data.length === 0 ? '' : `${httpApiURL}/${currentUser?.userLogin.data[0].u_imagen}`}
                alt="user_image" onError={(e) => e.target.src = `${userPhoto}`}/>
                {currentUser?.userLogin.data.length ===0 ? '' : currentUser?.userLogin.data[0].u_nombre_completo}
            </a>
           
            <div className="dropdown-menu border" aria-labelledby="navbarDropdownMenuLink">
                <Link to={{pathname:`/administracion/usuario/edit/${currentUser?.userLogin?.data[0]?.u_id}`, state:{from:window.location.pathname}}} className="dropdown-item"><FaUser className="mr-1"/>Perfil de usuario</Link>
                <span className="dropdown-item" onClick={handleShow}><FaKey className="mr-1"/>Cambiar contraseña</span>
                <span className="dropdown-item border-top mt-2" onClick={closeSession}><FaLock className="mr-1"/>Cerrar sesión</span>
             </div>
        </li>
        {show ? <ChangePasswordForm show={show} handleClose={handleClose} currentUser={currentUser} logoutUser={logoutUser}/> : <></>}
      </>
    )
}


export default UserInfo;

