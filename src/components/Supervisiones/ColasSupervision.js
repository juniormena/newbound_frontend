import Table from "react-bootstrap/Table";
import {isDepartamentoSelected} from "../../lib/helpers";
import ModalComponent from "../Modal/ModalComponent";

function ColasSupervision({  show, handleClose, usuario, colas, handleColaSelected,removeColaSelected }){
    return(
        <ModalComponent show={show} handleClose={handleClose} title="Colas a supervisar">
            <div className="card">
                <Table responsive striped hover borderless className="mt-2" id="permisosUsuarioTable">
                    <thead className="text-center  border-bottom border-info m-5">
                    <tr>
                        <th className="text-uppercase">ID</th>
                        <th className="text-uppercase">Nombre</th>
                        <th className="text-uppercase"></th>
                    </tr>
                    </thead>
                    <tbody className="text-center">
                    {colas?.map(cola=>(
                        <tr key={cola.name} className={`${isDepartamentoSelected(usuario.colas_supervision, cola.name) ? 'tr-selected text-white' : ''}`}>
                            <td>{cola.name}</td>
                            <td>{cola.nombre}</td>
                            <td>{isDepartamentoSelected(usuario.colas_supervision, cola.name) ?
                                <span className="tr-link" onClick={()=>removeColaSelected(cola)}>Quitar</span>
                                :
                                <span className="tr-link" onClick={()=>handleColaSelected(cola)}>Asignar</span>}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
        </ModalComponent>
    )
}

export default ColasSupervision;