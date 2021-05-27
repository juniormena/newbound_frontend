import { socket } from "./socket-common";
import {
  notificationSuccess,
  notificationError,
  notificationSuccessForUpdate,
} from "./../lib/helpers";

///Insert
export function addColas(datos, setLoading, anuncio, MemberDataEstatico,MemberDataDinamico) {
  //console.log(MemberData.data)

  let miembrosEstatico = MemberDataEstatico.data;
  let miembrosDinamico = MemberDataDinamico.data
  //console.log(miembros)

  if (anuncio.data.length > 0) {
    datos.periodic_announce = anuncio.data.toString();
  }
  try {
    setLoading(true);
    socket.emit("addCola", { datos,miembrosEstatico,miembrosDinamico});
    socket.on("Res-addCola", async function (datos) {
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

///--------------Selects
export const ColasSelectAll = (setData) => {
  socket.emit("getColas");
  socket.on("Res-getColas", async function (datos) {
    setData(datos.data);
  });
};

export const ColasStrategy = (setDato) => {
  socket.emit("getStrategyValues");
  socket.on("Res-getStrategyValues", async function (datos) {
    setDato(datos.data);
  });
};

export const GetColasByEmpresa = (empresa_id, setData) => {
  
  socket.emit("getColasWithEmpresaByEmpresa", empresa_id);
  socket.on("Res-getColasWithEmpresaByEmpresa", async function (datos) {
    setData(datos?.data);
  });
};

/* export const GetColasByEmpresaForSelect = (empresa_id, setData) => {
 
  socket.emit("getColasWithEmpresaByEmpresa", empresa_id);
  socket.on("Res-getColasWithEmpresaByEmpresa", async function (datos) {
    setData(datos)

    setData(
      datos.data?.map((data) => ({
        value: data.name,
        label: data.nombre,
      }))
    );
   
  });
}; */
export const GetColasWithEmpresaByNameandEmpresa = (datos, setData) => {
  //console.log(datos)
  socket.emit("getColasWithEmpresaByNameandEmpresa", datos);
  socket.on("Res-getColasWithEmpresaByNameandEmpresa", async function (datos) {
    setData(datos.data);
  });
};

export const DisableCola = (datos) => {
  socket.emit("disableCola", datos);
  socket.on("Res-disableCola", async function (datos) {
    console.log(datos);

    if (datos.success) {
      notificationSuccessForUpdate(datos, 3000, "/administracion/colas");
    } else {
      notificationError(datos, 2500);
    }
  });
};

///Update
export const UpdateColas = (datos, setLoading, anuncio) => {
  //console.log(datos)
  datos.periodic_announce = `${
    datos.periodic_announce
  },${anuncio.data.toString()}`;

  if (anuncio.data.length > 0) {
    datos.periodic_announce = anuncio.data.toString();
  }
  console.log(datos);
  try {
    socket.emit("updateCola", datos);
    socket.on("Res-updateCola", async function (datos) {
      setLoading(true);
      console.log(datos);
      if (datos.success) {
        notificationSuccessForUpdate(datos, 3000, "/administracion/colas");
      } else {
        notificationError(datos, 2500);
        setLoading(false);
      }
    });
  } catch (error) {
    notificationError(datos, 8000);
  }
};

//----------------------------------------------Extras

export const GrabacionesParaCola = (datos, setState) => {
  socket.emit("NewBound_Select_Grabaciones", datos);
  socket.on("Response_NewBound_Select_Grabaciones", async function (datos) {
    setState(
      datos.data?.map((grabacion) => ({
        value: grabacion.id,
        label: grabacion.name,
      }))
    );
  });
};

export function getUsuarios(setState, currentUser) {
  console.error(currentUser.departamentos_supervision);
  //console.log(currentUser)
  socket.emit("getUsuarioWithExtension", currentUser.departamentos_supervision);

  socket.on("Res-getUsuarioWithExtension", async function (datos) {
    if (datos.success) {
      setState(
        datos.data?.map((usuario) => ({
          value: usuario.u_id,
          label: usuario.u_nombre_completo,
          extension: usuario.u_extensiones,
        }))
      );
      //console.log(datos.data, "usuarios");
    }
  });
}

export function getUsuariosByDepertamentoEstaticos(setState, currentUser) {
  socket.emit(
    "getUsuarioByDepEstaticos",
    currentUser.departamentos_supervision
  );

  socket.on("Res-getUsuarioByDepEstaticos", async function (datos) {
 
    if (datos.success) {
      setState(
        datos.data?.flat()?.map((usuario) => ({
          value: usuario.u_id,
          label: usuario.u_nombre_completo,
          extension: usuario.u_extensiones,
        }))
      );
    } else {
      setState([]);
    }
  });
}

export function getUsuariosByDepertamentoDinamicos(setState, currentUser) {
  socket.emit("getUsuarioDinamico", currentUser.departamentos_supervision);

  socket.on("Res-getUsuarioDinamico", async function (datos) {
 console.log( datos)
    if (datos.success) {
      setState(
        datos.data?.flat()?.map((usuario) => ({
          value: usuario.u_id,
          label: usuario.u_nombre_completo,
          extension: usuario.u_extensiones,
        }))
      );
    } else {
      setState([]);
    }
  });
}
