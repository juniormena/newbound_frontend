import ModalComponent2 from './../../components/Modal/ModalComponent2';
import { returnToURL } from '../../lib/helpers';
import { useEffect, useState } from 'react'
import { GetColasWithEmpresaByNameandEmpresa } from '../../services/ColasService';
import ColasForm from '../../components/Colas/ColasForm';

function ColasEdit(props) {
    const titulo = "Editar Colas";
    const {colaInfo} = props.match.params;
 
    let dash = colaInfo.indexOf("-");
    let nombre=colaInfo.substr(dash+1)

    const [colaData, setColaData] = useState([])
    let id_empresa=colaInfo.substr(0,dash)


    useEffect(() => {
        
        GetColasWithEmpresaByNameandEmpresa({nombre,id_empresa},setColaData)
      
    }, [])
   
  
    return (
        <ModalComponent2 show={true} handleClose={()=>returnToURL('/administracion/colas')} title={titulo} size="xl">
       
           {/* <ColasUpdate titulo={titulo} colaData={colaData} id_empresa={id_empresa}/> */}
         <ColasForm title={titulo} colaData={colaData}/>

        </ModalComponent2>
    )
}

export default ColasEdit