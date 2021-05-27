import icoRedButton from '../img/icoRedButton.svg';
import icoKeypad from '../img/icoKeypad.svg';
import icoTransfer from '../img/icoTransfer.svg';
import icoAddCall from '../img/icoAddCall.svg';
import icoPlay from '../img/icoPlay.svg';
import icoGreenButton from "../img/icoGreenButton.svg";
import icoYellowButton from "../img/icoYellowButton.svg";
import {useEffect} from "react";
import {softphoneSeconds} from "../../../lib/dateHelpers";
import {validCoachingCodes} from "../../../lib/softphoneHelpers";
import useCounter from "../../../hooks/useCounter";

function LlamadaCurso({ sip, onNumberClick, session, showDirectorio }){
    const [counter, increment] = useCounter(0,"increment");

    function handleWannaMakeADirectTransfer(){
        sip.wannaMakeADirectTransfer();
        onNumberClick('');
        showDirectorio();
    }

    function handleWannaMakeAttendedTransfer(){
        if(sip.sip.wannaMakeAttendedTransfer){
            sip.makeAttendedTransfer();
        }
        else{
            sip.wannaMakeAttendedTransfer();
            onNumberClick('');
            showDirectorio();
        }
    }

    function handleWannaAddCall(){
        sip.wannaAddCall();
        onNumberClick('');
        showDirectorio();
    }

    useEffect(()=>{
        const counterInterval = setInterval(()=>increment(), 1000)

        return ()=>clearInterval(counterInterval);
    },[counter]);

    return(
        <div id="llamadaEncurso">
            <div className="top">
                <img className="ico" src={icoPlay} alt="Ico play"/>
                    {<div className="label">{session.callDirection==='incoming' ? 'Llamada Entrante' : 'Llamada Saliente'}</div>}
                    <div className="info">
                            <span className="name">{session.callCounterPart?.split('-')[0]}</span>
                            <span className="name">{session.callCounterPart?.split('-')[1]}</span>
                            <span className="name">{session.callCounterPart?.split('-')[2]}</span>
                        <span className="number">Teléfono: {validCoachingCodes(session.callPartTel) ? 'No disponible' : session.callPartTel}</span>
                    </div>
                    <div className="time">{softphoneSeconds(counter)}</div>
                <div className="buttons">
                    {session.callDirection==='incoming' && !session.inCall && <a href="#/"  className="mr-2" onClick={()=> sip.answerCall(session.session)}>
                        <img src={icoGreenButton} alt="Icon green button"/>
                    </a>}
                    <a href="#/" className="mr-1" onClick={()=> sip.hangupCall(session.session)}>
                        <img src={icoRedButton} alt="Icon red button"/>
                    </a>
                    {/*<a href="#/" className="ml-1">
                        <img src={icoYellowButton} alt="Icon yellow button"/>
                    </a>*/}
                </div>
            </div>

            {session.inCall && <div className="options">
                <a href="#/" className="btnOpt btnMute" onClick={()=>sip.muteCall(session.session)}>
                    <i className={`fa ${session.callMicrophoneIsMuted ? 'fa-microphone-slash': 'fa-microphone'}`}/>
                        <span>{session.callMicrophoneIsMuted ? 'Silencio' : 'Silencio'}</span>
                </a>

                <a href="#/" className="btnOpt btnKeypad" onClick={()=>sip.hideKeypad()}>
                    <img className="ico" src={icoKeypad} alt="Icon keypad"/>
                        <span> Teclado</span>
                </a>

                <a href="#/" className="btnOpt btnHold" onClick={()=>sip.holdCall(session.session)}>
                    <i className={`fa ${session.callIsOnHold ? 'fa-play' : 'fa-pause'}`} />
                        <span>{session.callIsOnHold ? 'Resumir':'Pausar'}</span>
                </a>

                <a href="#/" className={`btnOpt btnTransfer ${sip.sip.wannaMakeADirectTransfer ? 'bg-primary' : ''}`} onClick={sip.sip.wannaMakeADirectTransfer ? undefined : handleWannaMakeADirectTransfer}>
                    <img className="ico" src={icoTransfer} alt="Icon transfer"/>
                        <span> Transferencia directa</span>
                </a>

                {<a href="#/" className={`btnOpt btnTransfer ${sip.sip.wannaMakeAttendedTransfer && !sip.sip.isReadyToMakeAttendedTransfer   ? 'bg-primary' : ''} 
                ${sip.sip.isReadyToMakeAttendedTransfer && session.wannaMakeAttendedTransfer ? 'btnAttendedTransfer' : ''}`} onClick={handleWannaMakeAttendedTransfer}>
                    <img className="ico" src={icoTransfer} alt="Icon transfer"/>
                    <span>Transferencia atendida
                        <span className="badge badge-warning">(BETA)</span>
                    </span>
                </a>}
                {<a href="#/" className={`btnOpt btnAddCall ${sip.sip.wannaAddCall && !sip.sip.isReadyToMakeAConference ? 'bg-primary' : ''}
                ${sip.sip.isReadyToMakeAConference && session.wannaAddCall ? 'btnAttendedTransfer' : ''}`}
                    onClick={sip.sip.wannaAddCall ? sip.addCall : handleWannaAddCall}>
                    <img className="ico" src={icoAddCall} alt="Icon addCall"/>
                        <span> Agregar llamada<span className="badge badge-warning">(BETA)</span></span>
                </a>}

            </div>}

        </div>
    )
}

export default LlamadaCurso;