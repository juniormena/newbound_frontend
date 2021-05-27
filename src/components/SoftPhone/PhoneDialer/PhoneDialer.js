import iconClose from '../img/iconClose.svg';
import {useCallback, useEffect, useState} from "react";
import {connect} from "react-redux";
import {getActiveSession, pasteNumber} from "../../../lib/softphoneHelpers";

function PhoneDialer({numberCall, onNumberClick, sip, show, currentUser}){
    let timeout;
    let ctrlDown = false, ctrlKey = 17, cmdKey = 91, vKey = 86;


    function getNumber(e) {
        let {outerText} = e.target;
        if(Object.keys(getActiveSession(sip?.sip?.sessions)).length>0 && !sip?.sip?.wannaMakeAttendedTransfer
            && !sip?.sip?.wannaMakeADirectTransfer && !sip?.sip?.wannaAddCall){
            sip.sendCallTone(outerText, deleteLastNumber);
        }
        else{
            onNumberClick(prevNumber => ('' + prevNumber + outerText));
        }
    }

    const deleteLastNumber = useCallback(()=> {
        let lastNumberErased = numberCall.toString().split('').slice(0, -1).join('')
        onNumberClick(lastNumberErased);
    },[numberCall, onNumberClick]);

    function deleteWholeNumber(){
        timeout = setTimeout(()=>onNumberClick(''),1000);
    }

    function revertTimeOut(){
        clearTimeout(timeout);
    }

    const handleKeyPress = useCallback((e)=>{
        if(e.code==="Backspace" && numberCall.length > 0){
            deleteLastNumber();
        }
        if(e.key==="Enter" && numberCall.length > 0 &&  numberCall !== currentUser?.isDynamicMember?.data[0]?.interface?.split('/')[1]){
            handleCallButton();
        }
        if (e.keyCode === ctrlKey || e.keyCode === cmdKey) ctrlDown = true;
        if (ctrlDown && (e.keyCode === vKey)){
            pasteNumber(getNumber)
        }

        if(Object.keys(getActiveSession(sip?.sip?.sessions)).length>0 && !sip?.sip?.wannaMakeAttendedTransfer
            && !sip.sip.wannaMakeADirectTransfer && !sip?.sip?.wannaAddCall){
            if(!isNaN(e.key) || e.key==="*" || e.key==="#" || e.key==="+"){
                sip.sendCallTone(e.key);
            }
        }
        else if(!isNaN(e.key) || e.key==="*" || e.key==="#" || e.key==="+"){
            onNumberClick(prevNumber => ('' + prevNumber + e.key));
        }
    },[deleteLastNumber, onNumberClick, numberCall]);


    function handleCallButton(){
        if(getActiveSession(sip?.sip?.sessions).wannaMakeADirectTransfer){
            sip.makeBlindTransfer(numberCall);
        }
        else if(getActiveSession(sip?.sip?.sessions).wannaMakeAttendedTransfer){
            sip.makeCall(numberCall);
        }
        else if(getActiveSession(sip?.sip?.sessions).wannaAddCall){
            sip.makeCall(numberCall);
        }
        else if(numberCall !== currentUser?.isDynamicMember?.data[0]?.interface?.split('/')[1]){
            sip.makeCall(numberCall);
        }
    }


    useEffect(()=>{
        if(show){
            window.addEventListener('keydown',handleKeyPress);

            window.addEventListener('keyup', function (e){
                if (e.keyCode === ctrlKey || e.keyCode === cmdKey) ctrlDown = false;
            });
        }

        return ()=> {
            window.removeEventListener('keydown', handleKeyPress);
            window.removeEventListener('keyup', null);
        };

    },[show, handleKeyPress]);


    return(
        <div className={`dailer ${sip.sip.hideKeypad ? 'd-none' : ''}`}>
            <div className="number">
                <span>{numberCall.length===0 ? <span className={`${getActiveSession(sip?.sip?.sessions).wannaMakeADirectTransfer 
                || getActiveSession(sip?.sip?.sessions).wannaMakeAttendedTransfer 
                || getActiveSession(sip?.sip?.sessions).wannaAddCall  ? '' : 'invisible'}`}>Ingresa un numero</span> : numberCall}</span>
                {numberCall.length > 0 && (<a onClick={deleteLastNumber} onMouseDown={deleteWholeNumber} onMouseUp={revertTimeOut} href="#/"><img src={iconClose} alt="icon close"/></a>)}
            </div>
            <div className="numbers">
                <div className="row">
                    <a className="btnDial n1" href="#/" onClick={getNumber}>1</a>
                    <a className="btnDial n2" href="#/" onClick={getNumber}>2</a>
                    <a className="btnDial n3" href="#/" onClick={getNumber}>3</a>
                </div>
                <div className="row">
                    <a className="btnDial n4" href="#/" onClick={getNumber}>4</a>
                    <a className="btnDial n5" href="#/" onClick={getNumber}>5</a>
                    <a className="btnDial n6" href="#/" onClick={getNumber}>6</a>
                </div>
                <div className="row">
                    <a className="btnDial n7" href="#/" onClick={getNumber}>7</a>
                    <a className="btnDial n8" href="#/" onClick={getNumber}>8</a>
                    <a className="btnDial n9" href="#/" onClick={getNumber}>9</a>
                </div>
                <div className="row">
                    <a className="btnDial nAs" href="#/" onClick={getNumber}>&#x2a;</a>
                    <a className="btnDial n0" href="#/" onClick={getNumber}>0</a>
                    <a className="btnDial n#" href="#/" onClick={getNumber}>#</a>
                </div>
                <button className="btnLlamar" disabled={numberCall.length === 0}
                        onClick={handleCallButton}>
                    Llamar</button>
            </div>

        </div>
    )
}

const mapStateToProps = state=>{
    return{
        currentUser:state.user.currentUser
    }
}

export default connect(mapStateToProps, null)(PhoneDialer);