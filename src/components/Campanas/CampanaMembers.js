import {handleChangeInput} from "../../lib/helpers";
import {searchInTable} from "../../lib/searchTable";
import Table from "react-bootstrap/Table";
import ModalComponent from "../Modal/ModalComponent";
import React, {useEffect, useState} from "react";
import {getUsuarioAllDataByDep} from "../../services/AdministracionService";
import {connect} from "react-redux";

function CampanaMembers({ show, handleClose, titulo, currentUser }){
    const [usuarios,setUsuarios] = useState([]);
    const [searchText, setSearchText] = useState({text:''});

    useEffect(()=>{
        getUsuarioAllDataByDep(setUsuarios, currentUser)
    },[]);

    console.log(usuarios);
    return(
        <>
            <ModalComponent show={show} handleClose={handleClose} title={titulo}>
                <input placeholder="Buscar por nombre permiso..." type="text" className="form-control mb-2 input-search" value={searchText.text}
                       onChange={(e)=>handleChangeInput(e, 'text', searchText, setSearchText)} onKeyUp={()=>searchInTable(searchText.text, "campanaMemberTable")}/>
                <div className="card">
                    <Table responsive striped hover borderless className="mt-2" id="campanaMemberTable">
                        <thead className="text-center  border-bottom border-info m-5">
                        <tr>
                            <th className="text-uppercase">Nombre</th>
                            <th className="text-uppercase"/>
                        </tr>
                        </thead>
                        <tbody className="text-center">
                            {usuarios.map(usuario=><tr key={usuario.u_id}>
                                <td>{usuario.u_nombre_completo}</td>
                                <td>Asignar</td>
                            </tr>)}
                        </tbody>
                    </Table>
                </div>
            </ModalComponent>
        </>
    )
}


const mapStateToProps = state=>{
    return{
        currentUser:state.user.currentUser
    }
}

export default connect(mapStateToProps, null)(CampanaMembers);