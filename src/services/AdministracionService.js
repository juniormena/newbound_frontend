import { socket } from "./socket-common";
import {
  notificationSuccess,
  notificationError,
  notificationSuccessForUpdate,
  notificationSuccessNoReload,
} from "../lib/helpers";

export function addEmpresa(e, datos, setLoading) {
  try {
    e.preventDefault();
    setLoading(true);
    socket.emit("addEmpresa", datos);

    socket.on("Res-addEmpresa", async function (datos) {
      if (datos.success) {
        notificationSuccess(datos, 3000);
      } else {
        notificationError(datos, 8000);
        setLoading(false);
      }
    });
  } catch (error) {
    notificationError(datos, false);
  }
}

export function updateEmpresa(e, datos, setLoading) {
  try {
    e.preventDefault();
    setLoading(true);
    socket.emit("updateEmpresa", datos);

    socket.on("Res-updateEmpresa", async function (datos) {
      if (datos.success) {
        notificationSuccessForUpdate(datos, 3000, "/administracion/empresa");
      } else {
        notificationError(datos, 8000);
        setLoading(false);
      }
    });
  } catch (error) {
    notificationError(datos, false);
  }
}

export function getEmpresa(setState) {
  socket.emit("GetEmpresa");

  socket.on("Res-GetEmpresa", async function (datos) {
    if (datos.success) {
      setState(datos.data);
    }
  });
}

export function getEmpresaById(Id, setState) {
  socket.emit("GetEmpresaById", Id);

  socket.on("Res-GetEmpresaById", async function (datos) {
    if (datos.success) {
      setState(datos.data);
    } else {
      setState(datos.data);
    }
  });
}

export function addSucursalEmpresa(e, datos, setLoading) {
  try {
    e.preventDefault();
    setLoading(true);
    socket.emit("addEmpresaSucursal", datos);

    socket.on("Res-addEmpresaSucursal", async function (datos) {
      if (datos.success) {
        notificationSuccess(datos, 3000);
      } else {
        notificationError(datos, 8000);
        setLoading(false);
      }
    });
  } catch (error) {
    notificationError(datos, false);
  }
}

export function updateSucursalEmpresa(e, datos, setLoading) {
  try {
    e.preventDefault();
    setLoading(true);
    socket.emit("updateEmpresaSucursal", datos);

    socket.on("Res-updateEmpresaSucursal", async function (datos) {
      if (datos.success) {
        notificationSuccessForUpdate(datos, 3000, "/administracion/sucursal");
      } else {
        notificationError(datos, 8000);
        setLoading(false);
      }
    });
  } catch (error) {
    notificationError(datos, false);
  }
}

export function getEmpresaSucursales(setState) {
  socket.emit("GetEmpresaSucursal");

  socket.on("Res-GetEmpresaSucursal", async function (datos) {
    if (datos.success) {
      setState(datos.data);
    }
  });
}

export function getEmpresaSucursalesById(Id, setState) {
  socket.emit("GetEmpresaSucursalById", Id);

  socket.on("Res-GetEmpresaSucursalById", async function (datos) {
    if (datos.success) {
      setState(datos.data);
    }
  });
}

export function getEmpresaSucursalesByEmpresa(Id, setState) {
  socket.emit("GetEmpresaSucursalByEmpresa", Id);

  socket.on("Res-GetEmpresaSucursalByEmpresa", async function (datos) {
    if (datos.success) {
      setState(datos.data);
    } else {
      setState(datos.data);
    }
  });
}

export function getEmpresaSucursalesWithEmpresaName(setState) {
  socket.emit("GetEmpresaSucursalWithEmpresaName");

  socket.on("Res-GetEmpresaSucursalWithEmpresaName", async function (datos) {
    if (datos.success) {
      setState(datos.data);
    }
  });
}

export function addSucursalDepartamento(e, datos, setLoading) {
  try {
    e.preventDefault();
    setLoading(true);
    socket.emit("addSurcusalDepartamento", datos);

    socket.on("Res-addSurcusalDepartamento", async function (datos) {
      if (datos.success) {
        notificationSuccess(datos, 3000);
      } else {
        notificationError(datos, 8000);
        setLoading(false);
      }
    });
  } catch (error) {
    notificationError(datos, false);
  }
}

