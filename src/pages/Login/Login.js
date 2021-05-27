import slogan from '../../assets/login/images/slogan.svg';
import decals from '../../assets/login/images/decals.svg';
import logo from '../../assets/login/images/logo.svg';
import '../../assets/login/scss/app.scss';
import React, {useEffect, useState} from 'react';
import { handleChangeInput } from './../../lib/helpers';
import { connect } from 'react-redux';
import { loginUser } from './../../redux';
import {getCurrentUser} from "../../services/authService";
import PageNotFound from "../PageNotFound/PageNotFound";
import useLoading from "../../hooks/useLoading";
import {useLocation} from "react-router-dom";

function Login(props) {
    const [usuario,setUsuario] = useState({u_usuario:'',u_contrasena:'', submitted:false});
    const  [loading, setLoading] = useLoading(true);
    let location = useLocation();

    function handlesubmit(e){
        e.preventDefault();
        const { u_usuario, u_contrasena } = usuario;
        props.loginUser(u_usuario, u_contrasena, location)
    }
    useEffect(()=>{
       setLoading(false)
        if (getCurrentUser()){
            window.location.href= "/";
        }
    },[setLoading]);

    if(getCurrentUser()){
        return (
           <PageNotFound/>
        )
    }
    if(loading){
        return (
            <div className="container h-100 mx-auto center-screen">
                <i style={{fontSize:'6rem', color:'#82218d'}} className="fa fa-spinner fa-spin"/>
            </div>
        )
    }

    return (
        <div className="login Fade">
            <div className="content">
                <div className="formContet">
                    <form autoComplete="off" onSubmit={handlesubmit}>
                        <h3 style={{fontFamily:'Syncopate'}}>INICIAR SESIÓN</h3>
                            <div className="fielGruop">
                                <div className="field user">
                                    <input className="field__input" type="text" placeholder="Nombre de Usuario" required name="userName" value={usuario.u_usuario} 
                                    onChange={(e)=>handleChangeInput(e,'u_usuario', usuario, setUsuario)}/>
                                </div>
                            <div className="field password">
                                    <input className="field__input" type="password" required placeholder="Contraseña" name="password" value={usuario.u_contrasena}
                                    onChange={(e)=>handleChangeInput(e,'u_contrasena', usuario, setUsuario)}/>

                            </div>       
                                <button style={{fontFamily:'Syncopate'}} className="field__button" name="button" type="submit">
                                        {props.loggingIn ? 'ESPERE' : 'ENTRAR'}
                                </button>
                            </div>
                    </form>
                </div>
                <img className="slogan" src={slogan} alt="slogan"/>
                <img className="decals" src={decals} alt="lines"/>
                <img className="logo" src={logo} alt="logo"/>
            </div>
        </div>
    )
}

const mapStateToProps = state=>{
    return{
        usuario:state.user.usuario
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loginUser: (u_usuario, u_contrasena, location) => {
            dispatch({
                type:loginUser(), 
                payload:{ u_usuario, u_contrasena, url:location?.state?.from }
        })
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Login);
