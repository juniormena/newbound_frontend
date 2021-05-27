import {connect} from "react-redux";
import React, {useEffect, useState} from "react";
import {useCampanaEstado} from "../../../hooks/useCampanaEstado";
import {handleChangeInput} from "../../../lib/helpers";
import moment from "moment";
import contactoCSS from "../css/contacto.module.css";
import LlamadaPrevContacsRow from "./LlamadaPrevContacsRow";
import {updateCampanaRegistroEstado} from "../../../services/llamadasPrevService";

function LlamadaPrevStatus({ llamadaPrevData, campanaEstado, setCounter, dispatch, showKeyPad,currentUser }){
    const [camestado, setCamEstado] = useState({cod_estado:'0', llamar_desde:'', tiempo_desde:'00:00'});
    const options =  useCampanaEstado(campanaEstado);


    useEffect(()=>{
        if(camestado.llamar_desde===moment().format("YYYY-MM-DD")){
            setCamEstado(prevState => ({...prevState, tiempo_desde:moment().add(15,'m').format("HH:mm")}))
        }
        else{
            setCamEstado(prevState => ({...prevState, tiempo_desde:'00:00'}))
        }
    },[camestado.llamar_desde])

    return (
        <div className="dailer p-3">
            <h4 className="text-uppercase font-weight-bold"> Estado llamada</h4>
            <hr className="bg-white"/>
            <form onSubmit={(e)=>updateCampanaRegistroEstado(e,
                { id:llamadaPrevData?.campanaRegistroData?.data[0]?.id, llamar_desde:camestado?.llamar_desde, estado:camestado?.cod_estado, tiempo_desde:camestado.tiempo_desde },
                dispatch, setCounter, showKeyPad)}>
                <div className="form-group">
                    <label className="font-weight-bold text-uppercase">Estado</label>

                    <select className="custom-select" value={camestado.cod_estado}
                            onChange={(e)=>{
                                handleChangeInput(e,'cod_estado',camestado,setCamEstado);
                                setCamEstado(prevState=>({...prevState, llamar_desde: ''}));
                            }} required>
                        {campanaEstado.length===0 ? <option>no hay estados</option> :
                            <><option value={0}>Selecciona...</option>
                                {options}</>
                        }
                    </select>

                </div>

                {camestado.cod_estado==='102' && (<div className="form-group">
                    <label className="font-weight-bold text-uppercase">Fecha</label>

                    <input type="date" className="form-control" min={moment(new Date()).format("YYYY-MM-DD")}
                           max={moment(new Date()).add(15,'day').format("YYYY-MM-DD")}
                           required value={camestado.llamar_desde}
                           onChange={(e)=>handleChangeInput(e,'llamar_desde',camestado,setCamEstado)}/>

                </div>)}

                {camestado.cod_estado==='102' && (<div className="form-group">
                    <label className="font-weight-bold text-uppercase">Tiempo</label>

                    <input type="time" className="form-control" min={camestado.llamar_desde===moment().format("YYYY-MM-DD") ? moment().add(15,'m').format("HH:mm") : ''}
                           required value={camestado.tiempo_desde}
                           onChange={(e)=>handleChangeInput(e,'tiempo_desde',camestado,setCamEstado)}/>

                </div>)}
                <button type="submit" className="btn btn-block btn-success" disabled={camestado.cod_estado==='0'} >GUARDAR</button>
            </form>

            <div className={contactoCSS.contactos}>
                <h1 className={contactoCSS.contactos__header}>Contactos</h1>
                <hr className="bg-white"/>
                {llamadaPrevData?.campanaRegistroData?.contactos?.map(contacto=>
                    <LlamadaPrevContacsRow key={contacto?.ordenllamada}
                                           contactoCSS={contactoCSS}
                                           contacto={contacto}
                                           dispatch={dispatch} llamadaPrevData={llamadaPrevData} currentUser={currentUser}/>)}

            </div>
        </div>
    )
}

const mapStateToProps = state=>{
    return{
        llamadaPrevData:state.llamadasPrev
    }
}

export default connect(mapStateToProps,null)(LlamadaPrevStatus);