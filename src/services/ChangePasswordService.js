import { socket } from './socket-common';
import { toast } from "react-toastify";
import { notificationError } from '../lib/helpers';


export function changePassword(e, datos, logoutUser,setLoading){
    try{
    e.preventDefault();
    setLoading(true);
    socket.emit('ChangeUserPassword', datos);

    socket.on('Res-ChangeUserPassword', async function (datos) {
        if(datos.success){
            toast.success(datos.message, {
                toastId: "changepassword",
                autoClose: 3000,
                onClose: datos.u_closedSession ? ()=>logoutUser() : () => window.location.reload()
              });
        }
        else{
            notificationError(datos,4000);
            setLoading(false)
        }
    });
    }
    catch(error){
        notificationError({message:error},4000);
    }
}