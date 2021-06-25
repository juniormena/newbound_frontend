import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { moment } from "moment";

const customId = "IdForNotification";

export function handleChangeInput(e, name, state, setState) {
  const value =
    e.target.type === "checkbox" ? e.target.checked : e.target.value;
  setState({ ...state, [name]: value });
}

export function notificationError(datos, close) {
  toast.error(datos.message, {
    toastId: customId,
    autoClose: close,
  });
}

export function notificationSuccessNoReload(datos, close) {
  toast.success(datos.message, {
    toastId: customId,
    autoClose: close,
  });
}

export function notificationSuccess(datos, close) {
  toast.success(datos.message, {
    toastId: customId,
    autoClose: close,
    onClose: () => window.location.reload(),
  });
}

export function notificationSuccessForUpdate(datos, close, url) {
  toast.success(datos.message, {
    toastId: customId,
    autoClose: close,
    onClose: () => (window.location.href = url),
  });
}

export function isMenuPerfilAssigned(array, menuId) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].mp_id_menu === menuId) {
      return true;
    }
  }
}

export function isMenuUsuarioAssigned(array, menuId) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].mu_id_menu === menuId) {
      return true;
    }
  }
}

export function getMenuPerfilId(array, menuId) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].mp_id_menu === menuId) {
      return array[i].mp_id;
    }
  }
}

export function getMenuUsuarioId(array, menuId) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].mu_id_menu === menuId) {
      return array[i].mu_id;
    }
  }
}

export function isDepartamentoSelected(array, departamentoId){

  for(let i=0; i< array.length; i++){
 
      if(array[i]===departamentoId){
        return true
      }
  }
}

export function getMenusPadres(array, setState){
    for(let i=0; i< array.length; i++){
        //console.log('ejecutando')
        if(array[i].m_bit_padre === 1){
            setState(prevMenuPadre=>([...prevMenuPadre, array[i]]));
        }
    }
  }

export function convertImageToBase64(ImageUrl, callback) {
  if (ImageUrl.length === 0) return;
  try {
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
      let reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open("GET", ImageUrl);
    xhr.responseType = "blob";
    xhr.send();
    xhr.close();
  } catch (err) {
    return ImageUrl;
  }
}

export function isValidExtension(string) {
  const regEx = /\w?[A-Z]/i;

  return !!string.match(regEx);
}

export function toggleTheMenu(e,whois) {
  e.preventDefault();
  
  if(whois==="a"){
    e.target.parentElement.classList.toggle("mm-active");
    e.target.parentElement.children[1].classList.toggle("mm-show");
  }
  else if(whois==="i"){
    e.target.offsetParent.parentElement.classList.toggle("mm-active");
    e.target.offsetParent.parentElement.children[1].classList.toggle("mm-show");
  }
}

export function isValidExtension2(string){
  const regEx=/^[0-9]+[x]+$/
    return !!string.match(regEx);
}

export function ValidClaveLlamada(string){
  const regEx=/\w?[A-Z]/i

  return !!string.match(regEx);
}

export function isWeakClaveLlamada(string) {
  const regEx = /(1234|2345|3456|4567|5678|6789|0{4,}|1{4,}|2{4,}|3{4,}|4{4,}|5{4,}|6{4,}|7{4,}|8{4,}|9{4,})+/;

  return !!string.match(regEx);
}

export function returnToURL(url = "") {
  if (url !== "") {
    window.location.href = url;
  }
}

export function comparePasswords(password1, password2){
  if(password1===password2 && password1!=="" && password2!==""){
    return true;
  }
  else{
    return false;
  }
}

export function ConfirmacionBorrar(titulo, mensaje, operacion = null) {
  Swal.fire({
    title: `<h4>${titulo}</h4>`,
    text: `${mensaje}`,
    icon: "warning",
    width: "450px",
    showCancelButton: true,
    customClass: {
      icon: "swal-icon",
      confirmButton: "confirmBtn",
      cancelButton: "cancelBtn",
    },
    confirmButtonColor: "#652D90",
    cancelButtonColor: "#FF1F89",
    confirmButtonText: "Aceptar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      if (operacion !== null) {
        operacion();
      }
    }
  });
}

export function ConfirmacionGuardar(titulo, mensaje, operacion = null) {
  Swal.fire({
    title: `${titulo}`,
    text: `${mensaje}`,
    icon: "warning",
    customClass: ".sweet-alert",
    showCancelButton: true,
    confirmButtonColor: "#652D90",
    cancelButtonColor: "#FF1F89",
    confirmButtonText: "Aceptar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      if (operacion !== null) {
        operacion();
      }
    }
  });
}
export function ValidacionFormsEstadoAgente(formValues) {
  const {
    codigo,
    descripcionF,
    descripcionC,
    empresa,
    icono,
    minuto,
    visible,
    estado,
  } = formValues;

  if (codigo === 0 || codigo === null) {
    return false;
  }
  if (descripcionF.length === 0) {
    return false;
  }
  if (descripcionC.length === 0) {
    return false;
  }
  if (icono.length === 0) {
    return false;
  }
  if (empresa === 0 || empresa == null) {
    return false;
  }
  if (minuto === 0 || minuto === null) {
    return false;
  }
  if (visible.length === 0) {
    return false;
  }
  if (estado.length === 0) {
    return false;
  }
}

export const validateIntervals = (inicio, fin) => {
  if ((!inicio && fin) || (inicio && !fin)) {
    return false;
  }

  return true;
};

export const isDateBeginAfter = (begin, end) => {
  try {
    if (begin && end) {
      //let beginTime = moment(begin, "h:mma");
      //let endTime = moment(end, "h:mma");

      return (
        moment(begin).isAfter(end, "hour") ||
        moment(begin).isAfter(end, "minute")
      );
    }
    return false;
  } catch {
    console.log("error");
  }
};

export const isTimeBeginAfter = (begin, end) => {
  console.log(begin, end);

  if (begin && end) {
    //let beginTime = moment(begin, "h:m");
    // let endTime = moment(end, "h:mma");
    // console.log(beginTime, endTime);
    // return moment(beginTime).isAfter(endTime);
  }
  return false;
};

export const validateIntervalsWithMessage = (inicio, fin, message) => {
  if (!validateIntervals(inicio, fin)) {
    notificationError(
      {
        message: message,
      },
      false
    );

    return false;
  }

  return true;
};

export function hideSidebar() {
  try {
    if (window.innerWidth < 990) {
      document.getElementById("sidenav").classList.add("sidenav__display");
      document.getElementsByClassName("app-main__inner")[0].classList.remove("main__move");
      document.getElementsByClassName("footer")[0].classList.remove("footer__move");
    } else if (window.innerWidth > 990) {
      document.getElementById("sidenav").classList.remove("sidenav__display");
      document.getElementsByClassName("app-main__inner")[0].classList.add("main__move");
      document.getElementsByClassName("footer")[0].classList.add("footer__move");
    }
  }
  catch(err){}
}
