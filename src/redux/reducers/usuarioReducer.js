import { GET_CURRENT_USER, LOGIN_USER, LOGOUT_USER } from './../actions/usuarioTypes';
import { getCurrentUser, login, logout } from '../../services/authService';
import { notificationError } from '../../lib/helpers';

const initialState = {
    currentUser:{
        userLogin:{
            success:false,
            data:[],
            message:''
        },
        menuPerfilUsuario:{
            success:false,
            data:[],
            message:''
        },
        permisosUsuario:[],
        departamentos_supervision:[],
        cola_supervision:{
            success:false,
            data:[],
            message:''
        },
        campanas_supervision:{
            success:false,
            data:[],
            message:''
        },
        isDynamicMember:{
            success:false,
            data:[]
        },
        userExtensions:[{auth: "",id: "", id_empresa: 0, password: "", tipo_extension: "", transport: "",username: "",
        usuario_id:0}]
    }
}


const usuarioReducer = (state = initialState, action)=>{
    switch(action.type){
        case LOGIN_USER: 
            login(action.payload.u_usuario,action.payload.u_contrasena)
            .then(function(res){ 
                if(!res.success){
                    notificationError(res, 3000)
                }
                else if(res.success){
                    localStorage.setItem("token", res.token);
                    window.location.href=action.payload.url;
                }
            })
            return state

        case GET_CURRENT_USER:
            return Object.assign({}, state, {
                currentUser: getCurrentUser() || state.currentUser
            })
        
        case LOGOUT_USER:
            logout();
            window.location.href="/login";
            return state
       
        
        default: return state;
    }

}


export default usuarioReducer;