import React, {useEffect, useState} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import WidgetsCharts from "../Charts/Widgets";
import {filteredArray, removeDuplicates} from "../../services/dashboardService";

function  DashboardWidgets({ datosColas, cantColas, Colas }){
    const [summaAbandoned, setSummaAbandoned] = useState(0);
    const [summaCompleted, setSummaCompleted] = useState(0);
    const [summaCalls, setSummaCalls] = useState(0);
    const [summaMadeCalls, setSummaMadeCalls] = useState(0);

    const dataProgress = [
        {
            title: 'Llamadas',
            color: 'primary',
            percent: summaMadeCalls,
            phoneColor: 'text-primary',
            cardBottom: 'border-primary '
        },
        {
            title: 'Contestadas',
            color: 'success',
            percent: summaCompleted,
            phoneColor: 'text-success',
            cardBottom: 'border-success '
        },
        {
            title: 'Entrantes',
            color: 'warning',
            percent: summaCalls,
            phoneColor: 'text-warning',
            cardBottom: 'border-warning '
        },
        {
            title: 'Abandonadas',
            color: 'danger',
            percent: summaAbandoned,
            phoneColor: 'text-danger',
            cardBottom: 'border-danger'
        },
    ]

    useEffect(()=>{
        let sumAbandons = 0;
        let sumCompleted = 0;
        let sumCalls = 0;
        let sumMadeCalls;
        removeDuplicates(datosColas.flat(), 'queue').forEach(({abandoned, completed, calls}) =>
             {
                let valueAbandoned = parseInt(abandoned);
                let valueCompleted = parseInt(completed)
                let valueCalls = parseInt(calls);

                sumAbandons+=valueAbandoned;
                sumCompleted+=valueCompleted;
                sumCalls+=valueCalls;
            });
        sumMadeCalls = sumAbandons + sumCompleted;

        setSummaAbandoned(sumAbandons);
        setSummaCompleted(sumCompleted);
        setSummaCalls(sumCalls);
        setSummaMadeCalls(sumMadeCalls);

    },[datosColas])

    return(
        <Container fluid>
            <Row>
                {dataProgress?.map((progress, index)=><Col className="mt-2" key={index+1}><WidgetsCharts progress={progress} /></Col>)}
            </Row>
        </Container>
    )
}

export default React.memo(DashboardWidgets, (prevProps, newProps)=>
prevProps.datosColas === newProps.datosColas);