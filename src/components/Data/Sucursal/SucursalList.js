import { useEffect, useState, useMemo } from "react";
import { useGuardaExcel } from "../../../hooks/useGuardaExcel";
import { connect } from 'react-redux';
import { downloadPdf } from './../../../redux/actions/downloadbleActions';
import { getEmpresaSucursalesWithEmpresaName } from "../../../services/AdministracionService";
import SucursalRow from './SucursalRow';

function SucursalList({ currentPage, ITEMS_PER_PAGE, setTotalItems, sorting, searchText, setDataToBeDownloaded }) {
    const [sucursales, setSucursales] = useState([]);

    useEffect(()=>{
        getEmpresaSucursalesWithEmpresaName(setSucursales)
    },[])

    const [excel, setExcel] = useState({
        excel:[]
    })
    
    useEffect(() => {
        sucursales.map(d=>{
           setExcel((prevFormValues) => ({
        
            excel: [
              ...prevFormValues.excel,
              {
                NOMBRE_SUCURSAL:d.se_descripcion,
                EMPRESA:d.e_nombre_completo,
              
              },
            ],
          }));
        })
    
    }, [sucursales])
    
      useGuardaExcel(excel.excel)

  
    useEffect(()=>{
        setDataToBeDownloaded({data:sucursales.map(sucursal => [
            sucursal.se_descripcion,
            sucursal.e_nombre_completo
          ]), titulo:'Listado de sucursales',orientacion:'portrait',headers:["Nombre Sucursal","Empresa"],fileName:'sucursales'})
    },[sucursales])


    const sucursalesData = useMemo(()=>{
        let computedSucursales = sucursales

        if(searchText){
           
            
            computedSucursales =  sucursales.filter(
                sucursal=> 
                    sucursal.se_descripcion.toLowerCase().includes(searchText.toLowerCase().trim()) 
                    || sucursal.e_nombre_completo.toLowerCase().includes(searchText.toLowerCase().trim()));

            //console.log('filter', empresasDar)
        }

        if(sorting.field){
            try{
            const reversed = sorting.order === "asc" ? 1 : -1;
            computedSucursales= sucursales.sort((a,b)=> reversed * a[sorting.field].localeCompare(b[sorting.field]))
            }
            catch(err){}
        }

        setTotalItems(computedSucursales.length);

            //Current Page slice
            return computedSucursales.slice( 
                (currentPage -1) * ITEMS_PER_PAGE, 
                (currentPage - 1) *ITEMS_PER_PAGE + ITEMS_PER_PAGE 
            );
    
        }, [sucursales, currentPage, ITEMS_PER_PAGE, sorting, searchText, setTotalItems])

    return (
        <>
            {sucursalesData.map(sucursal => <SucursalRow key={sucursal.se_id} sucursal={sucursal}/>)}
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

export default connect(mapStateToProps, mapDispatchToProps)(SucursalList);
