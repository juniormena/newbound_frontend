import { socket } from "./socket-common";
import {
  notificationSuccess,
  notificationError,
  notificationSuccessForUpdate,
} from "./../lib/helpers";

//Miembros
export const GetMiembriosByColaName = (cola_name, setData) => {
  socket.emit("getColasMiembrosByColaName", cola_name);
  socket.on("Res-getColasMiembrosByColaName", async function (datos) {
    setData({ data: datos.data });
  });
};



export const GetMiembriosByUniqueid = (uniqueid, setData) => {
  socket.emit("getColasMiembrosByUniqueId", uniqueid);
  socket.on("Res-getColasMiembrosByUniqueId", async function (datos) {
    setData(datos.data);
  });
};

export function addMiembroColas(datos, setLoading) {


  try {
    setLoading(true);
    socket.emit("addColaMember", datos);
    socket.on("Res-addColaMember", async function (datos) {
      //console.log(datos)
      if (datos.success) {
        notificationSuccessForUpdate(datos, 3000, "/administracion/colas");
      } else {
        notificationError(datos, 2500);
        setLoading(false);
      }
    });
  } catch (error) {
    notificationError(datos, 8000);
  }
}

export const DeleteColaMember = (data) => {
 
  socket.emit("deleteColaMember", data);
  socket.on("Res-deleteColaMember", async function (datos) {
    if (datos.false) {
      notificationError(datos, 8000);
    }
  });
};
export const UpdateColaMember = (data, setLoading) => {
  try {
    socket.emit("updateColaMember", data);
    socket.on("Res-updateColaMember", async function (datos) {
      setLoading(true);

      if (datos.success) {
        notificationSuccessForUpdate(datos, 3000, "/administracion/colas");
      } else {
        notificationError(datos, 2500);
        setLoading(false);
      }
    });
  } catch (error) {
    notificationError(data, 8000);
  }

};



///Extras

export function getUsuariosMiembros(setState) {
  socket.emit("getUsuarioWithExtension");

  socket.on("Res-getUsuarioWithExtension", async function (datos) {
    console.log(datos.data)
    if (datos.success) {
      setState(
        datos.data?.map((usuario) => ({
          value: usuario.u_id,
          label: usuario.u_nombre_completo,
          extension: usuario.u_extensiones,
        }))
      );
    }
  });
}

/* export function getUsuarios2(currentUser) {
  console.log(currentUser.departamentos_supervision);
  socket.emit("getUsuarioByDep",currentUser.departamentos_supervision);

  socket.on("Res-getUsuarioByDep", async function (datos) {
    console.log(datos)

  });
}

 */