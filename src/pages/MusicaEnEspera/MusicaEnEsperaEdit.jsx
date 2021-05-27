import ModalComponent from './../../components/Modal/ModalComponent';
import { returnToURL } from '../../lib/helpers';
import { useEffect, useState } from 'react'



import { MusicaEnEsperaUpdate } from '../../components/MusicaEnEspera/MusicaEnEsperaUpdate';
import { musicOnHoldSelectByCarpeta } from '../../services/MusicaEsperaService';

function MantEstadoAgenteEdit(props) {
    const titulo = "Editar Musica En Espera";
    const {empresaId} = props.match.params;
    let dash = empresaId.indexOf("-");
    let carpetaNombre=empresaId.substr(dash+1)

    const [datosCarpeta, setDatosCarpeta] = useState([])
    let idEmpresa=empresaId.substr(0,dash)

    
    console.log(carpetaNombre);

    useEffect(() => {
        
        musicOnHoldSelectByCarpeta(carpetaNombre,setDatosCarpeta)
    }, [])




    return (
        <ModalComponent show={true} handleClose={()=>returnToURL('/administracion/musicaespera')} title={titulo}>
       
           <MusicaEnEsperaUpdate titulo={titulo} datosCarpeta={datosCarpeta} empresaId={idEmpresa}/>
        </ModalComponent>
    )
}

export default MantEstadoAgenteEdit