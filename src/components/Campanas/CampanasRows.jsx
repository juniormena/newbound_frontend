import { Link } from 'react-router-dom';
import useLoading from '../../hooks/useLoading';
import useModal from '../../hooks/useModal';
import { formatDate2, setHoraMinutosSegundos } from '../../lib/dateHelpers';
import { ConfirmacionBorrar } from '../../lib/helpers';
import CampanasRegistros from '../../pages/CampanasRegistros/CampanasRegistros';
import { disableCampana } from '../../services/campanasService';
import CampanasRegistroDetalles from '../Campanas_registros/CampanasRegistroDetalles';
import ModalComponent from '../Modal/ModalComponent';


import TooltipComponent from '../Toolttip/TooltipComponent';
import CampanaMembers from "./CampanaMembers";

export default function CampanasRows({ campana }) {

     const [show, handleShow, handleClose] = useModal();
    const [show1, handleShow1, handleClose1] = useModal();
     const [loading, setLoading] = useLoading();
    const handleDisable = (id,) => {

        ConfirmacionBorrar('Seguro que quiere Deshabilitar la campaña?',
            "Esta campaña no aparecera en los registros", () => {
                disableCampana(id,setLoading)
            })
    }

    return (
        <>

            <tr style={{ fontSize: "12px" }} >
                <td>{campana?.nombre}</td>
                <td>{campana?.nombre_empresa}</td>
                <td>{campana?.nombre_departamento}</td>
                <td>{formatDate2(campana?.fecha_inicio)}</td>
                <td>{formatDate2(campana?.fecha_fin)}</td>
                <td>{setHoraMinutosSegundos(campana?.hora_inicio.hours, campana?.hora_inicio.minutes, campana?.hora_inicio.seconds)}</td>
                <td>{setHoraMinutosSegundos(campana?.hora_fin.hours, campana?.hora_fin.minutes, campana?.hora_fin.seconds)}</td>
                <td>{campana?.troncal}</td>
                <td>{campana?.contexto}</td>
                <td>{campana?.nombre_cola}</td>
                <td>{campana?.reintentos_max}</td>
                {
                    <td className="text-right d-block d-md-flex align-items-start">
                        <TooltipComponent text="Editar">
                            <Link to={`/callcenter/campanas/edit/${campana?.id}`} >
                                <i className="fas fa-edit mb-1 btn btn-primary fa-1x"/></Link>
                        </TooltipComponent>

                        {/*      <TooltipComponent text="Ver Registros">

                        <Link to={`/callcenter/campanasregistros/${campana?.id}`} >
                                <i className="fas fa-eye mb-1 btn btn-secondary fa-1x ml-2 "></i></Link>
                         
                        </TooltipComponent> */}


                        <TooltipComponent text="Ver Registros">

                                <i className="fas fa-eye mb-1 btn btn-secondary fa-1x ml-2 " onClick={handleShow}/>

                        </TooltipComponent>

                        <TooltipComponent text="Deshabilitar">
                            <i className="fas fa-times-circle ml-2  btn btn-danger fa-1x" onClick={() => handleDisable(campana?.id)}/>
                        </TooltipComponent>

                        {/*<TooltipComponent text="Asignar usuarios">
                            <i className="fas fa-list ml-2  btn btn-danger fa-1x" onClick={handleShow1}/>
                        </TooltipComponent>*/}

                    </td>}
            </tr>

            <ModalComponent  size={'xl'} show={show} handleClose={handleClose}  title="Registro de Campañas" >
                <CampanasRegistros campanaRegistro={campana?.id} />
            </ModalComponent>

            {/*show1 ? <CampanaMembers show={show1} titulo={`Miembros de la campaña ${campana?.nombre}`} handleClose={handleClose1}/> : <></>*/}
        </>
    )
}
