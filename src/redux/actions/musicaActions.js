import { musicaTypes } from "./musicaTypes";

export const musicaEliminar = (datos) => {
  return (dispatch) => {
    datos.map((d, index) => {
        d.order = index
   
    });
    dispatch(eliminardeLista(datos));

  };
 
};

const eliminardeLista = (datos) => ({
  type: musicaTypes.musicaEliminar,
  payload: datos,
});


/* export const musicOnHoldinsert =()=>{

  
}

export const musicOnHoldSelect=()=>{
  
} */