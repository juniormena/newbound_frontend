import { useState } from 'react';

import OpcionesGenerales from './Colas_Tabs/OpcionesGeneralesTab'


import useLoading from './../../hooks/useLoading';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getEmpresa } from '../../services/AdministracionService';
import TiemposTab from './Colas_Tabs/TiemposTab';
import OpcionesAgentesTab from './Colas_Tabs/OpcionesAgentesTab';
import AnunciosTab from './Colas_Tabs/AnunciosTab';
import MiembrosEstaticos from './Colas_Tabs/MiembrosEstaticos';

import { toast } from 'react-toastify';
import { ColasErrors } from '../../lib/ColasHelper';
import { addColas, GrabacionesParaCola, UpdateColas } from '../../services/ColasService';
import { GetMiembriosByColaName} from '../../services/ColaMiembrosEstaticos';
import {GetMiembriosByColaNameDinamico } from '../../services/ColasMiembrosDinamicos';
import MiembrosEstaticosEditarLista from './Colas_Tabs/MiembrosEstaticosEditarLista';
import MiembrosDinamicos from './Colas_Tabs/MiembrosDinamicos';
import MiembrosDinamicosEditarLista from './Colas_Tabs/MiembrosDinamicosEditarLista';


const initialState = {

    //opciones generales
    id_empresa: "",
    nombre: "", //Nombre de la cola
    /*  name: "", *///uuid unico
    servicelevel: 0,
    musiconhold: "",
    strategy: "",
    context: "",

    //tiempos
    timeout: 0,//
    retry: 0,
    timeoutpriority: "",// Solo dos Opciones APP y CONF
    wrapuptime: 0,
    announce_frequency: 0,
    min_announce_frequency: 0,

    //opciones para agente
    autopause: "no",//Opciones yes, no y all
    autopausedelay: 0,
    autopausebusy: "no", //Opciones yes, no
    autopauseunavail: "no",//Opciones yes, no
    reportholdtime: "no",//Opciones yes, no
    ringinuse: "no",//Opciones yes, no
    memberdelay: 0, //
    defaultrule: "",
    //Anuncios Personalizados
    //Ninguna de estas opciones son obligatorias
    periodic_announce: "",
    periodic_announce_frequency: 0,
    random_periodic_announce: "no",//Opciones yes, no
    announce_holdtime: "no",//Opciones yes, no y once
    announce_position: "no",//Opciones yes, no, more y limit
    announce_to_first_user: "no",//Opciones yes, no
    announce_position_limit: 0,
    //Opciones por defecto

};

//InitialState de Prueba
const initialState2 = {
    announce_frequency: 50,
    announce_holdtime: "yes",
    announce_position: "yes",
    announce_position_limit: 30,
    announce_to_first_user: "yes",//yes
    autopause: "all",
    autopausebusy: "no",
    autopausedelay: 90,
    autopauseunavail: "yes",
    context: "cc",
    defaultrule: "test1",
    id_empresa: 14,
    memberdelay: 60,
    min_announce_frequency: 60,
    musiconhold: "c6",
    nombre: "Cola 10",
    periodic_announce: "",
    periodic_announce_frequency: 90,
    random_periodic_announce: "no",
    relative_periodic_announce: "yes",
    reportholdtime: "yes",
    retry: 30,
    ringinuse: "no",
    servicelevel: 20,
    strategy: "random",
    timeout: 20,
    timeoutpriority: "app",
    wrapuptime: 40,
}

const staticMembers = {
    //Mienbros Estaticos
    queue_name: "",
    interface: "",
    membername: "",
    penalty: 0,
    paused: 0,
    wrapuptime: 0,
    tipoMiembro:""

}

