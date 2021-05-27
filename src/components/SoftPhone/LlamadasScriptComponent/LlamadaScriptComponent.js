import Card from "react-bootstrap/Card";

function LlamadaScriptComponent({text}){
    return (
        <Card text="white" border="dark" style={{ width: '95%' }} bg="dark">
            <Card.Header as="h5">script</Card.Header>
            <Card.Body>
                <Card.Text>{text}</Card.Text>
            </Card.Body>
        </Card>
    )
}


export default LlamadaScriptComponent;