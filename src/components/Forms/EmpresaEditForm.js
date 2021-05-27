import { useState, useEffect } from 'react';
import { updateEmpresa } from '../../services/AdministracionService';
import { handleChangeInput, isValidExtension2 } from './../../lib/helpers';
import useLoading from './../../hooks/useLoading';

function EmpresaEditForm({ empresaSelected, username }) {
    const [empresa, setEmpresa] = useState({e_id:0,e_usuario_ing:username, e_terminal_ing:'Newbound 2.0',
    e_descripcion:'', e_nombre_completo:'', e_rnc:'', e_rango_extension:'', 
    e_contexto:'', e_contrasena_extension:'',modificado:new Date()});
    const [loading, setLoading] = useLoading();

    useEffect(()=>{
        setEmpresa({e_id:empresaSelected[0].e_id,e_usuario_ing:username, e_terminal_ing:'Newbound 2.0',
            e_descripcion:empresaSelected[0].e_descripcion, 
            e_nombre_completo:empresaSelected[0].e_nombre_completo, e_rnc:empresaSelected[0].e_rnc, e_rango_extension:empresaSelected[0].e_rango_extension, 
            e_contexto:empresaSelected[0].e_contexto, e_contrasena_extension:empresaSelected[0].e_contrasena_extension,modificado:new Date()})
    },[empresaSelected])
    return (
        <form onSubmit={(e)=>updateEmpresa(e,empresa,setLoading)}>
            <div className="form-row">

                <div className="form-group col-md-6">
                    <label className="font-weight-bold text-uppercase">Nombre</label>
                    <input required type="text" className="form-control" placeholder="Nombre de la empresa" value={empresa.e_nombre_completo} 
                    onChange={(e)=>handleChangeInput(e,'e_nombre_completo',empresa,setEmpresa)}/>
                </div>

                <div className="form-group col-md-6">
                    <label className="font-weight-bold text-uppercase">Descripción</label>
                    <input required type="text" className="form-control" placeholder="Descripción de la empresa" value={empresa.e_descripcion}
                    onChange={(e)=>handleChangeInput(e,'e_descripcion',empresa,setEmpresa)}/>
                </div>

            </div>
            <div className="form-row">

                <div className="form-group col-md-6">
                    <label className="font-weight-bold text-uppercase">Rnc</label>
                    <input required type="text" className="form-control" placeholder="Rnc de la empresa" maxLength="11" value={empresa.e_rnc}
                    onChange={(e)=>handleChangeInput(e,'e_rnc',empresa,setEmpresa)}/>
                </div>

                <div className="form-group col-md-6">
                    <label className="font-weight-bold text-uppercase">Rango extensión</label>
                    <input type="text" className="form-control" placeholder="Rango de extensiones de la empresa" value={empresa.e_rango_extension}
                     onChange={(e)=>handleChangeInput(e,'e_rango_extension',empresa,setEmpresa)}/>
                     {isValidExtension2(empresa.e_rango_extension) ? <small className="form-text text-success">Esta extension es valida</small> : 
                     <small className="form-text text-danger">Ejemplo: 1xxxx ó 12xxxx</small>}
                </div>

                <div className="form-group col-md-6">
                    <label className="font-weight-bold text-uppercase">Contexto</label>
                    <input type="text" className="form-control" placeholder="Contexto de la empresa" value={empresa.e_contexto}
                    onChange={(e)=>handleChangeInput(e,'e_contexto',empresa,setEmpresa)}/>
                </div>

                <div className="form-group col-md-6">
                    <label className="font-weight-bold text-uppercase">Contraseña de extensiones</label>
                    <input type="password" className="form-control" placeholder="Contraseña de extensiones de la empresa" value={empresa.e_contrasena_extension}
                    onChange={(e)=>handleChangeInput(e,'e_contrasena_extension',empresa,setEmpresa)}/>
                </div>

            </div>
            <button className="btn btn-primary text-uppercase float-right" disabled={loading || isValidExtension2(empresa.e_rango_extension) ? false: true}>Guardar</button>
        </form>
    )
}

export default EmpresaEditForm;
