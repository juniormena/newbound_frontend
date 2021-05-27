import React from "react";
import { connect, useSelector } from 'react-redux';
import { downloadPdf } from '../../../redux/actions/downloadbleActions';
import TableComponent from "../../../components/Table/TableComponent";
import useModal from "../../../hooks/useModal";

import useLoading from "../../../hooks/useLoading";

import ResumenAgentesColasFilter from "./ResumenAgentesColasFilter";

import ResumenAgentesColasList from "../../../components/ResumenAgentesColas/ResumenAgentesColasList";

const ResumenAgentesColas = ({ setDataToBeDownloaded }) => {
  const [/*show*/, handleShow, /*handleClose*/] = useModal();
  const titulo = "Resumen De Agentes Por Cola";

  const { currentUser } = useSelector(state => state.user)
  //const [height, setHeight] = useState(1400)


  const columns = [
    { name: "FECHA", field: "hora", sortable: false },
    { name: "LOGIN", field: "cola", sortable: false },
    { name: "LOGOFF", field: "e_contexto", sortable: false },
    { name: "COLA", field: "accion", sortable: false },
    { name: "AGENTE", field: "accion", sortable: false },
    { name: "CANTIDAD LLAMADAS", field: "accion", sortable: false },
    { name: "TIEMPO READY", field: "hora", sortable: false },
    { name: "TIEMPO PAUSA", field: "accion", sortable: false },
    { name: "HABLADO COLA", field: "cola", sortable: false },
    { name: "TIEMPO ADMIN POSTERIOR", field: "e_contexto", sortable: false },
    { name: "AVG AHT", field: "accion", sortable: false },
    { name: "TIEMPO LOGIN", field: "accion", sortable: false },
    { name: "TIEMPO TOTAL", field: "accion", sortable: false },
    { name: "TIEMPO LOGOFF", field: "accion", sortable: false },
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
      <ResumenAgentesColasFilter currentUser={currentUser} />
      <TableComponent title={titulo} handleShow={handleShow} columns={columns} showSearch={false}
        showAddButton={false} headerFontSize='10px'
      >
        {(currentPage, ITEMS_PER_PAGE, setTotalItems, sorting, searchText, setCurrentPage) => (
          <ResumenAgentesColasList currentPage={currentPage}
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

export default connect(mapStateToProps, mapDispatchToProps)(ResumenAgentesColas);
