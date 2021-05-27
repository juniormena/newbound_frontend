import { socket } from './socket-common';
import { notificationSuccess, notificationError, notificationSuccessForUpdate } from './../lib/helpers';


export function getMotivo_Pausa(setState){
    socket.emit('NewBound_Select_Motivo_Pausa'); 
    socket.on('Response_NewBound_Select_Motivo_Pausa', async function(datos){
        if(datos.success){
            setState(datos.data);
        }
    });

}
export function addMotivo_Pausa(datos,setLoading,comb){
    datos.icono=comb
    try{
    setLoading(true)
    socket.emit('NewBound_Insert_Motivo_Pausa', datos);

    socket.on('Response_NewBound_Insert_Motivo_Pausa', async function (datos) {

        if(datos.success){
            notificationSuccess(datos,3000);
        }
        else{
            notificationError(datos,8000);
            setLoading(false)
        }
    });
    }
    catch(error){
        notificationError(datos,false);
    }
}

export function getMotivo_PausaById(setState,id){
    socket.emit('NewBound_Select_Motivo_Pausa'); 

    socket.on('Response_NewBound_Select_Motivo_Pausa', async function(datos){
        if(datos.success){
        
        datos.data.filter(data=>{
            if (data.lo_codigo===id) {
                setState(data);
            }
        })
         
        }
    });
}


export function updateMotivo_Pausa(datos, setLoading,comb){
    try{
        
        setLoading(true)
        datos.icono=comb
        socket.emit('NewBound_Update_Motivo_Pausa', datos);
    
        socket.on('Response_NewBound_Update_Motivo_Pausa', async function (datos) {
            /*console.log(datos)*/
            /*console.log(datos.success)*/
            if(datos.success){
                notificationSuccessForUpdate(datos,3000,"/administracion/mantestadoagente");
            }
            else{
                notificationError(datos,8000);
                setLoading(false)
            }
        });
        }
        catch(error){
            notificationError(datos,false);
        }
}

export function disableMotivo_Pausa(datos, setLoading){
    try{
        setLoading(true)
        socket.emit('NewBound_Estado_Motivo_Pausa', datos);
    
        socket.on('Response_NewBound_Estado_Motivo_Pausa', async function (datos) {       
           
        });
        }
        catch(error){
            notificationError(datos,false);
        }
}

export function GetMotivoPausaWithEmpresaName(setState) {

        socket.emit('GetMotivoPausaWithEmpresaName');
        socket.on('Res-GetMotivoPausaWithEmpresaName', async function(datos){
            if(datos.success){
                setState(datos.data);
            }
            else if(!datos.success){
                setState(datos.data)
            }
        });
}