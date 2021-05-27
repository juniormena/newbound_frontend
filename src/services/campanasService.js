import { socket } from "./socket-common";
import {
  notificationSuccess,
  notificationError,
  notificationSuccessForUpdate,
  ConfirmacionBorrar,
} from "./../lib/helpers";
import { formatDate, formatDate2, excelnumeroAfecha } from "../lib/dateHelpers";
import { toast } from "react-toastify";
import { descargarExcel } from "../lib/exportHelpers";

export const addCampanas = (datos, setloading) => {
  try {
    socket.emit("addCampana", datos);
    socket.on("Res-addCampana", (datos) => {
      setloading(true);
      if (datos.success) {
        notificationSuccess(datos, 2500);
      } else {
        setloading(false);
        notificationError(datos, 2500);
      }
    });
  } catch (error) {
    notificationError({ message: error }, false);
  }
};

export const getCampanasByEmpresa = (datos, setState) => {
  socket.emit("getCampanaByEmpresa", datos);
  socket.on("Res-getCampanaByEmpresa", async function (datos) {
    if (datos.success) {
      setState(datos.data);
    } else {
      setState([]);
    }
  });
};

export const getCampanasSupervisada = (setState, currentCamp) => {
  socket.emit("getCampanasSupervisada", currentCamp);
  socket.on("Res-getCampanasSupervisada", async function (datos) {
    let datosError = [];
    let datosSuccess = [];
    datos.map((e) => {
      if (e.success === false) {
        datosError.push(e.data[0]);
      }
      if (e.success) {
        datosSuccess.push(e.data[0]);
      }
    });

    setState(datosSuccess);
  });
};

export const getCampanaById = (datos, setState) => {
  socket.emit("getcampanaById", datos);
  socket.on("Res-getcampanaById", async function (datos) {
    if (datos.success) {
      setState(datos.data);
    } else {
      setState([]);
    }
  });
};

export const updateCampana = (datos, setLoading) => {
  try {
    setLoading(true);
    socket.emit("updateCampana", datos);
    socket.on("Res-updateCampana", async function (datos) {
      if (datos.success) {
        notificationSuccessForUpdate(datos, 3000, "/callcenter/campanas");
      } else {
        setLoading(false);
        notificationError(datos, 3000);
      }
    });
  } catch (error) {
    notificationError(datos, 8000);
  }
};

export const disableCampana = (id,setloading) => {
  try {
    
    setloading(true);
    socket.emit("disableCampana", id);
    socket.on("Res-disableCampana", async function (datos) {
      if (datos.success) {
        notificationSuccess(datos, 3000);
      } else {
        setloading(false)
        notificationError(datos, 8000);
      }
    });
  } catch (error) {
    //notificationError(datos, 8000);
  }
};

export const getCampanaByFilter = (datos, setState) => {
  socket.emit("getCampanasByFilter", datos);
  socket.on("Res-getCampanasByFilter", async function (datos) {
    if (datos.success) {
      setState(datos.data);
    } else {
      setState([]);
    }
  });
};

