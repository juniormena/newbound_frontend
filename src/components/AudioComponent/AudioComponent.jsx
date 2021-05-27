import React, {useEffect, useState} from "react";
import {httpApiURL} from "../../config.json";
import TooltipComponent from './../Toolttip/TooltipComponent';
import {notificationError} from "../../lib/helpers";
import {downloadAudio} from "../../lib/audioHelpers";

const AudioComponent = ({rutagrabacion}) => {
    const [error, setError] = useState(false);
    const [playing, setPlaying] = useState(false);

    function handleAudioError() {
        setError(true)
    }

    function playAudio(e){
        console.log(e)
        setPlaying(true);
        e.target.nextSibling.play()
            .then()
            .catch((err)=>
                notificationError({message:'No pudimos reproducir la grabacion, lo sentimos'},5000)
            );
    }

    useEffect(() => {
        document.addEventListener('play', function (e) {
            let audios = document.getElementsByTagName('audio');
            for (let i = 0; i < audios.length; i++) {
                if (audios[i] !== e.target) {
                    audios[i].pause();
                    //setPlaying(false);
                }
            }
        }, true);

        return () => {
            document.removeEventListener('play', () => {
            });
        };
    }, [])

    return (
        <>
            {error || !rutagrabacion || rutagrabacion === "NoGrabacion" ?
                <TooltipComponent text="Archivo no encontrado o corrompido">
                    <i className="fa fa-volume-mute pl-3 make-a-pointer" style={{fontSize: '26px', color: '#ff0000'}}/>
                </TooltipComponent>
                :
                <React.Fragment >
                    <TooltipComponent text="Reproductor">
                        <i onClick={playAudio} className={`${playing ? 'd-none' : ''} fa fa-play pl-3 make-a-pointer`} style={{fontSize:'20px', color:'#0eb2e2'}} />
                    </TooltipComponent>
                    <audio controls preload="auto" onAbort={handleAudioError} style={{height: '30px', margin: '11px 0'}} className={`${playing ? '' : 'd-none'}`}
                    onEnded={(e)=>e.target.currentTime = 0}>
                        <source
                            src={`${httpApiURL}/getAudio/?ruta=${rutagrabacion}`} onError={handleAudioError}/>
                    </audio>
                    <TooltipComponent text="Descargar">
                        <i className="fa fa-download pl-2 make-a-pointer" style={{fontSize: '22px', color: '#0eb2e2'}}
                           onClick={()=>downloadAudio(`${httpApiURL}/downloadAudio/?ruta=${rutagrabacion}`,rutagrabacion)}/>
                    </TooltipComponent>
                </React.Fragment>}
        </>

    );
}

export default AudioComponent;