import ModalComponent2 from './../../components/Modal/ModalComponent2';
import { returnToURL } from '../../lib/helpers';
import { useEffect, useState } from 'react'

import { getCampanaEstado,getCampanaRegistoById } from '../../services/campanasService';


import CampanasRegistroEditar from '../../components/Campanas_registros/CampanasRegistroEditar';

function CampanasEdit(props) {
    const titulo = "Editar Registro De Campaña";
    const { campanaInfo } = props.match.params;

    const [campanaRegistroEdit, setCampanaRegistroEdit] = useState([])

    const [campanaEstados, setCampanaEstados] = useState([])


    useEffect(() => {

        getCampanaEstado(setCampanaEstados)
    }, [])

    useEffect(() => {

        getCampanaRegistoById(campanaInfo, setCampanaRegistroEdit)

    }, [])
  


    return (
        <ModalComponent2 show={true} handleClose={() => returnToURL('/callcenter/campanas')} title={titulo} size="md">
            <CampanasRegistroEditar campanaRegistroEdit={campanaRegistroEdit} campanaEstados={campanaEstados}/>

        </ModalComponent2>
    )
}

export default CampanasEdit