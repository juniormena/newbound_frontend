import { socketApiURL } from "../config.json";
import io from "socket.io-client";
import {notificationError} from "../lib/helpers";


const { token } = localStorage;

const socket = io(socketApiURL, {
  query:{token},
  transports: ["websocket"],
  forceNew: true,
  reconnection: true,
});


const removeAllListeners = (eventName) => {
  socket.removeAllListeners(eventName);
};

const emit = (eventName, data = {}) => {
  socket.emit(eventName, data);
};

const on = (eventName, eventHandler) => {
  removeAllListeners(eventName);

  socket.on(eventName, eventHandler);
};

/*on('disconnect', (reason)=>{
  notificationError({message:`Hemos perdido conexion con el servidor debido a ${reason}` },5000);
});*/

on('connect_error', (error)=>{
  notificationError({message:`No hemos podido conectar con el servidor ${error}` },5000);
});

/*on('reconnect', ()=>{
  window.location.reload();
})*/


const socketService = {
  emit,
  on,
};

export { socketService as socket };
