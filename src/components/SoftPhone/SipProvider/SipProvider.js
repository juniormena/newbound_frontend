import {useEffect, useState, createContext, useMemo} from "react";
import * as JsSIP from "jssip-rtcninja";
import incomingCall from '../../../assets/audio/incomingCall.mp3';
import {notificationError} from "../../../lib/helpers";
import {
    deleteIncomingRequest, getActiveSession, normalAlert,
    pauseIncomingAudio,
    playIncomingAudio,
    setIncomingRequestData
} from "../../../lib/softphoneHelpers";


export const SipContext = createContext(null);

export const SipProvider = ({ children }) =>{
    const [jsSipconfig, setJsSipConfig] = useState({user:'', password:'',host:'', port:'', pathname:'', debug:false, secure:false});

    const [sip, setSip ] = useState({sipStatus:'desconectado', sipError:'', sipErrorMessage:'desconectado',
        success:false, ua: {}, hideKeypad:false, isLoginToCola:localStorage.getItem('isLoginToCola') || 'NO',
        isPauseInCola:localStorage.getItem('isPauseInCola') || 'NO', wannaMakeADirectTransfer:false, wannaMakeAttendedTransfer:false, wannaAddCall:false,
        isReadyToMakeAttendedTransfer:false, isReadyToMakeAConference:false, sessions:[]});

    let incomingCallAudio = new window.Audio(incomingCall);
    incomingCallAudio.loop = true;

    let remoteAudio = new window.Audio();
    remoteAudio.autoplay = true;

    const callOptions = {mediaConstraints: {audio: true, video: false}};

    let phone = {};
    let sessiones = [];

    window.onbeforeunload = function (){
        if(Object.keys(sip?.ua).length>0){
            sip?.ua?.terminateSessions();
        }
    }

    function reinitializeJsSIP(){
        try{
            const {user, password, host, port, pathname, secure} = jsSipconfig;
            if (user && password && host && port) {
                //JsSIP.debug.enable('JsSIP:*');
                phone = new JsSIP.UA({
                    uri: `${user}@host`,
                    password:password,
                    ws_servers:`${secure ? 'wss': 'ws'}:${host}:${port}${pathname}`
                });
                phone.on('registered', function(){
                    setSip(prevState => ({...prevState, sipStatus: 'registered', callStatus: 'idle',success: true, sipErrorMessage: 'Listo', ua:phone}));
                })
                phone.on('registrationFailed', function (ev) {
                    setSip(prevState => ({...prevState, sipStatus: 'error', sipErrorMessage: ev.cause, success: false}));
                    setJsSipConfig(prevState => ({...prevState, user:'', password:'',host:'', port:'', pathname:''}));
                });

                try {
                    phone.on('newRTCSession', (ev)=>{
                        if(sessiones.length===2){
                            normalAlert('warning', 'Limite de sessiones','Hemos detectado un intento de una nueva sesion, pero ya tienes el limite de sesiones soportadas');
                            ev.session.terminate();
                            return;
                        }
                         sessiones.push({session:ev.session,callDirection:ev.session.direction, callStatus: 'starting',
                             callCounterPart:`${ev.session.remote_identity.display_name || 'NO CALL ID'}`,
                             callPartTel:`${ev.session.remote_identity.uri.user}`, id:ev.session.id, inCall:false,
                             callIsOnHold:false, callMicrophoneIsMuted:false,
                             wannaMakeADirectTransfer:false, wannaMakeAttendedTransfer:false, isTheOneToBeTransfer:false, wannaAddCall:false});

                        setSip(prevState => ({...prevState, sessions: sessiones}));

                         for(const sesion of sessiones){

                             sesion.session.on('ended', (e)=>{
                                 pauseIncomingAudio(incomingCallAudio);
                                 let keptSession = sessiones.filter(obj=>{
                                     return [sesion.id].indexOf(obj.id) ===-1
                                 });
                                 sessiones = [...keptSession];
                                 setSip(prevState => ({...prevState, sessions: keptSession, hideKeypad: false,
                                     wannaMakeADirectTransfer:false, wannaMakeAttendedTransfer:false, wannaAddCall: false}));
                                 deleteIncomingRequest();
                             });

                             sesion.session.on('failed', (e)=>{
                                 pauseIncomingAudio(incomingCallAudio);
                                 let keptSession = sessiones.filter(obj=>{
                                     return [sesion.id].indexOf(obj.id) ===-1
                                 });
                                 sessiones = [...keptSession];
                                 setSip(prevState => ({...prevState, sessions: keptSession, wannaMakeADirectTransfer:false, hideKeypad: false,
                                     wannaMakeAttendedTransfer:false, wannaAddCall: false}));
                                 deleteIncomingRequest();
                                 if(e.cause==="User Denied Media Access"){
                                     normalAlert('error', 'Llamada falló', 'No tenemos acceso a dispositivos de audio')
                                 }
                             });

                             sesion.session.on('accepted', (e)=>{
                                 pauseIncomingAudio(incomingCallAudio);
                                 for(let i in sessiones){
                                     if(sessiones[i].id === sesion.id){
                                         sessiones[i].callStatus = 'Incall';
                                         sessiones[i].inCall = true;
                                         if(!sessionStorage.getItem('wannaAddCall')){
                                             if(sessiones[i].session.isOnHold().local){
                                                 sessiones[i].session.unhold(null, ()=>{});
                                             }
                                         }
                                     }
                                     if(!sessionStorage.getItem('wannaAddCall')){
                                         if(sessiones.length>1){
                                             if(sessiones[i].id !== sesion.id){
                                                 sessiones[i].session.hold(null, ()=>{});
                                             }
                                         }
                                     }
                                 }
                                 setSip(prevState => ({...prevState, sessions: sessiones,
                                     isReadyToMakeAttendedTransfer: prevState.wannaMakeAttendedTransfer,
                                     isReadyToMakeAConference: prevState.wannaAddCall}));
                                 deleteIncomingRequest();
                             });

                             sesion.session.on('progress', (e)=>{
                                 playIncomingAudio(incomingCallAudio);
                             });

                             sesion.session.on('muted', (e)=>{
                                 for(let i in sessiones){
                                     if(sessiones[i].id === sesion.id){
                                         sessiones[i].callMicrophoneIsMuted = true;
                                     }
                                 }
                                 setSip(prevState => ({...prevState, sessions: sessiones}));
                             });

                             sesion.session.on('unmuted', (e)=>{
                                 for(let i in sessiones){
                                     if(sessiones[i].id === sesion.id){
                                         sessiones[i].callMicrophoneIsMuted = false;
                                     }
                                 }
                                 setSip(prevState => ({...prevState, sessions: sessiones}));
                             });

                             sesion.session.on('hold', (e)=>{
                                 for(let i in sessiones){
                                     if(sessiones[i].id === sesion.id){
                                         sessiones[i].callIsOnHold = true;

                                     }
                                     else{
                                         sessiones[i].callIsOnHold = false;
                                         if(sessiones[i].session.isOnHold().local){
                                             sessiones[i].session.unhold(null, ()=>{});
                                         }
                                     }
                                 }
                                 setSip(prevState => ({...prevState, sessions: sessiones}));
                             });

                             sesion.session.on('unhold', (e)=>{
                                 for(let i in sessiones){
                                     if(sessiones[i].id === sesion.id){
                                         sessiones[i].callIsOnHold = false;
                                     }
                                     else{
                                         sessiones[i].callIsOnHold = true;
                                         if(!sessiones[i].session.isOnHold().local){
                                             sessiones[i].session.hold(null, ()=>{});
                                         }
                                     }
                                 }
                                 setSip(prevState => ({...prevState, sessions: sessiones}));
                             });

                             sesion.session.on('confirmed', function (e) {
                                 try{
                                     let localStream = sesion.session?.connection?.getLocalStreams()[0];
                                     let dtmfSender = sesion.session?.connection?.createDTMFSender(localStream.getAudioTracks()[0]);
                                     sesion.session.sendDTMF = function (tone) {
                                         dtmfSender?.insertDTMF(tone);
                                     };
                                     //setSip(prevState => ({...prevState, callStatus:'confirmado'}))
                                 }
                                 catch(err){

                                 }

                             });

                             sesion.session.on('addstream', function (e) {
                                 //pauseIncomingAudio(incomingCallAudio);
                                 remoteAudio.srcObject = e.stream;
                                 //setSip(prevState => ({...prevState, callStatus:'in Call'}))
                             });

                             if (sesion.session.direction === 'incoming') {
                                 setIncomingRequestData(sesion.session);
                             }
                             if(sesion.session.direction === 'incoming' && sesion.session.request.data.indexOf("auto-contestar: 1")!==-1){
                                 sesion.session.answer(callOptions);
                             }
                         }
                    });
                }catch (err){
                    console.log(err)
                }

                phone.start();
            }else{
                return {success: false, sipErrorMessage: 'Usuarios/Contraseña inválidos'}
            }
        }
        catch(error){
            const { name } = error;
            setSip(prevState => ({...prevState, sipStatus: 'error', sipErrorMessage: name}));
        }
    }

    function reconfigureDebug(){
        if(jsSipconfig.debug){
            JsSIP.debug.enable('JsSIP:*');
        }
        else{
            JsSIP.debug.disable();
        }
    }

    function makeCall(dest){
        try {
            sip.ua.call(dest, callOptions);
        }
        catch (error){
            console.log(error);
            notificationError({message:'No se pudimos realizar la llamada, lo sentimos'},5000);
        }
    }

    function answerCall(session){
        try {
            session.answer(callOptions);
        }
        catch (error){
            notificationError({message:'No se pudimos contestar la llamada, lo sentimos'},5000);
        }
    }

    function hangupCall(session){
        try{
            session.terminate();
        }
        catch(error){
            notificationError({message:'No se pudimos colgar la llamada, lo sentimos'},5000);
        }

    }

   function sendCallTone(tone,cb){

        try{
            let currentSession = getActiveSession(sip.sessions)
            currentSession?.session.sendDTMF(tone, null);
        }
        catch(error){
            notificationError({message:'No se pudo pausar ringtone, lo sentimos'},5000);
        }
    }

    function muteCall(session){
        try {
            if (session.isMuted().audio) {
                session.unmute({audio: true});
                //setSip(prevState => ({...prevState, callMicrophoneIsMuted: false}))
            } else {
                session.mute({audio: true});
                //setSip(prevState => ({...prevState, callMicrophoneIsMuted: true}));
            }
        }
        catch (err){
            notificationError({message:'No se pudo silenciar el microfono, lo sentimos'},5000);
        }
    }

    function hideKeypad(){
        try{
            setSip(prevState => ({...prevState, hideKeypad: !prevState.hideKeypad}))
        }
        catch(err){
            notificationError({message:'No se pudo ocultar el teclado numerico, lo sentimos'},5000);
        }
    }

    function holdCall(session){
        try{
            let isHold;
            if (session.isOnHold().local) {
                isHold = session.unhold(null, ()=>{
                    //setSip(prevState => ({...prevState, callIsOnHold: false}))
                })
            } else {
                isHold = session.hold(null, ()=>{
                    //setSip(prevState => ({...prevState, callIsOnHold: true}))
                })
            }
            if(!isHold){ notificationError({message:`No pudimos ${session.isOnHold().local ? 'unhold' : 'hold'} la llamada, lo sentimos`},5000);}
        }
        catch(err){
            notificationError({message:'No se pudo colocar en hold la llamada, lo sentimos'},5000);
        }
    }

    function makeBlindTransfer(dest){
        let eventHandlers = {
            requestSucceeded:   function(e){
                normalAlert('success', 'Transferencia', 'transferencia realizada con exito');
                getActiveSession(sip?.sessions).session.terminate();
            },
            requestFailed:     function(e){
                normalAlert('error', e.cause, e.response?.reason_phrase)
            }
        };
        try{
            let currentSession = getActiveSession(sip?.sessions);
            if(currentSession.wannaMakeADirectTransfer){
                currentSession?.session.refer(dest, {
                    eventHandlers,
                    extraHeaders:[`Contact: <sip:${dest}@app.newbound.com.do:5060>`],
                    replaces:sip.session
                });
            }
        }
        catch(err){
            notificationError({message:'No pudimos realizar la Transferencia, lo sentimos.'},3000);
        }

    }

    function makeAttendedTransfer(){
        try{
            let currentSession = {};
            let otherSession = {};
            for(let session of sip?.sessions) {
                if (session.inCall && !session.callIsOnHold) {
                    currentSession = session;
                }
                else{
                    otherSession = session;
                }
            }
            currentSession.session.refer(otherSession.session.remote_identity.uri,{
                replaces:otherSession?.session,
                extraHeaders:[`Contact: <sip:${otherSession.session.remote_identity.uri}>`],
                eventHandlers:{
                    requestSucceeded:   function(e){
                        normalAlert('success', 'Transferencia atendida', 'Transferencia realizada con exito');
                        getActiveSession(sip?.sessions).session.terminate();
                    },
                    requestFailed:     function(e){
                        normalAlert('error', e.cause, e.response?.reason_phrase);
                    },
                }
            });
        }
        catch(err){
            console.log(err)
            notificationError({message:'No pudimos realizar la transferencia atendida, lo sentimos.'},3000);
        }
    }

    function addCall(){
        try{
            makeConference(sip.sessions);
            sessionStorage.removeItem('wannaAddCall');
            setSip(prevState => ({...prevState, hideKeypad: false, wannaMakeADirectTransfer: false, wannaMakeAttendedTransfer: false,
                wannaAddCall: false, isReadyToMakeAConference: false}));
        }

        catch(err){
            notificationError({message:'No pudimos agregar la llamada, lo sentimos.'},3000);
        }
    }

    function wannaMakeADirectTransfer(){
        let sessiones = sip?.sessions;
        for(let session of sessiones){
            if(session.inCall && !session.callIsOnHold){
                session.wannaMakeADirectTransfer = true;
                session.wannaMakeAttendedTransfer = false;
                session.wannaAddCall = false;
            }
            else{
                session.wannaMakeADirectTransfer = false;
                session.wannaMakeAttendedTransfer = false;
                session.wannaAddCall = false;
            }
        }
        setSip(prevState => ({...prevState, sessions: sessiones, hideKeypad: false, wannaMakeADirectTransfer: true, wannaMakeAttendedTransfer: false, wannaAddCall: false}));
    }

    function wannaMakeAttendedTransfer(){
        let sessiones = sip?.sessions;
        for(let session of sessiones){
            if(session.inCall && !session.callIsOnHold){
                session.wannaMakeADirectTransfer = false;
                session.wannaMakeAttendedTransfer = true;
                session.wannaAddCall = false;
            }
            else{
                session.wannaMakeADirectTransfer = false;
                session.wannaMakeAttendedTransfer = false;
                session.wannaAddCall = false;
            }
        }
        setSip(prevState => ({...prevState, sessions: sessiones, hideKeypad: false, wannaMakeADirectTransfer: false, wannaMakeAttendedTransfer: true, wannaAddCall: false}));
    }

    function wannaAddCall(){
        let sessiones = sip?.sessions;
        for(let session of sessiones){
            if(session.inCall && !session.callIsOnHold){
                session.wannaMakeADirectTransfer = false;
                session.wannaMakeAttendedTransfer = false;
                session.wannaAddCall = true;
            }
            else{
                session.wannaMakeADirectTransfer = false;
                session.wannaMakeAttendedTransfer = false;
                session.wannaAddCall = false;
            }
        }
        sessionStorage.setItem('wannaAddCall', 'SI');
        setSip(prevState => ({...prevState, sessions: sessiones, hideKeypad: false, wannaMakeADirectTransfer: false, wannaMakeAttendedTransfer: false, wannaAddCall: true}));
    }

    function makeConference(sessions) {
        //take all received tracks from the sessions you want to merge
        let receivedTracks = [];
        sessions.forEach(function({session}) {
            if(session !== null && session !== undefined) {
                session.connection.pc.getReceivers().forEach(function(receiver) {
                    receivedTracks.push(receiver.track);
                });
            }
        });

        //use the Web Audio API to mix the received tracks
        let context = new AudioContext();
        let allReceivedMediaStreams = new MediaStream();

        sessions.forEach(function({session}) {
            if(session !== null && session !== undefined) {
                let mixedOutput = context.createMediaStreamDestination();
                session.connection.pc.getReceivers().forEach(function(receiver) {
                    receivedTracks.forEach(function(track) {
                        allReceivedMediaStreams.addTrack(receiver.track);
                        if(receiver.track.id !== track.id) {
                            let sourceStream = context.createMediaStreamSource(new MediaStream([track]));
                            sourceStream.connect(mixedOutput);
                        }
                    });
                });
                //mixing your voice with all the received audio
                session.connection.pc.getSenders().forEach(function(sender) {
                    let sourceStream = context.createMediaStreamSource(new MediaStream([sender.track]));
                    sourceStream.connect(mixedOutput);
                });
                session.connection.pc.getSenders()[0].replaceTrack(mixedOutput.stream.getTracks()[0]);
            }
        });

        remoteAudio.srcObject = allReceivedMediaStreams;
    }

   const valueToProvide = useMemo(() =>{
        return {
            sip,
            setSip,
            setJsSipConfig,
            makeCall,
            hangupCall,
            answerCall,
            muteCall,
            hideKeypad,
            holdCall,
            sendCallTone,
            makeBlindTransfer,
            makeAttendedTransfer,
            addCall,
            wannaMakeADirectTransfer,
            wannaMakeAttendedTransfer,
            wannaAddCall
        }
    },[sip]);

    useEffect(()=>{
        reconfigureDebug();
        reinitializeJsSIP();
    },[jsSipconfig])

    return(
        <SipContext.Provider
        value={valueToProvide}
        >
            {children}
        </SipContext.Provider>
    );
}