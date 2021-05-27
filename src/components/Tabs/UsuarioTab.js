import { useState, useEffect, Fragment } from 'react';
import InputCheck from '../Input/InputCheck';
import InputIcon from './../Input/InputIcon';
import { convertImageToBase64, handleChangeInput, isWeakClaveLlamada, ValidClaveLlamada } from './../../lib/helpers';
import { getPerfilByEmpresa, getExtensionesWithoutUserNullByEmpresa } from './../../services/AdministracionService';
import { usePerfiles } from './../../hooks/usePerfiles';
import Select from 'react-select';
import user from '../../assets/images/defaul-profile.png';
import useModal from './../../hooks/useModal';
import {GetColasByEmpresa} from "../../services/ColasService";
import DepartamentosSupervision from "../Supervisiones/DepartamentosSupervision";
import ColasSupervision from "../Supervisiones/ColasSupervision";
import { getCampanasByEmpresa, getCampanasSupervisada } from '../../services/campanasService';
import CampanasSupervision from '../Supervisiones/CampanasSupervision';
import {hasPermission} from "../../lib/Permissions";
import {
    editUsersField,
    userImage,
    activoFechaUser,
    extensionUser,
    perfilUser,
    llamadaINI, keyCallPermiso
} from "../../lib/permissionVars";

