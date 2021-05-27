
import { formatDate, formatDate2, setHoraMinutosSegundos } from '../../../lib/dateHelpers';
import { descargarExcel } from '../../../lib/exportHelpers';

import AudioComponent from '../../AudioComponent/AudioComponent';



export default function CampanasLogsPorLlamadaRows({ logs, columns }) {



    return (
        <>

            {

                <tr style={{ fontSize: "12px" }}>
                    <td>{formatDate(logs?.fecha)}</td>
                    <td>{logs?.estado}</td>
                    <td>{logs?.agente}</td>
                    <td>{logs?.numero}</td>
                    <td>{setHoraMinutosSegundos(logs?.tiempo_total?.hours,logs?.tiempo_total?.minutes,logs?.tiempo_total?.seconds)}</td>
                    <td>{setHoraMinutosSegundos(logs?.tiempo_conversacion?.hours,logs?.tiempo_total?.minutes,logs?.tiempo_total?.seconds)}</td>
                    <td>  
                    <AudioComponent
                        rutagrabacion={logs?.ruta_grabacion}
                    ></AudioComponent></td>
                </tr>
            }



        </>
    )
}