export function updateSucursalDepartamento(e, datos, setLoading) {
  try {
    e.preventDefault();
    setLoading(true);
    socket.emit("updateSurcusalDepartamento", datos);

    socket.on("Res-updateSurcusalDepartamento", async function (datos) {
      if (datos.success) {
        notificationSuccessForUpdate(
          datos,
          3000,
          "/administracion/departamento"
        );
      } else {
        notificationError(datos, 8000);
        setLoading(false);
      }
    });
  } catch (error) {
    notificationError(datos, false);
  }
}

export function getDepartamentosSucursalWithSucursalName(setState) {
  socket.emit("GetDepartamentosSucursalWithSucusalName");

  socket.on("Res-GetEmpresaSucursalWithSucursalName", async function (datos) {
    if (datos.success) {
      setState(datos.data);
    }
  });
}

export function getDepartamentoSucursalById(Id, setState) {
  socket.emit("GetDepartamentosSucursalById", Id);

  socket.on("Res-GetDepartamentoSucursalById", async function (datos) {
    if (datos.success) {
      setState(datos.data);
    } else {
      setState(datos.data);
    }
  });
}

export function getDepartamentosSucursalWithSucursalNameById(Id, setState) {
  socket.emit("GetDepartamentosSucursalWithSucursalNameById", Id);

  socket.on(
    "Res-GetEmpresaSucursalWithSucursalNameById",
    async function (datos) {
      if (datos.success) {
        setState(datos.data);
      }
    }
  );
}

export function getDepartamentosSucursalBySucursal(Id, setState) {
  socket.emit("GetDepartamentosSucursalBySucursal", Id);

  socket.on("Res-GetDepartamentosSucursalBySucursal", async function (datos) {
    if (datos.success) {
      setState(datos.data);
    } else {
      setState(datos.data);
    }
  });
}

export function getDepartamentosSucursalBySucursal2(Id, setState) {
  socket.emit("GetDepartamentosSucursalBySucursal", Id);

  socket.on("Res-GetDepartamentosSucursalBySucursal", async function (datos) {
    if (datos.success) {
      setState(datos.data);
    } else {
      setState(datos.data);
    }
  });
}

export function addPerfil(
  e,
  datos,
  setLoading,
  empresaid,
  setState,
  setPerfil
) {
  try {
    e.preventDefault();
    setLoading(true);
    socket.emit("addPerfil", datos);

    socket.on("Res-addPerfil", async function (datos) {
      /*console.log(datos)*/
      /*console.log(datos.success)*/
      if (datos.success) {
        notificationSuccessNoReload(datos, 3000);
        setLoading(false);
        getEmpresaPerfilByEmpresa(empresaid, setState);
        setPerfil((prevPerfil) => ({
          p_usuario_ing: prevPerfil.p_terminal_ing,
          p_terminal_ing: prevPerfil.p_terminal_ing,
          p_descripcion: "",
          p_id_empresa: prevPerfil.p_id_empresa,
        }));
      } else {
        notificationError(datos, 8000);
        setLoading(false);
      }
    });
  } catch (error) {
    notificationError(datos, false);
  }
}

export function getPerfiles(setState) {
  socket.emit("GetPerfil");

  socket.on("Res-GetPerfil", async function (datos) {
    if (datos.success) {
      setState(datos.data);
    }
  });
}

export function getPerfilById(Id, setState) {
  socket.emit("GetPerfilById", Id);

  socket.on("Res-GetPerfilById", async function (datos) {
    if (datos.success) {
      setState(datos.data);
    }
  });
}

export function getPerfilWithEmpresaById(Id, setState) {
  socket.emit("GetPerfilWithEmpresaById", Id);

  socket.on("Res-GetPerfilWithEmpresaById", async function (datos) {
    if (datos.success) {
      setState(datos.data);
    }
  });
}

export function getPerfilByEmpresa(Id, setState) {
  socket.emit("GetPerfilByEmpresa", Id);

  socket.on("Res-GetPerfilByEmpresa", async function (datos) {
    if (datos.success) {
      setState(datos.data);
    }
  });
}

