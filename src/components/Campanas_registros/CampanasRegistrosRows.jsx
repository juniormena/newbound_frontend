


import useModal from '../../hooks/useModal';
import { descargarExcel } from '../../lib/exportHelpers';

import CampanasRegistrosLogsMain from '../../pages/CampanasRegistros/CampanasRegistrosLogsMainPage';
import CampanasRegistrosHistoricos from '../../pages/CampanasRegistros/CampanasRegistrosHistoricos';


import ModalComponent from '../Modal/ModalComponent';

import TooltipComponent from '../Toolttip/TooltipComponent';
import CampanasRegistroDetalles from './CampanasRegistroDetalles'
import { Link } from 'react-router-dom';

export default function CampanasRegistrosRows({ campana, columns }) {

    const [show2, handleShow2, handleClose2] = useModal();

    const [show3, handleShow3, handleClose3] = useModal();

    const [show4, handleShow4, handleClose4] = useModal();



    //console.log(datos)



    return (
        <>

            {

                <tr style={{ fontSize: "12px" }}>
                    <td>{campana?.nombre_campana}</td>
                    <td>{campana?.nombre}</td>
                    <td>{campana?.codigo_ref}</td>
                    <td>{campana?.nombre_estado}</td>
                    <td>{campana?.reintentos_max}</td>
                    <td>{campana?.reintentos_actuales}</td>

                   
                    <td className='float-right'>
                    <TooltipComponent text="Editar">
                         <Link to={`/callcenter/campanasRegistros/edit/${campana?.id}`} >
                         <i className="fas fa-edit mt-3 mt-lg-1 btn btn-primary fa-1x  mr-2"
                          
                        ></i>
                        </Link>
                    </TooltipComponent>
                    <TooltipComponent text="Ver Contactos">
                        <i className="fas fa-eye mt-3 mt-lg-1 btn btn-secondary fa-1x mr-2"
                            onClick={handleShow2}
                        ></i>
                    </TooltipComponent>
                    <TooltipComponent text="Ver Log">
                        <i className="fas fa-file-alt mt-3 mt-lg-1 btn btn-info px-3 fa-1x  mr-2"
                            onClick={handleShow3}
                        ></i>
                    </TooltipComponent>
                    {/* <TooltipComponent text="Ver Registro Historico">
                        <i className="fas fa-landmark mt-3 mt-lg-1 btn btn-dark fa-1x  mr-2"
                            onClick={handleShow4}
                        ></i>
                    </TooltipComponent> */}
                   
                    </td>

                </tr>
            }


            <ModalComponent size={'lg'} show={show2} handleClose={handleClose2} title="Detalle de Registro" >
                <CampanasRegistroDetalles contactoInfo={campana} />
            </ModalComponent>

            <ModalComponent size={'xl'} show={show3} handleClose={handleClose3} title="Logs de Registro de Campañas" >
            
              <CampanasRegistrosLogsMain campanaRegistro={campana?.id}/>
            </ModalComponent>
{/* 
            <ModalComponent size={'xl'} show={show4} handleClose={handleClose4} title="Registro Historico " >
                <CampanasRegistrosHistoricos campanaRegistro={campana?.id} />
            </ModalComponent> */}
        </>
    )
}
