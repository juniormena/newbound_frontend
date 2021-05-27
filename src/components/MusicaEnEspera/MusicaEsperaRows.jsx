import { Link } from 'react-router-dom';
import TooltipComponent from '../Toolttip/TooltipComponent';

function MusicaEsperaRows({ carpeta }) {
    return (
        <>
            <tr>
                <td> <i className="fas fa-music"></i>  {carpeta.name}</td>
                <td> {carpeta.description}</td>
                <td> {carpeta.sort}</td>
                <td> {carpeta.mode}</td>
                <td className="text-right">
                    <TooltipComponent text="Editar">
                        <Link to={`/administracion/mantmusicaespera/${carpeta.empresa_id}-${carpeta.name}`} className="btn btn-primary"><i className="fa fa-edit"></i></Link>
                    </TooltipComponent>
                </td>
            </tr>
        </>
    )
}

export default MusicaEsperaRows;