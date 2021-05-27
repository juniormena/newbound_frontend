import { formatDate,secondsToMinutues } from "../../../lib/dateHelpers";
import AudioComponent from "../../AudioComponent/AudioComponent";
import { useGuardaExcel } from "../../../hooks/useGuardaExcel";


function LlamadaRow({ llamada }) {

  return (
    <>
      <tr>
        <td>{formatDate(llamada.fecha)}</td>
        <td>{llamada.tipollamada}</td>

        <td>{llamada.usuario}</td>
        <td>{llamada.estadollamada}</td>
        <td>{llamada.numeroorigen}</td>
        <td>{llamada.numerodestino}</td>

        <td>{secondsToMinutues(llamada.duracion)}</td>
        <td>
          {
            <AudioComponent
            rutagrabacion={llamada.rutagrabacion}/>
          }
        </td>
      </tr>
    </>
  );
}

export default LlamadaRow;
