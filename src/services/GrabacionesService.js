import { socket } from "./socket-common";
import {
  notificationSuccess,
  notificationError,
  notificationSuccessForUpdate,
} from "./../lib/helpers";

///Insert
export function addGrabaciones(datos,setLoading) {
  try {
    setLoading(true)

    socket.emit("NewBound_Insert_Grabaciones", datos);
    socket.on("Response_NewBound_Insert_Grabaciones", async function (datos) {
      console.log(datos);
      if(datos.success){
        notificationSuccess(datos,3000);
    }
    else{
        notificationError(datos,2500);
      
    }
    });
  } catch (error) {
    notificationError(datos, 8000);
  }
}

///Select
export const GrabacionesSelectAll = (datos,setData,) => {


  socket.emit("NewBound_Select_Grabaciones",datos);
  socket.on("Response_NewBound_Select_Grabaciones", async function (datos) {
    setData(datos.data);
 
  });
};

///SelectByCancion
export const GrabacionesSelectByAudio= (datos,setData) => {

  socket.emit("NewBound_Select_GrabacionesByAudio",datos);
  socket.on("Response_NewBound_Select_GrabacionesByAudio", async function (datos) {

    
  setData(datos.data)

  
  });
};

///Delete
export const DeleteGrabaciones = (data) => {

  
  socket.emit("NewBound_Delete_Grabaciones", data);
  socket.on("Response_NewBound_Delete_Grabaciones", async function (datos) {
    if(datos.false){
      notificationError(datos,8000);
  }

  });
};

///Update
export const UpdateGrabaciones = (datos,setLoading) => {
  setLoading(true)

  try {
        
      socket.emit("NewBound_Update_Grabaciones",datos);
      socket.on(
        "Response_NewBound_Update_Grabaciones",
        async function (datos) {

          if(datos.success){
           notificationSuccessForUpdate(datos,3000,"/administracion/grabaciones");
      
        }
        else{
            notificationError(datos,2500);
          
        }
        
        
        }
      ); 
  } catch (error) {
    notificationError(datos, 8000);
  }
};
