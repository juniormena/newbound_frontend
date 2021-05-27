import Table from "react-bootstrap/Table";
import {isDepartamentoSelected} from "../../lib/helpers";
import ModalComponent from "../Modal/ModalComponent";


function DepartamentosSupervision({ show, handleClose, usuario, departamentos, removeDepartamentSelected, handleDepartamentsSelected2 }){
    return(
        <ModalComponent show={show} handleClose={handleClose} title="Departamentos a supervisar">
            <div className="card">
                <Table responsive striped hover borderless className="mt-2" id="permisosUsuarioTable">
                    <thead className="text-center  border-bottom border-info m-5">
                    <tr>
                        <th className="text-uppercase">ID</th>
                        <th className="text-uppercase">Departamento</th>
                        <th className="text-uppercase"></th>
                    </tr>
                    </thead>
                    <tbody className="text-center">
                    {departamentos.map(departamento=>(
                        <tr key={departamento.ds_id} className={`${isDepartamentoSelected(usuario.departamentos_supervisar, departamento.ds_id) ? 'tr-selected text-white' : ''}`}>
                            <td>{departamento.ds_id}</td>
                            <td>{departamento.ds_descripcion}</td>
                            <td>{isDepartamentoSelected(usuario.departamentos_supervisar, departamento.ds_id) ?
                                <span className="tr-link" onClick={()=>removeDepartamentSelected(departamento)}>Quitar</span>
                                :
                                <span className="tr-link" onClick={()=>handleDepartamentsSelected2(departamento)}>Asignar</span>}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
        </ModalComponent>
    )
}

export default DepartamentosSupervision;