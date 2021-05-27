import { socket } from "../socket-common";
import {
  notificationError,
} from "../../lib/helpers";

export const getEstadosActividadAgente =(setState)=>{

    socket.emit("getTipoEstadoAgente")
    socket.on("Res-getTipoEstadoAgente", async function(datos) {
      
  
          setState(
            datos.data.map((data) => ({
                value: data.TipoEstadoAgente,
                label: data.TipoEstadoAgente,
              }))
          )
        
    })
}
export const getActividadAgente =(datos,setState, setLoading)=>{
    setLoading(true);
    socket.emit("getActividadAgenteByFilters",datos)
    socket.on("Res-getActividadAgenteByFilters", async function(datos) {

        if (datos.success) {
            setState(datos.data);
            setLoading(false);
        } else {
            notificationError(datos, 2500);
            setLoading(false);
        }
    })
}