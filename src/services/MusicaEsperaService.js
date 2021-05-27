import { socket } from "./socket-common";
import {
  notificationSuccess,
  notificationError,
  notificationSuccessForUpdate,
} from "./../lib/helpers";

///Insert
export function addMusicaEspera(datos,setLoading) {
  console.log(datos)
  try {
    setLoading(true)
    datos.playlist.map((cancion, index) => {
      cancion.position = index + 1;
    });
   

    socket.emit("NewBound_Insert_Music_On_Hold", datos);
    socket.on("Response_NewBound_Insert_Music_On_Hold", async function (datos) {
      notificationSuccess(datos,3000); 
      
    });
   
  } catch (error) {
    /* notificationError(datos, 8000); */
  }
}

///Select
export const musicOnHoldSelect = (datos,setData) => {

  socket.emit("NewBound_Select_Music_On_Hold",datos);
  socket.on("Response_NewBound_Select_Music_On_Hold", async function (datos) {
     setData(datos) 
  });
};
///SelectByCarpeta
export const musicOnHoldSelectByCarpeta = (carpetaNombre,setData) => {

  socket.emit("NewBound_Select_Music_On_HoldByCarpeta",carpetaNombre);
  socket.on("Response_NewBound_Select_Music_On_HoldByCarpeta", async function (datos) {

    
  setData(datos.data)

  
  });
};

///Select Modes
export const musicOnHoldSelectTypes = (setModes) => {
  socket.emit("NewBound_Select_Music_On_Hold_Types_Mode");
  socket.on(
    "Response_NewBound_Select_Music_On_Hold_Types_Mode",
    async function (datos) {
      setModes(datos.data);
    }
  );
};

///SDelete
export const DeleteMusicOnHold = (data) => {
/*   console.log(data) */


 socket.emit("NewBound_Delete_Music_On_Hold",data);
  socket.on(
    "Response_NewBound_Delete_Music_On_Hold",
    async function (datos) {
      console.log(datos)
    }
  ); 
};


///Update
export const UpdateMusicOnHold = (datos,datosCarpeta,setLoading) => {
  try {
   /*  console.log(datosCarpeta.length) */
      setLoading(true)
 
      datos.playlist.map((cancion, index) => {
        cancion.position = datosCarpeta.length + index+ 1
      });  


      const nombre=datosCarpeta[0].name
      const emp_id=datosCarpeta[0].empresa_id

     
  
      socket.emit("NewBound_Update_Music_On_Hold",datos);
      socket.on(
        "Response_NewBound_Update_Music_On_Hold",
        async function (datos) {
        notificationSuccessForUpdate(datos,3000,"/administracion/musicaespera");
        }
      ); 
     
    } catch (error) {
     notificationError(datos, 8000);
    }
   
  };
  