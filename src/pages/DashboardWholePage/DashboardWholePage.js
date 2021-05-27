import React, { useEffect , useState } from 'react';
import { connect } from 'react-redux';
import { currentUser } from '../../redux/actions/usuarioActions';
import {getColaACD, getColaStatistics} from '../../services/dashboardService';
import DashboardWidgets from "../../components/Dashboard/DashboardWidgets";
import DashboardMiddleContainer from "../../components/Dashboard/DasboardMiddleContainer";
import DashboardEstadoAgente from "../../components/Dashboard/DashboardEstadoAgente";
import {getUsuarioForEstadoAgente} from "../../services/AdministracionService";
import {getMotivo_Pausa} from "../../services/EstadoAgenteService";
import Footer from "../../components/Footer/Footer";
import $ from "jquery";

function DashboardWholePage(props) {

    const { currentUser, currentUser2 } = props;
    const [datosColas, setDatosColas] = useState([]);
    const [colaACD, setColaACD] = useState([]);
    const [estadoAgenteCola, setEstadoAgenteCola] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [estadoPausa, setEstadoPausa] = useState([]);

    useEffect(()=>{
        currentUser();
    },[currentUser])

    useEffect(()=>{
        getUsuarioForEstadoAgente(setUsuarios);
        getMotivo_Pausa(setEstadoPausa);
        $('.carousel').carousel({
            interval: 5000
        });
    },[])

    useEffect(() => {
        getColaStatistics(currentUser2, setDatosColas, setEstadoAgenteCola)
        const interval2 = setInterval(()=>{
            getColaStatistics(currentUser2, setDatosColas, setEstadoAgenteCola)
        },2000)

        return ()=> clearInterval(interval2);
        //getColaStatistics(currentUser2, setDatosColas, datosColas)

    }, [currentUser2]);

    useEffect(()=>{
        const intervalACD2 = setInterval(()=>{
            getColaACD(currentUser2,setColaACD);
        },2000)

        const intervalToCleanACD2 = setInterval(()=>{
            setColaACD([]);
        },20000)

        return ()=>{
            clearInterval(intervalACD2);
            clearInterval(intervalToCleanACD2);
        }

    },[currentUser2])

    //console.log('datos de la cola',datosColas.flat())

    return (
        <React.Fragment>
            <div className="app-main">
                        <div id="carouselExampleControls" className="carousel slide container-fluid" data-ride="carousel">
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <DashboardWidgets datosColas={datosColas} cantColas={currentUser2.cola_supervision.data.length}/>
                                    <DashboardMiddleContainer datosColas={datosColas} Colas={currentUser2.cola_supervision.data} colaACD={colaACD}/>
                                </div>
                                <div className="carousel-item">
                                    <DashboardEstadoAgente estadoAgenteCola={estadoAgenteCola} Colas={currentUser2.cola_supervision.data} usuarios={usuarios} estadoPausa={estadoPausa}/>
                                </div>
                            </div>
                        </div>
                <footer>
                    <Footer move={false}/>
                </footer>
            </div>
        </React.Fragment>
    );
}

const mapStateToProps = state=>{
    return{
        currentUser2:state.user.currentUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
        currentUser: () => {
            dispatch({type:currentUser()})
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(DashboardWholePage))