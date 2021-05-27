import { Link } from 'react-router-dom';
import { ConfirmacionBorrar } from '../../lib/helpers';
import { disableContactos } from '../../services/ContactosService';
import TooltipComponent from '../Toolttip/TooltipComponent';

export default function ContactosRows({ contacto }) {


    const handleDisable = (contactoData) => {


        ConfirmacionBorrar('Seguro que quiere deshabilitar este contacto?',
            "Este contacto no aparecera en los registros", () => {

              disableContactos(contactoData);
            })

    }

   // console.log(contacto);

    const { cargo, cod_empresa, empresa, flota, id, nombre, telefono } = contacto



    return (
        <>

              <tr >
                <td>{nombre}</td>
                <td>{empresa}</td>
                <td>{cargo}</td>
                <td>{telefono}</td>
                <td>{flota==='1' ?"Si" :"No"}</td>
                {
                <td className="text-right">  
                   <TooltipComponent text="Editar">
                        <Link to={`/callcenter/contactos/edit/${id}`} >
                            <i className="fas fa-edit mb-1 mb-md-0 btn btn-primary fa-1x"></i></Link>
                    </TooltipComponent>

                    <TooltipComponent text="Deshabilitar">
                       <i 
                       className="fas fa-times-circle ml-2  btn btn-danger fa-1x"
                       onClick={()=>{handleDisable({id,cod_empresa})}}
                       ></i>
                    </TooltipComponent>

                </td>}
            </tr>
        </>
    )
}
