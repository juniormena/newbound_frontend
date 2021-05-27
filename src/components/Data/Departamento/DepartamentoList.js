
import { useEffect, useState, useMemo } from 'react';
import { useGuardaExcel } from '../../../hooks/useGuardaExcel';
import { connect } from 'react-redux';
import { downloadPdf } from './../../../redux/actions/downloadbleActions';
import { getDepartamentosSucursalWithSucursalName } from '../../../services/AdministracionService';
import DepartamentoRow from './DepartamentoRow';


function DepartamentoList({ currentPage, ITEMS_PER_PAGE, setTotalItems, sorting, searchText, setDataToBeDownloaded }) {
    const [departamentos,setDepartamentos] = useState([]);

    useEffect(()=>{
        getDepartamentosSucursalWithSucursalName(setDepartamentos)
    },[]);

    const [excel, setExcel] = useState({
        excel:[]
    })
    
    useEffect(() => {
        departamentos.map(d=>{
           setExcel((prevFormValues) => ({
        
            excel: [
              ...prevFormValues.excel,
              {
                NOMBRE_DEPARTAMENTO:d.ds_descripcion,
                EMPRESA:d.e_nombre_completo,
                SUCURSAL:d.se_descripcion
              
              },
            ],
          }));
        })
    
    }, [departamentos])
    
      useGuardaExcel(excel.excel)
    useGuardaExcel(departamentos)
    useEffect(()=>{
        setDataToBeDownloaded({data:departamentos.map(departamento => [
            departamento.ds_descripcion,
            departamento.e_nombre_completo,
            departamento.se_descripcion
          ]), titulo:'Listado de departamentos',orientacion:'portrait',headers:["Nombre Departamento","Empresa", "Sucursal"],fileName:'departamentos'})
    },[departamentos])

    /*console.log(empresas)*/

    const departamentosData = useMemo(()=>{

        let computedDepartamentos = departamentos;
            
            //searching
            if(searchText){
                //console.log(searchText)
                computedDepartamentos =  departamentos.filter(
                    departamento=> 
                        departamento.ds_descripcion.toLowerCase().includes(searchText.toLowerCase().trim()) 
                        || departamento.e_nombre_completo.toLowerCase().includes(searchText.toLowerCase().trim())
                        || departamento.se_descripcion.toLowerCase().includes(searchText.toLowerCase().trim()));

                //console.log('filter', empresasDar)
            }

        if(sorting.field){
            try{
            const reversed = sorting.order === "asc" ? 1 : -1;
            computedDepartamentos = departamentos.sort((a,b)=> reversed * a[sorting.field].localeCompare(b[sorting.field]))
            }
            catch(err){}
        }

            setTotalItems(computedDepartamentos.length)

            //Current Page slice
            return computedDepartamentos.slice( 
                (currentPage -1) * ITEMS_PER_PAGE, 
                (currentPage - 1) *ITEMS_PER_PAGE + ITEMS_PER_PAGE 
            );
    
        }, [departamentos, currentPage, ITEMS_PER_PAGE,sorting, searchText, setTotalItems])
    
    return (
        <>
            {departamentosData.map(departamento => <DepartamentoRow key={departamento.ds_id} departamento={departamento}/>)}
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

export default connect(mapStateToProps, mapDispatchToProps)(DepartamentoList);