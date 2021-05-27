import { Link } from 'react-router-dom';
import moment from "moment";

import AudioComponent from '../AudioComponent/AudioComponent';
import { formatDate, setHoraMinutosSegundos } from '../../lib/dateHelpers';

function DetalleColasRow({ colaData }) {

/*  console.log(colaData); */

 let {hora,cola,agente,telefono,cliente,duracion,tiempo_espera,motivo_cierre,posicion_inicial}= colaData

/* 
 let horaDuracion=duracion.hour
 let minutoDuracion=duracion.minutes
 let segundoDuracion=duracion.seconds */




  return (
    <>
    <tr style={{fontSize:"12px"}}>
        <td>{ formatDate(hora)}</td>
      {/*   <td>{hora}</td> */}
        <td>{cola}</td>
        <td>{agente}</td>
        <td>{telefono}</td>
        <td>{cliente}</td>

        <td >{ setHoraMinutosSegundos(duracion.hours,duracion.minutes,duracion.seconds)}</td>
        <td>{ setHoraMinutosSegundos(tiempo_espera.hours,tiempo_espera.minutes,tiempo_espera.seconds)}</td>
        <td>{posicion_inicial}</td>
        <td>{motivo_cierre}</td>
        <td>

            <AudioComponent
              rutagrabacion={colaData.ruta_grabacion}
            ></AudioComponent>
   

        </td>

      </tr>
    </>
  );
}

export default DetalleColasRow;
