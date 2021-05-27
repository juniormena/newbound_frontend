

import { formatDate2, formatDate, setHoraMinutosSegundos } from '../../lib/dateHelpers';

function ResumenAgentesColasRow({ resumenAColasDatos }) {


  let { cola, login,
    fecha, logoff, agente, cant_llamadas, tiempo_ready,
    tiempo_pause, tiempo_login, tiempo_logoff,
    avg_aht, hablado_cola, tiempo_admin_posterior, tiempo_total } = resumenAColasDatos

  /*   let tiempo_test={
      hours:1,
      minutes:25,
      seconds:33
    }
    console.log(tiempo_test);
    console.log( tiempo_admin_posterior); */
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

    let Tiempo_logoff = setHoraMinutosSegundos(tiempo_logoff?.hours,
      tiempo_logoff?.minutes, tiempo_logoff?.seconds)
    
      let Avg_AHT=setHoraMinutosSegundos(avg_aht.hours,
      avg_aht.minutes, avg_aht.seconds)
    
      let Hablado_Cola=setHoraMinutosSegundos(hablado_cola?.hours,
        hablado_cola?.minutes, hablado_cola?.seconds) 

  return (
    <>
      <tr  >

        <td>{formatDate2(fecha)}</td>
        <td>{login === null ? "" : formatDate(login)}</td>
        <td>{logoff === null ? "" : formatDate(logoff)}</td>
        <td>{cola}</td>
        <td>{agente}</td>
        <td>{cant_llamadas}</td>
        <td>{t_ready === "00:00" ? "-" : t_ready}</td>
        <td>{Tiempo_Pause === "00:00" ? "-" : Tiempo_Pause }</td>
        <td>{Hablado_Cola  === "00:00" ? "-" :Hablado_Cola }</td>
        <td>{t_adminp === "00:00" ? "-" : t_adminp }</td>
        <td>{Avg_AHT}</td>
        <td>{Tiempo_login === "00:00" ? "-" : Tiempo_login }</td>
        <td>{Tiempo_total === "00:00" ? "-" : Tiempo_total}</td>
        <td>{Tiempo_logoff === "00:00" ? "-" : Tiempo_logoff}</td>

      </tr>
    </>
  );
}

export default ResumenAgentesColasRow;
