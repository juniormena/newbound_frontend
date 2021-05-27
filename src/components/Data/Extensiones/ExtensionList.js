import { useEffect, useState, useMemo } from "react";
import { useGuardaExcel } from "../../../hooks/useGuardaExcel";
import { connect } from 'react-redux';
import { downloadPdf } from './../../../redux/actions/downloadbleActions';
import { getExtensionesWithUserNull } from './../../../services/AdministracionService';
import ExtensionRow from "./ExtensionRow";

function ExtensionList({ currentPage, ITEMS_PER_PAGE, setTotalItems, sorting, searchText,setDataToBeDownloaded }) {
    const [extensiones, setExtensiones] = useState([]);

    useEffect(()=>{
        getExtensionesWithUserNull(setExtensiones);
    },[])

    useEffect(()=>{
        setDataToBeDownloaded({data:extensiones.map(extension => [
            extension.id,
            extension.tipo_extension,
            !extension.callerid ? 'no asignado' : extension.callerid, 
            extension.e_nombre_completo,
            !extension.u_nombre_completo ? 'No asignado' : extension.u_nombre_completo,
            !extension.u_usuario ? 'No asignado' : extension.u_usuario,
          ]), titulo:'Listado de extensiones',orientacion:'portrait',headers:["N Extension",
          "Tipo Extension","Caller id","Empresa","Nombre","UserName"],
          fileName:'extensiones'})
    },[extensiones])

    
    const [excel, setExcel] = useState({
        excel:[]
    })
    
    useEffect(() => {
        extensiones.map(d=>{
           setExcel((prevFormValues) => ({
        
            excel: [
              ...prevFormValues.excel,
              {
                N_EXTENSION:d.id,
                TIPO_EXTENSION:d.tipo_extension,
                CALLER_ID:d.callerid,
                EMPRESA:d.e_nombre_completo,
                NOMBRE:d.u_nombre_completo,
                USERNAME:d.u_usuario,
               
              },
            ],
          }));
        })
    
    }, [extensiones])

    
    
      useGuardaExcel(excel.excel)
 
    const extensionesData = useMemo(()=>{
        let computedExtensiones = extensiones;

        if(searchText){
           
            try{
            computedExtensiones =  extensiones.filter(
                extension=> 
                    extension.id.toLowerCase().includes(searchText.toLowerCase().trim())
                    || extension.callerid.toLowerCase().includes(searchText.toLowerCase().trim())
                    || extension.e_nombre_completo.toLowerCase().includes(searchText.toLowerCase().trim()));
            }catch(err){}
            //console.log('filter', empresasDar)
        }

        if(sorting.field){
            try{
            const reversed = sorting.order === "asc" ? 1 : -1;
            computedExtensiones= extensiones.sort((a,b)=> reversed * a[sorting.field].localeCompare(b[sorting.field]))
            }
            catch(err){}
        }

        setTotalItems(computedExtensiones.length);

            //Current Page slice
            return computedExtensiones.slice( 
                (currentPage -1) * ITEMS_PER_PAGE, 
                (currentPage - 1) *ITEMS_PER_PAGE + ITEMS_PER_PAGE 
            );
    
        }, [extensiones, currentPage, ITEMS_PER_PAGE, sorting, searchText, setTotalItems])

    return (
        <>
            {extensionesData.map(extension => <ExtensionRow key={extension.id} extension={extension}/>)}
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

export default connect(mapStateToProps, mapDispatchToProps)(ExtensionList);

