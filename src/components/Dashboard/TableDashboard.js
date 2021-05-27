import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";

function TableDashboard({ title, columns, children }){
    return(
        <Card>
            <Card.Header>
                {title}
            </Card.Header>
            <Card.Body className="table-responsive">
                <Table striped responsive hover>
                    <thead>
                    <tr>
                        {columns?.map((column)=><th className="text-center" key={column.name}>{column.name}</th>)}
                    </tr>
                    </thead>
                    <tbody>
                        {children}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
}

export default TableDashboard;