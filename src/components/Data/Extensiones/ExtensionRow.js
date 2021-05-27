import { Link } from 'react-router-dom';
import { updateExtension } from '../../../services/AdministracionService';
import TooltipComponent from '../../Toolttip/TooltipComponent';
import useLoading from './../../../hooks/useLoading';

function ExtensionRow({ extension }) {
    const [loading, setLoading] = useLoading();
    return (
        <tr>
            <td>{extension.id}</td> 
            <td>{extension.tipo_extension}</td>
            <td>{!extension.callerid ? 'no asignado' : extension.callerid}</td>  
            <td>{extension.e_nombre_completo}</td>  
            <td>{!extension.u_nombre_completo ? 'No asignado' : extension.u_nombre_completo}</td> 
            <td>{!extension.u_usuario ? 'No asignado' : extension.u_usuario}</td>
            <td className="text-right">
                <div className="d-flex justify-content-end">
                    <TooltipComponent text={`${extension.isdynamicmember ? 'Es un miembro dinámico no se puede editar' : 'Editar'}`}>
                        {extension.isdynamicmember ?
                            <button className="btn btn-warning mr-1"><i className="fa fa-edit"/></button>
                            :
                            <Link to={`/administracion/extension/edit/${extension.id}`} className="btn btn-primary mr-1"><i className="fa fa-edit"/></Link>}
                    </TooltipComponent>

                    <TooltipComponent text="Liberar">
                    <button className="btn btn-primary" 
                    onClick={()=>updateExtension(Object.assign({}, {id:extension.id, callerid:"", usuario_id:null}),setLoading)} 
                    disabled={!!(loading || extension.usuario_id === null)}>
                        {/*liberar* */}<i className="fa fa-unlock-alt"/>
                    </button>
                    </TooltipComponent>
                    
                  
                </div>
            </td> 
            <td> </td>  
        </tr>
    )
}

export default ExtensionRow;