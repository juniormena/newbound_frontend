import ModalComponent2 from './../../components/Modal/ModalComponent2';
import { returnToURL } from '../../lib/helpers';
import { useEffect, useState } from 'react'

import { getContactosByID } from '../../services/ContactosService';
import ContactosInsert from '../../components/Contactos/ContactosInsert';

function ContactosEdit(props) {
    const titulo = "Editar Contacto";
    const { contactoInfo } = props.match.params;
    const [contacto, setContacto] = useState()


    let id_Contacto=Number(contactoInfo)

   
       useEffect(() => {
           
        getContactosByID(id_Contacto,setContacto)
         
       }, [id_Contacto,setContacto])


    return (
        <ModalComponent2 show={true} handleClose={() => returnToURL('/callcenter/contactos')} title={titulo} size="lg">

       
       <ContactosInsert titulo={titulo} contacto={contacto} />

        </ModalComponent2>
    )
}

export default ContactosEdit