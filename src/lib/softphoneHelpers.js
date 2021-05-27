import {notificationError} from "./helpers";
import Spinner from "../components/Loading/Spinner";
import icoCallMissed from "../components/SoftPhone/img/icoCallMissed.svg";
import icoCallOut from "../components/SoftPhone/img/icoCallOut.svg";
import icoCallIn from "../components/SoftPhone/img/icoCallIn.svg";
import moment from "moment";
import Swal from "sweetalert2";

export function deleteIncomingRequest(){
    sessionStorage.removeItem('incomingCall');
    sessionStorage.removeItem('incomingName');
    sessionStorage.removeItem('incomingTel');
}

export function setIncomingRequestData(session){
    sessionStorage.setItem('incomingName', `${session.remote_identity.display_name || 'NO CALL ID'}`);
    sessionStorage.setItem('incomingTel', `${session.remote_identity.uri.user}`);
    sessionStorage.setItem('incomingCall','SI');
}

export function playIncomingAudio(incomingCallAudio){
    try{
        incomingCallAudio.play()
            .then()
            .catch(err=>console.error("Error al intentar reproduccir el ringtone", err));
    }
    catch(error){
        notificationError({message:'No se pudo reproducir ringtone, lo sentimos'},5000);
    }
}

export function pauseIncomingAudio(incomingCallAudio){
    try{
        incomingCallAudio.pause();
    }
    catch(error){
        notificationError({message:'No se pudo pausar ringtone, lo sentimos'},5000);
    }
}

export function getActiveSession(sessions){
    let currentSession ={};
        for(let session of sessions) {
            if (session.inCall && !session.callIsOnHold) {
                currentSession = session;
            }
        }

    return currentSession;
}

export function getSessionToBeTransfer(sessions){
    let currentSession ={};
    for(let session of sessions) {
        if (session.isTheOneToBeTransfer) {
            currentSession = session;
        }
    }

    return currentSession;
}

export function objectsAreSame(x, y) {
    let objectsAreSame = true;
    for(let propertyName in x) {
        if(x[propertyName] !== y[propertyName]) {
            objectsAreSame = false;
            break;
        }
    }
    return objectsAreSame;
}

export function historicoUI(historicos, sip, cb){
    if(!historicos){
        return(<Spinner/>)
    }
    else if(historicos?.length===0){
        return(<div>No disponible</div>)
    }
    else{
        return(historicos?.map((historico,index) => (
            <li className="d-flex justify-content-between make-a-pointer historico__row" key={index +1}
                onClick={()=>{
                    sip.makeCall(historico.numero)
                    cb()}
                }>
                <div> <img
                    className="icoPhone icoCallIn"
                    src={
                        (historico.estado_llamada === "NO CONTESTADA" &&
                            icoCallMissed) ||
                        (historico.tipo_llamada === "Llamada Saliente" && icoCallOut) ||
                        (historico.tipo_llamada === "Llamada Entrante" && icoCallIn)
                    }
                    alt="ico call in"
                /></div>

                <div >
                    <span className="tipoLlamada ">{historico.tipo_llamada}</span>
                </div>

                <div className="col-6 text-left">
                    <span className="name">{!historico?.callid ? 'No disponible' :  historico?.callid?.replace(/['"]+/g, '')?.replace(/[<>]+/g,'')}</span>
                </div>


                <div className="time">
                    {moment(historico.fecha).format("DD-MM-YYYY h:mm a")}
                </div>
            </li>
        )))
    }
}

export function normalAlert(icon, title, text){
    Swal.fire({
        icon,
        title,
        text
    })
}

export function validCoachingCodes(number){
    const regEx = /([*]100|[*]101|[*]102|[*]103)/;
    return !!number.match(regEx);
}

export function pasteNumber(getNumber){
    navigator.clipboard.readText()
        .then(text =>{
            let numberFormatted = text?.replace(/'|"|-|[(]|[)]\s+/g, '');
            console.log(numberFormatted)
            if(isNaN(numberFormatted))
                throw new Error('Esto no es un numero')

          getNumber({
              target:{
                  outerText:numberFormatted
              }
          });
        })
        .catch(err=>{
            if(err){
                notificationError({message:'No pudimos poner tu texto, asegúrate que sea un número e inténtalo nuevamente'},5000)
            }});
}