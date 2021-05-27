import { useEffect, useState } from 'react';
import {getEmpresaById, getUsuarioByEmpresa, getUsuarioById, updateExtension} from '../../services/AdministracionService';
import { handleChangeInput, isValidExtension } from './../../lib/helpers';
import { useUsuarios } from './../../hooks/useUsuario';
import { addExtension } from './../../services/AdministracionService';
import useLoading from './../../hooks/useLoading';

function DatosExtension({ extension, setExtension, completed, setCompleted, stepper, update }) {
    const [usuarios, setUsuarios] = useState([]);
    const [usuario,setUsuario] = useState([]);
    const [empresa, setEmpresa] = useState([]);
    const [rangoEx, setRangoEx] = useState('');
    const [callerId, setCallerId] = useState({active: true})
    const [loading, setLoading] = useLoading();

    useEffect(()=>{
        getUsuarioByEmpresa({Id:extension.id_empresa},setUsuarios)
    },[extension.id_empresa]);

    useEffect(()=>{
        getUsuarioById({Id:extension.usuario_id}, setUsuario);
    },[extension.usuario_id]);

    useEffect(()=>{
        let { u_usuario } = usuario[0] || '';
        setExtension(prevExtension=>({...prevExtension,callerid:u_usuario ? usuario[0].u_nombre_completo : ''}));
    },[extension.usuario_id, setExtension, usuario]);

    useEffect(()=>{
        getEmpresaById({Id:extension.id_empresa}, setEmpresa);
    },[extension.id_empresa])

    useEffect(()=>{
        let { e_rango_extension } = empresa[0] || '';
        setRangoEx(`${e_rango_extension ? empresa[0].e_rango_extension : ''}`)
    },[extension.id_empresa, setRangoEx,empresa])

    const optionsUsuarios=  useUsuarios(usuarios);

    return (
        <>
        <div className="form-row">

        <div className="form-group col-md-6">
            <label className="font-weight-bold text-uppercase">Usuario</label>
            <select className="custom-select" required value={extension.usuario_id} onChange={(e)=>handleChangeInput(e,'usuario_id',extension,setExtension)}>
                {<><option value={0}>Selecciona...</option> 
                    {optionsUsuarios}</>}
            </select>
        </div>

        <div className="form-group col-md-6">
            <label className="font-weight-bold text-uppercase">Numero de extension</label>
            <input type="text" className="form-control" value={extension.id} onChange={(e)=>handleChangeInput(e, 'id', extension, setExtension)}
            placeholder={`Nomenclatura de extensiones = ${rangoEx}`} maxLength={rangoEx.length} disabled={update ? true : false}/>
             {isValidExtension(extension.id) ? <small className="form-text text-danger">Las extenciones no contienen letras</small> : <></>}

             <div className="form-check pt-1">
                <input type="checkbox" className="form-check-input mt-1" value={extension.grabar} 
                checked={extension.grabar} onChange={(e)=>handleChangeInput(e,'grabar', extension, setExtension)}/>
                <label className="form-check-label text-uppercase">¿Extension puede ser gabrada?</label>
            </div>
        </div>


       
    </div>
    <div className="form-row">

        <div className="form-group col-md-6">
            <label className="font-weight-bold text-uppercase">Caller id</label>
            <input type="text" className="form-control" value={extension.callerid} disabled={callerId.active}
            onChange={(e)=>handleChangeInput(e, 'callerid', extension, setExtension)}/>
        </div>

    </div>
    <div className="form-check">
            <input type="checkbox" className="form-check-input mt-1" value={callerId.active} checked={callerId.active} onChange={(e)=>handleChangeInput(e,'active', callerId, setCallerId)}/>
            <label className="form-check-label text-uppercase">defualt caller id</label>
    </div>

    <button className="btn btn-primary" onClick={() => {
        stepper.current.previous();
        setCompleted(!completed);
        }}>
        <i className="fa fa-arrow-left"></i> ANTERIOR
    </button>

    <button type="submit" className="btn btn-primary text-uppercase ml-3"
        onClick={() => update ? updateExtension(Object.assign({}, extension, {defaultCallerId:callerId.active}), setLoading)
            : addExtension(Object.assign({}, extension, {defaultCallerId:callerId.active}),setLoading)} disabled={isValidExtension(extension.id) || loading ? true : false}>
        Guardar
    </button>
</>
    )
}

export default DatosExtension;
  
