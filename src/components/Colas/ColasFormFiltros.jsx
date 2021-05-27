import React from 'react'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getColasAction } from '../../redux/actions/colasActions';

import { getEmpresa } from '../../services/AdministracionService';
import { GetColasByEmpresa, GetColasWithEmpresa, GetColasWithEmpresaByNameandEmpresa } from '../../services/ColasService';


const initialState = {
  
    id_empresa: "",
    nombre:""
}
function ColasFormFiltros({ closeFiltrosComponent }) {
    const [empresaData, setEmpresaData] = useState([]);
    const [datos, setDatos] = useState([])
    const [formValues, setformValues] = useState(initialState)
    const [NombreEmpresa, setNombreEmpresa] = useState("")
  
    const { id_empresa,nombre } = formValues


    const { data } = useSelector(state => state.user.currentUser.userLogin)
    const dispatch = useDispatch()
  
    //u_id_empresa 
    useEffect(() => {
        getEmpresa(setEmpresaData);
    }, [setEmpresaData]);

    
    
    useEffect(() => {

        if (data[0] !== undefined) {

            if (nombre==="") {
                GetColasByEmpresa(data[0].u_id_empresa, setDatos)
            }
            
        }

    }, [data,nombre])
 
    //Submit

    const handleSubmit = (e) => {
        e.preventDefault()
      GetColasWithEmpresaByNameandEmpresa(formValues,setDatos)
      closeFiltrosComponent();
    };

    useEffect(() => {
        dispatch(getColasAction(datos))
    }, [dispatch, setDatos, datos])

    //Coloca nombre de empresa en el select del form
    useEffect(() => {
        empresaData.filter(empresa => {
            if (data) {
                if (data[0].u_id_empresa === empresa.e_id) {

                    setNombreEmpresa(empresa.e_nombre_completo)
                    setformValues({ ...formValues, id_empresa: data[0].u_id_empresa })
                }
            }
        })

    }, [empresaData, setNombreEmpresa, setformValues, data])

    

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-row">
            <div className="col-12 col-md-6 border-right border-left ">
                  
                        <label className="font-weight-bold text-uppercase">Nombre de cola: </label>
                        <input
                            onChange={(e) => setformValues({ ...formValues, nombre: e.target.value})}
                            type="text"
                            className="form-control"
                            value={nombre}
                            required
                        />
            

                </div>

                <div className="col-12 col-md-6 border-right">
                    <label className="font-weight-bold text-uppercase">Empresa:</label>

                    <select
                        //disabled
                        required
                        name="empresa"
                        onChange={(e) => setformValues({ ...formValues, id_empresa: Number(e.target.value) })}
                        className="custom-select"
                        value={id_empresa}
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

export default ColasFormFiltros
