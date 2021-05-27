import { useState, useEffect } from 'react';
import { handleChangeInput } from './../../lib/helpers';
import { getEmpresa, updateSucursalEmpresa  } from './../../services/AdministracionService';
import { useEmpresas } from './../../hooks/useEmpresas';
import useLoading from './../../hooks/useLoading';

function SucursalEditForm({ sucursalSelected, username }) {
    const [sucursal, setSucursal] = useState({se_usuario_ing:username, se_terminal_ing:'Newbound 2.0',
    se_id:0, se_descripcion:'',se_id_empresa:0, modificado: new Date()});
    const [empresas,setEmpresas] =  useState([]);
    const [loading, setLoading] = useLoading();

    useEffect(()=>{
        getEmpresa(setEmpresas);
    },[]);

    /*console.log(sucursal)*/

    useEffect(()=>{
        setSucursal({se_usuario_ing:username, se_terminal_ing:'Newbound 2.0',
        se_id:sucursalSelected[0].se_id, se_descripcion:sucursalSelected[0].se_descripcion,se_id_empresa:sucursalSelected[0].se_id_empresa, modificado: new Date()})
    },[sucursalSelected])

    const options =  useEmpresas(empresas);
    return (
        <form onSubmit={(e)=>updateSucursalEmpresa(e,sucursal,setLoading)}>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label className="font-weight-bold text-uppercase">Empresa</label>
                    <select className="custom-select" value={sucursal.se_id_empresa} onChange={(e)=>handleChangeInput(e,'se_id_empresa',sucursal,setSucursal)} required>
                        {empresas.length===0 ? <option>no hay empresas</option> : 
                          <><option value={0}>Selecciona...</option> 
                          {options}</>
                        }
                    </select>
                </div>

                <div className="form-group col-md-6">
                    <label className="font-weight-bold text-uppercase">Descripción</label>
                    <input required type="text" className="form-control" placeholder="Descripción de la sucursal" value={sucursal.se_descripcion}
                    onChange={(e)=>handleChangeInput(e,'se_descripcion',sucursal,setSucursal)}/>
                </div>

            </div>
            <button className="btn btn-primary text-uppercase float-right" disabled={loading}>Guardar</button>
        </form>
    )
}

export default SucursalEditForm;