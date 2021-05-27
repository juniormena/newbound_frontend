import { socket } from "../socket-common";
import {
  notificationError,
} from "../../lib/helpers";

export const getLlamadasAbandonadasByFilter=(datos,setAbandonadasResult, setLoading)=>{
    setLoading(true);
      socket.emit("getLlamadasAbandonadas",datos)
      socket.on('Res-getLlamadasAbandonadas',(datos)=>{
        if (datos.sucess) {
          setAbandonadasResult(datos.data);
          setLoading(false);
        }
        else{
          setAbandonadasResult([])
          notificationError(datos, 2500);
          setLoading(false);
        }
      })
}