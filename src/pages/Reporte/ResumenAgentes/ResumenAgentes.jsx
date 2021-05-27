import React from "react";
import { useSelector } from 'react-redux';

import TableComponent from "../../../components/Table/TableComponent";
import useModal from "../../../hooks/useModal";


import ResumenAgentesFilter from "./ResumenAgentesFilter";

import ResumenAgentesList from "../../../components/ResumenAgentes/ResumenAgentesList";


const ResumenAgentes = () => {
  const [/*show*/, handleShow, /*handleClose*/] = useModal();
  const titulo = "Resumen De Agentes";

  const { currentUser } = useSelector(state => state.user)

  const columns = [
    { name: "FECHA", field: "hora", sortable: false },
    { name: "LOGIN", field: "cola", sortable: false },
    { name: "LOGOFF", field: "e_contexto", sortable: false },
    { name: "AGENTE", field: "accion", sortable: false },
    { name: "TOTAL LLAMADAS", field: "accion", sortable: false },
    { name: "LLAMADAS ENTRANTES", field: "accion", sortable: false },
    { name: "LLAMADAS SALIENTES", field: "accion", sortable: false },
    { name: "TIEMPO READY", field: "hora", sortable: false },
    { name: "TIEMPO PAUSA", field: "accion", sortable: false },
    { name: "TIEMPO HABLADO COLA", field: "cola", sortable: false },
    { name: "TIEMPO HABLADO SALIENTES", field: "cola", sortable: false },
    { name: "TIEMPO HABLADO ENTRANTES", field: "cola", sortable: false },
    { name: "TIEMPO SALIENTES CAMPAñAS", field: "cola", sortable: false },
    { name: "TIEMPO ADMIN POSTERIOR", field: "e_contexto", sortable: false },
    { name: "TIEMPO TOTAL HABLADO", field: "accion", sortable: false },
    { name: "TIEMPO Trabajado", field: "accion", sortable: false },
    { name: "TIEMPO LOGIN", field: "accion", sortable: false },
    { name: "TIEMPO LOGOFF", field: "accion", sortable: false },
  ];



  return (
    <>
      <ResumenAgentesFilter currentUser={currentUser} />
      <TableComponent title={titulo} handleShow={handleShow} columns={columns} showSearch={false}
        showAddButton={false} headerFontSize='10px'
      >
        {(currentPage, ITEMS_PER_PAGE, setTotalItems, sorting, searchText, setCurrentPage) => (
          <ResumenAgentesList currentPage={currentPage}
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

export default ResumenAgentes;
