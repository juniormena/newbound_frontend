import { Link } from 'react-router-dom'
import TooltipComponent from '../Toolttip/TooltipComponent';


function MantAgenteEstadoRows({ aEstado }) {

    let comaIcono = aEstado.lo_icono.indexOf(",");
    let soloicono=aEstado.lo_icono.substr(0, comaIcono);
    let color=aEstado.lo_icono.substr(comaIcono+1,aEstado.lo_icono.length);

    return (
        <>
            <tr className={aEstado.lo_estado===1 ?" ":"tr-disable"}>
                <td>{aEstado.lo_codigo}</td>
                <td>{aEstado.lo_descripcion}</td>
                <td>{aEstado.lo_descripcion_mini}</td>
                <td>{aEstado.e_nombre_completo} </td>
                <td>{aEstado.lo_estado === 1 ? "Activo " : "Inactivo"}</td>
                <td className="text-center" style={{color:`${color}`}}><i className={`${soloicono} h6 `}></i></td>
                <td >{aEstado.lo_minutos_alerta}</td>
                <td>{aEstado.lo_visible_agente ? "Si" : "No"}</td>
                <td className="text-right">
                    <TooltipComponent text="Editar">
                        <Link to={`/administracion/mantestadoagente/edit/${aEstado.lo_codigo}`} className="btn btn-primary"><i className="fa fa-edit"></i></Link>
                    </TooltipComponent>
                </td>
            </tr>
        </>
    )
}

export default MantAgenteEstadoRows;