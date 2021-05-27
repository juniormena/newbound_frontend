
import useModal from "../../hooks/useModal";
import ModalComponent from "../../components/Modal/ModalComponent";
import TableComponent from "../../components/Table/TableComponent";


import CampanasFilter from "./CampanasFilter";
import CampanasLista from "../../components/Campanas/CampanasLista";
import CampanasInsert from "../../components/Campanas/CampanasInsert";
import { useSelector } from "react-redux";



export default function Campanas() {
  
  const [show, handleShow, handleClose] = useModal();
  const { currentUser } = useSelector(state => state.user)

 
  const titulo = "Campañas";
  const columns= [

      {name:'Nombre', field:'', sortable:true},
      {name:'Empresa', field:'Empresa', sortable:false},
      {name:'Departamento', field:'Departamento', sortable:false},
      {name:'fecha inicio', field:'fecha inicio', sortable:false},
      {name:'fecha fin', field:'fecha fin', sortable:false},
      {name:'hora inicio', field:'hora inicio', sortable:false},
      {name:'hora fin', field:'hora fin', sortable:false},
      {name:'Troncal', field:'Troncal', sortable:false},
      {name:'Contexto', field:'Contexto', sortable:false},
      {name:'Cola', field:'Cola', sortable:false},
      {name:'Reintentos Max', field:'Reintentos Maximos', sortable:false},
      
      {name:'Acciones ', field:'acciones', sortable:true},
  ]

  return (
    <>
    
   <CampanasFilter/>
     
    <TableComponent title={titulo} handleShow={handleShow} columns={columns} showSearch={false} headerFontSize='11px' >
    {(currentPage,ITEMS_PER_PAGE, setTotalItems,sorting,searchText)=>(
    <CampanasLista currentPage={currentPage} 
                 ITEMS_PER_PAGE={ITEMS_PER_PAGE} setTotalItems={setTotalItems} sorting={sorting} searchText={searchText} currentUser={currentUser}/>)}
    </TableComponent>
    <ModalComponent  show={show} handleClose={handleClose} title={titulo}>
         <CampanasInsert currentUser ={currentUser } titulo={titulo}/>
    </ModalComponent>
  </>
  )
}
