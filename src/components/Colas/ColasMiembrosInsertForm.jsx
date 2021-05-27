
import { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux'
import Select from "react-select";
import { toast } from 'react-toastify';
import useLoading from '../../hooks/useLoading';
import useModal from '../../hooks/useModal';
import { ColasDescriptions, isMiembroSelected } from '../../lib/ColasHelper';
import { addMiembroColas } from '../../services/ColaMiembrosEstaticos';
import { addMiembroColasDinamicas } from '../../services/ColasMiembrosDinamicos';


import { getUsuarios, getUsuariosByDepertamentoDinamicos, getUsuariosByDepertamentoEstaticos } from '../../services/ColasService'
import ModalComponent from '../Modal/ModalComponent';
import TooltipComponent from '../Toolttip/TooltipComponent';


function ColasMiembrosInsertForm({ formMiembrosStaticos, setformMiembrosStaticos,
    formValues, setformValues, MemberData, setMemberData, miembroInfo,title }) {

        console.log(title);

    const { penalty, paused, wrapuptime } = formMiembrosStaticos
console.log(formMiembrosStaticos);
    const [loading, setLoading] = useLoading()
    const { currentUser } = useSelector(state => state.user)
    const [show, handleShow, handleClose] = useModal();
    const [selectedMember, setSelectedMember] = useState([])
    const [extensionData, setExtensionData] = useState({ interface: [] })
    const [ExensionList, setExtensionList] = useState([])


    const [users, setusers] = useState([])
    useEffect(() => {
        if (title==="Insertar Miembros Estaticos") {
            getUsuariosByDepertamentoEstaticos(setusers, currentUser)
        }

        if (title==="Insertar Miembros Dinamicos") {
            getUsuariosByDepertamentoDinamicos(setusers, currentUser)

        }
     
    
    }, [setusers, currentUser])



    function handleExtensionSelected(extension, usuarioId) {
        setExtensionData(prevMiembro => ({ interface: [`PJSIP/${extension.id}`] }))
    }

    function removeExtensionSelected(extension, usuarioId) {
        setExtensionData(prevMiembro => ({ interface: [] }))
    }


    const handMenmbers = (e, select) => {

        setSelectedMember(select)

    };


    useEffect(() => {


        if (selectedMember.action === "remove-value") {

            setMemberData({ ...MemberData, data: [...MemberData.data.filter(a => a.membername !== selectedMember.removedValue.value)] })
        }
        if (selectedMember.action === "clear") {

            setMemberData({ ...MemberData, data: [] })
        }

        if (show === false) {

            setExtensionData(({ interface: [] }))
            setformMiembrosStaticos({
                penalty: 0,
                paused: 0,
                wrapuptime: 0
            })


            if (extensionData.interface.length > 0) {
             
                setMemberData({
                    ...MemberData,
                    data: [...MemberData.data.concat({
                        queue_name: miembroInfo,
                        membername: selectedMember.option.value,
                        miembro: selectedMember.option.label,
                        penalty: penalty,
                        paused: paused,
                        wrapuptime: wrapuptime,
                        interface: extensionData.interface.toString()
                    })]
                })

            }

        }

    }, [show, setMemberData, selectedMember])


    useEffect(() => {

        if (selectedMember.option !== undefined) {
            let prueba = Array.from(selectedMember.option.extension)

            if (prueba.length > 0) {
                setExtensionList({
                    prueba,
                    label: selectedMember.option.label
                })
            }
            else {
                setExtensionList(
                    {
                        prueba,
                        label: ""
                    }
                )
            }
        }

    }, [show, setSelectedMember])


    const prueba = (e) => {
        e.preventDefault()


        if (selectedMember.option !== undefined) {

            if (selectedMember.option.extension.length > 0) {

                handleShow()
            }
            else {
                toast.error("Usuario Seleccionado no tiene Extension, elija otro Usuario", { autoClose: 2500 })
            }
        }
        else {
            toast.error("Primero seleccione un miembro", { autoClose: 2500 })
        }

    }


    const handleSubmit = (e) => {
        e.preventDefault()

        if (MemberData.data.length === 0) {
            toast.error("No Puede Eviar Campos vacios", {
                autoClose: 2500
            })
        } else {

            if (title==="Insertar Miembros Estaticos") {
                addMiembroColas(MemberData.data, setLoading)
            }
    
            if (title==="Insertar Miembros Dinamicos") {
               addMiembroColasDinamicas(MemberData.data, setLoading)
    
            }
         
           
         
        }

    }

 
    return (

        <>
            <form onSubmit={handleSubmit} >


                <div className="card-body row">

                    <div className="col-md-6">
                        <label htmlFor="membername" className="font-weight-bold text-uppercase">Miembros</label>
                        <TooltipComponent text={ColasDescriptions.usuario} >
                            <i class="fas fa-question-circle ml-2"></i>
                        </TooltipComponent>
                        <Select

                            onChange={handMenmbers}
                            isMulti
                            className="mb-2"
                            placeholder="Seleccione los miembros"
                            options={users}
                        />

                        <label htmlFor="penalty" className="font-weight-bold text-uppercase">Penalidad </label>
                        <TooltipComponent text={ColasDescriptions.penalty} >
                            <i class="fas fa-question-circle ml-2"></i>
                        </TooltipComponent>
                        <input

                            type="number"
                            value={penalty}
                            className="form-control mb-2"
                            onChange={(e) => setformMiembrosStaticos({ ...formMiembrosStaticos, penalty: Number(e.target.value) })}
                        />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="paused" className="font-weight-bold text-uppercase">Pausa</label>
                        <TooltipComponent text={ColasDescriptions.pausa} >
                            <i class="fas fa-question-circle ml-2"></i>
                        </TooltipComponent>
                        <select
                            value={paused}
                            onChange={(e) => setformMiembrosStaticos({ ...formMiembrosStaticos, paused: Number(e.target.value) })}
                            className="custom-select mb-2"
                            defaultValue=""
                        >
                            <option hidden value="">Seleccione una Opcion</option>
                            <option value={1}>Si</option>
                            <option value={0}>No</option>

                        </select>

                        <label htmlFor="wrapuptime" className="font-weight-bold text-uppercase">
                            Tiempo descanso Agente *
                        <TooltipComponent text={ColasDescriptions.wrapuptime} >
                                <i class="fas fa-question-circle ml-2"></i>
                            </TooltipComponent>
                        </label>

                        <input
                            type="number"
                            value={wrapuptime}
                            className="form-control mb-2"
                            onChange={(e) => setformMiembrosStaticos({ ...formMiembrosStaticos, wrapuptime: Number(e.target.value) })}
                        />
                        {
                            selectedMember.length=== 0
                            ?
                            ""
                            :
                        
                            <button className="btn btn-secondary float-right"
                            onClick={prueba} >Seleccionar Extension</button>
                        }

                    </div>

                    {
                        MemberData.data.length>0
                        &&
                        <div className="col-12 mt-2">
                        <table className="table table-bordered text-center  meLista">
                            <thead>
                                <tr>
                                    <th>Usuario</th>
                                    <th>Extension</th>
                                </tr>
                            </thead>
                            <tbody >
                                {
                                    MemberData.data.map(miembro => (
                                        <tr>
                                            <td>{miembro.miembro}</td>
                                            <td>{miembro.interface}</td>
                                        </tr>
                                    ))

                                }

                            </tbody>

                        </table>
                    </div>
                    }
                </div>
                <button className="btn btn-primary float-right" disabled={loading}>Guardar</button>
            </form>


            <ModalComponent show={show} handleClose={handleClose} title="Extensiones Disponibles">
                <div className="card">
                    <Table responsive striped hover borderless className="mt-2" id="permisosUsuarioTable">
                        <thead className="text-center  border-bottom border-info m-5">
                            <tr>
                                <th className="text-uppercase">Usuario</th>
                                <th className="text-uppercase">Extension</th>
                                <th className="text-uppercase"></th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {

                                ExensionList.prueba !== undefined
                                &&

                                ExensionList.prueba.map(extension => (
                                    <>

                                        <tr key={extension.id}

                                            className={`${isMiembroSelected(extensionData.interface, `PJSIP/${extension.id}`) ? 'tr-selected text-white' : ''}`}
                                        >
                                            <td>{ExensionList.label}</td>
                                            <td>{extension.id}</td>
                                            <td>{isMiembroSelected(extensionData.interface, `PJSIP/${extension.id}`) ?
                                                <span className="tr-link" onClick={() => removeExtensionSelected(extension)}>Quitar</span>
                                                :
                                                <span className="tr-link" onClick={() => handleExtensionSelected(extension, selectedMember.option.value)}>Asignar</span>}
                                            </td>

                                        </tr>

                                    </>
                                ))

                            }

                        </tbody>
                    </Table>
                </div>
            </ModalComponent>
        </>
    )
}

export default ColasMiembrosInsertForm
