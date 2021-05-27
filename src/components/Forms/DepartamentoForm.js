import { useState, useEffect } from 'react';
import { handleChangeInput } from './../../lib/helpers';
import { addSucursalDepartamento, getEmpresa, getEmpresaSucursalesByEmpresa } from './../../services/AdministracionService';
import { useSucursales } from './../../hooks/useSucursales';
import { useEmpresas } from './../../hooks/useEmpresas';
import useLoading from './../../hooks/useLoading';

function DepartamentoForm({username }) {
    const [departamento, setDepartamento] = useState({ds_usuario_ing:username,
    ds_terminal_ing:'NewBound 2.0', ds_id_sucursal:0, ds_descripcion:'', ds_ident_xvoice:'' });
    const [sucursales,setSucursales] =  useState([]);
    const [loading, setLoading] = useLoading();
    const [empresas, setEmpresas] = useState([]);
    const [empresaid, setEmpresaid] = useState({Id:0});

    useEffect(()=>{
        getEmpresa(setEmpresas);
    },[])

    useEffect(()=>{
        getEmpresaSucursalesByEmpresa(empresaid,setSucursales);
    },[empresaid])

    const options =  useSucursales(sucursales);
    const optionsEmpresas =  useEmpresas(empresas);

    return (
        <form onSubmit={(e)=>addSucursalDepartamento(e, departamento,setLoading)}>
            <div className="form-row">

            <div className="form-group col-md-6">
                    <label className="font-weight-bold text-uppercase">Empresa</label>
                    <select className="custom-select" required value={empresaid.Id} onChange={(e)=>handleChangeInput(e,'Id',empresaid, setEmpresaid)}>
                        {empresas.length===0 ? <option>no hay empresas</option> : 
                          <><option value={0}>Selecciona...</option> 
                          {optionsEmpresas}</>
                        }
                    </select>
                </div>

                <div className="form-group col-md-6">
                    <label className="font-weight-bold text-uppercase">Sucursal</label>
                    <select className="custom-select" required value={departamento.ds_id_sucursal} 
                    onChange={(e)=>handleChangeInput(e,'ds_id_sucursal',departamento,setDepartamento)}>
                        {sucursales.length===0 ? <option>no hay sucursales</option> : 
                          <><option value={0}>Selecciona...</option> 
                          {options}</>
                        }
                    </select>
                </div>

                <div className="form-group col-md-6">
                    <label className="font-weight-bold text-uppercase">Descripción</label>
                    <input required type="text" className="form-control" placeholder="Descripción del departamento" value={departamento.ds_descripcion} 
                    onChange={(e)=>handleChangeInput(e,'ds_descripcion',departamento,setDepartamento)}/>
                </div>

            </div>
            <button className="btn btn-primary text-uppercase float-right" disabled={loading}>Guardar</button>
        </form>
    )
}

export default DepartamentoForm;