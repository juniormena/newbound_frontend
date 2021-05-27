import ModalComponent2 from './../../components/Modal/ModalComponent2';
import { returnToURL } from '../../lib/helpers';
import { useEffect, useState } from 'react'

import { getCampanaById } from '../../services/campanasService';
import CampanasInsert from '../../components/Campanas/CampanasInsert';
import { useSelector } from 'react-redux';

function CampanasEdit(props) {
    const titulo = "Editar Campaña";
    const { campanaInfo} = props.match.params;
    const { currentUser } = useSelector(state => state.user)
    const [campanaDatos, setCampanaDatos] = useState([])

       useEffect(() => {
           
        getCampanaById(campanaInfo,setCampanaDatos)
           
        }, [])    
        
      

    return (
        <ModalComponent2 show={true} handleClose={() => returnToURL('/callcenter/campanas')} title={titulo} size="lg">
            <CampanasInsert currentUser={currentUser} titulo={titulo} campanaDatos={campanaDatos}/>

        </ModalComponent2>
    )
}

export default CampanasEdit