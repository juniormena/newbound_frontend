import { useState,useEffect } from 'react';
import InputIcon from "../Input/InputIcon";
import { handleChangeInput } from './../../lib/helpers';
import { getDepartamentosSucursalBySucursal, getEmpresa,getEmpresaSucursalesByEmpresa } from './../../services/AdministracionService';
import { useSucursales } from './../../hooks/useSucursales';
import { useEmpresas } from './../../hooks/useEmpresas';
import { useDepartamentos } from './../../hooks/useDepartamentos';
import {hasPermission} from "../../lib/Permissions";
import {editUsersField} from "../../lib/permissionVars";



function EmpresaPersonalTab({ usuario, setUsuario,departamentos, setDepartamentos, currentUser }) {
    const [empresas,setEmpresas] =  useState([]);
    const [sucursales,setSucursales] =  useState([]);

    useEffect(()=>{
        getEmpresa(setEmpresas);
    },[]);

    useEffect(()=>{
        getEmpresaSucursalesByEmpresa({Id:usuario.u_id_empresa},setSucursales);
        setUsuario(prevUsuario=>({...prevUsuario, u_id_sucursal:0, u_id_perfil:0}));
    },[usuario.u_id_empresa, setUsuario]);

    useEffect(()=>{
        getDepartamentosSucursalBySucursal({Id:usuario.u_id_sucursal},setDepartamentos);
        setUsuario(prevUsuario=>({...prevUsuario, u_id_departamento:0}))
    },[usuario.u_id_sucursal, setUsuario, setDepartamentos]);

    const optionsSucursales =  useSucursales(sucursales);

    const optionsEmpresas =  useEmpresas(empresas);

    const optionsDepartamentos =  useDepartamentos(departamentos);

  return (
    <div className="tab-pane active" id="formAgentes" role="tabpanel">
      <div className="card-body row">
        <div className="col-md-6">
            <InputIcon titulo="Empresa *" icon="fa-building" labelClass="font-weight-bold text-uppercase">
              <select disabled={usuario?.u_id!==undefined && !hasPermission(editUsersField,currentUser?.permisosUsuario)}
                      className="custom-select" required value={usuario.u_id_empresa} onChange={(e)=>handleChangeInput(e,'u_id_empresa', usuario, setUsuario)}>
              {empresas.length===0 ? <option>no hay empresas</option> : 
                          <><option value={0}>Selecciona...</option> 
                          {optionsEmpresas}</>
              }
              </select>
            </InputIcon>

            <InputIcon titulo="Sucursal *" icon="fa-building" labelClass="font-weight-bold text-uppercase">
              <select disabled={usuario?.u_id!==undefined && !hasPermission(editUsersField,currentUser?.permisosUsuario)} className="custom-select" required value={usuario.u_id_sucursal} onChange={(e)=>handleChangeInput(e,'u_id_sucursal', usuario, setUsuario)}>
              {sucursales.length===0 ? <option>no hay sucursales</option> : 
                          <><option value={0}>Selecciona...</option> 
                          {optionsSucursales}</>
              }
              </select>
            </InputIcon>

            <InputIcon titulo="Departamento *" icon="fa-building" labelClass="font-weight-bold text-uppercase">
              <select disabled={usuario?.u_id!==undefined && !hasPermission(editUsersField,currentUser?.permisosUsuario)} className="custom-select" required value={usuario.u_id_departamento} onChange={(e)=>handleChangeInput(e,'u_id_departamento', usuario, setUsuario)}>
              {departamentos.length===0 ? <option>no hay departamentos</option> : 
                          <><option value={0}>Selecciona...</option> 
                          {optionsDepartamentos}</>
              }
              </select>
            </InputIcon>

            <InputIcon titulo="Codigo empleado" icon="fa-hashtag" labelClass="font-weight-bold text-uppercase">
              <input disabled={usuario?.u_id!==undefined && !hasPermission(editUsersField,currentUser?.permisosUsuario)} type="text" placeholder="" className="form-control" value={usuario.u_cod_empleado} onChange={(e)=>handleChangeInput(e,'u_cod_empleado', usuario, setUsuario)}/>
            </InputIcon>
          
        </div>
        <div className="col-md-6">
            <InputIcon titulo="Documento de Identidad *" icon="fa-id-card" labelClass="font-weight-bold text-uppercase">
              <input disabled={usuario?.u_id!==undefined && !hasPermission(editUsersField,currentUser?.permisosUsuario)} required type="text" className="form-control" value={usuario.u_id_documento} onChange={(e)=>handleChangeInput(e,'u_id_documento', usuario, setUsuario)}/>
            </InputIcon>

            <InputIcon titulo="Nombre completo *" icon="fa-edit" labelClass="font-weight-bold text-uppercase">
              <input disabled={usuario?.u_id!==undefined && !hasPermission(editUsersField,currentUser?.permisosUsuario)} required type="text" className="form-control" value={usuario.u_nombre_completo} onChange={(e)=>handleChangeInput(e,'u_nombre_completo', usuario, setUsuario)}/>
            </InputIcon>

            <InputIcon titulo="Sexo" icon="fa-mars-double" labelClass="font-weight-bold text-uppercase">
                <select disabled={usuario?.u_id!==undefined && !hasPermission(editUsersField,currentUser?.permisosUsuario)} className="custom-select" required value={usuario.u_sexo} onChange={(e)=>handleChangeInput(e,'u_sexo', usuario, setUsuario)}>
                    <option value="">Selecciona...</option>
                    <option value="Femenino">Femenino</option>  
                    <option value="Masculino">Masculino</option> 
                </select>
            </InputIcon>

            <InputIcon titulo="Fecha de nacimiento *" icon="fa-birthday-cake" labelClass="font-weight-bold text-uppercase">
                <input disabled={usuario?.u_id!==undefined && !hasPermission(editUsersField,currentUser?.permisosUsuario)} required type="date" className="form-control" value={usuario.u_fecha_nacimiento} onChange={(e)=>handleChangeInput(e,'u_fecha_nacimiento', usuario, setUsuario)}/>
            </InputIcon>
            

        </div>
      </div>
    </div>
  );
}

export default EmpresaPersonalTab;