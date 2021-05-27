import ModalComponent2 from './../../components/Modal/ModalComponent2';
import { returnToURL } from '../../lib/helpers';
import { useEffect, useState } from 'react'
import { GrabacionesSelectByAudio } from '../../services/GrabacionesService';
import GrabacionesUpdate from '../../components/Grabaciones/GrabacionesUpdate';

function GrabacionesEdit(props) {
    const titulo = "Editar Grabaciones";
    const {audioInfo} = props.match.params;
  
    let dash = audioInfo.indexOf("-");
    let name=audioInfo.substr(dash+1)

    const [datosAudio, setDatosAudio] = useState([])
    let empresa_id=audioInfo.substr(0,dash)

    useEffect(() => {
        
        GrabacionesSelectByAudio({name,empresa_id},setDatosAudio)
      
    }, [])
    console.log(datosAudio);
  
    return (
        <ModalComponent2 show={true} handleClose={()=>returnToURL('/administracion/grabaciones')} title={titulo} size="md">
       
           <GrabacionesUpdate titulo={titulo} datosAudio={datosAudio} empresaId={empresa_id}/>

        </ModalComponent2>
    )
}

export default GrabacionesEdit