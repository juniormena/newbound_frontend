
import { Link } from 'react-router-dom';
import TooltipComponent from '../../Toolttip/TooltipComponent';

function SucursalRow({ sucursal }) {
    return (
        <>
        <tr>
            <td>{sucursal.se_descripcion.trim()}</td>
            <td>{sucursal.e_nombre_completo}</td>
            <td className="text-right"> 
                <TooltipComponent
                text="Editar"
                >
                    <Link to={`/administracion/sucursal/edit/${sucursal.se_id}`} className="btn btn-primary"><i className="fa fa-edit"></i></Link> 
                </TooltipComponent>
                
            </td>
          </tr>
        </>
    )
}

export default SucursalRow
