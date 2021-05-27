import React from 'react'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from "react-select";
import { campanasByEmpresaAction } from '../../redux/actions/campanasActions';


import { GetDepartamentosById, getEmpresa } from '../../services/AdministracionService';
import { getCampanaByFilter } from '../../services/campanasService';



const initialState = {

    id_empresa: [],
    id_departamento: [],
    nombre_campana: ""

}
function CampanasFormFiltros({ closeFiltrosComponent }) {
    const [empresaData, setEmpresaData] = useState([]);
    const [datos, setDatos] = useState([])
    const [formValues, setformValues] = useState(initialState)
    const [NombreEmpresa, setNombreEmpresa] = useState("")
    const [departamentos, setDepartamentos] = useState([])
    const { departamentos_supervision } = useSelector(state => state.user.currentUser)
    const { id_empresa, id_departamento, campana_name} = formValues
    const { u_id_empresa, is_superuser, u_usuario } = useSelector(state => state.user.currentUser.userLogin.data[0])

    const { data } = useSelector(state => state.user.currentUser.userLogin)
    const dispatch = useDispatch()


    //u_id_empresa 
    useEffect(() => {
        getEmpresa(setEmpresaData);
    }, [setEmpresaData]);

    useEffect(() => {
        GetDepartamentosById(departamentos_supervision, setDepartamentos);
      }, [setDepartamentos, departamentos_supervision]);

      useEffect(() => {
        
    }, [])


    //Submit

    const handleSubmit = (e) => {
        e.preventDefault()
        getCampanaByFilter(formValues, setDatos)
        closeFiltrosComponent();
    };
   
    useEffect(() => {
        dispatch(campanasByEmpresaAction(datos))
      }, [datos, setDatos])
    //Coloca nombre de empresa en el select del form
    useEffect(() => {
        empresaData.filter(empresa => {

            if (data) {

                if (data[0].u_id_empresa === empresa.e_id) {

                    setNombreEmpresa(empresa.e_nombre_completo)
                    setformValues({ ...formValues, id_empresa:[data[0].u_id_empresa ]})
                }
            }

        })

    }, [empresaData, setNombreEmpresa, setformValues, data])

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-row">
                <div className="col-12 col-md-4 border-right border-left ">

                    <label className="font-weight-bold text-uppercase">Nombre de  la campaña: </label>
                      <input
                         onChange={(e) => setformValues({ ...formValues,  nombre_campana: e.target.value})}
                        type="text"
                        className="form-control"
                        value={campana_name}
                        //required
                        />


                </div>

                <div className="col-12 col-md-4 border-right">
                    <label className="font-weight-bold text-uppercase">Empresa:</label>

                    <select
                        disabled={is_superuser !== '1'}
                        required
                        name="empresa"
                        onChange={(e) => setformValues({ ...formValues, id_empresa: [Number(e.target.value)] })}
                        className="custom-select"
                        defaultValue=""
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
                <div className="col-12 col-md-4 border-right">
                    <label htmlFor="Departamentos" className="font-weight-bold text-uppercase">DEPARTAMENTOS</label>

                    <Select
                        maxMenuHeight={100}
                        onChange={(e => setformValues({ ...formValues, id_departamento: [e.value] }))}                      
                        className="mb-2"
                        placeholder="Seleccione el departamento"
                        options={departamentos.length > 0 && departamentos}
                        defaultValue={""}
                        isMulti={false}
                    />
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

export default CampanasFormFiltros