function UsuarioTab({ usuario, setUsuario, departamentos, perfilSelected, setPerfilselected, colas, setColas,campanas,setCampanas,
    currentUser }) {
    //console.log(usuario)
    const [foto, setFoto] = useState('');
    const [perfiles, setPerfiles] = useState([]);
    const [extensiones, setExtensiones] = useState([]);
    const [show, handleShow, handleClose] = useModal();
    const [show2, handleShow2, handleClose2] = useModal();
    const [show3, handleShow3, handleClose3] = useModal();

    let extensionsOptions = [];

    if(extensiones.length!==0){
        extensiones.map(extension=> extensionsOptions.push({label:extension.id, value:extension.id}))
    }

    function getfoto(e){
        //console.log(URL.createObjectURL(e.target.files[0]));
        setFoto(URL.createObjectURL(e.target.files[0]));
    }

    useEffect(()=>{
        getPerfilByEmpresa({Id:usuario.u_id_empresa},setPerfiles);
    },[usuario.u_id_empresa]);

    useEffect(()=>{
        GetColasByEmpresa(usuario.u_id_empresa, setColas)
    },[usuario.u_id_empresa])

    useEffect(() => {
        getCampanasSupervisada(setCampanas,currentUser?.campanas_supervision?.data)
        
    }, [usuario.u_id_empresa,setCampanas])

    

    useEffect(()=>{
        getExtensionesWithoutUserNullByEmpresa({Id:usuario.u_id_empresa}, setExtensiones);
        
    },[usuario.u_id_empresa])

    const optionsPerfiles = usePerfiles(perfiles);

    useEffect(()=>{
        convertImageToBase64(foto, function(imageConverted){
            setUsuario(prevPerfil=>({...prevPerfil, u_imagen:imageConverted}));
        })
    },[foto, setUsuario])

    useEffect(()=>{
        setFoto(usuario.u_imagen)
    },[usuario.u_imagen])

    function handleSelected(selectedOptions){
        setUsuario(prevUsuario=>({...prevUsuario, u_extensiones:selectedOptions}));
    }

   /* function handleDepartamentsSelected(selectedOptions){
        setUsuario(prevUsuario=>({...prevUsuario, departamentos_supervisar:selectedOptions}));
    }*/

    function handleDepartamentsSelected2(departamento){
        setUsuario(prevUsuario=>({...prevUsuario, departamentos_supervisar:[...prevUsuario.departamentos_supervisar,
            departamento.ds_id]}));
    }

    function removeDepartamentSelected(departamento){
        let array = [...usuario.departamentos_supervisar];
        const index = array.indexOf(departamento.ds_id);
        if(index !== -1){
            array.splice(index, 1);
            setUsuario(prevUsuario=>({...prevUsuario, departamentos_supervisar:array}));
        }
    }

    
    function handleCampanasSelected(campana){
        setUsuario(prevUsuario=>({...prevUsuario, campanas:[...prevUsuario.campanas,
            campana.id.toString()]}));
    }

    function removeCampanasSelected(campana){
        let array = [...usuario.campanas];
        const index = array.indexOf(campana.id.toString());
        if(index !== -1){
            array.splice(index, 1);
            setUsuario(prevUsuario=>({...prevUsuario, campanas:array}));
        }
    }

    function handleColaSelected(cola){
        setUsuario(prevUsuario=>({...prevUsuario, colas_supervision:[...prevUsuario.colas_supervision,
                cola.name]}));
    }

    function removeColaSelected(cola){
        let array = [...usuario.colas_supervision];
        const index = array.indexOf(cola.name);
        if(index !== -1){
            array.splice(index, 1);
            setUsuario(prevUsuario=>({...prevUsuario, colas_supervision:array}));
        }
    }


  return (
      <Fragment>
    <div className="tab-pane active" id="formAgentes" role="tabpanel">
      <div className="card-body row">
        <div className="col-md-4">
                <center><img className="w-50 mb-2" src={foto} alt="user_foto" onError={(e)=>e.target.src=`${user}`}
                />
                </center>
                <div className="custom-file mt-3">
                    <input disabled={usuario?.u_id!==undefined && !hasPermission(userImage,currentUser?.permisosUsuario)} accept="image/png, image/jpeg" type="file" className="custom-file-input" id="customFileLang" onChange={getfoto}/>
                    <label className="custom-file-label " htmlFor="customFileLang">Seleccionar Foto</label>
                </div>
        </div>
        <div className="col-md-4">

            <InputIcon titulo="Nombre de usuario *" icon="fa-user" labelClass="font-weight-bold text-uppercase">
              <input disabled={usuario?.u_id!==undefined && !hasPermission(editUsersField,currentUser?.permisosUsuario)} required type="text" placeholder="" className="form-control" value={usuario.u_usuario} onChange={(e)=>handleChangeInput(e,'u_usuario', usuario, setUsuario)}/>
            </InputIcon>

            <InputIcon titulo="contraseña  *" icon="fa-lock" labelClass="font-weight-bold text-uppercase">
              <input disabled={usuario?.u_id!==undefined && !hasPermission(editUsersField,currentUser?.permisosUsuario)} required type="password" placeholder="" className="form-control" value={usuario.u_contrasena} onChange={(e)=>handleChangeInput(e,'u_contrasena', usuario, setUsuario)}/>
            </InputIcon>
        
            <div className="form-group">
                <label className="font-weight-bold text-uppercase">perfil  *</label>
                <div className="input-group">
                    <span className="input-group-prepend">
                        <span className="input-group-text">
                            <i className={`fa fa-male`} aria-hidden="true"/>
                        </span>
                    </span>
                    <select disabled={usuario?.u_id!==undefined && !hasPermission(perfilUser,currentUser?.permisosUsuario)} className="custom-select" required value={usuario.u_id_perfil} onChange={(e)=>{
                    handleChangeInput(e,'u_id_perfil', usuario, setUsuario);
                    setPerfilselected(perfiles.find(perfil=>{return perfil.p_id === parseInt(e.target.value)})|| {p_es_supervisor: null})
                    //handleShow()
                    if(perfilSelected.p_es_supervisor !==1){setUsuario(prevUsuario=>({...prevUsuario, departamentos_supervisar:[]}));}}}>        
                    {perfiles.length===0 ? <option>no hay perfiles</option> : 
                          <><option value={0}>Selecciona...</option> 
                          {optionsPerfiles}</>
                    }
                    </select>
                </div>
                {perfilSelected.p_es_supervisor === 1 && 
                (<><span className="tr-link text-info" onClick={handleShow}><i className="fa fa-users"/> Departamentos a supervisar</span>
                    <span/>
                    <span className="tr-link text-info ml-1" onClick={handleShow2}><i className="fa fa-street-view"/> Colas a supervisar</span>
                    <span/>
                   
                    <p className="tr-link text-info ml-1" onClick={handleShow3}><i className="fas fa-bullhorn"></i> Campaña a supervisar</p>
                </>)}
            </div>

            <InputIcon titulo="Correo" icon="fa-at" labelClass="font-weight-bold text-uppercase">
                <input disabled={usuario?.u_id!==undefined && !hasPermission(editUsersField,currentUser?.permisosUsuario)} type="text" placeholder="" className="form-control" value={usuario.u_correo} onChange={(e)=>handleChangeInput(e,'u_correo', usuario, setUsuario)}/>
            </InputIcon>

            <InputIcon titulo="Extensiones" icon="fa-phone" labelClass="font-weight-bold text-uppercase">
                <Select
                    isMulti
                    options={extensionsOptions}
                    value={usuario.u_extensiones}
                    onChange={handleSelected}
                    isDisabled={usuario?.u_id!==undefined && !hasPermission(extensionUser,currentUser?.permisosUsuario)}
                />
            </InputIcon>
        </div>
        <div className="col-md-4">

            <InputIcon titulo="Activo desde" icon="fa-calendar" labelClass="font-weight-bold text-uppercase">
                <input disabled={usuario?.u_id!==undefined && !hasPermission(activoFechaUser,currentUser?.permisosUsuario)} required type="date" className="form-control" value={usuario.u_activo_desde} onChange={(e)=>handleChangeInput(e,'u_activo_desde', usuario, setUsuario)}/>
            </InputIcon>

            <InputIcon titulo="Activo hasta" icon="fa-calendar" labelClass="font-weight-bold text-uppercase">
                <input disabled={usuario?.u_id!==undefined && !hasPermission(activoFechaUser,currentUser?.permisosUsuario)} required type="date" className="form-control" value={usuario.u_activo_hasta} onChange={(e)=>handleChangeInput(e,'u_activo_hasta', usuario, setUsuario)}/>
            </InputIcon>

            <InputIcon titulo="Clave llamada" icon="fa-lock" labelClass="font-weight-bold text-uppercase">
                <input type="text" className="form-control password-number-mask" placeholder="Clave que digitaras al llamar" maxLength="6"
                value={usuario.u_clave_llamada} onChange={(e)=>handleChangeInput(e,'u_clave_llamada', usuario, setUsuario)} disabled={!usuario.u_clave_habilitada ? true : false}/>
                {ValidClaveLlamada(usuario.u_clave_llamada) ? <small className="form-text text-danger">Esta contraseña no puede contener letras</small> : <></>}
                {isWeakClaveLlamada(usuario.u_clave_llamada) ? <small className="form-text text-danger">
                    Hemos detectado una secuencia de caracteres insegura en tu contraseña, cámbiela por favor
                </small> : <></>}
                {usuario.u_clave_llamada.length < 6 && usuario.u_clave_habilitada ? <small className="form-text text-info">
                    La contraseña debe contener 6 numeros<small className="invisible">sdfgdfgsdfgsdfsdfgdfgdfgsdfgsdfg</small>
                </small> : <></>}
            </InputIcon>
            

            <InputCheck titulo="Habilitar clave">
                <input type="checkbox" value={usuario.u_clave_habilitada} disabled={usuario?.u_id!==undefined && !hasPermission(keyCallPermiso,currentUser?.permisosUsuario)}
                onChange={(e)=>handleChangeInput(e,'u_clave_habilitada', usuario, setUsuario)}/>
            </InputCheck>

            <InputCheck titulo="Llamada internas">
                <input disabled={usuario?.u_id!==undefined && !hasPermission(llamadaINI,currentUser?.permisosUsuario)} type="checkbox" value={usuario.u_llamada_internas} onChange={(e)=>handleChangeInput(e,'u_llamada_internas', usuario, setUsuario)}/>
            </InputCheck>

            <InputCheck titulo="Llamada nacionales">
                <input type="checkbox" value={usuario.u_llamada_internas ? false : usuario.u_llamada_nacional}
                onChange={(e)=>handleChangeInput(e,'u_llamada_nacional', usuario, setUsuario)}
                       disabled={usuario?.u_id!==undefined && !hasPermission(llamadaINI,currentUser?.permisosUsuario) || usuario.u_llamada_internas} checked={usuario.u_llamada_internas ? false : usuario.u_llamada_nacional}/>
            </InputCheck>

            <InputCheck titulo="Llamada internacionales">
                <input type="checkbox" value={usuario.u_llamada_internas ? false : usuario.u_llamada_internacional}
                onChange={(e)=>handleChangeInput(e,'u_llamada_internacional', usuario, setUsuario)}
                       disabled={usuario?.u_id!==undefined && !hasPermission(llamadaINI,currentUser?.permisosUsuario) || usuario.u_llamada_internas} checked={usuario.u_llamada_internas ? false : usuario.u_llamada_internacional}/>
            </InputCheck>
            
        </div>
      </div>
    </div>

    <DepartamentosSupervision show={show} handleClose={handleClose} usuario={usuario} departamentos={departamentos}
        removeDepartamentSelected={removeDepartamentSelected} handleDepartamentsSelected2={handleDepartamentsSelected2}/>

        <ColasSupervision show={show2} handleClose={handleClose2} usuario={usuario} colas={colas} handleColaSelected={handleColaSelected}
                          removeColaSelected={removeColaSelected}/>


    <CampanasSupervision show={show3} handleClose={handleClose3} usuario={usuario} campanas={campanas}
        removeCampanasSelected={removeCampanasSelected} handleCampanasSelected={handleCampanasSelected}/>
    </Fragment>
  );
}

export default UsuarioTab;