import React, { useEffect, useState } from "react";
import { connect, useSelector } from 'react-redux';
import { downloadPdf } from '../../../redux/actions/downloadbleActions';
import TableComponent from "../../../components/Table/TableComponent";
import useModal from "../../../hooks/useModal";

import useLoading from "../../../hooks/useLoading";

import DetalleColasFilter from "./DetalesColasFilter";
import DetalleColasList from "../../../components/DetalleColas/DetalleColasList";

const DetalleColas = ({ setDataToBeDownloaded }) => {
  const [/*show*/, handleShow, /*handleClose*/] = useModal();
  const titulo = "DETALLE DE COLAS";

  const [/*loading,*/ setLoading] = useLoading();

  const { currentUser } = useSelector(state => state.user)



  const columns = [
    { name: "FECHA", field: "hora", sortable: false },
    { name: "COLA", field: "cola", sortable: false },
    { name: "Agente", field: "e_contexto", sortable: false },
    { name: "Telefono", field: "accion", sortable: false },
    { name: "Cliente", field: "accion", sortable: false },
    { name: "Duracion", field: "accion", sortable: false },
    { name: "Tiempo en Espera", field: "accion", sortable: false },
    { name: "Posicion Inicial", field: "accion", sortable: false },
    { name: "Motivo Cierre", field: "accion", sortable: false },
    
    { name: "Grabacion", field: "accion", sortable: false },
  ];
  return (
    <>
      <DetalleColasFilter currentUser={currentUser} />
      <TableComponent title={titulo} handleShow={handleShow} columns={columns} showSearch={false}
        showAddButton={false} headerFontSize='10px'
      >
        {(currentPage, ITEMS_PER_PAGE, setTotalItems, sorting, searchText, setCurrentPage) => (
          <DetalleColasList currentPage={currentPage}
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

export default connect(mapStateToProps, mapDispatchToProps)(DetalleColas);
