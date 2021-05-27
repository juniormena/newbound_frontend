
import useModal from "../../hooks/useModal";
import ModalComponent from "../../components/Modal/ModalComponent";
import TableComponent from "../../components/Table/TableComponent";
import ColasRulesFilter from "./ColasRulesFilter";
import ColasRulesLista from "../../components/ColasRules/ColasRulesLista";
import ColasRulesInsert from "../../components/ColasRules/ColasRulesInsert";


export default function ColasRules() {
  
  const [show, handleShow, handleClose] = useModal();

  
  const titulo = "Reglas de Colas";
  const columns= [

      {name:'Nombre de la regla', field:'Nombre de la regla', sortable:true},
   
      {name:'Empresa', field:'Empresa', sortable:false},
      
      {name:'Acciones ', field:'acciones', sortable:true},
  ]

  return (
    <>
    
   <ColasRulesFilter/>
     
    <TableComponent title={titulo} handleShow={handleShow} columns={columns} showSearch={false}>
    {(currentPage,ITEMS_PER_PAGE, setTotalItems,sorting,searchText)=>(
    <ColasRulesLista currentPage={currentPage} 
                 ITEMS_PER_PAGE={ITEMS_PER_PAGE} setTotalItems={setTotalItems} sorting={sorting} searchText={searchText}/>)}
    </TableComponent>
    <ModalComponent  show={show} handleClose={handleClose} title={titulo}>
         <ColasRulesInsert/>
    </ModalComponent>
  </>
  )
}
