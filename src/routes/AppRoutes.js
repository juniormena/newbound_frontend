import {Redirect, Route, Switch} from 'react-router-dom';
import MainLayout from './../components/layout/MainLayout';
import {Login, Dashboard, Empresa, Sucursal, Departamento, EmpresaEdit, SucursalEdit,
    DepartamentoEdit, MantPermisos, MenuPermiso, Usuario, UsuarioEdit, Extension, ExtensionEdit, MantEstadoAgente, MantEstadoAgenteEdit,
    MusicaEnEsperaEdit, ReporteRegistroLlamadas,Grabaciones,MusicaEnEsperaV2,GrabacionesEdit,Colas,ColasEdit,ColasRules, ColasRulesEdit,ColasMiembrosEditar,
    ColasMiembrosInsertPage, DashboardWholePage,DetalleColas,ResumenColas,ColasRulesEditConf,ActividadAgente,ResumenAgentesColas,LlamadasAbandonadas
    ,ColasMiembrosInsertPageDInamicos,ColasMiembrosEditarDinamicos,Contactos,ContactosEdit,ResumenAgentes,
    Campanas,CampanasEdit,CampanasRegistros,CampanasRegistrosEdit, Prueba} from './../pages';
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from './../components/ProtectedRoute/ProtectedRoute';
import {getCurrentUser} from "../services/authService";
import { connect } from "react-redux";
import {hasPermission} from "../lib/Permissions";
import {dashboardPermiso} from "../lib/permissionVars";

function AppRoutes(props) {
    const {currentUser } = props;
    const usuariosRoutes = currentUser.menuPerfilUsuario.data?.map(( { m_url } ) => m_url!=="/#" && m_url );
    const aplicacionRoutes =[
        {path:"/", component:Dashboard},
        {path:"/dashboard", component:DashboardWholePage},
        {path:"/login", component:Login},
        {path: "/administracion/empresa", component:Empresa},
        {path:"/administracion/sucursal", component:Sucursal},
        {path:"/administracion/departamento", component:Departamento},
        {path:"/administracion/mantpermisos", component:MantPermisos},
        {path:"/administracion/menupermiso", component:MenuPermiso},
        {path:"/administracion/usuario", component:Usuario},
        {path:"/administracion/extension", component:Extension},
        {path:"/administracion/mantestadoagente",component:MantEstadoAgente},
        {path:"/administracion/musicaespera", component:MusicaEnEsperaV2},
        {path:"/reporte/registrollamadas", component:ReporteRegistroLlamadas},
        {path:"/administracion/grabaciones", component:Grabaciones},
        {path:"/administracion/colas", component:Colas},
        {path:"/administracion/colas-reglas", component:ColasRules},
        {path:"/reporte/detalles-colas", component:DetalleColas},
        {path:"/reporte/resumen-colas", component:ResumenColas},
        {path:"/reporte/ActividadAgente", component:ActividadAgente},
        {path:"/reporte/resumen-agentes-cola", component:ResumenAgentesColas},
        {path:"/reporte/llamadas-abandonadas", component:LlamadasAbandonadas},
        {path:"/callcenter/contactos", component:Contactos},
        {path:"/reporte/resumen-agentes", component:ResumenAgentes},
        {path:"/callcenter/campanas", component:Campanas}
    ];

    function validRoutes() {
        if (
            aplicacionRoutes.map(({path}) => path).indexOf(window.location.pathname) === -1
            && !getCurrentUser()
            ||
            aplicacionRoutes.map(({path}) => path).indexOf(window.location.pathname) !== -1
            && !getCurrentUser()
            ||
            aplicacionRoutes.map(({path}) => path).indexOf(window.location.pathname) === -1
            && getCurrentUser()
        ){
            return (<Redirect
                to={{ pathname: "/login", state: { from: window.location.pathname } }}
            />)
        }
        else{
            return ""
        }

    }

    return (
        <>
        <ToastContainer />
        <Switch>
            <Route exact path="/login" component={Login}/>
            {hasPermission(dashboardPermiso, currentUser?.permisosUsuario) && <ProtectedRoute exact path="/dashboard" component={DashboardWholePage}/>}
            {validRoutes()}
            <MainLayout>
                {/*<ProtectedRoute exact path="/" component={Prueba}/>*/}
                <ProtectedRoute exact path="/administracion/empresa/edit/:Id" component={EmpresaEdit}/>
                <ProtectedRoute exact path="/administracion/sucursal/edit/:Id" component={SucursalEdit}/>
                <ProtectedRoute exact path="/administracion/departamento/edit/:Id" component={DepartamentoEdit}/>
                <ProtectedRoute exact path="/administracion/usuario/edit/:Id" component={UsuarioEdit}/>
                <ProtectedRoute exact path="/administracion/extension/edit/:Id" component={ExtensionEdit}/>
                <ProtectedRoute exact path="/administracion/mantestadoagente/edit/:Id" component={MantEstadoAgenteEdit}/>
                <ProtectedRoute exact path="/administracion/mantmusicaespera/:empresaId" component={MusicaEnEsperaEdit}/>
                <ProtectedRoute exact path="/administracion/grabaciones/edit/:audioInfo" component={GrabacionesEdit}/>
                <ProtectedRoute exact path="/administracion/colas/edit/:colaInfo" component={ColasEdit}/>
                <ProtectedRoute exact path="/administracion/colas-reglas/edit/:colaRuleInfo" component={ColasRulesEdit}/>
                <ProtectedRoute exact path="/callcenter/colas-reglasconfig/edit/:colaRule" component={ColasRulesEditConf}/>
                <ProtectedRoute exact path="/administracion/colas-miembros/edit/:miembroInfo" component={ColasMiembrosEditar}/>
                <ProtectedRoute exact path="/administracion/colas-miembros-dinamicos/edit/:miembroInfo" component={ColasMiembrosEditarDinamicos}/>
                <ProtectedRoute exact path="/administracion/colas-miembros/insert/:miembroInfo" component={ColasMiembrosInsertPage}/>
                <ProtectedRoute exact path="/administracion/colas-miembros-dinamicos/insert/:miembroInfo" component={ColasMiembrosInsertPageDInamicos}/>
                <ProtectedRoute exact path="/callcenter/contactos/edit/:contactoInfo" component={ContactosEdit}/>
                <ProtectedRoute exact path="/callcenter/campanas/edit/:campanaInfo" component={CampanasEdit}/>
                <ProtectedRoute exact path="/callcenter/campanasRegistros/edit/:campanaInfo" component={CampanasRegistrosEdit}/>
                
                {usuariosRoutes?.map(url=>
                    aplicacionRoutes?.map(appRoutes=>
                        url === appRoutes.path ? <ProtectedRoute key={appRoutes.path} exact path={appRoutes.path} component={appRoutes.component}/> : ''
                    )
                )}
                {/*<Route exact path="/not-found" component={PageNotFound}/>*/}
            </MainLayout>
        </Switch>
        
        </>
    )
}

const mapStateToProps = state=>{
    return{
        currentUser:state.user.currentUser
    }
};


export default connect(mapStateToProps, null)(AppRoutes);
