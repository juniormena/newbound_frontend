
import useModal from "../../hooks/useModal";
import ModalComponent from "../../components/Modal/ModalComponent";
import ModalComponent2 from "../../components/Modal/ModalComponent2";
import TableComponent from "../../components/Table/TableComponent";

import ContactosFilter from "./ContactosFilter";
import ContactosLista from "../../components/Contactos/ContactosLista";
import ContactosInsert from "../../components/Contactos/ContactosInsert";
import { useState } from "react";


export default function Contactos() {
  
  const [show, handleShow, handleClose] = useModal();
  const [filterResult, setfilterResult] = useState([])
  
  const titulo = "Contactos";
  const columns= [

      {name:'Nombre', field:'Nombre', sortable:true},
      {name:'Empresa', field:'Empresa', sortable:false},
      {name:'Cargo ', field:'Cargo', sortable:true},
      {name:'Telefono ', field:'Telefono', sortable:true},
      {name:'Flota', field:'Flota', sortable:true},
      {name:'Acciones ', field:'acciones', sortable:true},
  ]

 // console.log(filterResult);
  return (
    <>
    
   <ContactosFilter filterResult={filterResult} setfilterResult={setfilterResult}/>
     
    <TableComponent title={titulo} handleShow={handleShow} columns={columns} showSearch={false} showImportExcel={true}>
    {(currentPage,ITEMS_PER_PAGE, setTotalItems)=>(
    <ContactosLista currentPage={currentPage} 
                 ITEMS_PER_PAGE={ITEMS_PER_PAGE} 
                 setTotalItems={setTotalItems} 
                 filterResult={filterResult} 
                 setfilterResult={setfilterResult}/>)}
    </TableComponent>
    <ModalComponent2  show={show} handleClose={handleClose} title={titulo} size="lg">
         <ContactosInsert titulo={titulo}/>
    </ModalComponent2>
  </>
  )
}
