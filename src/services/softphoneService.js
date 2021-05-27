import {socket} from './socket-common';
import {normalAlert} from "../lib/softphoneHelpers";
import {ConfirmacionBorrar} from "../lib/helpers";

export function LoginToCola(user, sip) {
  for (let i = 0; i < user.isDynamicMember?.data?.length; i++) {
    socket.emit("LoginToCola", {
      action: "QueueAdd",
      queue: user.isDynamicMember.data[i]?.queue_name,
      actionid: 100,
      interface: user.isDynamicMember.data[i]?.interface,
      penalty: user.isDynamicMember.data[i]?.penalty,
      paused: 1,
      MemberName: parseInt(user.isDynamicMember.data[i]?.membername),
    });
  }
  socket.on("Res-LoginToCola", async function (datos) {
    if (datos.success) {
      normalAlert("success", "Login cola", `Interfaz agregada a la cola`);
      sip?.setSip((prevState) => ({
        ...prevState,
        isLoginToCola: "SI",
        isPauseInCola: "SI",
      }));
      !localStorage.getItem("isLoginToCola") &&
        localStorage.setItem("isLoginToCola", "SI");
      !localStorage.getItem("isPauseInCola") &&
        localStorage.setItem("isPauseInCola", "SI");
    } else {
      normalAlert("error", "Login cola", datos.message);
      loginColaValidation(sip);
    }
  });
}

export function removeFromCola(user, sip) {
  for (let i = 0; i < user.isDynamicMember.data.length; i++) {
    socket.emit("removeFromCola", {
      action: "QueueRemove",
      queue: user.isDynamicMember.data[i]?.queue_name,
      actionid: 120,
      interface: user.isDynamicMember.data[i]?.interface,
    });
  }

  socket.on("Res-removeFromCola", async function (datos) {
    if (datos.success) {
      normalAlert(
        "success",
        "Cerrar sesion cola",
        `Sesion cerrada correctamente`
      );
      sip?.setSip((prevState) => ({
        ...prevState,
        isLoginToCola: "NO",
        isPauseInCola: "NO",
      }));
      localStorage.getItem("isLoginToCola") &&
        localStorage.removeItem("isLoginToCola");
      localStorage.getItem("isPauseInCola") &&
        localStorage.removeItem("isPauseInCola");
    } else {
      normalAlert(
        "error",
        "Cerrar sesion cola",
        `No se pudo cerrar sesion de la interfaz, no esta alli`
      );
      loginColaValidation(sip);
    }
  });
}

export function removeFromColaDashboard(datos){
  console.log(datos)
  ConfirmacionBorrar('Logoff de cola',`¿Estás seguro quieres desloguear de la cola ${datos?.colaName} al usuario ${datos?.userName}?`,()=>{
    socket.emit("removeFromCola", {
      action: "QueueRemove",
      queue: datos?.userData?.queue,
      actionid: 120,
      interface: datos?.userData?.location,
    });
    socket.on("Res-removeFromCola", async function (datos) {
      if (datos.success) {
        normalAlert(
            "success",
            "Cerrar sesion cola",
            `Sesion cerrada correctamente`
        );
      } else {
        normalAlert(
            "error",
            "Cerrar sesion cola",
            `No se pudo cerrar sesion de la interfaz, no esta alli`
        );
      }
    });
  });
}

export function pauseCola(user, motivoPausa, sip) {
  for (let i = 0; i < user.isDynamicMember.data.length; i++) {
    socket.emit("PauseCola", {
      action: "QueuePause",
      actionid: 130,
      interface: user.isDynamicMember.data[i]?.interface,
      paused: 1,
      reason: motivoPausa,
    });
  }

  socket.on("Res-PauseCola", async function (datos) {
    if (datos.success) {
      normalAlert("success", "Pausa cola", `Interfaz pausada correctamente`);
      sip?.setSip((prevState) => ({ ...prevState, isPauseInCola: "SI" }));
      !localStorage.getItem("isPauseInCola") &&
        localStorage.setItem("isPauseInCola", "SI");
    } else {
      normalAlert(
        "error",
        "Pausa cola",
        `No se pudo reanudar la interfaz, no esta alli`
      );
      loginColaValidation(sip);
    }
  });
}

