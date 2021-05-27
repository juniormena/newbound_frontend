const channel = new BroadcastChannel('incomingCall');
const title = "NEWBOUND";


this.addEventListener("fetch", (event)=>{
    if(event.request.url.split('/')[2]==="app.newbound.com.do" || event.request.url.split('/')[2]!=="app.newbound.com.do"){
        event.waitUntil(
            channel.onmessage =  (e)=>{
                if(e.data.data==='SI'){
                    try{
                        const notificationPromise = this.registration.showNotification(title, {
                            body: `Tienes una llamada entrante de ${e.data.data2} \n Teléfono : ${e.data.data3}`,
                            icon:"favicon.ico",
                            badge:"favicon.ico",
                            vibrate: [100, 50, 100],
                            tag:'id1',
                            renotify:true,
                        });
                        notificationPromise.catch(err=>console.error(err));
                    }
                    catch(err){}
                }

            }
        )
    }

})



this.addEventListener('notificationclick', (event)=> {
    event.notification.close();
    event.waitUntil(
        this.clients.matchAll({
            type: "window",
        }).then(clientList => {
            if (clientList.length) {
                clientList[0].focus();
            }
        }).catch(err=>console.error(err))
    );
});