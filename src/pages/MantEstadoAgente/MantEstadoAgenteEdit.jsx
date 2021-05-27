import ModalComponent from './../../components/Modal/ModalComponent';
import { returnToURL } from '../../lib/helpers';
import { useEffect, useState } from 'react';
import { getMotivo_PausaById } from './../../services/EstadoAgenteService';

import MantAgenteEstadoinsert from '../../components/MantEstadoAgente/MantAgenteEstadoinsert';

function MantEstadoAgenteEdit(props) {
    const titulo = "Editar Estado Agente";
    const { Id } = props.match.params;

    const [agenteEstado, setAgenteEstado] = useState([])
    

    useEffect(() => {
        
        getMotivo_PausaById(setAgenteEstado,Id)
    }, [setAgenteEstado,Id])

   

    return (
        <ModalComponent show={true} handleClose={()=>returnToURL('/administracion/mantestadoagente')} title={titulo}>
       
           <MantAgenteEstadoinsert titulo={titulo} agenteEstado={agenteEstado}/>
        </ModalComponent>
    )
}

export default MantEstadoAgenteEdit