
import useModal from "../../hooks/useModal";
import ModalComponent from "../../components/Modal/ModalComponent";
import GrabacionesInsert from "../../components/Grabaciones/GrabacionesInsert";
import TableComponent from "../../components/Table/TableComponent";
import GrabacionesLista from "../../components/Grabaciones/GrabacionesLista";
import GrabacionesFilter from "./GrabacionesFilter";


export default function Grabaciones() {
  
  const [show, handleShow, handleClose] = useModal();

  
  const titulo = "Grabaciones";
  const columns= [
      {name:'ID', field:'ID', sortable:true},
      {name:'Nombre De Audio', field:'audio', sortable:true},
      {name:'Descripcion', field:'descripcion', sortable:true},
      {name:'Empresa', field:'Empresa', sortable:true},
      {name:'Audio File', field:'directory', sortable:true},
      {name:'Acciones', field:'operacion', sortable:false},
  ]

  return (
    <>
    
    <GrabacionesFilter/>
     
    <TableComponent title={titulo} handleShow={handleShow} columns={columns} showSearch={false}>
    {(currentPage,ITEMS_PER_PAGE, setTotalItems,sorting,searchText)=>(<GrabacionesLista currentPage={currentPage} 
                 ITEMS_PER_PAGE={ITEMS_PER_PAGE} setTotalItems={setTotalItems} sorting={sorting} searchText={searchText}/>)}
    </TableComponent>
    <ModalComponent show={show} handleClose={handleClose} title={titulo}>
         <GrabacionesInsert titulo={titulo}/>
    </ModalComponent>
  </>
  )
}
