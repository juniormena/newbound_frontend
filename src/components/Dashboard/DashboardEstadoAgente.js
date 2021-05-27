import {memo} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TableDashboard from "./TableDashboard";
import {removeDuplicates, sortArrayOfObjects, sortArrayOfObjectsByName} from "../../services/dashboardService";
import {statusAgentCircle, statusAgent, coachingUI} from "../../lib/dashboardHelper";
import {millisecondsToDate} from "../../lib/dateHelpers";
import {httpApiURL} from "../../config.json";
import userPhoto from "../../assets/images/defaul-profile.png";
import Spinner from "../Loading/Spinner";
import {removeFromColaDashboard} from "../../services/softphoneService";

const columns = [{name:'Cola'}, {name:''},{name:'Agente'},{name:'Estado'},
    {name:'Tomadas'},{name:'En llamada'},{name:'Ultima llamada'},{name:'Ultima Pausa'},
    {name:'Razón pausa'}, {name:'Logoff cola'}];

function DashboardEstadoAgente({ estadoAgenteCola,Colas, usuarios, estadoPausa, sip }){

    return(
        <Container fluid>
            <Row className="mt-3 mb-3">
                <Col>
                    <TableDashboard title="Estado de agentes" columns={columns}>
                        {removeDuplicates(estadoAgenteCola.flat(), 'name')
                            .sort(sortArrayOfObjects).flat()
                            .map((estadoAgente,index) =>
                                <tr key={estadoAgente.name}>
                                    <td className="text-center">{Colas?.find(cola=>cola?.name===estadoAgente.queue)?.nombre}</td>
                                    <td className="text-center">
                                        <div className="avatar make-a-pointer" onClick={()=>coachingUI(estadoAgente?.location.split("/")[1], sip)}>
                                            <img width="42" className="rounded-circle pr-2"
                                                 src={`${httpApiURL}/${usuarios?.find(usuario=>usuario?.u_id===parseInt(estadoAgente.name))?.u_imagen}`}
                                                 alt="agent_image" onError={(e) => e.target.src = `${userPhoto}`}/>
                                            {statusAgentCircle(estadoAgente.status, estadoAgente.paused)}
                                        </div>

                                    </td>
                                    <td className="text-center">{usuarios?.find(usuario=>usuario?.u_id===parseInt(estadoAgente.name))?.u_nombre_completo}</td>
                                    <td className="text-center">{statusAgent(estadoAgente.status, estadoAgente.paused)}</td>
                                    <td className="text-center">{estadoAgente.callstaken}</td>
                                    <td className="text-center">{estadoAgente.incall === "0" ?
                                        <i className="fa fa-phone-slash newboundPurpleColor"/>
                                        :
                                        <i className="fa fa-phone" style={{color:'#00B3E3'}}/>}</td>
                                    <td className="text-center">{millisecondsToDate(estadoAgente.lastcall)}</td>
                                    <td className="text-center">{millisecondsToDate(estadoAgente.lastpause)}</td>
                                    <td className="text-center">{estadoAgente.pausedreason === "" ?
                                        <i className="fa fa-minus newboundPurpleColor"/>
                                        :
                                        estadoPausa.length===0 ? <Spinner/> :
                                        estadoPausa.find(estadopausa=>estadopausa?.lo_codigo === estadoAgente.pausedreason)?.lo_descripcion_mini }</td>
                                    <td className="text-center">
                                        <button className="btn btn-danger"
                                                onClick={()=>removeFromColaDashboard(
                                                    {colaName:Colas?.find(cola=>cola?.name===estadoAgente.queue)?.nombre,
                                                           userName:usuarios?.find(usuario=>usuario?.u_id===parseInt(estadoAgente.name))?.u_nombre_completo,
                                                           userData:estadoAgente})}>
                                            <i className="fa fa-power-off"/>
                                        </button>
                                    </td>
                                </tr>
                            )}
                    </TableDashboard>
                </Col>
            </Row>
        </Container>
    );
}

export default memo(DashboardEstadoAgente, (prevProps, newProps)=>
    prevProps.estadoAgenteCola === newProps.estadoAgenteCola);