export function addEmpresaPerfil(e, datos) {
  try {
    e.preventDefault();
    //setLoading(true)
    socket.emit("addEmpresaPerfil", datos);

    socket.on("Res-addEmpresaPerfil", async function (datos) {
      /*console.log(datos)*/
      /*console.log(datos.success)*/
      if (datos.success) {
        notificationSuccessNoReload(datos, 3000);
      } else {
        notificationError(datos, 8000);
        //setLoading(false)
      }
    });
  } catch (error) {
    notificationError(datos, false);
  }
}

export function getEmpresaPerfilwithPerfilAndEmpresa(setState) {
  socket.emit("GetEmpresaPerfilwithPerfilAndEmpresa");

  socket.on("Res-GetEmpresaPerfilwithPerfilAndEmpresa", async function (datos) {
    if (datos.success) {
      setState(datos.data);
    }
  });
}

export function getEmpresaPerfilByPerfil(Id, setState) {
  socket.emit("GetEmpresaPerfilByPerfil", Id);

  socket.on("Res-GetEmpresaPerfilByPerfil", async function (datos) {
    if (datos.success) {
      setState(datos.data);
    }
  });
}

export function getEmpresaPerfilByEmpresa(Id, setState) {
  socket.emit("GetEmpresaPerfilByEmpresa", Id);

  socket.on("Res-GetEmpresaPerfilByEmpresa", async function (datos) {
    if (datos.success) {
      setState(datos.data);
    } else if (!datos.success) {
      setState(datos.data);
    }
  });
}

export function getEmpresaPerfilwithPerfilAndEmpresaById(Id, setState) {
  socket.emit("GetEmpresaPerfilWithPerfilAndEmpresaById", Id);

  socket.on(
    "Res-GetEmpresaPerfilWithPerfilAndEmpresaById",
    async function (datos) {
      if (datos.success) {
        setState(datos.data);
      }
    }
  );
}

export function addMenu(e, datos, setLoading) {
  try {
    e.preventDefault();
    setLoading(true);
    socket.emit("addMenu", datos);

    socket.on("Res-addMenu", async function (datos) {
      /*console.log(datos)*/
      /*console.log(datos.success)*/
      if (datos.success) {
        notificationSuccess(datos, 3000);
      } else {
        notificationError(datos, 8000);
        setLoading(false);
      }
    });
  } catch (error) {
    notificationError(datos, false);
  }
}

export function getMenus(setState) {
  socket.emit("GetMenus");

  socket.on("Res-GetMenus", async function (datos) {
    if (datos.success) {
      setState(datos.data);
    }
  });
}

export function getMenuById(Id, setState) {
  socket.emit("GetMenuById", { Id });

  socket.on("Res-GetMenuById", async function (datos) {
    if (datos.success) {
      setState(datos.data);
    }
  });
}

export function getMenuByTipoMenu(tipoMenu, arrayOfPermission) {
  socket.emit("GetMenuByTipoMenu", { tipoMenu });

  socket.on("Res-GetMenuByTipoMenu", async function (datos) {
    if (datos.success) {
      for (let i = 0; i < datos.data.length; i++) {
        arrayOfPermission.push(datos.data[i].m_nombre);
      }
    }
  });
}

export function getMenuWithEmpresa(setState) {
  socket.emit("GetMenuWithEmpresa");

  socket.on("Res-GetMenuWithEmpresa", async function (datos) {
    if (datos.success) {
      setState(datos.data);
    }
  });
}

export function getMenuWithEmpresaByEmpresa(Id, setState) {
  socket.emit("GetMenuWithEmpresaByEmpresa", Id);

  socket.on("Res-GetMenuWithEmpresaByEmpresa", async function (datos) {
    if (datos.success) {
      setState(datos.data);
    } else {
      setState([]);
    }
  });
}

export function getOnlyMenuWithEmpresaByEmpresa(Id, setState) {
  socket.emit("GetOnlyMenuWithEmpresaByEmpresa", { Id });

  socket.on("Res-GetMenuOnlyWithEmpresaByEmpresa", async function (datos) {
    if (datos.success) {
      setState(datos.data);
    } else {
      setState([]);
    }
  });
}

export function addMenuPerfil(datos, setLoading, setMenusPerfil, perfilid) {
  try {
    setLoading(true);
    socket.emit("addMenuPerfil", datos);

    socket.on("Res-addMenuPerfil", async function (datos) {
      /*console.log(datos)*/
      /*console.log(datos.success)*/
      if (datos.success) {
        notificationSuccessNoReload(datos, 2500);
        setLoading(false);
        getMenuPerfilwithPerfilAndMenuByPerfil(perfilid, setMenusPerfil);
      } else {
        notificationError(datos, 8000);
        setLoading(false);
      }
    });
  } catch (error) {
    notificationError(datos, false);
  }
}

