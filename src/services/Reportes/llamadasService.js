import { socket } from "../socket-common";

export function getLlamadas(setState) {
  socket.emit("GetLlamadas");

  

  socket.on("Res-GetLlamadas", async function (datos) {
    //console.log(datos.data);

    if (datos.success) {
      setState(datos.data);
    }
  });
}

export function getLlamadasByFilters(e, llamada, setLoading, setState) {
  setLoading(true);
  e.preventDefault();
  //setLoading(true);
  socket.emit("GetLlamadasByFilters", llamada);

  socket.on("Res-GetLlamadasByFilters", async function (datos) {
    /*console.log(datos)*/
    /*console.log(datos.success)*/
    //console.log(llamada);
    if (datos.success) {
      setLoading(false);
      setState(datos.data);
    } else {
      setLoading(false);
      setState([]);
    }
  });
}

export function getTiposLlamada(setState) {
  socket.emit("GetTiposLlamada");

  socket.on("Res-GetTiposLlamada", async function (datos) {
    /*console.log(datos)*/
    /*console.log(datos.success)*/

    if (datos.success) {
      setState(
        datos.data?.map((tipo) => ({
          value: tipo.id,
          label: tipo.nombre,
        }))
      );
    }
  });
}

export function getEstadosLlamada(setState) {
  socket.emit("GetEstadosLlamada");

  socket.on("Res-GetEstadosLlamada", async function (datos) {
    /*console.log(datos)*/
    /*console.log(datos.success)*/

    if (datos.success) {
      setState(
        datos.data?.map((estado) => ({
          value: estado.id,
          label: estado.nombremostrar,
        }))
      );

      //console.log(datos.data, "estadosLlamada");
    }
  });
}
export function getPeriodo(setState) {
  socket.emit("GetPeriodo");

  socket.on("Res-GetPeriodo", async function (datos) {
    /*console.log(datos)*/
    /*console.log(datos.success)*/

    if (datos.success) {
      setState(datos.data);
    }
  });
}

export function getUsuarios(setState, currentUser) {
  socket.emit("GetUsuarios", currentUser.departamentos_supervision);


  socket.on("Res-GetUsuarios", async function (datos) {
    if (datos.success) {
      setState(
        datos.data?.map((usuario) => ({
          value: usuario.id,
          label: usuario.nombrecompleto,
          extension:usuario.u_extensiones
        }))
      );
      //console.log(datos.data, "usuarios");
    }
  });
}
