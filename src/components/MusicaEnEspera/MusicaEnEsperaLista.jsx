import React,{useEffect,useMemo,useState} from 'react'
import { useSelector, connect } from 'react-redux'
import { downloadPdf } from './../../redux/actions/downloadbleActions';
import { musicOnHoldSelect } from '../../services/MusicaEsperaService'
import MusicaEsperaRows from './MusicaEsperaRows';
import { useGuardaExcel } from '../../hooks/useGuardaExcel';


function MusicaEnEsperaLista({ currentPage, ITEMS_PER_PAGE, setTotalItems, sorting, searchText, setDataToBeDownloaded }) {

    const { data } = useSelector(state => state.user.currentUser.userLogin)
    const [carpetas, setCarpetas] = useState({data:[]})
  
  
    useEffect(() => {
  
        if (data[0] !== undefined) {
    
          musicOnHoldSelect(data[0].u_id_empresa, setCarpetas)
        }
  
      }, [data])
  
    const [excel, setExcel] = useState({
        excel:[]
    })
    
    useEffect(() => {
        carpetas.data.map(d=>{
           setExcel((prevFormValues) => ({
        
            excel: [
              ...prevFormValues.excel,
              {
                MUSICA_EN_ESPERA:d.name,
                DESCRIPCION:d.description,
                ORDEN:d.sort,
                MODO_REPRODUCCION:d.mode
              },
            ],
          }));
        })
    
    }, [carpetas.data])
    
   
      useGuardaExcel(excel.excel)


    useEffect(()=>{
        setDataToBeDownloaded({data:carpetas.data.map(carpeta => [
                carpeta.name,
                carpeta.description,
                carpeta.sort,
                carpeta.mode
          ]), titulo:'Listado musica en espera',orientacion:'portrait',headers:["Musica en espera",
          "Descripcion","Orden","Modo de reproduccion"],
          fileName:'musica-en-espera'})
    },[carpetas.data])



    
    const musicaEsperaData=useMemo(() => {

        let computedMusicaEsperaDatos = carpetas.data;
        

    
        if(searchText){
            //console.log(searchText)
            computedMusicaEsperaDatos =  carpetas.data.filter(
            carpeta=> 
            carpeta.name.toLowerCase().includes(searchText.toLowerCase().trim()) );
        }  

      
        if (computedMusicaEsperaDatos !==undefined) {
            setTotalItems(computedMusicaEsperaDatos.length)
            /* console.log(computedMusicaEsperaDatos.length); */
            //Current Page slice
            return computedMusicaEsperaDatos.slice( 
             (currentPage -1) * ITEMS_PER_PAGE, 
             (currentPage - 1) *ITEMS_PER_PAGE + ITEMS_PER_PAGE 
         );
        }
       
    }, [carpetas.data, currentPage, searchText, ITEMS_PER_PAGE, setTotalItems])

  
    return (
        <>
        {
            musicaEsperaData
            &&
        musicaEsperaData.map((carpeta)=>(
          
           <MusicaEsperaRows key={carpeta.name} carpeta={carpeta}/>
        ))}
    </>
    )
}

const mapStateToProps = state=>{
    return{
        dataToBeDownloaded:state.downloadble.dataToBeDownloaded
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setDataToBeDownloaded: (data) => {
            dispatch({type:downloadPdf(), payload:data})
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MusicaEnEsperaLista);
