import {useContext, useEffect, useRef, useState} from "react";
import LlamadaEntrante from "./LlamadaEntrante/LlamadaEntrante";
import './css/llamada-entrante.css';
import LlamadaCurso from "./LlamadaCurso/LlamadaCurso";
import './css/llamada-en-curso.css';
import Historico from "./Historico/Historico";
import './css/historico.css'
import Directorio from "./Directorio/Directorio";
import './css/directorio.css';
import PhoneDialer from "./PhoneDialer/PhoneDialer";
import './css/dailer.css';
import {SipContext} from "./SipProvider/SipProvider";
import {connect, useDispatch} from "react-redux";
import {getHistoricos} from "../../services/softphoneService";
import $ from "jquery";
import {CounterContext} from "../Counter/CounterProvider";
import LlamadaPrevStatus from "./LlamadaPrevStatus/LlamadaPrevStatus";
import {getCampanasEstado} from "../../services/llamadasPrevService";
import LlamadaScriptComponent from "./LlamadasScriptComponent/LlamadaScriptComponent";

function SoftPhone({show, handleClose, currentUser, llamadaPrevData}) {
    const sip = useContext(SipContext);
    const [numberCall, setNumberCall] = useState('');
    const [historicos, setHistoricos] = useState(null);
    const [campanaEstado, setCampanaEstado] = useState([]);
    const HistoricoRef = useRef();
    const DirectorioRef = useRef();
    const {setCounter} = useContext(CounterContext);
    const dispatch = useDispatch();

    function onNumberClick(number) {
        setNumberCall(number);
    }

    function close() {
        handleClose();
        setNumberCall('');
        handleDirectorio();
        handleHistorico();
    }

    useEffect(() => {
        let historicoInterval;
        if(show) {
            historicoInterval = setInterval(() => {
                getHistoricos(currentUser.userExtensions[0].username, setHistoricos);
            }, 3500)
        }
        else if(!show){
            clearInterval(historicoInterval);
        }
        return ()=>clearInterval(historicoInterval);

    }, [currentUser, show]);

    useEffect(()=>{
        getCampanasEstado(setCampanaEstado);

        return ()=>setCampanaEstado([]);
    },[])

    const handleHistorico = () => {
        $('#directorio').collapse('hide');
        //DirectorioRef.current.classList.remove("show");
    }

    const handleDirectorio = () => {
        $('#historico').collapse('hide');
        //HistoricoRef.current.classList.remove("show");
    }

    function showDirectorio(){
        $("#directorio").collapse('show');
    }

    return (
        <div className={`overlay ${show ? 'overlayVisible' : ''}`} style={{zoom:0.85}}>
            <a className="closebtn" onClick={close}>&times;</a>
            <div className="overlay-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 col-md-8">
                            {currentUser?.isDynamicMember?.success && (<LlamadaEntrante/>)}
                            {sip.sip.sessions.length === 0 ? <></> : sip.sip.sessions.map(session => <LlamadaCurso
                                key={session.id} sip={sip} onNumberClick={onNumberClick} session={session} showDirectorio={showDirectorio}/>)}
                            <div className="row mt-3 ">
                                <p>
                                    <button
                                        onClick={handleHistorico}
                                        className="btn btn-dark ml-3 mr-3 py-2"
                                        type="button" data-toggle="collapse"
                                        data-target="#historico" aria-expanded="false" aria-controls="collapseExample">
                                        Historico
                                    </button>
                                    <button
                                        onClick={handleDirectorio}
                                        className="btn btn-dark py-2"
                                        type="button" data-toggle="collapse"
                                        data-target="#directorio" aria-expanded="false" aria-controls="collapseExample">
                                        Directorio
                                    </button>
                                </p>

                                <div className="collapse col-12 col-md-12" id="historico" ref={HistoricoRef}>
                                    <Historico historicos={historicos} sip={sip} handleHistorico={handleDirectorio}/>
                                </div>

                                <div className="collapse col-12 col-md-12 " id="directorio" ref={DirectorioRef}>
                                    <Directorio currentUser={currentUser} sip={sip} handleDirectorio={handleHistorico}/>
                                </div>
                            </div>
                            {/*llamadaPrevData?.campanaRegistroData?.data[0]?.script
                            &&
                            (<LlamadaScriptComponent text={llamadaPrevData?.campanaRegistroData?.data[0]?.script}/>)*/}
                        </div>
                        <div className="col-6 col-md-4">
                            <PhoneDialer onNumberClick={onNumberClick} numberCall={numberCall} sip={sip} show={show}/>
                            {/*llamadaPrevData?.showEstadoLlamada
                            &&
                            (<LlamadaPrevStatus campanaEstado={campanaEstado}
                                                setCounter={setCounter} dispatch={dispatch}
                                                showKeyPad={sip.hideKeypad} currentUser={currentUser}/>)*/}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        currentUser: state.user.currentUser,
        llamadaPrevData:state.llamadasPrev
    }
}

export default connect(mapStateToProps, null)(SoftPhone);