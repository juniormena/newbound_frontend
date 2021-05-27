import {useEffect} from 'react';
import newboundLogo from '../../assets/images/logo.SVG';
import {FaChartBar} from 'react-icons/fa';
import UserInfo from './UserInfo';
import HamburgerButton from './HamburgerButton';
import useModal from './../../hooks/useModal';
import {sipPhoneStatus} from "../../lib/phoneStatus";
import {hasPermission} from "../../lib/Permissions";
import SoftPhone from "../SoftPhone/SoftPhone";
import PageBlockLoading from "../Loading/Loading";
import useLoading from "../../hooks/useLoading";
import {LoginToCola} from "../../services/softphoneService";
import {hideSidebar} from "../../lib/helpers";
import {dashboardPermiso} from "../../lib/permissionVars";

function NavBar(props) {

    const {currentUser, logoutUser, sip} = props;
    const [show, handleShow, handleClose] = useModal();
    const [loading, setLoading] = useLoading();

    useEffect(()=>{
      if(sip?.sip?.sessions.length!==0 && !show){
          handleShow();
      }
    },[sip?.sip?.sessions.length])


    useEffect(() => {
        hideSidebar()
        window.addEventListener("resize", hideSidebar)
        return () => window.removeEventListener("resize", () => {
        })
    }, [])

    useEffect(() => {
        if(currentUser?.isDynamicMember?.success && sip.sip.isLoginToCola==='NO'){
            sip.setSip(prevState => ({...prevState, success: false, sipErrorMessage: 'Necesitas estar logueado a la cola para utilizar esta funcion',
                sipStatus: 'motivoCallCenter'}))
        }
        else if(currentUser?.isDynamicMember?.success && sip.sip.isLoginToCola==='SI'){
            sip.setSip(prevState => ({...prevState, success: true, sipErrorMessage: 'Listo',
                sipStatus: 'registered'}))
        }
    }, [sip.sip.isLoginToCola]);


    useEffect(()=>{
        window.addEventListener('load',  ()=>{
            if(currentUser?.isDynamicMember?.success){
                    if (!localStorage.getItem("isLoginToCola")) {
                        LoginToCola(currentUser, sip);
                    }
            }
        });

        return ()=> window.removeEventListener('load', null);

    },[currentUser.isDynamicMember?.success])

    console.log(sip.sip)

    if(loading){
        return(
            <PageBlockLoading/>
        )
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light fixed-top bg-navbar">
                <a href="/"><img src={newboundLogo} alt="newbound_logo" height="33" className="d-inline-block align-top" loading="lazy"/></a>
                <HamburgerButton/>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav navbar-nav__ml mt-2 mt-lg-0">
                        {hasPermission(dashboardPermiso, currentUser?.permisosUsuario) && <li className="nav-item">
                             <a className="nav-link" href="/dashboard">
                                <FaChartBar className="navbar-link__icon"/>Dashboard
                            </a>
                        </li>}
                        <li className="nav-item">
                            <span className="nav-link" onClick={sip?.sip?.success ? handleShow : undefined}>{sipPhoneStatus(sip)} Teléfono</span>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <UserInfo currentUser={currentUser} logoutUser={logoutUser} sip={sip}/>
                    </ul>
                </div>
            </nav>
            {sip?.sip?.success && <SoftPhone show={show} handleClose={handleClose}/>}
        </>
    )
}

export default NavBar;