export function getMenusPerfil(setState) {
  socket.emit("GetMenusPerfil");

  socket.on("Res-GetMenusPerfil", async function (datos) {
    if (datos.success) {
      setState(datos.data);
    }
  });
}

export function getMenuPerfilbyId(Id, setState) {
  socket.emit("GetMenuPerfilById", Id);

  socket.on("Res-GetMenuPerfilById", async function (datos) {
    if (datos.success) {
      setState(datos.data);
    } else {
      setState([]);
    }
  });
}

export function getMenuPerfilWithPerfilAndMenu(setState) {
  socket.emit("GetMenuPerfilWithPerfilAndMenu");

  socket.on("Res-GetMenuPerfilWithPerfilAndMenu", async function (datos) {
    if (datos.success) {
      setState(datos.data);
    } else {
      setState([]);
    }
  });
}

export function getMenuPerfilwithPerfilAndMenuById(Id, setState) {
  socket.emit("GetMenuPerfilWithPerfilAndMenuById", Id);

  socket.on("Res-GetMenuPerfilWithPerfilAndMenuById", async function (datos) {
    if (datos.success) {
      setState(datos.data);
    } else {
      setState([]);
    }
  });
}

export function getMenuPerfilwithPerfilAndMenuByPerfil(Id, setState) {
  socket.emit("GetMenuPerfilWithPerfilAndMenuByPerfil", Id);

  socket.on(
    "Res-GetMenuPerfilWithPerfilAndMenuByPerfil",
    async function (datos) {
      if (datos.success) {
        setState(datos.data);
      } else {
        setState([]);
      }
    }
  );
}

export function getMenuPerfilwithPerfilAndMenuByMenu(Id, setState) {
  socket.emit("GetMenuPerfilWithPerfilAndMenuByMenu", Id);

  socket.on("Res-GetMenuPerfilWithPerfilAndMenuByMenu", async function (datos) {
    if (datos.success) {
      setState(datos.data);
    } else {
      setState([]);
    }
  });
}

export function deleteMenuPerfilById(Id, setLoading, setMenusPerfil, perfilid) {
  try {
    setLoading(true);
    socket.emit("DeleteMenuPerfilById", Id);

    socket.on("Res-DeleteMenuPerfilById", async function (datos) {
      /*console.log(datos)*/
      /*console.log(datos.success)*/
      if (datos.success) {
        notificationSuccessNoReload(datos, 2500);
        setLoading(false);
        getMenuPerfilwithPerfilAndMenuByPerfil(perfilid, setMenusPerfil);
      } else {
        notificationError(datos, 8000);
        setLoading(false);
      }
    });
  } catch (error) {
    alert(error);
  }
}

export function addUsuario(e, datos, setLoading) {
  try {
    e.preventDefault();
    setLoading(true);
    socket.emit("addUsuario", datos);

    socket.on("Res-addUsuario", async function (datos) {
      /*console.log(datos)*/
      /*console.log(datos.success)*/
      if (datos.success) {
        notificationSuccess(datos, 3000);
      } else {
        notificationError(datos, 8000);
        console.log(datos);
        setLoading(false);
      }
    });
  } catch (error) {
    notificationError({ message: error }, false);
  }
}

export function updateUsuario(e, datos, setLoading) {
  try {
    setLoading(true);
    e.preventDefault();
    socket.emit("updateUsuario", datos);

    socket.on("Res-updateUsuario", async function (datos) {
      /*console.log(datos)*/
      /*console.log(datos.success)*/
      if (datos.success) {
        notificationSuccessForUpdate(datos, 5000, "/administracion/usuario");
      } else {
        notificationError(datos, 8000);
        setLoading(false);
      }
    });
  } catch (error) {
    notificationError({ message: error }, false);
  }
}

export function getUsuario(setState) {
  socket.emit("GetUsuario");

  socket.on("Res-GetUsuario", async function (datos) {
    if (datos.success) {
      setState(datos.data);
    } else {
      setState(datos.data);
    }
  });
}

