import { GET_CURRENT_USER, LOGIN_USER, LOGOUT_USER } from './usuarioTypes';


export const loginUser = ()=>{
    return LOGIN_USER;
}

export const currentUser = ()=>{
    return GET_CURRENT_USER;
}

export const logoutUser = ()=>{
    return LOGOUT_USER;
}