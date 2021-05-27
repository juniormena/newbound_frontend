import ModalComponent2 from './../../components/Modal/ModalComponent2';
import { returnToURL } from '../../lib/helpers';
import { useEffect, useState } from 'react'

//import GrabacionesUpdate from '../../components/Grabaciones/GrabacionesUpdate';

import {getColasByRuleIdAndEmpresa } from '../../services/ColasRulesService';
import ColasRulesEditConfig from '../../components/ColasRules/ColasRulesEditConfig'

function  ColasRulesEditConf (props) {
  
    const titulo = "Editar Configuracion ";

    //console.log(props.match.params);

   var {params}=props.match

   var dash=params.colaRule.indexOf(".")
   let rule_id=params.colaRule.substr(0, dash);
   let id_empresa=Number(params.colaRule.substr(dash+1));
   
    const [colasReglas, setColasReglas] = useState([])

       useEffect(() => {
           
           
        getColasByRuleIdAndEmpresa({rule_id , id_empresa},setColasReglas)
       }, [])
  

    return (
        <ModalComponent2 show={true} handleClose={() => returnToURL('/administracion/colas-reglas')} title={titulo} size="lg">
            
        <ColasRulesEditConfig title={titulo} colasReglas={colasReglas}/>

        </ModalComponent2>
    )
}

export default  ColasRulesEditConf