import { socket } from "../socket-common";
import {
  notificationError,
} from "../../lib/helpers";

export const getResumenAgenteColas = (datos, setState, setLoading) => {
  setLoading(true);
  socket.emit("GetResumenAColas", datos);
  socket.on("Response_GetResumenAColas", async function (datos) {
    if (datos.success) {
      setState(datos.data);
      setLoading(false);
    } else {
      notificationError(datos, 2500);
      setState([]);
      setLoading(false);
    }
  });
};
