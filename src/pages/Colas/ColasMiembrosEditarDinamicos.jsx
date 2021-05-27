import ModalComponent2 from './../../components/Modal/ModalComponent2';
import { returnToURL } from '../../lib/helpers';
import { useEffect, useState } from 'react'
import ColasMiembrosEditForm from '../../components/Colas/ColasMiembrosEditForm';
import { GetMiembriosDinamicosByUniqueid } from '../../services/ColasMiembrosDinamicos';

function ColasMiembrosEditar(props) {
    const { miembroInfo} = props.match.params;
    
    
    const titulo = "Editar Miembro Dinamico";

     let dash = miembroInfo.indexOf("-");
    let usuario=miembroInfo.substr(dash+1)

   /* const [datosAudio, setDatosAudio] = useState([]) */
    let id=miembroInfo.substr(0,dash)

    const [Miembro, setMiembro] = useState([])
 
        useEffect(() => {
            
            GetMiembriosDinamicosByUniqueid(Number(id),setMiembro)
          
        }, [])
   
        console.log(Miembro)
    return (
        <ModalComponent2 show={true} handleClose={() => returnToURL('/administracion/colas')} title={titulo} size="md">

            <ColasMiembrosEditForm setMiembro={setMiembro} Miembro={Miembro} titulo={titulo}/>

        </ModalComponent2>
    )
}

export default ColasMiembrosEditar