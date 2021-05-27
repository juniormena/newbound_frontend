import ModalComponent2 from './../../components/Modal/ModalComponent2';
import { returnToURL } from '../../lib/helpers';
import { useEffect, useState } from 'react'
import { GrabacionesSelectByAudio } from '../../services/GrabacionesService';
//import GrabacionesUpdate from '../../components/Grabaciones/GrabacionesUpdate';
import ColasRuleUpdate from '../../components/ColasRules/ColasRuleUpdate';
import { getColasByRuleNameAndEmpresa } from '../../services/ColasRulesService';

function ColasRulesEdit(props) {
    const titulo = "Editar Reglas de Cola";
    const { colaRuleInfo } = props.match.params;


    let dash = colaRuleInfo.indexOf("-");
    let rule_name = colaRuleInfo.substr(dash + 1)

    const [colasReglas, setColasReglas] = useState([])
    let id_empresa = Number(colaRuleInfo.substr(0, dash))
   
       useEffect(() => {
           
           getColasByRuleNameAndEmpresa({rule_name, id_empresa},setColasReglas)
         
       }, [])
    

    return (
        <ModalComponent2 show={true} handleClose={() => returnToURL('/administracion/colas-reglas')} title={titulo} size="md">

            <ColasRuleUpdate titulo={titulo} colasReglas={colasReglas}  />

        </ModalComponent2>
    )
}

export default ColasRulesEdit