export const ImportCampanaRegistros = (datos, campanaData,setloading) => {

  try{
    ConfirmacionBorrar(
      "Importar desde Excel",
      "Esta Seguro que quiere importar estos datos a la Tabla registro?",
      () => {

        datos.map((dato) => {
          dato.codigo_campana = campanaData.id;
          dato.reintentos_actuales = 0;
          dato.formulario_id = null;
          dato.url_externo = null;
          dato.ultimo_acceso =
            dato.ultimo_acceso === null || undefined
              ? null
              : formatDate(excelnumeroAfecha(dato.ultimo_acceso, true));
          dato.reintentos_max =
            dato.reintentos_max === undefined
              ? campanaData.reintentos_max
              : dato.reintentos_max;
          dato.peso = dato.peso === undefined ? campanaData.peso : dato.peso;
          dato.script = dato.script === undefined ? campanaData.script : dato.script;
          dato.llamar_desde =
            dato.llamar_desde === undefined
              ? formatDate(campanaData.fecha_inicio)
              : formatDate(excelnumeroAfecha(dato.llamar_desde, true));
          dato.llamar_hasta =
            dato.llamar_hasta === undefined
              ? formatDate(campanaData.fecha_fin)
              : formatDate(excelnumeroAfecha(dato.llamar_hasta, true));
        });
        setloading(true);
        socket.emit("ImportCampanaRegistros", datos);
        socket.on("Res-ImportCampanaRegistros", async (datos) => {
        
          var datosError = [];
          var datosSuccess = [];

          datos.map((e) => {
            if (e.success === false) {
              e.data[0].contactos=JSON.stringify(e.data[0].contactos)
              datosError.push(e.data[0]);

            }
            if (e.success) {
              datosSuccess.push("Success");
            
            }
          }); 

          if (datosError.length > 0) {
            
          setloading(false);
            toast.error(
              "Clientes Existentes fueron excluidos, verifique documento descargado",
              3000,
              
            );
            descargarExcel("Clientes Excluidos", datosError, "columns");
          }
          if (datosSuccess.length > 0) {
            /* toast.success("Clientes Agregados satisfacctoriamente", {
              autoClose: 3000,
              onClose: () => window.location.reload(),
            }); */

            let message={
              message:"Clientes Agregados satisfacctoriamente"
            }
            notificationSuccessForUpdate(message, 3000, "/callcenter/campanas");
          }

        });
      }
    );
  }catch (error) {
    notificationError(datos, 8000);
  }
  
  

 /*  socket.emit("ImportCampanaRegistros", datos);
  socket.on("Res-ImportCampanaRegistros", async function (datos) {
    var datosError = [];
    var datosSuccess = [];

    console.log(datos);
  }); */
};

export const getCampanaRegistros = (datos, setState) => {
  socket.emit("getRegistroByCampana", datos);
  socket.on("Res-getRegistroByCampana", async function (datos) {
    setState(datos?.data);
  });
};

export const getCampanaRegistrosByFilter = (datos, setState) => {
  socket.emit("getCampanaRegistroByFilter", datos);
  socket.on("Res-getCampanaRegistroByFilter", async function (datos) {
    setState(datos?.data);
  });
};

export const getCampanaEstado = (setState) => {
  socket.emit("getCampanaEstado");
  socket.on("Res-getCampanaEstado", async function (datos) {
    setState(
      datos?.data.map((dato) => ({
        label: dato.nombre,
        value: dato.cod_estado,
      }))
    );
  });
};
export const getCampanaLogs = (datos, setState) => {
  socket.emit("getCampanaLogs", datos);
  socket.on("Res-getCampanaLogs", async function (datos) {
    setState(datos.data);
  });
};

export const getCampanaHistorico = (datos, setState) => {
  socket.emit("getCampanaHistorico", datos);
  socket.on("Res-getCampanaHistorico", async function (datos) {
    setState(datos.data);
  });
};

export const getCampanaRegistrosHistoricoByFilter = (datos, setState) => {
  socket.emit("getCampanaRegistroHistoricoByFilter", datos);
  socket.on("Res-getCampanaRegistroHistoricoByFilter", async function (datos) {
    setState(datos?.data);
  });
};

export const getCampanaRegistoById = (datos, setState) => {
  socket.emit("getCampanaRegistoById", datos);
  socket.on("Res-getCampanaRegistoById", async function (datos) {
    
    setState(datos.data);
  });
};

export const UpdateRegistroCampana = (datos, setLoading) => {
 
  try {
    setLoading(true);
    socket.emit("UpdateRegistroCampana", datos);
    socket.on("Res-UpdateRegistroCampana", async function (datos) {
      if (datos.success) {
        notificationSuccessForUpdate(datos, 3000, "/callcenter/campanas");
      } else {
        setLoading(false);
        notificationError(datos, 3000);
      }
    });
  } catch (error) {
    notificationError(datos, 8000);
  }
};
export const getCampanaLogsRegistroLlamadas = (datos, setState) => {
 

    socket.emit("getCampanaLogsRegistroLlamadas", datos);
    socket.on("Res-getCampanaLogsRegistroLlamadas", async function (datos) {
      
      setState(datos?.data)
    });

};
