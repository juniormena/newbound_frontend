import { socket } from "../socket-common";
import moment from "moment";
import {
  notificationError,

} from "../../lib/helpers";

export const getDetalleColasByFilters = (datos,  setData, setLoading) => {
  setLoading(true);
  if (datos.duracion_desde !== null && datos.duracion_hasta !== null) {
    datos.duracion_desde = moment(datos.duracion_desde, "HHmmss").format(
      "HH:mm:ss"
    );
    datos.duracion_hasta = moment(datos.duracion_hasta, "HHmmss").format(
      "HH:mm:ss"
    );
  }
  if (datos.hora_desde !== null && datos.hora_hasta !== null) {
    datos.hora_desde = moment(datos.hora_desde, "HHmmss").format("H:mm:ss");
    datos.hora_hasta = moment(datos.hora_hasta, "HHmmss").format("H:mm:ss");
  }
  if (
    datos.tiempo_espera_desde !== null &&
    datos.tiempo_espera_hasta !== null
  ) {
    datos.tiempo_espera_desde = moment(
      datos.tiempo_espera_desde,
      "HHmmss"
    ).format("H:mm:ss");
    datos.tiempo_espera_hasta = moment(
      datos.tiempo_espera_hasta,
      "HHmmss"
    ).format("H:mm:ss");
  }

  socket.emit("getDetalleColasByFilters", datos);
  socket.on("Res-getDetalleColasByFilters", async function (datos) {

    if (datos.success) {
      setData(datos.data);
      setLoading(false);
    } else {
        notificationError(datos, 2500);
        setData([]);
        setLoading(false);
    }
 
  });
};


export const getMotivoCierre = (setState)=>{
  socket.emit("getMotivoCierre")
  socket.on("Res-getMotivoCierre", async function(datos){
   
    setState(datos.data.map(motivo=>({
      value:motivo.el_nombre,
      label:motivo.el_nombre_mostrar,
      id:motivo.el_id
    })))
  })

  
} 