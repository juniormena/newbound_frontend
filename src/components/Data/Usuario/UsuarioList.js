import { useEffect, useMemo, useState } from 'react';
import { useGuardaExcel } from '../../../hooks/useGuardaExcel';
import { connect } from 'react-redux';
import { downloadPdf } from './../../../redux/actions/downloadbleActions';
import { getUsuarioAllDataByDep } from '../../../services/AdministracionService';
import UsuarioRow from './UsuarioRow';

function UsuarioList({ currentPage, ITEMS_PER_PAGE, setTotalItems, sorting, searchText, setDataToBeDownloaded, currentUser }) {
    const [usuarios,setUsuarios] = useState([]);
    const [excel, setExcel] = useState({
        excel:[]
    });

    useEffect(()=>{
        getUsuarioAllDataByDep(setUsuarios, currentUser)
    },[]);

    useEffect(() => {
        usuarios.map(d=>{
           setExcel((prevFormValues) => ({
        
            excel: [
              ...prevFormValues.excel,
              {
                NOMBRE:d.u_nombre_completo,
                EMPRESA:d.e_nombre_completo,
                SUCURSAL:d.se_descripcion,
                DEPARTAMENTO:d.ds_descripcion,
                USERNAME:d.u_usuario,
                PERFIL:d.p_descripcion,
                CORREO:d.u_correo,
                
              },
            ],
          }));
        })
    
    }, [usuarios])

    
      useGuardaExcel(excel.excel)

    useEffect(()=>{

        setDataToBeDownloaded({data:usuarios.map(usuario => [
            usuario.u_nombre_completo,
        usuario.e_nombre_completo,
        usuario.se_descripcion,
        usuario.ds_descripcion,
        usuario.u_usuario,
        usuario.p_descripcion,
        usuario.u_correo,
          ]), titulo:'Listado de usuarios',orientacion:'portrait',headers:["Nombre","Empresa","Sucursal","Departamento","Username","Perfil","Correo"],
          fileName:'usuarios'})
       
    },[usuarios])

    const usuariosData = useMemo(()=>{
            let computedUsuarios = usuarios;
            
            //searching
            if(searchText){
                //console.log(searchText)
                computedUsuarios =  usuarios.filter(
                    usuario=> 
                        usuario.e_nombre_completo.toLowerCase().includes(searchText.toLowerCase().trim()) 
                        || usuario.u_nombre_completo.toLowerCase().includes(searchText.toLowerCase().trim())
                        || usuario.u_id_documento.toLowerCase().includes(searchText.toLowerCase().trim())
                        || usuario.u_usuario.toLowerCase().includes(searchText.toLowerCase().trim())
                        || usuario.p_descripcion.toLowerCase().includes(searchText.toLowerCase().trim())
                        || usuario.u_correo.toLowerCase().includes(searchText.toLowerCase().trim()));

                //console.log('filter', empresasDar)
            }

            //sorting
            if(sorting.field){
                try{
                const reversed = sorting.order === "asc" ? 1 : -1;
                computedUsuarios = usuarios.sort((a,b)=> reversed * a[sorting.field].localeCompare(b[sorting.field]))
                }
                catch(err){}
            }

            setTotalItems(computedUsuarios.length)

            //Current Page slice
            return computedUsuarios.slice( 
                (currentPage -1) * ITEMS_PER_PAGE, 
                (currentPage - 1) *ITEMS_PER_PAGE + ITEMS_PER_PAGE 
            );
    
        }, [usuarios, currentPage, searchText, sorting, ITEMS_PER_PAGE, setTotalItems])

        //console.log('final',usuariosData)

    return (
        <>
            {usuariosData.map(usuario => <UsuarioRow key={usuario.u_id} usuario={usuario} permisosUsuario={currentUser?.permisosUsuario}/>)}
        </>
    )
}

const mapStateToProps = state=>{
    return{
        dataToBeDownloaded:state.downloadble.dataToBeDownloaded,
        currentUser:state.user.currentUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setDataToBeDownloaded: (data) => {
            dispatch({type:downloadPdf(), payload:data})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsuarioList);

