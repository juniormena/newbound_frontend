import React from 'react'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getColasRulesAction } from '../../redux/actions/colasActions';

import { getEmpresa } from '../../services/AdministracionService';
import { getColasByRuleNameAndEmpresa, getColasRuleByEmpresa } from '../../services/ColasRulesService';


const initialState = {

    id_empresa: 0,
    rule_name: ""
}
function ColasRulesFormFiltros({ closeFiltrosComponent }) {
    const [empresaData, setEmpresaData] = useState([]);
    const [datos, setDatos] = useState([])
    const [formValues, setformValues] = useState(initialState)
    const [NombreEmpresa, setNombreEmpresa] = useState("")
    const { id_empresa, rule_name } = formValues

    const { data } = useSelector(state => state.user.currentUser.userLogin)
    const dispatch = useDispatch()


    //u_id_empresa 
    useEffect(() => {
        getEmpresa(setEmpresaData);
    }, [setEmpresaData]);


    useEffect(() => {

        if (data[0] !== undefined) {

            if (rule_name==="") {
                 getColasRuleByEmpresa(data[0].u_id_empresa, setDatos)
            }
            
        }

    }, [data,rule_name])


    //Submit

    const handleSubmit = (e) => {
        e.preventDefault()
        getColasByRuleNameAndEmpresa(formValues, setDatos)
        closeFiltrosComponent();
    };
    useEffect(() => {
        dispatch(getColasRulesAction(datos))
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
                    
                        <label className="font-weight-bold text-uppercase">Nombre de Regla: </label>
                        <input
                            onChange={(e) => setformValues({ ...formValues, rule_name: e.target.value})}
                            type="text"
                            className="form-control"
                            value={rule_name}
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
                        defaultValue=""
                        value={id_empresa}
                    >
                        {empresaData !== undefined &&
                            empresaData.map((emp) => (
                                <>
                                    <option hidden value="">
                                        Seleccione una Empresa
                                     </option>
                                    <option value={emp.e_id}>
                                        {emp.e_nombre_completo}
                                    </option>
                                </>
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

export default ColasRulesFormFiltros
