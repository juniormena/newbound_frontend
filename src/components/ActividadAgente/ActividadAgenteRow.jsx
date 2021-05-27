

import { formatDate, setHoraMinutosSegundos } from '../../lib/dateHelpers';

function ActividadAgenteRow({ AgenteDatos }) {



  let { cola, u_nombre_completo, as_estado, motivo, tiempo_en_estado, fecha,tiempo_excedido} = AgenteDatos

console.log(tiempo_en_estado);

  return (
    <>
      <tr style={{ fontSize: "12px",background:tiempo_excedido >0 ? "#ea54b3" : "", 
      border:tiempo_excedido >0 ? "1px solid #ccc" : "", color:tiempo_excedido >0 ? "#fff" : "" }} >
      
        <td>{formatDate(fecha)}</td>
        <td>{u_nombre_completo}</td>
        <td>{cola}</td>
        <td>{as_estado}</td>
        <td>{motivo}</td>
        <td>{tiempo_en_estado !== null ?
          setHoraMinutosSegundos(tiempo_en_estado.hours,
            tiempo_en_estado.minutes, tiempo_en_estado.seconds) : ""
        }
        </td>
        <td >{tiempo_excedido >0 ? " Si" : " No"}</td>
       
      </tr>
    </>
  );
}

export default ActividadAgenteRow;
