import { useEffect, useMemo, useState } from "react";

import { useGuardaExcel } from "../../../hooks/useGuardaExcel";

import { getEmpresa } from "../../../services/AdministracionService";
import EmpresaRow from "./EmpresaRow";
import { connect } from 'react-redux';
import { downloadPdf } from './../../../redux/actions/downloadbleActions';


function EmpresaList({ currentPage, ITEMS_PER_PAGE, setTotalItems, sorting, searchText, setDataToBeDownloaded }) {
    const [empresas,setEmpresas] = useState([]);
    const [excel, setExcel] = useState({
      excel:[]
  })

    useEffect(()=>{
        getEmpresa(setEmpresas);
       
    },[]);

    useEffect(()=>{
        setDataToBeDownloaded({data:empresas.map(empresa => [
            empresa.e_nombre_completo,
            empresa.e_descripcion,
            empresa.e_rnc,
            empresa.e_rango_extension,
            empresa.e_contexto
          ]), titulo:'Listado de empresas',orientacion:'portrait',headers:["Name", "Descripcion", "Rnc","Rango extension","Contexto"],fileName:'empresas'})
    },[empresas])

    
useEffect(() => {
  empresas.map(d=>{
     setExcel((prevFormValues) => ({
      excel: [
        ...prevFormValues.excel,
        {
          NOMBRE:d.e_nombre_completo,
          DESCRIPCION:d.e_descripcion,
          RNC:d.e_rnc,
          RANGO_EXTENSION:d.e_rango_extension,
          CONTEXTO:d.e_contexto
        },
      ],
    }));
  })

}, [empresas])

useGuardaExcel(excel.excel)

    //displayAlert("descargar pdf desde empresa list")


    const empresasData = useMemo(()=>{
            let computedEmpresas = empresas;
            
            //searching
            if(searchText){
                //console.log(searchText)
                computedEmpresas =  empresas.filter(
                    empresa=> 
                        empresa.e_nombre_completo.toLowerCase().includes(searchText.toLowerCase().trim()) 
                        || empresa.e_rnc.toLowerCase().includes(searchText.toLowerCase().trim()));

                //console.log('filter', empresasDar)
            }

            //sorting
            if(sorting.field){
                try{
                const reversed = sorting.order === "asc" ? 1 : -1;
                computedEmpresas = empresas.sort((a,b)=> reversed * a[sorting.field].localeCompare(b[sorting.field]))
                }
                catch(err){}
            }

            setTotalItems(computedEmpresas.length)

            //Current Page slice
            return computedEmpresas.slice( 
                (currentPage -1) * ITEMS_PER_PAGE, 
                (currentPage - 1) *ITEMS_PER_PAGE + ITEMS_PER_PAGE 
            );
          }, [
    empresas,
    currentPage,
    searchText,
    sorting,
    ITEMS_PER_PAGE,
    setTotalItems,
  ]);

  //console.log('final',empresasData)
  return (
    <>
      {empresasData.map((empresa) => (
        <EmpresaRow key={empresa.e_id} empresa={empresa} />
      ))}
    </>
  );
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

export default connect(mapStateToProps, mapDispatchToProps)(EmpresaList);