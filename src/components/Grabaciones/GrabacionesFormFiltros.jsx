import React from 'react'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getGrabaciones } from '../../redux/actions/grabacionesActions';

import { getEmpresa } from '../../services/AdministracionService';
import { GrabacionesSelectAll, GrabacionesSelectByAudio } from '../../services/GrabacionesService';

const initialState = {
    name: "",
    empresa_id: ""
}
function GrabacionesFormFiltros({ closeFiltrosComponent }) {
    const [empresaData, setEmpresaData] = useState([]);
    const [datos, setDatos] = useState([])
    const dispatch = useDispatch()
    const [formValues, setformValues] = useState(initialState)
    const [NombreEmpresa, setNombreEmpresa] = useState("")
  
    const { name, empresa_id } = formValues

    const { data } = useSelector(state => state.user.currentUser.userLogin)

    useEffect(() => {

        if (name === "") {

            if (data[0] !== undefined) {

                GrabacionesSelectAll( data[0].u_id_empresa,setDatos)
            }
        }

    }, [name, data])

    //u_id_empresa 
    useEffect(() => {
        getEmpresa(setEmpresaData);
    }, [setEmpresaData]);

    const handleSubmit = (e) => {
        e.preventDefault();


        if (name !== "") {
            GrabacionesSelectByAudio(formValues, setDatos);
            closeFiltrosComponent();
        } else {
            toast.error("El campo nombre no puede quedar vacio", {
                autoClose: 2500,
            })
        }

        if (empresa_id==="") {
            toast.error("Tiene que seleccionar una empresa", {
                autoClose: 2500,
            })
        }
        

    };

    useEffect(() => {

        dispatch(getGrabaciones(datos))
    }, [dispatch, setDatos, datos])

    useEffect(() => {
        empresaData.filter(empresa => {

            if (data) {

                if (data[0].u_id_empresa === empresa.e_id) {

                    setNombreEmpresa(empresa.e_nombre_completo)
                    setformValues({ ...formValues, empresa_id: data[0].u_id_empresa })
                }
            }

        })

    }, [empresaData, setNombreEmpresa, setformValues, data])

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-row">
                <div className="col-12 col-md-6 border-right border-left ">
                    <div className="form-group col-md-12">
                        <label className="font-weight-bold text-uppercase">Nombre de audio: </label>
                        <input
                            onChange={(e) => setformValues({ ...formValues, name: e.target.value.trim() })}
                            type="text"
                            className="form-control"
                            value={name}
                            required
                        />
                    </div>

                </div>
                <div className="col-12 col-md-6 border-right">
                    <label className="font-weight-bold text-uppercase">Empresa:</label>

                    <select
                        //disabled
                        required
                        name="empresa"
                        onChange={(e) => setformValues({ ...formValues, empresa_id: Number(e.target.value) })}
                        className="custom-select"
                        defaultValue=""
                        value={empresa_id}
                    >
                        {empresaData !== undefined &&
                            empresaData.map((emp) => (
                                <React.Fragment key={emp.e_id}>
                                    <option hidden value="">
                                        Seleccione una Empresa
                                     </option>
                                    <option value={emp.e_id}>
                                        {emp.e_nombre_completo}
                                    </option>
                                </React.Fragment>
                            ))}
                    </select>
                </div>
            </div>
            <div className="row ">
                <div className="col-md-12 mt-2">
                    <button type="submit" className="btn btn-danger float-right ">
                        Buscar
                   </button>
                </div>
            </div>
        </form>
    )
}

export default GrabacionesFormFiltros
