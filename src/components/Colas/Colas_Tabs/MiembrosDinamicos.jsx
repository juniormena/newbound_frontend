
import { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux'
import Select from "react-select";
import { toast } from 'react-toastify';
import useModal from '../../../hooks/useModal';
import { ColasDescriptions, isMiembroSelected } from '../../../lib/ColasHelper';
import { getUsuariosByDepertamentoDinamicos } from '../../../services/ColasService';


import ModalComponent from '../../Modal/ModalComponent';
import TooltipComponent from '../../Toolttip/TooltipComponent';



function MiembrosDinamicos({ formMiembrosStaticos, setformMiembrosStaticos,
    formValues, setformValues, MemberDataDinamico, setMemberDataDinamico,ValidarDinamico, setValidarDinamico}) {
    const { penalty, paused, wrapuptime } = formMiembrosStaticos
    const { name } = formValues
    const { currentUser } = useSelector(state => state.user)
    const [show, handleShow, handleClose] = useModal();
    const [selectedMember, setSelectedMember] = useState([])
    const [extensionData, setExtensionData] = useState({ interface: [] })
    const [ExensionList, setExtensionList] = useState([])

    const [users, setusers] = useState([])
  

    useEffect(() => {
        getUsuariosByDepertamentoDinamicos(setusers,currentUser)
    }, [setusers, currentUser])

 
    function handleExtensionSelected(extension, usuarioId) {
        
        setExtensionData(prevMiembro => ({ interface: [`PJSIP/${extension.id}`] }))
    }

    function removeExtensionSelected(extension, usuarioId) {
        setExtensionData(prevMiembro => ({ interface: [] }))
    }


    const handMenmbers = (e, select) => {
        setSelectedMember(select)
        console.log(select);
       

        if (select.action==="select-option") {
            setValidarDinamico(true)
        }
    };




   useEffect(() => {


        if (selectedMember.action === "remove-value") {

            setMemberDataDinamico({ ...MemberDataDinamico, data: [...MemberDataDinamico.data.filter(a => a.membername !== selectedMember.removedValue.value)] })
        }
        if (selectedMember.action === "clear") {

            setMemberDataDinamico({ ...MemberDataDinamico, data: [] })
        }
      
        if (show === false) {
  
            setExtensionData(({ interface: [] }))
            setformMiembrosStaticos({
                penalty: 0,
                paused: 0,
                wrapuptime: 0
            })

            
            if (extensionData.interface.length > 0) {
                setValidarDinamico(false)
                setMemberDataDinamico({
                    ...MemberDataDinamico,
                    data: [...MemberDataDinamico.data.concat({
                        queue_name: name,
                        membername: selectedMember.option.value,
                        penalty: penalty,
                        miembro: selectedMember.option.label,
                        paused: paused,
                        wrapuptime: wrapuptime !== 0 ? wrapuptime : formValues.wrapuptime,
                        interface: extensionData.interface.toString()
                    })]
                })

            }


        }
     
    }, [show, setMemberDataDinamico, selectedMember])

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


    return (

        <>
            <div className="tab-pane active  " id="formAgentes" role="tabpanel">
                <span className="text-danger ml-1 py-2 card-body row ">Campos con * son requeridos</span>

                <div className="card-body row">

                    <div className="col-md-6">
                        <label htmlFor="membername" className="font-weight-bold text-uppercase">Miembros Dinámicos</label>
                        <TooltipComponent text={ColasDescriptions.usuario} >
                            <i class="fas fa-question-circle ml-2"></i>
                        </TooltipComponent>
                        <Select
                            // value={membername}
                            maxMenuHeight={200}
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

                    <div className="col-md-6 mb-5">
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
                          selectedMember.length===0
                            ?
                            ""
                            :
                        
                            <button className="btn btn-secondary float-right"
                            onClick={prueba} >Seleccionar Extension</button>
                        }

                    </div>
                    {
                        MemberDataDinamico.data.length>0
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
                                    MemberDataDinamico.data.map(miembro => (
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

            </div>


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
                                                <span className="tr-link" onClick={()=>removeExtensionSelected(extension)}>Quitar</span>
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

export default MiembrosDinamicos
