import { useEffect, useMemo, useState } from 'react'
import { useGuardaExcel } from '../../hooks/useGuardaExcel';
import { connect } from 'react-redux';
import { downloadPdf } from './../../redux/actions/downloadbleActions';
import {GetMotivoPausaWithEmpresaName } from '../../services/EstadoAgenteService';
import MantAgenteEstadoRows from './MantAgenteEstadoRows';

function MantAgenteEstadoList({ currentPage, ITEMS_PER_PAGE, setTotalItems, sorting, searchText,setDataToBeDownloaded }) {
    
    const [agenteEstado, setAgenteEstado] = useState([])

    useEffect(()=>{
        GetMotivoPausaWithEmpresaName(setAgenteEstado)

    },[setAgenteEstado]);


    const [excel, setExcel] = useState({
        excel:[]
    })
    
    useEffect(() => {
        agenteEstado.map(d=>{
           setExcel((prevFormValues) => ({
        
            excel: [
              ...prevFormValues.excel,
              {
                CODIGO:d.lo_codigo,
                DESCRIPCION_LARGA:d.lo_descripcion,
                NOMBRE:d.lo_descripcion_mini,
                EMPRESA:d.e_nombre_completo,
                ESTADO:d.lo_estado===1?"Activo":"Inactivo",
               
                MINUTOS_ESPERA:d.lo_minutos_alerta,
                VISIBLE:d.lo_visible_agent  ? "No" :"Si"
               
              },
            ],
          }));
        })
    
    }, [agenteEstado])


    
      useGuardaExcel(excel.excel)
   
    useEffect(()=>{
        setDataToBeDownloaded({data:agenteEstado.map(aEstado => [
                aEstado.lo_codigo,
                aEstado.lo_descripcion,
                aEstado.lo_descripcion_mini,
                aEstado.e_nombre_completo,
                aEstado.lo_estado === 1 ? "Activo " : "Inactivo",
                aEstado.lo_minutos_alerta,
                aEstado.lo_visible_agente ? "Si" : "No"
          ]), titulo:'Listado estados de agente',orientacion:'portrait',headers:["Codigo",
          "Descripcion","Nombre","Empresa","Estado","Minutos Espera","Visible para agente"],
          fileName:'Estado-agente'})
    },[agenteEstado])

    const agenteEstadoData=useMemo(() => {

        let computedAgenteDatos = agenteEstado;

        if(searchText){
            //console.log(searchText)
            computedAgenteDatos =  agenteEstado.filter(
            agenteEstado=> 
                   agenteEstado.lo_codigo.toLowerCase().includes(searchText.toLowerCase().trim()) 
                   );
        }  
       
        setTotalItems(computedAgenteDatos.length)
           //Current Page slice
           return computedAgenteDatos.slice( 
            (currentPage -1) * ITEMS_PER_PAGE, 
            (currentPage - 1) *ITEMS_PER_PAGE + ITEMS_PER_PAGE 
        );

    }, [agenteEstado, currentPage, searchText, sorting, ITEMS_PER_PAGE, setTotalItems])

    return (
        <>
            {agenteEstadoData.map((estado)=>(
                <MantAgenteEstadoRows key={estado.lo_codigo} aEstado={estado}/> 
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

export default connect(mapStateToProps, mapDispatchToProps)(MantAgenteEstadoList);