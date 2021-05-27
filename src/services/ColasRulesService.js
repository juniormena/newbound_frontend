import { socket } from "./socket-common";
import {
  notificationSuccess,
  notificationError,
  notificationSuccessForUpdate,
} from "./../lib/helpers";

//Insert
export function addColasRule(datos, setLoading) {
  

  try {
    setLoading(true);
    socket.emit("addColaRule", datos);
    socket.on("Res-addColaRule", async function (datos) {
    
    
      if (datos[0].success) {
        notificationSuccess(datos[0], 3000);
      } else {
        notificationError(datos, 2500);
     
        setLoading(false);
      }
    });
  } catch (error) {
    notificationError(datos, 8000);
  }
}

//Select
export const getColasRules = (setState) => {
  socket.emit("getColaRules");
  socket.on("Res-getColaRules", async function (datos) {
    if (datos.success) {
      setState(datos.data);
    }
  });
};

export const getColasByRuleNameAndEmpresa = (datos, setState) => {

  socket.emit("getColaRulesByRuleNameAndEmpresa", datos);
  socket.on("Res-getColaRulesByRuleNameAndEmpresa", async function (datos) {
    if (datos.success) {
      setState(datos.data);
    } else {
      notificationError(datos, 2500);
    }
  });
};

export const getColasByRuleIdAndEmpresa = (datos, setState) => {

  socket.emit("getColaRulesByRuleIdAndEmpresa", datos);
  socket.on("Res-getColaRulesByRuleIdAndEmpresa", async function (datos) {
    if (datos.success) {
      setState(datos.data);
    } else {
      notificationError(datos, 2500);
    }
  });
};


export const getColaRuleListaAgregar = (datos,setRuleExiste) => {

  socket.emit("getColaRuleListaAgregar", datos);
  socket.on("Res-getColaRuleListaAgregar", async function (datos) {
    
    if (datos.success) {
      setRuleExiste(true)
      notificationError(datos, 2500);
   
    } 
    else{
      setRuleExiste(false)
    }
  });
};


export const getColasRuleByEmpresa = (datos, setState) => {
  socket.emit("getColaRulesWithEmpresa", datos);
  socket.on("Res-getColaRulesWithEmpresa", async function (datos) {
    if (datos.success) {
      setState(datos.data);
      //notificationSuccess(datos,3000);
    } /* else {
      notificationError(datos, 2500);
    } */
  });
};

//Update

export const UpdateColasRule = (datos, setLoading) => {
  console.log(datos)

  try {
    setLoading(true);
    socket.emit("updateColaRule", datos);
    socket.on("Res-updateColaRule", async function (datos) {
      console.log(datos)
      if (datos.success) {
        notificationSuccessForUpdate(
          datos,
          3000,
          "/administracion/colas-reglas"
        );
      } else {
        setLoading(false);
        notificationError(datos, 2500);
      }
    });
  } catch (error) {
    notificationError(datos, 8000);
  }
};

export const DisableColaRule= (datos) => {


  socket.emit("disableColaRule", datos);
  socket.on("Res-disableColaRule", async function (datos) {
      console.log(datos)

      if (datos.success) {
        notificationSuccessForUpdate(
          datos,
          3000,
          "/administracion/colas-reglas"
        );
      } else {
        
        notificationError(datos, 2500);
      }
  });

};
