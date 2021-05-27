import Swal from "sweetalert2";

export function statusAgent(estado,pausa){
    if(estado==="1" && pausa!=="0"){
        return (<span className="badge badge-warning">Pausa</span>);
    }
    else if(estado==="0" && pausa!=="0"){
        return (<span className="badge badge-warning">Pausa</span>);
    }
    switch (estado){
        case "0":
        case "4":
        case "5":
        case "8":
            return (<span className="badge badge-danger">Desconectado</span>);
        case "1":
            return (<span className="badge badge-success">Disponible</span>);
        case "2":
            return (<span className="badge badge-warning">En Llamada</span>);
        case "3":
            return (<span className="badge badge-danger">Ocupado</span>);
        case "6":
        case "7":
            return (<span className="badge badge-info">Timbrando</span>)

        default:  return (<span className="badge badge-secondary">Desconocido</span>)

    }
}

export function statusAgentCircle(estado, pausa){
    if(estado==="1" && pausa!=="0"){
        return (<span className="avatar-status badge-warning"/>);
    }
    else if(estado==="0" && pausa!=="0"){
        return (<span className="avatar-status badge-warning"/>);
    }

    switch (estado){
        case "0":
        case "4":
        case "5":
        case "8":
            return (<span className="avatar-status badge-danger"/>);
        case "1":
            return (<span className="avatar-status badge-success"/>);
        case "2":
            return (<span className="avatar-status badge-warning"/>);
        case "3":
            return (<span className="avatar-status badge-danger"/>);
        case "6":
        case "7":
            return (<span className="avatar-status badge-info"/>)

        default:  return (<span className="avatar-status badge-secondary"/>)

    }
}

export const styleCompletadas = (completadas) => {
    return {
        active:{
            symbol: completadas,
            color: "#3AC37D",
            trailColor: '#efefef'
        },
        success: {
            symbol: completadas,
            color: "#3AC37D",
            trailColor: '#3AC37D'
        }
    }
}

export const styleAbandonadas = (abandonadas) => {
    return {
        active:{
            symbol: abandonadas,
            color: "#da2e57",
            trailColor: '#efefef'
        },
        success:{
            symbol: abandonadas,
            color: "#da2e57",
            trailColor: '#da2e57'
        }
    }
}

export const styleLlamadas = (llamadas)=> {
    return {
        active:{
            symbol: llamadas,
            color: "#27a6ea",
            trailColor: '#efefef'
        },
        success: {
            symbol: llamadas,
            color: "#27a6ea",
            trailColor: '#efefef'
        }
    }
}

export async function coachingUI(extension, sip){
    const {value:coachingValue} = await Swal.fire({
        title:'COACHING',
        input:'select',
        inputPlaceholder:'Selecciona un tipo de coaching',
        inputOptions:{
            escucha:'Escuchar',
            aconsejar:'Aconsejar',
            conferencia:'Conferencia',
            escucha_continua:'Escuchar de manera continua'
        },
        showCancelButton:true,
        confirmButtonColor: "#652D90",
        cancelButtonColor: "#FF1F89",
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
        inputValidator:(value)=> {
            return new Promise((resolve)=>{
                if(value){
                    resolve();
                }
                else{
                    resolve('Debes seleccionar un tipo de coaching :)');
                }
            })
        },
        customClass: {
            validationMessage:'resetmargin'
        }
    })

    if(coachingValue){
        coachingOptions(coachingValue, extension, sip);
    }
}

function coachingOptions(coachOption, extension,sip){
    switch (coachOption){
        case 'escucha':
            sip.makeCall(`*101${extension}`);
            break;
        case 'aconsejar':
            sip.makeCall(`*102${extension}`);
            break;
        case 'conferencia':
            sip.makeCall(`*103${extension}`);
            break;
        case 'escucha_continua':
            sip.makeCall(`*100${extension}`);
            break;
        default:
            break;
    }
}