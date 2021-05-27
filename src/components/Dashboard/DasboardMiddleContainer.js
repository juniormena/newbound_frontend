import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DashboardEstadoCola from "./DashboardEstadoCola";
import DashboardACD from "./DashboardACD";


function DashboardMiddleContainer({ datosColas, Colas, colaACD }){
    return(
        <Container fluid>
            <Row className="mt-3 mb-3">
                <Col>
                    <DashboardEstadoCola datosColas={datosColas} Colas={Colas}/>
                </Col>

                <Col className={`${window.innerWidth<=1400 && window.location.pathname!=="/dashboard" ? 'mt-4' : ''}`}>
                    <DashboardACD colaACD={colaACD} Colas={Colas}/>
                </Col>
            </Row>
        </Container>
    )
}

export default DashboardMiddleContainer;