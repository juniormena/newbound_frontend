import {memo, useContext} from "react";
import {LoginToCola, removeFromCola, pauseCola, unPauseCola, getStatusMember} from "../../services/softphoneService";
import TooltipComponent from "../Toolttip/TooltipComponent";
import {useEffect, useState} from "react";
import {getMotivo_Pausa} from "../../services/EstadoAgenteService";
import {connect, useDispatch} from "react-redux";
import {
    generateCampanaCall,
    getCampanasRegistrosToLlamadas,
    getCampanasToLlamadas
} from "../../services/llamadasPrevService";
import {softphoneSeconds} from "../../lib/dateHelpers";
import {
    resetLlamadaPrevStateAction,
    showEstadoLlamadaAction
} from "../../redux/actions/llamadasPreventivas/llamadaPrevActions";
import {SipContext} from "../SoftPhone/SipProvider/SipProvider";
import useUniversalCounter from "../../hooks/useUnviersalCounter";

function ColaStatus({ currentUser, llamadaPrevData }){
    const [motivosPausa, setMotivosPausa] = useState([]);
    const [IsOnMotivoPausa, setIsOnMotivoPausa] = useState(false);
    const [counter, decrement, setCounter] = useUniversalCounter(25);
    const dispatch = useDispatch();
    const sip = useContext(SipContext);

    useEffect(function(){
        getMotivo_Pausa(setMotivosPausa);
        //setCounter(5000);

        return ()=> {
            setMotivosPausa([]);
        };

    },[]);

    /*useEffect(()=>{
        if(currentUser?.campanas_supervision.success){
            dispatch({type:resetLlamadaPrevStateAction(), payload:{}});
        }
    },[currentUser]);*/

    useEffect(()=>{
        let motivosInterval = setInterval( ()=>getStatusMember(currentUser, sip),15000);

        return ()=>clearInterval(motivosInterval);

    },[sip.sip?.isLoginToCola]);

    /*useEffect(()=>{
        if(llamadaPrevData?.generatedCall?.success && !sip.sip?.sessions?.map(session=> session.callPartTel).includes(llamadaPrevData?.generatedCall?.telefono)){
            dispatch({type:showEstadoLlamadaAction(), payload:true});
            sip.hideKeypad();
        }
    },[sip.sip.sessions]);*/

    /*useEffect(()=>{
        let counterInterval;
        if(sip?.sip?.isPauseInCola==='NO' && sip?.sip?.isLoginToCola==='SI') {
            counterInterval = setInterval(()=>decrement(), 1000);

            if (parseInt(counter) === 0) {
                clearInterval(counterInterval);
                if (!llamadaPrevData.hasOwnProperty("campanasData") && !llamadaPrevData.hasOwnProperty("campanaRegistroData")) {
                    getCampanasToLlamadas(currentUser?.campanas_supervision, dispatch);
                }
            }
        }
        else if(sip?.sip?.isPauseInCola==="SI"){
            clearInterval(counterInterval);
            setCounter(10)
            dispatch({type:resetLlamadaPrevStateAction(), payload:{}});
        }

        return ()=>clearInterval(counterInterval);
    },[counter,sip.sip.isPauseInCola]);*/

    /*useEffect(()=>{
        if(llamadaPrevData.hasOwnProperty("campanasData")){
            getCampanasRegistrosToLlamadas(llamadaPrevData?.campanasData?.campanaMayorPesoId
                || llamadaPrevData?.campanasData?.data, dispatch)
        }
    },[llamadaPrevData?.campanasData?.campanaMayorPesoId, llamadaPrevData?.campanasData?.data]);*/

    /*useEffect(()=>{
        if(llamadaPrevData.hasOwnProperty("campanaRegistroData")){
            generateCampanaCall(currentUser?.userExtensions[0]?.username, llamadaPrevData?.campanaRegistroData, dispatch)
        }
    },[llamadaPrevData?.campanaRegistroData])*/

    return(
        <>
            {/*currentUser.campanas_supervision?.data?.length!==0 && <ModalComponent show={show} title="Estado llamada">
                <LlamadaPrevStatus campanaEstado={campanaEstado} llamadaPrevData={llamadaPrevData} handleClose={handleClose}
                                   dispatch={dispatch} setCounter={setCounter}/>
            </ModalComponent>*/}

            <div id="status">
                {/*sip?.sip?.isLoginToCola==='SI' && <button className="btn btn-danger mr-5">{softphoneSeconds(counter)}</button>*/}

                {llamadaPrevData?.campanasData?.data?.length===0 && sip?.sip?.isLoginToCola==='SI'
                && (<button className="btn btn-danger mr-5" disabled>No hay llamadas por realizar</button>)}

            {sip?.sip?.isLoginToCola==='SI' && (<div className="userStatus hold">
                <button className={`btn btn-${sip?.sip?.isPauseInCola==='SI' ? 'warning' : 'success'} mr-2`} disabled>{sip?.sip?.isPauseInCola==='SI' ? 'Estas pausado en la cola' : 'Conectado a la cola'}</button>
            </div>)}
        </div>
            {sip?.sip?.isLoginToCola==='NO' && (<TooltipComponent placement="bottom" text="Login a cola">
                <a className="btnCola" href="#/" onClick={()=>LoginToCola(currentUser, sip)}>
                    <i className="fas fa-location-arrow"/>
                </a>
            </TooltipComponent>)}

                {sip?.sip?.isLoginToCola==='SI' && sip?.sip?.isPauseInCola==='NO' && (
                <div className="pauseMenu" onMouseOver={()=>setIsOnMotivoPausa(true)} onMouseLeave={()=>setIsOnMotivoPausa(false)}>
                    <a id="btnPauseWork" href="#/" className={`${IsOnMotivoPausa ? 'active' : ''}`}>
                        <i className="fas fa-pause"/>
                    </a>
                    <div className={`pauseSubMenu ${IsOnMotivoPausa ? 'open' : ''}`}>
                        <h3>Motivo de Pausa</h3>
                        {motivosPausa.filter((motivo) =>{
                            if(motivo.lo_visible_agente===true && motivo.lo_empresa===currentUser?.userLogin?.data[0]?.u_id_empresa
                                || motivo.lo_visible_agente===true && motivo.lo_empresa===0){
                                return motivo;
                            }
                        }).map(
                            ({ lo_codigo, lo_descripcion_mini, lo_icono, lo_minutos_alerta })=>
                                <a className="btnOp" href="#/" key={lo_codigo} onClick={()=>pauseCola(currentUser, lo_codigo ,sip)}>
                                    <i className={`ico ${lo_icono?.split(',')[0]}`} style={{color:`${lo_icono?.split(',')[1]}`}}/>
                                    <span>{lo_descripcion_mini}</span>
                                    <small>Tiempo: {lo_minutos_alerta} Min.</small>
                                </a>
                        )}
                    </div>
                </div>)}

            {sip?.sip?.isPauseInCola==='SI' && sip?.sip?.isLoginToCola==='SI' && (<TooltipComponent placement="right" text='Despausar'>
                <a className="btnCola" href="#/" onClick={()=>unPauseCola(currentUser, sip)}>
                    <i className="fas fa-play"/>
                </a></TooltipComponent>)}

            {sip?.sip?.isLoginToCola==='SI' && (<TooltipComponent placement="bottom" text="Logoff de cola">
                    <a className="btnCola" href="#/" onClick={()=>removeFromCola(currentUser, sip)}>
                <i className="fas fa-power-off"/>
                    </a>
            </TooltipComponent>)}
        </>
    )
}

const mapStateToProps = state=>{
    return{
        llamadaPrevData:state.llamadasPrev
    }
}

export default connect(mapStateToProps, null)(memo(ColaStatus,
    (prevProps, newProps)=> prevProps.llamadaPrevData===newProps.llamadaPrevData));