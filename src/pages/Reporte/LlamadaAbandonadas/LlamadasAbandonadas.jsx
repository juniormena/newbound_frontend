import React, { useEffect, useState } from "react";
import {  useSelector } from 'react-redux';

import TableComponent from "../../../components/Table/TableComponent";
import useModal from "../../../hooks/useModal";
import useLoading from "../../../hooks/useLoading";
import LlamadasAbandonadasFilter from "./LlamadasAbandonadasFilter";
import moment from "moment";
import LlamadasAbandonadasList from "../../../components/LlamadasAbandonadas/LlamadasAbandonadasList";

const LlamadasAbandonadas = ({ setDataToBeDownloaded }) => {
  const [/*show*/, handleShow, /*handleClose*/] = useModal();
  const titulo = "Llamadas Abandonadas";

  const { currentUser } = useSelector(state => state.user)

  const [abandonadasData, setAbandonadasData] = useState({
    periodoDesde: moment(),
    periodoHasta: moment(),
    colas: [],
    allColas:currentUser.cola_supervision?.data
  });



  const columns = [
    { name: "FECHA ", field: "FECHA", sortable: false },
    { name: "COLA", field: "cola", sortable: false },
    { name: "0", field: "Horas", sortable: false },
    { name: "1", field: "Horas", sortable: false },
    { name: "2", field: "Horas", sortable: false },
    { name: "3", field: "Horas", sortable: false },
    { name: "4", field: "Horas", sortable: false },
    { name: "5", field: "Horas", sortable: false },
    { name: "6", field: "Horas", sortable: false },
    { name: "7", field: "Horas", sortable: false },
    { name: "8", field: "Horas", sortable: false },
    { name: "9", field: "Horas", sortable: false },
    { name: "10", field: "Horas", sortable: false },
    { name: "11", field: "Horas", sortable: false },
    { name: "12", field: "Horas", sortable: false },
    { name: "13", field: "Horas", sortable: false },
    { name: "14", field: "Horas", sortable: false },
    { name: "15", field: "Horas", sortable: false },
    { name: "16", field: "Horas", sortable: false },
    { name: "17", field: "Horas", sortable: false },
    { name: "18", field: "Horas", sortable: false },
    { name: "19", field: "Horas", sortable: false },
    { name: "20", field: "Horas", sortable: false },
    { name: "21", field: "Horas", sortable: false },
    { name: "22", field: "Horas", sortable: false },
    { name: "23", field: "Horas", sortable: false },
  ];
  return (
    <>
      <LlamadasAbandonadasFilter currentUser={currentUser} abandonadasData={abandonadasData} setAbandonadasData={setAbandonadasData} />
      <TableComponent title={titulo} handleShow={handleShow} columns={columns} showSearch={false}
        showAddButton={false} headerFontSize='10px' 
      >
        {(currentPage, ITEMS_PER_PAGE, setTotalItems, sorting, searchText, setCurrentPage) => (
          <LlamadasAbandonadasList currentPage={currentPage}
            ITEMS_PER_PAGE={ITEMS_PER_PAGE} setTotalItems={setTotalItems}
            sorting={sorting}
            setCurrentPage={setCurrentPage}
          />
        )}
      </TableComponent>
    </>
  );
};


export default LlamadasAbandonadas;
