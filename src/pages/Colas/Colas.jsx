
import useModal from "../../hooks/useModal";
import ModalComponent from "../../components/Modal/ModalComponent";
import TableComponent from "../../components/Table/TableComponent";
import ColasFilter from "./ColasFilter";
import ColasLista from "../../components/Colas/ColasLista";
import ColasForm from "../../components/Colas/ColasForm";


export default function Colas() {

  const [show, handleShow, handleClose] = useModal();


  const titulo = "Colas";
  const columns = [
    { name: 'ID COLA', field: 'Nombre COLA', sortable: true },
    { name: 'Nombre COLA', field: 'Nombre COLA', sortable: true },
    { name: 'Service level ', field: 'Service level ', sortable: true },
    { name: 'Estrategia', field: 'estrategia', sortable: false },

    { name: 'Musica en Espera', field: 'Musica en Espera', sortable: false },
    { name: 'Empresa ', field: 'empresa ', sortable: true },
    { name: 'Acciones ', field: 'acciones', sortable: true },
  ]

  return (
    <>

      <ColasFilter />

      <TableComponent title={titulo} handleShow={handleShow} columns={columns} showSearch={false}>
        {(currentPage, ITEMS_PER_PAGE, setTotalItems, sorting, searchText) => (
          <ColasLista currentPage={currentPage}
            ITEMS_PER_PAGE={ITEMS_PER_PAGE} setTotalItems={setTotalItems} sorting={sorting} searchText={searchText} />)}
      </TableComponent>
      <ModalComponent size="xl" show={show} handleClose={handleClose} title={titulo}>
        <ColasForm title={titulo} />
      </ModalComponent>
    </>
  )
}
