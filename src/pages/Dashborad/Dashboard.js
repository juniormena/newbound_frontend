import React, {useContext, useEffect, useState} from 'react';
import { connect } from 'react-redux';
import {getColaACD, getColaStatistics} from '../../services/dashboardService';
import DashboardWidgets from "../../components/Dashboard/DashboardWidgets";
import DashboardMiddleContainer from "../../components/Dashboard/DasboardMiddleContainer";
import DashboardEstadoAgente from "../../components/Dashboard/DashboardEstadoAgente";
import {getUsuarioForEstadoAgente} from "../../services/AdministracionService";
import {getMotivo_Pausa} from "../../services/EstadoAgenteService";
import {SipContext} from "../../components/SoftPhone/SipProvider/SipProvider";

function Dashboard(props) {

    const { currentUser2 } = props;
    const [datosColas, setDatosColas] = useState([]);
    const [colaACD, setColaACD] = useState([]);
    const [estadoAgenteCola, setEstadoAgenteCola] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [estadoPausa, setEstadoPausa] = useState([]);
    const sip = useContext(SipContext);

    useEffect(()=>{
        getUsuarioForEstadoAgente(setUsuarios);
        getMotivo_Pausa(setEstadoPausa);

        return ()=>{
            setEstadoPausa([]);
            setUsuarios([]);
        }
    },[])

    useEffect(() => {
        getColaStatistics(currentUser2, setDatosColas, setEstadoAgenteCola)
       const interval = setInterval(()=>{
           getColaStatistics(currentUser2, setDatosColas, setEstadoAgenteCola);
        },2000)

        return ()=> clearInterval(interval);
        //getColaStatistics(currentUser2, setDatosColas, datosColas)

    }, [currentUser2]);

    useEffect(()=>{
        const intervalACD = setInterval(()=>{
            getColaACD(currentUser2,setColaACD);
        },100)

        const intervalToCleanACD = setInterval(()=>{
            setColaACD([]);
        },20000)

        return ()=>{
            clearInterval(intervalACD);
            clearInterval(intervalToCleanACD);
        }

    },[currentUser2])

    return (
        <React.Fragment>
            <DashboardWidgets datosColas={datosColas} cantColas={currentUser2.cola_supervision.data.length} Colas={currentUser2.cola_supervision.data}/>
            <DashboardMiddleContainer datosColas={datosColas} Colas={currentUser2.cola_supervision.data} colaACD={colaACD}/>
            <DashboardEstadoAgente estadoAgenteCola={estadoAgenteCola} Colas={currentUser2.cola_supervision.data} usuarios={usuarios} estadoPausa={estadoPausa} sip={sip}/>
        </React.Fragment>
    );
}

const mapStateToProps = state=>{
    return{
        currentUser2:state.user.currentUser
    }
}

export default connect(mapStateToProps, null)(React.memo(Dashboard))