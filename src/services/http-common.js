import axios from "axios";
import { toast } from "react-toastify";
import {httpApiURL} from '../config.json';

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    console.log(error);
    toast.error("Error inesperado",{toastId:'httpError'});
  }

  return Promise.reject(error);
});

export function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

axios.defaults.baseURL = process.env.REACT_APP_API_URL || httpApiURL;

export default axios;