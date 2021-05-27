
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ConfirmacionBorrar } from '../../lib/helpers';
import {DisableColaRule } from '../../services/ColasRulesService'
import TooltipComponent from '../Toolttip/TooltipComponent';

export default function ColasRulesRows({ cola}) {


    const handleDisable =(colaRuleData)=>{
        
   
        ConfirmacionBorrar('Seguro que quiere Deshabilitar?', 
        "Esta Reglas de Cola no aparecera en los registros", () => {
         
           DisableColaRule(colaRuleData)
        })
    
    }
    
 const {rule_name,time,max_penalty,min_penalty,e_nombre_completo,id_empresa}=cola


    return (
        <>

            <tr >
                <td>{rule_name}</td>
               
                <td>{e_nombre_completo}</td>
                {
                <td className="text-right">  
                   <TooltipComponent text="Editar">
                        <Link to={`/administracion/colas-reglas/edit/${id_empresa}-${rule_name}`} >
                            <i className="fas fa-edit mb-1 mb-md-0 btn btn-primary fa-1x"></i></Link>
                    </TooltipComponent>

                    <TooltipComponent text="Deshabilitar">
                       <i 
                       className="fas fa-times-circle ml-2  btn btn-danger fa-1x"
                       onClick={()=>{handleDisable({rule_name, id_empresa})}}
                       ></i>
                    </TooltipComponent>

                </td>}
            </tr>
        </>
    )
}
