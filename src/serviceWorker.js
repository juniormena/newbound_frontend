export default function serviceWorker(){

    function determineAppServerKey() {
        const vapidPublicKey = "BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo";
        return urlBase64ToUint8Array(vapidPublicKey);
    }

    function urlBase64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }

    let serviceWorkerUrl = `${process.env.PUBLIC_URL}/service.js`;
    try {
        navigator.serviceWorker?.register(serviceWorkerUrl).then(response=>{

            return response.pushManager.getSubscription()
                .then(function (subscription) {
                    response.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: determineAppServerKey()
                    }).catch(err=>{});
                })
        })
    }
    catch{

    }

}

const channel = new BroadcastChannel('incomingCall');

setInterval(function(){
        channel.postMessage({data: sessionStorage.getItem('incomingCall'), data2:sessionStorage.getItem('incomingName'), data3: sessionStorage.getItem('incomingTel')});
    },3500);
