

import { formatDate2, formatDate, setHoraMinutosSegundos } from '../../lib/dateHelpers';

function ResumenAgentesRow({ resumenAgentes }) {

  
  let { agente, cant_llamadas, llamadas_entrantes, llamadas_salientes, fecha, login, logoff,
    tiempo_admin_posterior, tiempo_hablado_cola, tiempo_hablado_entrantes_directas,
    tiempo_hablado_salientes_directas, tiempo_login, tiempo_logoff,
    tiempo_pause, tiempo_ready, tiempo_salientes_campanas,
    tiempo_total, tiempo_total_hablado } = resumenAgentes

  let t_ready = setHoraMinutosSegundos(tiempo_ready?.hours,
    tiempo_ready?.minutes, tiempo_ready?.seconds)

  let t_adminp = setHoraMinutosSegundos(tiempo_admin_posterior?.hours,
    tiempo_admin_posterior?.minutes, tiempo_admin_posterior?.seconds)

  let Tiempo_Pause = setHoraMinutosSegundos(tiempo_pause?.hours,
    tiempo_pause?.minutes, tiempo_pause?.seconds)

  let Tiempo_login = setHoraMinutosSegundos(tiempo_login?.hours,
    tiempo_login?.minutes, tiempo_login?.seconds)

  let Tiempo_total = setHoraMinutosSegundos(tiempo_total?.hours,
    tiempo_total?.minutes, tiempo_total?.seconds)
  let Tiempo_total_hablado = setHoraMinutosSegundos(tiempo_total_hablado?.hours,
    tiempo_total_hablado?.minutes, tiempo_total_hablado?.seconds)

  let Tiempo_logoff = setHoraMinutosSegundos(tiempo_logoff?.hours,
    tiempo_logoff?.minutes, tiempo_logoff?.seconds)

  let Tiempo_Hablado_Cola = setHoraMinutosSegundos(tiempo_hablado_cola?.hours,
    tiempo_hablado_cola?.minutes, tiempo_hablado_cola?.seconds)

  let Tiempo_Hablado_entrantes = setHoraMinutosSegundos(tiempo_hablado_entrantes_directas?.hours,
    tiempo_hablado_entrantes_directas?.minutes, tiempo_hablado_entrantes_directas?.seconds)

  let Tiempo_Hablado_salientes = setHoraMinutosSegundos(tiempo_hablado_salientes_directas?.hours,
    tiempo_hablado_salientes_directas?.minutes, tiempo_hablado_salientes_directas?.seconds)

  let Tiempo_salientes_campanas = setHoraMinutosSegundos(tiempo_salientes_campanas?.hours,
    tiempo_salientes_campanas?.minutes, tiempo_salientes_campanas?.seconds)

  return (
    <>
         <tr style={{fontSize:"12px"}} >

        <td>{formatDate2(fecha)}</td>
        <td>{login === null ? "" : formatDate(login)}</td>
        <td>{logoff === null ? "" : formatDate(logoff)}</td>
        <td>{agente}</td>
        <td>{cant_llamadas}</td>
        <td>{llamadas_entrantes}</td>
        <td>{llamadas_salientes}</td>
        <td>{t_ready === "00:00" ? "-" : t_ready}</td>
        <td>{Tiempo_Pause === "00:00" ? "-" : Tiempo_Pause }</td>
        <td>{Tiempo_Hablado_Cola === "00:00" ? "-" :Tiempo_Hablado_Cola  }</td>
        <td>{Tiempo_Hablado_salientes === "00:00" ? "-" :Tiempo_Hablado_salientes  }</td>
        <td>{Tiempo_Hablado_entrantes === "00:00" ? "-" : Tiempo_Hablado_entrantes}</td>
        <td>{Tiempo_salientes_campanas === "00:00" ? "-" : Tiempo_salientes_campanas}</td>
        <td>{t_adminp === "00:00" ? "-" : t_adminp }</td>
        <td>{Tiempo_total_hablado=== "00:00" ? "-" :Tiempo_total_hablado}</td>
        <td>{Tiempo_total  === "00:00" ? "-" : Tiempo_total}</td>
        <td>{Tiempo_login === "00:00" ? "-" : Tiempo_login }</td>
        <td>{Tiempo_logoff === "00:00" ? "-" : Tiempo_logoff}</td>
      </tr>
    </>
  );
}

export default ResumenAgentesRow;
