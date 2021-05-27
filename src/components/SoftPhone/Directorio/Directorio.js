import React, { useEffect, useState } from "react";
import ExtensionesDirectorioComponent from "../Tabs/ExtensionesDirectorioComponent";
import ContactosDirectorioComponent from "../Tabs/ContactosDirectorioComponent";
import CampanasDirectorioComponent from "../Tabs/CampanasDirectorioComponent";
import { getDirectorioCampanas, getDirectorioContactos, getDirectorioExtensiones } from '../../../services/softphoneService'
import PaginationComponent from "../../Table/Pagination/PaginationComponent";
import {usePagination} from "../../../hooks/usePagination";


function Directorio({currentUser, sip, handleDirectorio}) {

  const [Extensiones, setExtensiones] = useState([]);
  const [Contactos, setContactos] = useState([]);
  const [Campanas, setCampanas] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [Filtered, setFiltered] = useState([]);
  const {campanas_supervision,userLogin}=currentUser;
  const [DirectorioTipo, setDirectorioTipo] = useState('extensiones');

  const [currentExtensiones, totalItemsExtensiones, paginateExtensiones,
    itemsPerPageExtensiones, currentPageExtensiones] = usePagination(Extensiones,10);

  const [currentContactos, totalItemsContactos, paginateContactos,
    itemsPerPageContactos, currentPageContactos] = usePagination(Contactos,10);

  const [currentCampanas, totalItemsCampanas, paginateCampanas,
    itemsPerPageCampanas, currentPageCampanas] = usePagination(Campanas,10);

  useEffect(() => {
    getDirectorioExtensiones(userLogin.data[0].u_id_empresa, setExtensiones)
  }, [])

  useEffect(() => {
    getDirectorioContactos(userLogin.data[0].u_id_empresa, setContactos)
  }, [])

  useEffect(() => {
    getDirectorioCampanas(campanas_supervision.data,setCampanas)
  }, [])


  useEffect(() => {

    if (DirectorioTipo==='extensiones') {
      setFiltered(Extensiones.filter(extension=>(
        extension.username.toLowerCase().includes(searchText.toLowerCase().trim())
       )))
    }

    if (DirectorioTipo==='contactos') {

      setFiltered(Contactos.filter(contacto=>(
        contacto.contactname.toLowerCase().includes(searchText.toLowerCase().trim())
        ||  contacto.empresanombre2.toLowerCase().includes(searchText.toLowerCase().trim())
        ||  contacto.contactcargo.toLowerCase().includes(searchText.toLowerCase().trim())
       )))
    }

    if (DirectorioTipo==='campanas') {
      setFiltered(Campanas.filter(contacto=>(
        contacto.contacto.toLowerCase().includes(searchText.toLowerCase().trim()) 
        ||  contacto.cliente.toLowerCase().includes(searchText.toLowerCase().trim())
       )))
    }
  }, [searchText,Extensiones,DirectorioTipo])


  return (
    <div id="directory" >

      <div className="header">Directorio</div>

      <div className="searchComponent mb-4">
        <input type="text " 
               className="form-control"
               placeholder="Buscar"
               onChange={(e)=>setSearchText(e.target.value)}/>
      </div>

      <div className="tabs ">
        <ul className="nav nav-tabs" id="myTab" role="tablist">

          <li className="col-4">
            <a className="nav-link active  " id="extensiones-tab"
              data-toggle="tab" href="#extensiones" role="tab" 
              aria-controls="extensiones" aria-selected="true" onClick={()=>setDirectorioTipo('extensiones')}>Extensiones</a>
          </li>

          <li className="col-4">
            <a className="nav-link  " id="contactos-tab"
              data-toggle="tab" href="#contactos" role="tab" aria-controls="contactos" aria-selected="true"
              onClick={()=>setDirectorioTipo('contactos')}>Contactos</a>
          </li>

          <li className="col-4">
            <a className="nav-link" id="campanas-tab"
              data-toggle="tab" href="#campanas" role="tab" aria-controls="campanas" aria-selected="true"
              onClick={()=>setDirectorioTipo('campanas')}> Campañas</a>
          </li>
        </ul>
      </div>

      <div className="contactoInfo">

        <div className="tab-content " id="myTabContent">

          <div className="tab-pane ddd fade show active" id="extensiones" role="tabpanel" aria-labelledby="extensiones" >
            <ExtensionesDirectorioComponent Extensiones={searchText.length === 0 ? currentExtensiones : Filtered} sip={sip} handleDirectorio={handleDirectorio}/>
          </div>

          <div className="tab-pane fade" id="contactos" role="tabpanel" aria-labelledby="contactos-tab" >
            <ContactosDirectorioComponent contactos={searchText.length === 0 ? currentContactos : Filtered} sip={sip} handleDirectorio={handleDirectorio}/>

          </div>

          <div className="tab-pane fade" id="campanas" role="tabpanel" aria-labelledby="campana-tab" >
            <CampanasDirectorioComponent  Campanas={searchText.length === 0 ? currentCampanas : Filtered} sip={sip} handleDirectorio={handleDirectorio}/>
          </div>

        </div>
      </div>
      <br/>
      <PaginationComponent
          total={DirectorioTipo==='extensiones' ? totalItemsExtensiones : DirectorioTipo==='contactos' ? totalItemsContactos : totalItemsCampanas}
          itemsPerPage={DirectorioTipo==='extensiones' ? itemsPerPageExtensiones : DirectorioTipo==='contactos' ? itemsPerPageContactos : itemsPerPageCampanas}
          currentPage={DirectorioTipo==='extensiones' ? currentPageExtensiones : DirectorioTipo==='contactos' ? currentPageContactos : currentPageCampanas}
          onPageChange={DirectorioTipo==='extensiones' ? paginateExtensiones : DirectorioTipo==='contactos' ? paginateContactos : paginateCampanas}
      />
    </div>
  );
}

export default React.memo(Directorio);
