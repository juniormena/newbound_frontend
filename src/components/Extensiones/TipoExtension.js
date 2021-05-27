import React,{ useEffect,useState } from "react";
import { useEmpresas } from "../../hooks/useEmpresas";
import { getEmpresa } from "../../services/AdministracionService";
import { handleChangeInput } from '../../lib/helpers';

function TipoExtension({ extension, setExtension, completed, setCompleted, stepper }) {
    const [empresas,setEmpresas] =  useState([]);
    const extensionTypes = [{Id:1, name:'SIP Generico',value:'no-nat'}, {Id:2, name:'WEBRTC SIP',value:'webrtc-wss'}];

    const optionsExtensions =  extensionTypes.map(extensionType=> <option key={extensionType.Id} value={extensionType.value}> {extensionType.name} </option>);

    useEffect(()=>{
        getEmpresa(setEmpresas);
    },[]);

    useEffect(()=>{
        try{
        let { name } = extensionTypes.find(extensionType=> extensionType.value === extension.transport);
        setExtension(prevExtension=>({...prevExtension, tipo_extension:name}))
        }catch(err){}
    },[extension.transport])

    const optionsEmpresas =  useEmpresas(empresas);

    return (
    <div className="form-row">
        <div className="form-group col-md-6">
            <label className="font-weight-bold text-uppercase">TIPO DE EXTENSION</label>
            <select className="custom-select" required value={extension.transport} onChange={(e)=>handleChangeInput(e,'transport',extension,setExtension)}>
                {<><option value={0}>Selecciona...</option> 
                    {optionsExtensions}</>}
            </select>
        </div>

        <div className="form-group col-md-6">
            <label className="font-weight-bold text-uppercase">Empresa</label>
            <select className="custom-select" required value={extension.id_empresa} onChange={(e)=>handleChangeInput(e,'id_empresa',extension,setExtension)}>
                {empresas.length===0 ? <option>no hay empresas</option> : 
                    <><option value={0}>Selecciona...</option> 
                    {optionsEmpresas}</>
                }
            </select>
        </div>
        <div className="d-flex justify-content-end w-100"><button className="btn btn-primary" onClick={() => {stepper.current.next();setCompleted(!completed);}} 
                disabled={extension.transport === "0" || extension.id_empresa === "0" ? true : false}>
            SIGUIENTE <i className="fa fa-arrow-right"></i>
        </button></div>
    </div>

    )
}

export default React.memo(TipoExtension, (prevProps, newProps)=> prevProps.extension === newProps.extension);
