import moment from "moment";
import 'moment/locale/es-do';

moment.locale('es-do')

export const formatDate = (date) => {
  return moment(date).format("YYYY-MM-DD h:mm a");
};

export const formatDate2 = (date) => {
  return moment(date).format("YYYY-MM-DD");
};

export function millisecondsToDate(milliseconds){
  if(milliseconds==="0"){
    return (<i className="fa fa-minus newboundPurpleColor"/>)
  }
  return moment(parseInt(milliseconds)*1000).format("DD MMM YYYY hh:mm a") //parse string
}

export const timeToDurations = (duration) => {
  return moment.duration(duration).asSeconds();
};

export const timeToDurationToHours = (duration) => {
  return moment.duration(duration).asHours();
};

export const getTimeReceived = (date) => {
  return moment(date).fromNow();
};

export const softphoneSeconds = (seconds) =>{
  if(seconds > 3600){
    return moment().startOf('day').seconds(seconds).format('hh:mm:ss');
  }
  else{
    return moment().startOf('day').seconds(seconds).format('mm:ss');
  }

};

export function secondsToMinutues(seconds){
    return moment().startOf('day').seconds(seconds).format('H:mm:ss');
}

export function setHoraMinutosSegundos(hora,minuto,segundo){
if (hora!==undefined && hora<24 ) {
  return moment(`${hora}:${minuto}:${segundo}`,'HHmmss').format('HH:mm:ss')
  //console.log( moment().startOf('day').hours(hora))
}
else if(hora!==undefined && hora>=24){
  return `${hora}:${minuto ? minuto : '00'}:${segundo}`;
}
if (minuto!==undefined ) {
  return moment(`${minuto}:${segundo}`,"mmss").format('HH:mm:ss')
 //console.log( moment().startOf('day').minutes(minuto)).format('H:mm:ss');
}
if (segundo!==undefined ) {
  return moment(`${segundo}`,"ss").format('HH:mm:ss')
}
else{
  return moment(`00`,"mmss").format('mm:ss')

}

  //return moment().startOf('day').seconds(seconds).format('H:mm:ss')
}

export function excelnumeroAfecha(numeroDeDias, esExcel = false) {
  let diasDesde1900 = esExcel ? 25567 + 1 : 25567;
  return new Date((numeroDeDias - diasDesde1900) * 86400 * 1000);
}