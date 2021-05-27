import React, { useEffect, useState } from "react";
import { connect, useSelector } from 'react-redux';
import { downloadPdf } from '../../../redux/actions/downloadbleActions';
import TableComponent from "../../../components/Table/TableComponent";
import useModal from "../../../hooks/useModal";
import useLoading from "../../../hooks/useLoading";
import ResumenColasFilter from "./ResumenColasFilter";
import moment from "moment";
import ResumenColasList from "../../../components/ResumenColas/ResumenColasList";

const ResumenColas = ({ setDataToBeDownloaded }) => {
  const [/*show*/, handleShow, /*handleClose*/] = useModal();
  const titulo = "RESUMEN DE COLAS";

  const { currentUser } = useSelector(state => state.user)

  const [resumenData, setResumenData] = useState({

    periodoDesde: moment(),
    periodoHasta: moment(),
    colas: [],
    allColas:currentUser.cola_supervision?.data
  });

  
  
  const includeTables=true

  const columns = [
    { name: "FECHA ", field: "FECHA", sortable: false },
    { name: "COLA", field: "cola", sortable: false },
    { name: "Cant. Llamadas", field: "Cantidad Llamadas", sortable: false },
    { name: "Cant. Contestadas", field: "Cant. Contestadas", sortable: false },
    { name: "Cant. Abandonadas", field: "Cantidad Abandonadas", sortable: false },
    { name: "Cant. Transferidas", field: "Cantidad Transferidas", sortable: false },
    { name: "% Contestadas", field: "% Contestadas", sortable: false },
    { name: "% No Contestadas", field: "% No Contestadas", sortable: false },
    { name: "AVG Tiempo espera", field: "AVG Tiempo espera", sortable: false },
    { name: "AVG Duracion Llamada", field: "AVG Duracion Llamada", sortable: false },
    { name: "AHT", field: "AHT", sortable: false },
    { name: "Tiempo Espera Total", field: "Tiempo Espera Total", sortable: false },
    { name: "Duracion Total Llamada", field: "Duracion Total Llamada", sortable: false },
    { name: "Cant. Maxima Espera", field: "Cant. Maxima Espera", sortable: false },
    { name: "SL", field: "SL", sortable: false },
    { name: "SL2", field: "SL2", sortable: false },
  ];
  return (
    <>
      <ResumenColasFilter currentUser={currentUser} resumenData={resumenData} setResumenData={setResumenData} />
      <TableComponent title={titulo} handleShow={handleShow} columns={columns} showSearch={false}
        showAddButton={false} headerFontSize='10px' includeTables={includeTables}
      >
        {(currentPage, ITEMS_PER_PAGE, setTotalItems, sorting, searchText, setCurrentPage) => (
          <ResumenColasList currentPage={currentPage}
            ITEMS_PER_PAGE={ITEMS_PER_PAGE} setTotalItems={setTotalItems}
            sorting={sorting}
            setCurrentPage={setCurrentPage}
            resumenData={resumenData} setResumenData={setResumenData}

          />
        )}
      </TableComponent>
    </>
  );
};


export default ResumenColas;
