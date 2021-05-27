import { socket } from "./socket-common";
import {
  notificationSuccess,
  notificationError,
  notificationSuccessForUpdate,
} from "./../lib/helpers";


export const GetMiembriosByColaNameDinamico = (cola_name, setData) => {
    socket.emit("getColasMiembrosDinamicosByColaName", cola_name);
    socket.on("Res-getColasMiembrosDinamicosByColaName", async function (datos) {
      
      setData({ data: datos.data });
    });
  };

export const deleteMiembroColaDinamico=(data)=>{
    socket.emit("deleteColaDynamicMember",data)
    socket.on('Res-deleteColaDynamicMember',async function (datos) {
        console.log(datos)
    })
    
}


export const GetMiembriosDinamicosByUniqueid = (uniqueid, setData) => {
  socket.emit("getColasMiembrosDinamicosWithEmpresaByUniqueId", uniqueid);
  socket.on("Res-getColasMiembrosDinamicosWithEmpresaByUniqueId", async function (datos) {
    setData(datos.data);
  });
};

export function addMiembroColasDinamicas(datos, setLoading) {


  try {
    setLoading(true);
    socket.emit("addColaDynamicMember", datos);
    socket.on("Res-addColaDynamicMember", async function (datos) {
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

export const UpdateColaMemberDinamicos = (data, setLoading) => {
  try {
    socket.emit("updateColaDynamicMember", data);
    socket.on("Res-updateColaDynamicMember", async function (datos) {
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
