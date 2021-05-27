
import { Link } from 'react-router-dom';

import TooltipComponent from '../Toolttip/TooltipComponent';
import {DisableCola } from '../../services/ColasService'
import { ConfirmacionBorrar } from '../../lib/helpers';

export default function ColasRows({ cola}) {

const handleDisable =(colaData)=>{
   

    ConfirmacionBorrar('Seguro que quiere Deshabilitar?', "Esta Cola no aparecera en los registros", () => {
        DisableCola(colaData)
      /*   let data = MemberData.data.filter(member => member.uniqueid !== uniqueid)
        setMemberData({ data: data })
        toast.success("Miembro Borrado", {
            autoClose: 2500,
        }); */
    })

}
const {nombre,servicelevel,strategy,musiconhold,e_nombre_completo,id_empresa,name} =cola
    return (
        <>

            <tr >
                <td>{name}</td>
                <td>{nombre}</td>
                <td>{servicelevel}</td>
                <td>{strategy}</td>

                <td>{musiconhold}</td>
                <td>{e_nombre_completo}</td>
                <td className="text-right">
                    <TooltipComponent text="Editar">
                        <Link to={`/administracion/colas/edit/${id_empresa}-${nombre}`} ><i className="fas fa-edit btn btn-primary mb-1 mb-md-0 fa-1x"></i></Link>
                    </TooltipComponent>

                    <TooltipComponent text="Deshabilitar">
                       <i 
                       className="fas fa-times-circle ml-2 btn btn-danger fa-1x"
                       onClick={()=>{handleDisable({name,id_empresa,nombre})}}
                       ></i>
                    </TooltipComponent>
                </td>
            </tr>
        </>
    )
}

