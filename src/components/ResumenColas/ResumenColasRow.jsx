import { formatDate2, setHoraMinutosSegundos } from '../../lib/dateHelpers';

function ResumenColasRow({ colaData }) {


/*   console.log(colaData); */

  let { fecha, nombre, cant_llamadas, cant_contestadas, cant_abandonadas,
    cant_transferidas, porc_contestadas, porc_no_contestadas, tot_tiempo_espera, tot_duracion,
    aht, avg_duracion, avg_tiempo_espera, max_llam_espera, sl, sl2 } = colaData


  return (
    <>
      <tr style={{fontSize:"12px"}}>
        <td >{formatDate2(fecha)}</td>
        <td > {nombre}</td>
        <td >{cant_llamadas}</td>
        <td >{cant_contestadas}</td>
        <td >{cant_abandonadas}</td>
        <td >{cant_transferidas}</td>
        <td >{porc_contestadas}%</td>
        <td >{porc_no_contestadas}%</td>
       {/*  AverageTiempoEspera */}
        <td >{setHoraMinutosSegundos(
             avg_tiempo_espera.hours, 
             avg_tiempo_espera.minutes, 
             avg_tiempo_espera.seconds)}
        </td>
        {/*  AverageDuracion */}
        <td >{setHoraMinutosSegundos(
             avg_duracion.hours, 
             avg_duracion.minutes, 
             avg_duracion.seconds)}
        </td>
          {/*  AverageAHT */}
        <td>{setHoraMinutosSegundos(
               aht.hours, 
               aht.minutes, 
               aht.seconds)}
        </td>
        {/*  tot_tiempo_espera */}
        <td>{setHoraMinutosSegundos(
              tot_tiempo_espera.hours, 
              tot_tiempo_espera.minutes, 
              tot_tiempo_espera.seconds)}
        </td>
         {/*  Duracion*/}
         <td>{setHoraMinutosSegundos(
              tot_duracion.hours, 
              tot_duracion.minutes, 
              tot_duracion.seconds)}
        </td>
        <td>{max_llam_espera}</td>
        <td>{sl}</td>
        <td>{sl2}</td>


      </tr>
    </>
  );
}

export default ResumenColasRow;
