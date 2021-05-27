import { Fragment } from "react";
import TableDashboard from "./TableDashboard";
import {filteredArray, removeDuplicates, sortArrayOfObjects} from "../../services/dashboardService";
import {secondsToMinutues} from "../../lib/dateHelpers";

const columns = [{name:'Cola'}, {name:'Posición'},{name:'Teléfono'},{name:'Cliente'},
    {name:'Tiempo'},{name:'Agente'}];

function DashboardACD({ colaACD, Colas }){

    return(
        <TableDashboard title="ACD (Llamadas en espera)" columns={columns}>
            <Fragment>
                {filteredArray(removeDuplicates(colaACD.flat(), 'uniqueid'), Colas.map(({name})=>name))
                    .sort(sortArrayOfObjects).flat()
                    .map((acd) =>
                    <tr key={acd.uniqueid}>
                        <td className="text-center">{Colas?.find(cola=>cola?.name===acd.queue)?.nombre}</td>
                        <td className="text-center">{acd.position}</td>
                        <td className="text-center">{acd.calleridnum}</td>
                        <td className="text-center">{acd.calleridname}</td>
                        <td className="text-center">{secondsToMinutues(acd.wait)}</td>
                        <td className="text-center">{acd.connectedlinename}</td>
                    </tr>
                )}
            </Fragment>
        </TableDashboard>
    )
}

export default DashboardACD;