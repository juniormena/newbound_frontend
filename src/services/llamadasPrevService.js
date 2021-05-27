import { socket } from "./socket-common";
import {
    getCampanasToLLamadasAction,
    getCampanasRegistrosToLlamadasAction,
    generateCallAction,
    resetLlamadaPrevStateAction
} from "../redux/actions/llamadasPreventivas/llamadaPrevActions";
import {notificationError, notificationSuccessNoReload} from "../lib/helpers";


export function getCampanasToLlamadas(campanasData, dispatch) {
    let arrayOfCampanas = [];

    if(campanasData.success && campanasData.data.length>0){
       arrayOfCampanas = campanasData.data.map(cam=>cam.id);
    }
    else{
        return;
    }

    socket.emit("getCampanasToLlamadas", arrayOfCampanas);

    socket.on("Res-getCampanasToLlamadas", async function (datos) {
        if(datos.success){
            dispatch({type:getCampanasToLLamadasAction(), payload:datos})
        }
        else{
            dispatch({type:getCampanasToLLamadasAction(), payload:datos})
        }
    });
}


export function getCampanasRegistrosToLlamadas(campanasArrayId, dispatch){
    if(campanasArrayId?.length === 0){
        return;
    }
    socket.emit("getCampanasRegistrosToLlamadas", campanasArrayId);

    socket.on("Res-getCampanasRegistrosToLlamadas", async function (datos) {
        if(datos.success){
            dispatch({type:getCampanasRegistrosToLlamadasAction(), payload:datos});
        }
        else{
            dispatch({type:getCampanasRegistrosToLlamadasAction(), payload:datos});
        }
    });
}

export function generateCampanaCall(userExtension, campanaRegistro,dispatch, tel = '', nombre=''){
    try {
        if(campanaRegistro?.success) {
            let datos ={
                Context:"HUNTER_CAMPANAS",
                CallerID:nombre!=='' ? nombre `- ${campanaRegistro?.data[0]?.nombre}` : `${campanaRegistro?.contactos[0]?.nombre} - ${campanaRegistro?.data[0]?.nombre}`,
                codigo_ref:`${campanaRegistro?.data[0]?.codigo_ref}`,
                codigo_camp_id:`${campanaRegistro?.data[0]?.id}`,
                codigo_campana:`${campanaRegistro?.data[0]?.codigo_campana}`,
                userExtension,
                telefono:tel!=='' ? addOneToTel(tel) : addOneToTel(campanaRegistro?.contactos[0]?.telefono)
            };

            socket.emit("generateCampanaCall", datos);

            socket.on("Res-generateCampanaCall", async function (datos) {
                if (datos.success) {
                    dispatch({type:generateCallAction(), payload:datos});
                } else {
                    dispatch({type:generateCallAction(), payload:datos});
                }
            });
        }
    }
    catch (err){

    }

}

export function getCampanasEstado(setState){
    socket.emit('getEstadoCampanas');
    socket.on('Res-getEstadoCampanas', async function(datos){
        if(datos.success){
            setState(datos.data);
        }
        else{
            setState([]);
        }
    });

}

export function updateCampanaRegistroEstado(e,datos, dispatch, setCounter, showKeyPad){
    console.log(datos);
    let { id, llamar_desde, estado, tiempo_desde } = datos;
    let datosTobeSent = {
        id,
        estado,
        llamar_desde:estado==="103" ? '' : `${llamar_desde}T${tiempo_desde}:00`
    }
    socket.emit('updateCampanasRegistro', datosTobeSent);
    socket.on('Res-updateCampanasRegistro', async function(datos){
        if(datos.success){
            notificationSuccessNoReload(datos,3000);
            showKeyPad();
            dispatch({type:resetLlamadaPrevStateAction(), payload:{}});
            setCounter(25);
        }
        else{
            notificationError(datos,3000)
        }
    });

}

function addOneToTel(telefono){
    let regex = /^[1]/g;
    return `${String(telefono).match(regex) ? String(telefono) : '1'+telefono}`
}