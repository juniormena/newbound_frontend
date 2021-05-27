import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { addPerfil } from "../../services/AdministracionService";
import PerfilRow from "../Data/Perfil/PerfilRow";
import { handleChangeInput } from './../../lib/helpers';



function PerfilesPermisosComponent({empresaid, perfiles, setPerfiles, setPerfilid, perfilid, username}) {
    const [perfil, setPerfil] = useState({p_usuario_ing:username, p_terminal_ing:'Newbound 2.0', p_descripcion:'', p_id_empresa:empresaid.Id, p_es_supervisor:false});
    const [loading, setLoading] = useState(false);
    
    useEffect(()=>{
        setPerfil(prevPerfil=>({p_usuario_ing:username, p_terminal_ing:'Newbound 2.0', p_descripcion:prevPerfil.p_descripcion, p_id_empresa:empresaid.Id, p_es_supervisor:false}));
    },[empresaid.Id])
    

    return (
        <div className="card">
            <h5 className="card-header base-background-gradient text-uppercase text-white">Perfiles de permisos</h5>
            <div className="card-body"> 
                <form onSubmit={(e)=>addPerfil(e,perfil,setLoading, empresaid, setPerfiles,setPerfil)} >
                    <div className="input-group mb-3">
                        <input required type="text" className="form-control" placeholder="Descripcion del perfil" aria-label="Descripcion del perfil" aria-describedby="basic-addon2"
                        value={perfil.p_descripcion} onChange={(e)=>handleChangeInput(e,'p_descripcion',perfil, setPerfil)}/>
                        <div className="input-group-append">
                            <button className="btn btn-primary" disabled={!perfil.p_descripcion ? true : false || loading}>
                                Agregar
                            </button>
                        </div>
                    </div>
                    <div className="form-row pl-1">
                        <div className="form-check form-check-inline ">
                            <label className="form-check-label font-weight-bold text-uppercase">
                            ¿Es un perfil supervisor ?
                            </label>
                            <input className="form-check-input ml-1" type="checkbox" value={perfil.p_es_supervisor} checked={perfil.p_es_supervisor}
                            onChange={(e)=>handleChangeInput(e,'p_es_supervisor',perfil, setPerfil)}/>
                        </div>
                    </div>
                </form>
            </div>
                <Table responsive striped hover borderless>
                    <thead className="text-center  border-bottom border-info m-5">
                        <tr>
                            <th className="text-uppercase">Perfil</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {perfiles.map(perfil=><PerfilRow key={perfil.p_id} perfil={perfil} setPerfilid={setPerfilid} perfilid={perfilid}/>)}
                    </tbody>
                </Table>
        </div>
    )
}

export default React.memo(PerfilesPermisosComponent);