export function unPauseCola(user, sip) {
  for (let i = 0; i < user.isDynamicMember.data.length; i++) {
    socket.emit("PauseCola", {
      action: "QueuePause",
      actionid: 130,
      interface: user.isDynamicMember.data[i]?.interface,
      paused: 2,
      reason: 104,
    });
  }
  socket.on("Res-PauseCola", async function (datos) {
    if (datos.success) {
      normalAlert("success", "Pausa cola", `Interfaz reanudada correctamente`);
      sip?.setSip((prevState) => ({ ...prevState, isPauseInCola: "NO" }));
      localStorage.getItem("isPauseInCola") &&
        localStorage.removeItem("isPauseInCola");
    } else {
      normalAlert(
        "error",
        "Pausa cola",
        `No se pudo reanudar la interfaz, no esta alli`
      );
      loginColaValidation(sip);
    }
  });
}

export function getStatusMember(user, sip) {
  socket.emit("getStatusMember", {
    action: "QueueStatus",
    queue: user.isDynamicMember.data[0]?.queue_name,
    member: parseInt(user.isDynamicMember.data[0]?.membername),
  });
  socket.on("Res-getStatusMember", async function (datos) {
    if (datos.success) {
      if (datos.data.length > 0) {
        if (
          datos.data[0].name === user.isDynamicMember.data[0]?.membername &&
          datos.data[0].queue === user.isDynamicMember.data[0]?.queue_name
        ) {
          if (
            datos.data[0].paused === "1" &&
            datos.data[0].location === user.isDynamicMember.data[0]?.interface
          ) {
            if (!localStorage.getItem("isPauseInCola")) {
              localStorage.setItem("isPauseInCola", "SI");
              sip?.setSip((prevState) => ({
                ...prevState,
                isPauseInCola: "SI",
              }));
            }
            if (!localStorage.getItem("isLoginToCola")) {
              localStorage.setItem("isLoginToCola", "SI");
              sip?.setSip((prevState) => ({
                ...prevState,
                isLoginToCola: "SI",
              }));
            }
          } else if (
            datos.data[0].paused === "0" &&
            datos.data[0].location === user.isDynamicMember.data[0]?.interface
          ) {
            if (localStorage.getItem("isPauseInCola")) {
              sip?.setSip((prevState) => ({
                ...prevState,
                isPauseInCola: "NO",
              }));
              localStorage.removeItem("isPauseInCola");
            }
            if (!localStorage.getItem("isLoginToCola")) {
              localStorage.setItem("isLoginToCola", "SI");
              sip?.setSip((prevState) => ({
                ...prevState,
                isLoginToCola: "SI",
              }));
            }
          }
        }
      }
    }
  });
}

function loginColaValidation(sip) {
  if (localStorage.getItem("isLoginToCola")) {
    localStorage.removeItem("isLoginToCola");
    if (localStorage.getItem("isPauseInCola")) {
      localStorage.removeItem("isPauseInCola");
      sip?.setSip((prevState) => ({ ...prevState, isPauseInCola: "NO" }));
    }
    sip?.setSip((prevState) => ({ ...prevState, isLoginToCola: "NO" }));
  }
}

//Created By Eidy

export function getHistoricos(datos,setState) {
    try {
        socket.emit('getHistoricos',datos)
        socket.on('Res-getHistoricos',async function (datos) {
            if (datos.success) {
                setState(datos.data);
            }
            else{
                setState([])
            }
        })
           
    } catch (error) {
        
    }
}

export function getDirectorioExtensiones(datos, setState) {
  // console.log(datos)
  try {
    socket.emit("getDirectorioExtensiones", datos);
    socket.on("Res-getDirectorioExtensiones", async function (datos) {
      if (datos.success) {
        setState(datos.data);
      }
    });
  } catch (error) {}
}
export function getDirectorioContactos(datos, setState) {
  // console.log(datos)
  try {
    socket.emit("getDirectorioContactos", datos);
    socket.on("Res-getDirectorioContactos", async function (datos) {
      if (datos.success) {
        setState(datos.data);
      }
    });
  } catch (error) {}
}

export function getDirectorioCampanas(datos, setState) {
  try {
    socket.emit("getDirectorioCampanas", datos);
    socket.on("Res-getDirectorioCampanas", async function (datos) {
      let datosSuccess = [];
      datos.map((dato) => {
         if (dato.success) {
            dato.data.map((registros) => (
                Object.entries(registros.contactos).map(contacto=>(
                  datosSuccess.push({ 
                      campana:registros.nombre_campana,
                      cliente:registros.nombre,
                      contacto:contacto[1].nombre,
                      telefono:contacto[1].telefono,
                      extension:contacto[1].extension})
                  ))
              ))
         }
      });
       
      setState(datosSuccess)

    });
  } catch (error) {}
}


/*window.onbeforeunload = function () {
    return "Do you really want to close?";
};*/