export function getUsuarioForEstadoAgente(setState) {
  socket.emit("GetUsuarioForEstadoAgente");

  socket.on("Res-GetUsuarioForEstadoAgente", async function (datos) {
    if (datos.success) {
      setState(datos.data);
    } else {
      setState(datos.data);
    }
  });
}

export function getUsuarioById(Id, setState) {
  socket.emit("GetUsuarioById", Id);

  socket.on("Res-GetUsuarioById", async function (datos) {
    if (datos.success) {
      setState(datos.data);
    } else {
      setState(datos.data);
    }
  });
}

export function getUsuarioByEmpresa(Id, setState) {
  socket.emit("GetUsuarioByEmpresa", Id);

  socket.on("Res-GetUsuarioByEmpresa", async function (datos) {
    if (datos.success) {
      setState(datos.data);
    } else {
      setState(datos.data);
    }
  });
}

export function getUsuarioAllData(setState) {
  socket.emit("GetUsuarioAllData");

  socket.on("Res-GetUsuarioAllData", async function (datos) {
    if (datos.success) {
      setState(datos.data);
    } else {
      setState(datos.data);
    }
  });
}

export function getUsuarioAllDataByDep(setState, currentUser) {
  socket.emit("GetUsuarioAllDataByDep", currentUser.departamentos_supervision);

  socket.on("Res-GetUsuarioAllDataByDep", async function (datos) {
    if (datos.success) {
      setState(datos.data);
    } else {
      setState(datos.data);
    }
  });
}

export function getUsuarioAllDataById(Id, setState) {
  socket.emit("GetUsuarioAllDataById", Id);

  socket.on("Res-GetUsuarioAllDataById", async function (datos) {
    if (datos.success) {
      setState(datos.data);
    } else {
      setState(datos.data);
    }
  });
}

export function getUsuarioAllDataByPerfil(Id, setState) {
  socket.emit("GetUsuarioAllDataByPerfil", Id);

  socket.on("Res-GetUsuarioAllDataByPerfil", async function (datos) {
    if (datos.success) {
      setState(datos.data);
    } else {
      setState(datos.data);
    }
  });
}

export function getMenusUsuarios(setState) {
  socket.emit("GetMenuUsuarios");

  socket.on("Res-GetMenuUsuarios", async function (datos) {
    if (datos.success) {
      setState(datos.data);
    } else {
      setState(datos.data);
    }
  });
}

export function getMenuUsuarioById(Id, setState) {
  socket.emit("GetMenuUsuarioById", Id);

  socket.on("Res-GetMenuUsuarioById", async function (datos) {
    if (datos.success) {
      setState(datos.data);
    } else {
      setState(datos.data);
    }
  });
}

export function getMenuUsuarioByUser(Id, setState) {
  socket.emit("GetMenuUsuarioByUser", Id);

  socket.on("Res-GetMenuUsuarioByUser", async function (datos) {
    if (datos.success) {
      setState(datos.data);
    } else {
      setState(datos.data);
    }
  });
}

export function getMenuUsuarioAllData(Id, setState) {
  socket.emit("GetMenuUsuarioAllData", Id);

  socket.on("Res-GetMenuUsuarioAllData", async function (datos) {
    if (datos.success) {
      setState(datos.data);
    } else {
      setState(datos.data);
    }
  });
}

export function getMenuUsuarioAllDataByPerfil(Id, setState) {
  socket.emit("GetMenuUsuarioAllDataByPerfil", Id);

  socket.on("Res-GetMenuUsuarioAllDataByPerfil", async function (datos) {
    if (datos.success) {
      setState(datos.data);
    } else {
      setState(datos.data);
    }
  });
}

export function getMenuUsuarioAllDataByUsuario(Id, setState) {
  socket.emit("GetMenuUsuarioAllDataByUsuario", Id);

  socket.on("Res-GetMenuUsuarioAllDataByUsuario", async function (datos) {
    if (datos.success) {
      setState(datos.data);
    } else {
      setState(datos.data);
    }
  });
}

export function getMenuUsuarioAllDataByMenu(Id, setState) {
  socket.emit("GetMenuUsuarioAllDataByMenu", Id);

  socket.on("Res-GetMenuUsuarioAllDataByMenu", async function (datos) {
    if (datos.success) {
      setState(datos.data);
    } else {
      setState(datos.data);
    }
  });
}

