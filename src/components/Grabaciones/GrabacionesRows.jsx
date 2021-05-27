
import { Link } from 'react-router-dom';
import AudioComponent from '../AudioComponent/AudioComponent';
import TooltipComponent from '../Toolttip/TooltipComponent';

export default function GrabacionesRows({ audio,handleAudioRemover}) {


  
    return (
        <>

            <tr >
                <td>{audio.id}</td>
                <td>{audio.name}</td>
                <td>{audio.descripcion}</td>
                <td>{audio.carpeta}</td>
                <td>  
                    <AudioComponent
                        rutagrabacion={audio.directory}
                    ></AudioComponent></td>
                   
                <td className="text-right">
                   <TooltipComponent text="Eliminar">
                   <button className=" btn btn-danger mr-1 ml-1 "
                    onClick={() => handleAudioRemover(audio.id,audio.directory)}
                    ><i className="fa fa-minus"></i></button>
                    </TooltipComponent>
                   <TooltipComponent text="Editar">
                        <Link to={`/administracion/grabaciones/edit/${audio.empresa_id}-${audio.name}`} className="btn btn-primary"><i className="fa fa-edit"></i></Link>
                    </TooltipComponent>
                   
                </td>
            </tr>
        </>
    )
}
