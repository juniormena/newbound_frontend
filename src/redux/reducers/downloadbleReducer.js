import { DOWNLOAD_PDF } from './../actions/downloadbleTypes';

const initialState = {
    dataToBeDownloaded:{data:[], titulo:'',orientacion:'',headers:[],fileName:'',extraData:[], LlamadasTotalesData:[]}
}


const downloadbleReducer = (state = initialState, action)=>{
    switch(action.type){
        case DOWNLOAD_PDF: 
            return Object.assign({}, state, {
                dataToBeDownloaded: {data:action.payload.data || state.dataToBeDownloaded.data, 
                    titulo:action.payload.titulo || state.dataToBeDownloaded.titulo, orientacion:action.payload.orientacion || state.dataToBeDownloaded.orientacion, 
                    headers:action.payload.headers || state.dataToBeDownloaded.headers, 
                    fileName:action.payload.fileName || state.dataToBeDownloaded.fileName,
                   extraData:action.payload.extraData || state.dataToBeDownloaded.extraData,
                   LlamadasTotalesData:action.payload.LlamadasTotalesData || state.dataToBeDownloaded.LlamadasTotalesData,
                   
                }
            })
       
        default: return state;
    }

}


export default downloadbleReducer;