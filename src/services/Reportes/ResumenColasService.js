import { socket } from "../socket-common";
import {
  notificationError,
} from "../../lib/helpers";

export const getResumenColasByFilters = (datos, setData, setLoading) => {
  setLoading(true);
  socket.emit("getResumenColasByFilters", datos);
  socket.on("Res-getResumenColasByFilters", async function (datos) {
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
