export function ColasErrors(data, error) {
  error = false;

  //Opciones Generales
  if (data.id_empresa === "") {
    error = true;
  }
  if (data.nombre === "") {
    error = true;
  }
  if (data.servicelevel === 0 || data.servicelevel === "") {
    error = true;
  }
  if (data.strategy === "") {
    error = true;
  }
  if (data.musiconhold === "") {
    error = true;
  }
 /*  if (data.context === "") {
    error = true;
  } */

  //Tiempos
  if (data.timeout === 0 || data.timeout === "") {
    error = true;
  }
  if (data.retry === 0 || data.retry === "") {
    error = true;
  }
  if (data.timeoutpriority === "") {
    error = true;
  }
  if (data.wrapuptime === 0 || data.wrapuptime === "") {
    error = true;
  }

  //Opciones para agente
  if (data.autopause === "") {
    error = true;
  }

  if (data.autopausedelay === 0 || data.autopausedelay === "") {
    error = true;
  }

  return error;
}

export function isMiembroSelected(array, departamentoId){
 //console.log(array)
  for(let i=0; i< array.length; i++){
    
      if(array[i]===departamentoId){
        return true
      }
  }
}

export const ColasDescriptions = {
  rules: `Muestra las reglas de cola guardadas`,
  usuario: `Miembro estatico en esa cola`,
  penalty: `Penalidad en segundos`,
  pausa: `Si coloca el agente el Pausa, no recibirá llamadas`,
  announce_position_limit: `Solo anunciar la posicion si el numero es menor o igual al definido en este parametro`,
  anunciarproximo: `Anunciar al cliente que es el próximo en la fila`,
  announce_position: `Anuncia al cliente su posición en la cola. Valores:
    Si = si.
    No = no se le anuncia.
    Mas = si la posición del cliente en la cola de
    espera es más alta del numero especificado en
    el parámetro announce-position-limit, se le
    anunciará que hay más de “valor del próximo
    parámetro” clientes esperando en la cola
     Limitado = solo los clientes con una posición en la
    cola de espera menor o igual al valor del
    parámetro announce-position-limit.,
    escucharán el anuncio de su posición en la cola de espera.`,
  announce_holdtime: `Anunciar junto a la posición en la cola el tiempo
    estimado de espera. Puede ser yes, no, u once (una
    sola vez)`,
  periodosrelativos: `Si se configura en yes la periodicidad de los anuncios
    (parámetro periodic-announce-frequency) empezará
    a contar desde que el anuncio ha terminado. Con no,
    desde que el anuncio ha empezado.`,
  random_periodic_announce: `Reproduccion aleatoria del anuncio`,
  periodic_announce_frequency: `  Cada cuantos segundos presentar un anuncio
    personalizado al cliente que se encuentra en la cola de
    espera.`,
  periodic_announce: `Agregar las grabaciones personalizadas de la tabla de grabaciones`,
  memberdelay: `Tiempo en segundos que el sistema esperará antes de
    conectar el agente con el cliente. De esta forma
    aunque hayan agentes disponibles, el cliente esperará
    mínimo ese tiempo antes de ser conectado con un
    agente`,
  ringinuse: `Se envían las llamadas a agentes cuyo estado
    de la extensión es INUSE`,
  reportholdtime: `Se anuncia al agente, antes de contestar la
    llamada, cuanto tiempo el cliente ha esperado en la
    cola`,
  autopauseunavail: `Si la extension no esta disponible`,
  autopausebusy: `Un agente será puesto en pausa automáticamente si su
    extensión aparece como ocupada.`,
  autopausedelay: `Retrasa la puesta en pausa del agente que no ha
    contestado una llamada por el numero de segundos
    indicados en este parámetro.`,
  autopause: `No = el agente que no atenderá una llamada no será puesto en pausa. Todo=el agente será puesto en pausa en todas las colas a que pertenece. 

    Si= el agente que no atenderán una llamada será
    puesto en pausa`,
  tiempominimofrecuencia: `Para evitar que cada vez que la posición y/o el tiempo
    estimado de espera de un cliente cambie se le presente
    el anuncio, este parámetro define un tiempo (en
    segundos) que se esperará antes de comunicarle
    nuevamente su nueva posición y su tiempo de espera
    estimado.`,
  frecuenciaanuncio: `Cada cuanto segundos anunciar al cliente en espera su
    posición en la cosa y el tiempo estimado de espera.`,
  wrapuptime: `Tiempo de descanso de un agente entre una llamada y
    otra (en segundos).`,
  prioridad: `En este parámetro se define si se toma en 
    consideración el tiempo de espera definido a nivel de
    aplicación o a nivel de archivo de configuración. Si Coloca En este parámetro se define si se toma en
    consideración el tiempo de espera definido a nivel de
    aplicación o a nivel de archivo de configuración. En este parámetro se define si se toma en
    consideración el tiempo de espera definido a nivel de
    aplicación o a nivel de archivo de configuración. APP se tomará como prioridad la aplicación, si selecciona conf se tomará como prioridad la configuración en configuración.`,
  retry: `numero de segundos de espera antes de llamar otro
    agente si el primero no ha contestado dentro de los 15
    segundos definidos en el parámetro timeout.`,
  timeout: `define por
    cuantos segundos timbrará la extensión del agente.`,
  contexto: `Si el cliente en la cola antes de ser atendido presiona correspondiente al dígito que ha marcado.
    una tecla del teléfono será enviado al contexto
    definido en este parámetro y a la prioridad.
    Si el cliente en la cola antes de ser atendido presiona
    una tecla del teléfono será enviado al contexto
    definido en este parámetro y a la prioridad`,
  musicaonhold: `Mostrar las musicas en espera para la empresa seleccionada`,
  servicelevel: `con
    base al numero de segundos configurados en este
    parámetro, en los reportes aparecerá el numero de
    llamadas contestadas dentro del tiempo definido.`,
  strategy: `<p>En este parámetro se define la lógica con que se
    transferirán las llamadas presentes en una cola a los
    agentes:</p> 
    
  <ul class="list-group">

  <li >  <span class='font-weight-bold'>
  leastrecent=</span> Asigna la siguiente llamada al
  agente que ha contestado menos recientemente
  su ultima llamada. Funciona perfectamente si
  el promedio de duración de las llamadas
  atendidas es similar.
  </li>
  
  <li >    <span class='font-weight-bold'>fewestcalls= </span> Asigna la siguiente llamada al
  agente que menos llamadas ha atendido en la cola. Este parámetro también funciona bien en
  colas donde la duración de las llamadas
  atendidas es similar
  </li>
  
  <li >        <span class='font-weight-bold'>
  randomt=</span>
   Asigna la siguiente llamada de forma
  aleatoria a cualquier agente disponible. Es una
  de las formas más equitativa en la distribución
  de las llamadas entre agentes.

  </li>


  <li ><span class='font-weight-bold'>
  ringall=</span>
  Llama todos los agentes disponibles a
  la vez hasta que uno conteste. Más que una
  estrategia es más bien un grupo de timbrado.
  </li>

  <li >            <span class='font-weight-bold'>
  rrmemory=</span>
  Distribuye las llamadas “por
  turnos” entre los agentes disponibles y
  “recuerda” el último agente que ha llamado.
  </li>

  <li >           
  <span class='font-weight-bold'>
  rrordered=</span>
  *: parecido a rrmemory con la única
  diferencia que se respetará el orden de los
  agentes presentes en este archivo de
  configuración
  </li>

  <li >           
   <span class='font-weight-bold'>
    linear=</span>
     Llama los agentes siguiendo el orden
    definido en este archivo de configuración. Si
    son agentes dinámicos según el orden con que
    se han registrado a la cola
  </li>

  <li >           
  <span class='font-weight-bold'>
    wrandom:=</span>
     asigna la llamada de forma aleatoria
    usando una métrica basada en penalidades.
  </li>

  </ul>
    `,
};

/* 
   
    */
