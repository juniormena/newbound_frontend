export function downloadAudio(url, rutagrabacion){
    fetch(url,{
        headers:{
            authorization:`Bearer ${localStorage.getItem("token")}`
        }
    }).then(res=>res.blob().then(blob=>download(blob, rutagrabacion)))
}

function download(blob, filename) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    // the filename you want
    a.download = filename.split(`/`)[7] || `audio`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

