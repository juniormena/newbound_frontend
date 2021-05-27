import ModalComponent2 from '../../components/Modal/ModalComponent2';
import { returnToURL } from '../../lib/helpers';
import { useEffect, useState } from 'react'
import ColasMiembrosInsertForm from '../../components/Colas/ColasMiembrosInsertForm';

function ColasMiembrosInsertPage(props) {
      const { miembroInfo} = props.match.params;


    const titulo = "Insertar Miembros Estaticos";
    const [formMiembrosStaticos, setformMiembrosStaticos] = useState([])

    const [MemberData, setMemberData] = useState({
        data: [
        ]
    })

   

    return (
        <ModalComponent2 show={true} handleClose={() => returnToURL('/administracion/colas')} title={titulo} size="lg">

            <ColasMiembrosInsertForm formMiembrosStaticos={formMiembrosStaticos}
                setformMiembrosStaticos={setformMiembrosStaticos}
                MemberData={MemberData} setMemberData={setMemberData}
                miembroInfo={miembroInfo}
                title={titulo}
            />


        </ModalComponent2>
    )
}

export default ColasMiembrosInsertPage