export function addMenuUsuario(datos, setLoading, usuarioid, setMenusUsuario) {
  try {
    setLoading(true);
    socket.emit("addMenuUsuario", datos);

    socket.on("Res-addMenuUsuario", async function (datos) {
      /*console.log(datos)*/
      /*console.log(datos.success)*/
      if (datos.success) {
        notificationSuccessNoReload(datos, 2500);
        setLoading(false);
        getMenuUsuarioByUser({ Id: usuarioid }, setMenusUsuario);
      } else {
        notificationError(datos, 8000);
      }
    });
  } catch (error) {
    notificationError({ message: error }, false);
  }
}

export function deleteMenuUsuarioById(
  Id,
  setLoading,
  usuarioid,
  setMenusUsuario
) {
  try {
    setLoading(true);
    socket.emit("DeleteMenuUsuarioById", Id);

    socket.on("Res-DeleteMenuUsuarioById", async function (datos) {
      if (datos.success) {
        notificationSuccessNoReload(datos, 2500);
        setLoading(false);
        getMenuUsuarioByUser({ Id: usuarioid }, setMenusUsuario);
      } else {
        notificationError(datos, 8000);
        setLoading(false);
      }
    });
  } catch (error) {
    notificationError({ message: error }, 8000);
  }
}

export function addExtension(datos, setLoading) {
  try {
    setLoading(true);
    socket.emit("addExtension", datos);

    socket.on("Res-addExtension", async function (datos) {
      if (datos.success) {
        notificationSuccess(datos, 3000);
      } else {
        notificationError(datos, 8000);
        setLoading(false);
      }
    });
  } catch (error) {
    notificationError({ message: error }, false);
  }
}

export function updateExtension(datos, setLoading) {
  try {
    setLoading(true);
    socket.emit("updateExtension", datos);

    socket.on("Res-updateExtension", async function (datos) {
      if (datos.success) {
        notificationSuccessForUpdate(datos, 3000, "/administracion/extension");
      } else {
        notificationError(datos, 8000);
        setLoading(false);
      }
    });
  } catch (error) {
    notificationError(datos, false);
  }
}

export function getExtensionesWithUserNull(setState) {
  socket.emit("GetExtensionesWithUserNull");

  socket.on("Res-GetExtensionesWithUserNull", async function (datos) {
    if (datos.success) {
      setState(datos.data);
    } else {
      setState(datos.data);
    }
  });
}

export function getExtensionesWithoutUserNull(setState) {
  socket.emit("GetExtensionesWitouthUserNull");

  socket.on("Res-GetExtensionesWithoutUserNull", async function (datos) {
    if (datos.success) {
      setState(datos.data);
    } else {
      setState(datos.data);
    }
  });
}

export function getExtensionesWithoutUserNullByExtension(Id, setState) {
  socket.emit("GetExtensionesWithUserNullByExtension", Id);

  socket.on(
    "Res-GetExtensionesWithUserNullByExtension",
    async function (datos) {
      if (datos.success) {
        setState(datos.data);
      } else {
        setState(datos.data);
      }
    }
  );
}

export function getExtensionesWithoutUserNullByEmpresa(Id, setState) {
  socket.emit("GetExtensionesWithUserNullByEmpresa", Id);

  socket.on("Res-GetExtensionesWithUserNullByEmpresa", async function (datos) {
    if (datos.success) {
      setState(datos.data);
    } else {
      setState(datos.data);
    }
  });
}

//Added by Eidy Trinidad
export function disableUsuario(datos) {
  console.log(datos);

  socket.emit("disableUsuario", datos);
  socket.on("Res-disableUsuario", (datos) => {
    if (datos.success) {
      notificationSuccessForUpdate(datos, 2500, "/administracion/usuario");
    } else {
      notificationError(datos, 2500);
    }
  });
}

//Added by Eidy Trinidad
export function GetDepartamentosById(datos, setState) {

  socket.emit("GetDepartamentosById", datos);
  socket.on("Res-GetDepartamentosById", (datos) => {
    setState(
        datos.map((dato) =>({
            value:dato.data[0].ds_id,
            label:dato.data[0].ds_descripcion
        }))
        )
  });
}
