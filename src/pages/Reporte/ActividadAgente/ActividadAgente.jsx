import React from "react";
import { connect, useSelector } from 'react-redux';
import { downloadPdf } from '../../../redux/actions/downloadbleActions';
import TableComponent from "../../../components/Table/TableComponent";
import useModal from "../../../hooks/useModal";

import useLoading from "../../../hooks/useLoading";



import ActividadAgenteFilter from "./ActividadAgenteFilter";
import ActividadAgenteList from "../../../components/ActividadAgente/ActividadAgenteList";

const ActividadAgente = ({ setDataToBeDownloaded }) => {
  const [/*show*/, handleShow, /*handleClose*/] = useModal();
  const titulo = "Actividad de Agentes";

  const [/*loading,*/ setLoading] = useLoading();

  const { currentUser } = useSelector(state => state.user)
  //const [height, setHeight] = useState(1400)


  const columns = [
    { name: "FECHA", field: "hora", sortable: false },
    { name: "NOMBRE DE AGENTE", field: "cola", sortable: false },
    { name: "COLA", field: "e_contexto", sortable: false },
    { name: "ESTADO", field: "accion", sortable: false },
    { name: "MOTIVO", field: "accion", sortable: false },
    { name: "TIEMPO EN ESTADO", field: "accion", sortable: false },
    { name: "TIEMPO EXCEDIDO", field: "accion", sortable: false },

  ];


/*   useEffect(() => {
    function handleResize() {
     
      setHeight(window.innerWidth)
     
    }
    window.addEventListener('resize', handleResize)
  }, [])
  console.log( height<760) */

  return (
    <>
      <ActividadAgenteFilter currentUser={currentUser} />
      <TableComponent title={titulo} handleShow={handleShow} columns={columns} showSearch={false}
        showAddButton={false} headerFontSize='11px'
      >
        {(currentPage, ITEMS_PER_PAGE, setTotalItems, sorting, searchText, setCurrentPage) => (
          <ActividadAgenteList currentPage={currentPage}
            ITEMS_PER_PAGE={ITEMS_PER_PAGE} setTotalItems={setTotalItems}
            sorting={sorting}
            searchText={searchText}
            setCurrentPage={setCurrentPage}

          />
        )}
      </TableComponent>
    </>
  );
};

const mapStateToProps = state => {
  return {
    dataToBeDownloaded: state.downloadble.dataToBeDownloaded
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setDataToBeDownloaded: (data) => {
      dispatch({ type: downloadPdf(), payload: data })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActividadAgente);
