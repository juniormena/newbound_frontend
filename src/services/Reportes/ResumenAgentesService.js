import { socket } from "../socket-common";
import {
  notificationError,
} from "../../lib/helpers";

export const getResumenAgentes = (datos, setState, setLoading) => {
   setLoading(true);
   socket.emit("GetResumenAgentesReporte", datos);
  socket.on("Res-GetResumenAgentesReporte", async function (datos) {
      console.log(datos)
    if (datos.success) {
      setState(datos.data);
      setLoading(false)
    } else {
      notificationError(datos, 2500);
      setState([]);
      setLoading(false);
    }
  });
};
