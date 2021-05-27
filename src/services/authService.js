import http from './http-common';
import jwtDecode from "jwt-decode";

const apiEndpoint = "/login";
const tokenKey = "token";

export async function login(u_usuario, u_contrasena) {
  const res = await http.post(apiEndpoint, {
    u_usuario,
    u_contrasena,
  });
  return res.data
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    const user = jwtDecode(jwt);
    return user;
  } catch (error) {
    return null;
  }
}
