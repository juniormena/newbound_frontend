import { useEffect, useState } from 'react';
import ExtensionEditForm from '../../components/Forms/ExtensionEditForm'
import { returnToURL } from '../../lib/helpers';
import { getExtensionesWithoutUserNullByExtension } from '../../services/AdministracionService';
import ModalComponent from './../../components/Modal/ModalComponent';

function ExtensionEdit(props) {
    const titulo = "EXTENSION";
    const { Id } = props.match.params;
    const [selectedExtension, setSelectedExtension] = useState([{id:'',tipo_extension:'',transport:'0',id_empresa:'0',usuario_id:'0', callerid:''}]);

    useEffect(()=>{
        getExtensionesWithoutUserNullByExtension({Id},setSelectedExtension)
    },[Id])

    return (
        <ModalComponent show={true} handleClose={()=>returnToURL('/administracion/extension')} title={titulo}>
            <ExtensionEditForm selectedExtension={selectedExtension} update={true}/>
        </ModalComponent>
    )
}

export default ExtensionEdit