function ColasForm({ title, colaData }) {

    const [formValues, setformValues] = useState(initialState)
    const [NombreEmpresa, setNombreEmpresa] = useState("")
    const [empresaData, setEmpresaData] = useState([]);
    const [anuncio, setAnuncio] = useState({ data: [] });
    const [grabaciones, setGrabaciones] = useState([])
    const [MemberDataEstatico, setMemberDataEstatico] = useState({
        data: []
    })
    const [MemberDataDinamico, setMemberDataDinamico] = useState({
        data: []
    })
    const [loading, setLoading] = useLoading();
    const [formMiembrosStaticos, setformMiembrosStaticos] = useState(staticMembers)
    
    const [ValidarEstatico, setValidarEstatico] = useState(false)
    const [ValidarDinamico, setValidarDinamico] = useState(false)

    const { data } = useSelector(state => state.user.currentUser.userLogin)

    const [empresaid, setEmpresaid] = useState(0)


    //Valida si se va Actualizar o si se Va  a Insertar
    useEffect(() => {

        if (title !== "Editar Colas") {
            if (data[0] !== undefined) {

            }
            GrabacionesParaCola(data[0].u_id_empresa, setGrabaciones)
            setEmpresaid(data[0].u_id_empresa)
        }
        else {
            if (colaData[0] !== undefined) {
          
                GrabacionesParaCola(colaData[0].id_empresa, setGrabaciones)
                setEmpresaid(colaData[0].id_empresa)
            }

        }

    }, [data, setGrabaciones, colaData, title])




    useEffect(() => {
        getEmpresa(setEmpresaData);
    }, [setEmpresaData]);


    ///Efect Para update
    useEffect(() => {

        if (title === "Editar Colas") {
            if (colaData[0] !== undefined) {

           
           GetMiembriosByColaName(colaData[0].name,setMemberDataEstatico)
           GetMiembriosByColaNameDinamico(colaData[0].name,setMemberDataDinamico)
                setformValues({
                    name: colaData[0].name,
                    announce_frequency: colaData[0].announce_frequency,
                    announce_holdtime: colaData[0].announce_holdtime,
                    announce_position: colaData[0].announce_position,
                    announce_position_limit: colaData[0].announce_position_limit,
                    announce_to_first_user: colaData[0].announce_to_first_user,
                    autopause: colaData[0].autopause,
                    autopausebusy: colaData[0].autopausebusy,
                    autopausedelay: colaData[0].autopausedelay,
                    autopauseunavail: colaData[0].autopauseunavail,
                    context: colaData[0].context,
                    defaultrule: colaData[0].defaultrule,
                    id_empresa: colaData[0].id_empresa,
                    memberdelay: colaData[0].memberdelay,
                    min_announce_frequency: colaData[0].min_announce_frequency,
                    musiconhold: colaData[0].musiconhold,
                    nombre: colaData[0].nombre,
                    periodic_announce: colaData[0].periodic_announce,
                    periodic_announce_frequency: colaData[0].periodic_announce_frequency,
                    random_periodic_announce: colaData[0].random_periodic_announce,
                    relative_periodic_announce: colaData[0].relative_periodic_announce,
                    reportholdtime: colaData[0].reportholdtime,
                    retry: colaData[0].retry,
                    ringinuse: colaData[0].ringinuse,
                    servicelevel: colaData[0].servicelevel,
                    strategy: colaData[0].strategy,
                    timeout: colaData[0].timeout,
                    timeoutpriority: colaData[0].timeoutpriority,
                    wrapuptime: colaData[0].wrapuptime,
                })
            }
        }
    }, [title, setformValues, colaData])



    useEffect(() => {
        empresaData.filter(empresa => {

            if (empresaid === empresa.e_id) {

                setNombreEmpresa(empresa.e_nombre_completo)
                setformValues({ ...formValues, id_empresa: empresaid })
            }
        })

    }, [empresaData, setNombreEmpresa, setformValues, setEmpresaid, empresaid])



    //Submit

    const handleSubmit = (e) => {

        e.preventDefault()
          if (title==="Editar Colas") {
              
             UpdateColas(formValues, setLoading, anuncio)
          } else {
             if (ColasErrors(formValues)) {
                 toast.error("Todos los campos con * son requeridos", {
                     autoClose: 2500
                 })
             }
             else {
                 addColas(formValues, setLoading, anuncio,MemberDataEstatico,MemberDataDinamico)
             }
          }

    }

 
    return (
        <>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item">
                    <a className="nav-link active" id="options-tab" data-toggle="tab" href="#options" role="tab" aria-controls="options" aria-selected="true">
                        <i className="fas fa-cog mr-1"></i> Opciones Generales</a>
                </li>

                <li className="nav-item">
                    <a className="nav-link" id="time-tab" data-toggle="tab" href="#tiempos" role="tab" aria-controls="tiempos" aria-selected="false">
                        <i className="fas fa-clock mr-1"></i> Tiempos</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id="agente-tab" data-toggle="tab" href="#agente" role="tab" aria-controls="agente" aria-selected="false">
                        <i className="fas fa-user mr-1"></i> Opciones para Agente</a>
                </li>

                <li className="nav-item">
                    <a className="nav-link" id="anuncio-tab" data-toggle="tab" href="#anuncio" role="tab" aria-controls="anuncio" aria-selected="false">
                        <i className="fas fa-bullhorn mr-1"></i> Anuncios Personalizados</a>
                </li>

                <li className="nav-item">
                    <a className="nav-link" id="members-tab" data-toggle="tab" href="#members" role="tab" aria-controls="members" aria-selected="false">
                        <i className="fas fa-users mr-1"></i> Miembros Estaticos</a>
                </li>

                <li className="nav-item">
                <a className="nav-link" id="members-tabDi" data-toggle="tab" href="#membersDi" role="tab" aria-controls="membersDi" aria-selected="false">
                        <i className="fas fa-users mr-1"></i> Miembros Dinámicos</a>
                </li>


            </ul>
            <form noValidate className="colasForm" onSubmit={handleSubmit}>
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="options" role="tabpanel" aria-labelledby="options-tab">
                        <OpcionesGenerales formValues={formValues} setformValues={setformValues} NombreEmpresa={NombreEmpresa} u_id_empresa={empresaid} empresaData={empresaData} />
                    </div>
                    <div className="tab-pane fade" id="tiempos" role="tabpanel" aria-labelledby="tiempos-tab">
                        <TiemposTab formValues={formValues} setformValues={setformValues} />
                    </div>
                    <div className="tab-pane fade" id="agente" role="tabpanel" aria-labelledby="agente-tab">
                        <OpcionesAgentesTab formValues={formValues} setformValues={setformValues} empresa={empresaid} />
                    </div>
                    <div className="tab-pane fade" id="anuncio" role="tabpanel" aria-labelledby="anuncio-tab">
                        < AnunciosTab formValues={formValues} setformValues={setformValues}
                            grabaciones={grabaciones} anuncio={anuncio} setAnuncio={setAnuncio} />
                    </div>
                    <div className="tab-pane fade" id="members" role="tabpanel" aria-labelledby="members-tab">
                     {
                         title==='Editar Colas'
                         ?
                         < MiembrosEstaticosEditarLista
                         colaData={colaData}
                         MemberDataEstatico={MemberDataEstatico} setMemberDataEstatico={setMemberDataEstatico}
                     />
                         :
                         < MiembrosEstaticos
                         formMiembrosStaticos={formMiembrosStaticos}
                         setformMiembrosStaticos={setformMiembrosStaticos}
                         formValues={formValues} setformValues={setformValues}
                         MemberDataEstatico={MemberDataEstatico} setMemberDataEstatico={setMemberDataEstatico}
                         ValidarEstatico={ValidarEstatico} setValidarEstatico={setValidarEstatico}
                     />
                     }
                    </div>

                    <div className="tab-pane fade" id="membersDi" role="tabpanel" aria-labelledby="members-tabDi">
                     {
                         title==='Editar Colas'
                         ?
                         <  MiembrosDinamicosEditarLista
                         colaData={colaData}
                         MemberDataDinamico={MemberDataDinamico} setMemberDataDinamico={setMemberDataDinamico}
                         
                     />
                         :
                         < MiembrosDinamicos
                         formMiembrosStaticos={formMiembrosStaticos}
                         setformMiembrosStaticos={setformMiembrosStaticos}
                         formValues={formValues} setformValues={setformValues}
                         MemberDataDinamico={MemberDataDinamico} setMemberDataDinamico={setMemberDataDinamico}
                         ValidarDinamico={ValidarDinamico} setValidarDinamico={setValidarDinamico}
                     />
                     }
                    </div>
                    <button
                        className="btn btn-primary text-uppercase my-2  float-right"
                        disabled={loading || ValidarEstatico || ValidarDinamico}
                    >
                        {title === "Editar Colas" ? "Editar" : "guardar"}
                    </button>
                </div>
            </form>

        </>
    )
}

export default ColasForm;
