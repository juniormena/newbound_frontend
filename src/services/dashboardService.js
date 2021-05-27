import { socket } from './socket-common';

export function getColaStatistics(user, setState, setState2){
    let currentUser = user.userLogin?.data[0]?.u_usuario;
    for(let i = 0; i<user.cola_supervision.data.length; i++){
        socket.emit(`NewBound-Resquest-Actions`,{action:'QueueStatus', queue:user.cola_supervision.data[i]?.name,actionid:`${currentUser}` });
        socket.on(`Response-NewBound-Resquest-Actions`, async function(datos) {
           if(datos.success){
               let datosCola = datos?.data?.filter(item=> {if (user.cola_supervision.data.map(({name})=>name).indexOf(item.queue)>-1) {
                   return item
               }
               })
               setState(prevState=> [...prevState, datosCola])
               socket.on(`Response-NewBound-Resquest-Member`, async function(datos) {
                   if(datos.success){
                       let datosMember = datos?.data?.filter(item=> {if (user.cola_supervision.data.map(({name})=>name).indexOf(item.queue)>-1) {
                           return item
                       }
                       })
                       setState2(prevState=>[...prevState,datosMember])
                   }
               });
           }
        });


    }
}

export function getColaACD(user, setState){
    let currentUser = user.userLogin?.data[0]?.u_usuario;
    for(let i = 0; i<user.cola_supervision.data.length; i++){
        socket.emit('NewBound-Resquest-Actions',{action:'QueueEntry', queue:user.cola_supervision.data[i]?.name,actionid: currentUser});
        socket.on(`Response-NewBound-Resquest-Actions-ACD`, async function(datos) {
           if(datos.success){
               setState(prevState=>[...prevState, datos?.data]);
           }
           else{
               setState([]);
           }
        });
    }
}


export function sortArrayOfObjects( a, b ) {
    if ( a.queue < b.queue ){
        return -1;
    }
    if ( a.queue > b.queue ){
        return 1;
    }
    return 0;
}

export function removeDuplicates(array, prop) {
    // Declare a new array
    let newArray = [];

    // Declare an empty object
    let uniqueObject = {};

    // Loop for the array elements
    for (let i in array) {

        // Extract the title
        let objProp = array[i][prop];

        // Use the title as the index
        uniqueObject[objProp] = array[i];
    }

    // Loop to push unique object into array
    for (let i in uniqueObject) {
        newArray.push(uniqueObject[i]);
    }

    // Display the unique objects
    return newArray;
}

export function filteredArray(array, array2){
    return array.filter(item=> {if (array2.indexOf(item.queue)>-1) {
        return item
    }
    });
}