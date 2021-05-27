import Table from "react-bootstrap/Table";
import {isDepartamentoSelected} from "../../lib/helpers";
import ModalComponent from "../Modal/ModalComponent";


function CampanasSupervision({ show, handleClose, usuario, campanas, removeCampanasSelected, handleCampanasSelected}){

    return(
        <ModalComponent show={show} handleClose={handleClose} title="Departamentos a supervisar">
            <div className="card">
               <Table responsive striped hover borderless className="mt-2" id="permisosUsuarioTable">
                    <thead className="text-center  border-bottom border-info m-5">
                    <tr>
                        <th className="text-uppercase">ID</th>
                        <th className="text-uppercase">Campaña</th>
                        <th className="text-uppercase"></th>
                    </tr>
                    </thead>


                     <tbody className="text-center">
                    {
                        campanas?.map(campana=>(
                        
                            <tr key={campana.id} className={`${isDepartamentoSelected(usuario.campanas,campana.id.toString()) ? 'tr-selected text-white' : ''}`}>
                            <td>{campana.id}</td>
                            <td>{campana.nombre}</td>
                            <td>{isDepartamentoSelected(usuario.campanas,campana.id.toString()) ?
                                <span className="tr-link" onClick={()=>removeCampanasSelected(campana)}>Quitar</span>
                                :
                                <span className="tr-link" onClick={()=>handleCampanasSelected(campana)}>Asignar</span>}
                            </td>
                        </tr>
                            
                        ))
                    
                   }
                    </tbody>
                </Table> 
            </div>
        </ModalComponent>
    )
}

export default CampanasSupervision;