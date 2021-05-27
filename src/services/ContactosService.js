import { socket } from "./socket-common";
import {
  notificationSuccess,
  notificationError,
  notificationSuccessForUpdate,
  ConfirmacionGuardar,
  ConfirmacionBorrar,
} from "./../lib/helpers";
import { toast } from "react-toastify";
import { descargarExcel } from "../lib/exportHelpers";

//Add Conctacts
export const addCOntacto = (datos, setLoading) => {
  try {
    setLoading(true);
    socket.emit("addContactos", datos);
    socket.on("Res-addContactos", async (datos) => {
  

      if (datos.success) {
        notificationSuccess(datos, 3000);
      } else {
        notificationError(datos, 2500);
        setLoading(false);
      }
    });
  } catch (error) {
    notificationError(datos, 8000);
  }
};

export const addCOntactoaddContactosSuperUsuario = (datos, setLoading) => {
  try {
    setLoading(true);
    socket.emit("addContactosSuperUsuario", datos);
    socket.on("Res-addContactosSuperUsuario", async (datos) => {
      console.log(datos);

      if (datos.success) {
        notificationSuccess(datos, 3000);
      } else {
        notificationError(datos, 2500);
        setLoading(false);
      }
    });
  } catch (error) {
    notificationError(datos, 8000);
  }
}
export const importContactosSuperusuario = (datos, id_empresa, usuario,setloading) => {
  try {
    ConfirmacionBorrar(
      "Importar desde Excel",
      "Esta Seguro que quiere importar estos datos a la Tabla contactos?",
      () => {
        datos.map((data) => {
          data.cod_empresa = id_empresa;
          data.usuario = usuario;
          return data;
        });
        setloading(true)
        socket.emit("importContactosSuperUsuario", datos);
        socket.on("Res-importContactosSuperUsuario", async (datos) => {
         /*  console.log(datos) */
          var datosError = [];
          var datosSuccess = [];
          datos.map((e) => {
            if (e.success === false) {
              datosError.push(e.data[0]);
    
            }
            if (e.success) {
              datosSuccess.push("Success");
            
            }
          });

          if (datosError.length > 0) {
         
            toast.error(
              "Contactos Existentes fueron excluidos, verifique documento descargado",
              3000,
              
            );
            descargarExcel("Contactos Excluidos", datosError, "columns");
          }
          if (datosSuccess.length > 0) {

            let message={
              message:"Contactos Agregados satisfacctoriamente"
            }
            notificationSuccessForUpdate(
              message,
              3000,
              "/callcenter/contactos"
            );
            /* notificationSuccessForUpdate(message,) */
           /*  toast.success("Contactos Agregados satisfacctoriamente", {
              autoClose: 3000,
              onClose: () => window.location.reload(),
            });
             */
          }
        });
      }
    );
  } catch (error) {
    notificationError(datos, 8000);
  }
};

export const importContactos= (datos, id_empresa, usuario,setloading) => {
  try {
    ConfirmacionBorrar(
      "Importar desde Excel",
      "Esta Seguro que quiere importar estos datos a la Tabla contactos?",
      () => {
        datos.map((data) => {
          data.cod_empresa = id_empresa;
          data.usuario = usuario;
          return data;
        });
        setloading(true)
        socket.emit("importContactos", datos);
        socket.on("Res-importContactos", async (datos) => {
         /*  console.log(datos) */
          var datosError = [];
          var datosSuccess = [];
          datos.map((e) => {
            if (e.success === false) {
              datosError.push(e.data[0]);
              setloading(false)
            }
            if (e.success) {
              datosSuccess.push("Success");
            
            }
          });

          if (datosError.length > 0) {
            toast.error(
              "Contactos Existentes fueron excluidos, verifique documento descargado",
              3000,
              
            );
            descargarExcel("Contactos Excluidos", datosError, "columns");
          }
          if (datosSuccess.length > 0) {
            toast.success("Contactos Agreados satisfacctoriamente", {
              autoClose: 3000,
              onClose: () => window.location.reload(),
            });
            
          }
        });
      }
    );
  } catch (error) {
    notificationError(datos, 8000);
  }
};

//Get All Contacts
export const getContactos = (setState) => {
  socket.emit("getContactos");
  socket.on("Res-getContactos", async function (datos) {
    if (datos.success) {
      setState(datos.data);
    } else {
      notificationError(datos, 8000);
    }
  });
};

//Get Contacts by Id
export const getContactosByID = (datos, setState) => {
  try {
    socket.emit("getContactosByID", datos);
    socket.on("Res-getContactosByID", async function (datos) {
      if (datos.success) {
        setState(datos.data);
      } else {
        notificationError(datos, 8000);
      }
    });
  } catch (error) {
    notificationError(datos, 8000);
  }
};

//Get Contactos by Empresa
export const getContactosByEmpresa = (datos, setState) => {
  try {
    socket.emit("getContactosByEmpresa", datos);
    socket.on("Res-getContactosByEmpresa", async function (datos) {
      setState(datos.data);
    });
  } catch (error) {
    notificationError(datos, 8000);
  }
};

//Get Contactos by Filter
export const getContactosByFilter = (datos, setState) => {
  try {
    socket.emit("getContactosByFilters", datos);
    socket.on("Res-getContactosByFilters", async function (datos) {
      if (datos.success) {
        setState(datos.data);
      } else {
        notificationError(datos, 8000);
      }
    });
  } catch (error) {
    notificationError(datos, 8000);
  }
};
//Get Contactos by Filter and Empresa
export const getContactosByFiltersandEmpresa = (datos, setState) => {
  try {
    socket.emit("getContactosByFiltersandEmpresa", datos);
    socket.on("Res-getContactosByFiltersandEmpresa", async function (datos) {
      if (datos.success) {
        setState(datos.data);
      } else {
        notificationError(datos, 8000);
      }
    });
  } catch (error) {
    notificationError(datos, 8000);
  }
};

//Update Contactos
export const updateContactos = (datos, setLoading) => {
  socket.emit("updateContactos", datos);
  socket.on("Res-updateContactos", async function (datos) {
    setLoading(true);
    if (datos.success) {
      notificationSuccessForUpdate(datos, 3000, "/callcenter/contactos");
    } else {
      notificationError(datos, 2500);
      setLoading(false);
    }
  });
};
export const updateContactosSuperUser = (datos, setLoading) => {
 try {
  socket.emit("updateContactosSuperUser", datos);
  socket.on("Res-updateContactosSuperUser", async function (datos) {
    
    setLoading(true);
    if (datos.success) {
      notificationSuccessForUpdate(datos, 3000, "/callcenter/contactos");
    } else {
      notificationError(datos, 2500);
      setLoading(false);
    }
  });
 } catch (error) {
  notificationError(datos, 2500);
 }
};

//Disable
export const disableContactos = (datos) => {
  try {
    socket.emit("disableContactos", datos);
    socket.on("Res-disableContactos", async function (datos) {
      if (datos.success) {
        notificationSuccess(datos, 3000);
      } else {
        notificationError(datos, 8000);
      }
    });
  } catch (error) {
    notificationError(datos, 8000);
  }
};
