import React from "react";
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import {secondsToMinutues} from "../../lib/dateHelpers";
import { removeDuplicates, sortArrayOfObjects} from "../../services/dashboardService";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import {styleAbandonadas, styleCompletadas, styleLlamadas} from "../../lib/dashboardHelper";

const columns = [{name: 'Llamadas'}, {name: 'Contestadas'}, {name: 'Abandonadas'},
    {name: 'Tiempo en espera'}, {name: 'Tiempo hablado'}, {name: 'SL1'}, {name: 'SL2'}];


function DashboardEstadoCola({datosColas, Colas}) {
    /*let expectedArray = removeDuplicates(datosColas.flat(), 'queue').filter(item=> {if (Colas.map(({name})=>name).indexOf(item.queue)>-1) {
        return item
    }
    });*/
    //console.log('expected array', filteredArray(removeDuplicates(datosColas.flat(), 'queue'), Colas.map(({name})=>name)));*/
    return (
        <Card className="table-responsive">
            <Card.Header>
                Estado de colas
            </Card.Header>
            {removeDuplicates(datosColas.flat(), 'queue')
                .sort(sortArrayOfObjects).flat()
                .map((Cola) =>
                    <Card.Body key={Cola.queue}>
                        <div>
                            <span className="h6 mr-3">
                                <strong>Cola: </strong>
                                <span className="text-info">{Colas?.find(cola=>cola?.name===Cola.queue)?.nombre}</span>
                            </span>
                            <span className="h6 mr-3">
                                <strong>Param. SL: </strong>
                                <span className="text-info">{Cola.servicelevel}</span>
                            </span>
                            <span className="h6">
                                <strong>Estrategia: </strong>
                                <span className="text-info">{Cola.strategy}</span>
                            </span>
                        </div>
                        <Table striped responsive hover >
                            <thead>
                            <tr>
                                {columns?.map((column)=><th className="text-center" key={column.name}>{column.name}</th>)}
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td className="text-center">
                                    <Progress
                                        type="circle"
                                        percent={`${parseInt(Cola.completed) + parseInt(Cola.abandoned)}`}
                                        theme={styleLlamadas(`${parseInt(Cola.completed) + parseInt(Cola.abandoned)}`)}
                                        width={100}
                                    />
                                </td>
                                <td className="text-center">
                                    <Progress
                                        type="circle"
                                        percent={Cola.completed}
                                        theme={styleCompletadas(`${Cola.completed}`)}
                                        width={100}
                                    />
                                </td>
                                <td className="text-center">
                                    <Progress
                                        type="circle"
                                        percent={Cola.abandoned}
                                        theme={styleAbandonadas(`${Cola.abandoned}`)}
                                        width={100}
                                    />
                                </td>
                                <td className="text-center estadoColaFontSize estadoColaFontColor">{secondsToMinutues(Cola.holdtime)}</td>
                                <td className="text-center estadoColaFontSize estadoColaFontColor">{secondsToMinutues(Cola.talktime)}</td>
                                <td className="text-center estadoColaFontSize"
                                    style={{color: '#056028'}}>{Cola.servicelevelperf}%
                                </td>
                                <td className="text-center estadoColaFontSize"
                                    style={{color: '#FF9226'}}>{Cola.servicelevelperf2}%
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                    </Card.Body>
            )}
        </Card>
    )
}

export default React.memo(DashboardEstadoCola, (prevProps, newProps)=>prevProps.datosColas === newProps.datosColas);