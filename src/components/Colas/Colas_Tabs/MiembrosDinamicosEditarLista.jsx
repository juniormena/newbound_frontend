

import { Table } from 'react-bootstrap';

import { Link } from 'react-router-dom';

import { toast } from 'react-toastify';


import { ConfirmacionBorrar } from '../../../lib/helpers';

import { deleteMiembroColaDinamico } from '../../../services/ColasMiembrosDinamicos';

import TooltipComponent from '../../Toolttip/TooltipComponent';

function MiembrosDinamicosEditarLista({ MemberDataDinamico, setMemberDataDinamico, colaData }) {

    const DeleteMember = (uniqueid) => {

        ConfirmacionBorrar('Seguro de borrar Miembro?', "Una vez hecho no prodra revertirlo!", () => {
            deleteMiembroColaDinamico(uniqueid)
            let data = MemberDataDinamico.data.filter(member => member.uniqueid !== uniqueid)
            setMemberDataDinamico({ data: data })
            toast.success("Miembro Borrado", {
                autoClose: 2500,
            });
        })
    }
  
    return (
        <>
            <div className="tab-pane active pb-5" id="formAgentes" role="tabpanel">
                <div className="card-body row">

                    {

                        MemberDataDinamico.data.length > 0
                            ?
                            <Table responsive striped hover borderless className="mt-2" id="permisosUsuarioTable">
                                <thead className="text-center  border  m-5">
                                    <tr>
                                        <th className="text-uppercase">Usuario</th>
                                        <th className="text-uppercase">Extension</th>
                                        <th className="text-uppercase">Penalidad</th>
                                        <th className="text-uppercase">Pausa</th>
                                        <th className="text-uppercase">Tiempo Descanso</th>
                                        <th className="text-uppercase">Acciones</th>

                                    </tr>
                                </thead>
                                <tbody className="text-center">
                                    {

                                        MemberDataDinamico.data.map(data => (
                                            <>

                                                <tr key={data.uniqueid}>
                                                    <td>{data.u_nombre_completo}</td>
                                                    <td>{data.interface}</td>
                                                    <td>{data.penalty}</td>
                                                    <td>{data.paused === 0 ? "Si" : "No"}</td>
                                                    <td>{data.wrapuptime}</td>
                                                    <td className="text-right">

                                                        <TooltipComponent text="Editar">
                                                            <Link to={`/administracion/colas-miembros-dinamicos/edit/${data.uniqueid}-${data.u_nombre_completo}`} >

                                                                <i className="fas fa-edit btn btn-primary mb-1 mb-md-0 fa-1x"></i>

                                                            </Link>
                                                        </TooltipComponent>

                                                        <TooltipComponent text="Eliminar">
                                                            <i className="fas fa-minus ml-2 btn btn-danger fa-1x"
                                                                onClick={() => DeleteMember(data.uniqueid)}></i>
                                                        </TooltipComponent>

                                                    </td>
                                                </tr>

                                            </>
                                        ))

                                    }

                                </tbody>
                            </Table>
                            :
                            <div className="col-12 my-2" >
                                <h5 className="text-center ">No Hay Miembros en la cola</h5>
                            </div>
                    }

                    <div className="col-12 p-0" >
                        <Link className='btn btn-secondary float-right '

                            to={colaData[0] !== undefined && `/administracion/colas-miembros-dinamicos/insert/${colaData[0].name}`}
                        >Añadir Miembro Dinámico</Link>
                    </div>
                </div>
            </div>

        </>
    )
}

export default  MiembrosDinamicosEditarLista
