

import { formatDate, formatDate2 } from '../../../lib/dateHelpers';

export default function CampanasRegistrosHistoricoRows({ logs, columns }) {

    //console.log(logs)


    return (
        <>

            {

                <tr style={{ fontSize: "12px" }}>
                    <td>{formatDate( logs?.fecha_log)}</td>
                    <td>{formatDate( logs?.fecha_ingreso)}</td>
                    <td>{logs?.nombre_campana}</td>
                    <td>{logs?.nombre}</td>
                    <td>{formatDate(logs?.llamar_desde)}</td>
                    <td>{formatDate(logs?.llamar_hasta)}</td>
                    <td>{logs?.nombre_estado}</td>
                    <td>{logs?.reintentos_max}</td>
                    <td>{logs?.reintentos_actuales}</td>

                  
                </tr>
            }


       
        </>
    )
}
