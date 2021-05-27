import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { downloadPdf } from './../../../redux/actions/downloadbleActions';
import TableComponent from "../../../components/Table/TableComponent";
import useModal from "../../..//hooks/useModal";
import RegistroLlamadasFilter from "./RegistroLlamadasFilter";
import LlamadasList from "../../../components/Data/Reporte/LlamadasList";
import moment from "moment";
import { getLlamadasByFilters} from "./../../../services/Reportes/llamadasService";
import useLoading from "../../../hooks/useLoading";
import { useGuardaExcel } from "../../../hooks/useGuardaExcel";
import { formatDate, secondsToMinutues } from './../../../lib/dateHelpers';
import Loading from "../../../components/Loading/Loading";

const RegistroLlamadas = ({ setDataToBeDownloaded }) => {
  const [/*show*/, handleShow, /*handleClose*/] = useModal();

  const [loading, setLoading] = useLoading();

  const [llamadas, setLlamadas] = useState([]);


  const [excel, setExcel] = useState({
    excel:[]
})

useEffect(() => {
  llamadas.map(d=>{
       setExcel((prevFormValues) => ({
    
        excel: [
          ...prevFormValues.excel,
          {
            FECHA:d.fecha,
            TIPO:d.tipollamada,
            NOMBRE_AGENTE:d.usuario,
            N_ORIGEN:d.numeroorigen,
            N_DESTINO:d.numerodestino,
            DURACION:d.duracion,
          },
        ],
      }));
    })

}, [llamadas])

  useGuardaExcel(excel.excel)


  const handleGetRegistroLlamadasByFilters = (e, registroLlamada) => {
    let llamada = { ...registroLlamada };
    llamada.periodoDesde = moment.isMoment(llamada.periodoDesde)
      ? llamada.periodoDesde.format()
      : null;

    llamada.periodoHasta = moment.isMoment(llamada.periodoHasta)
      ? llamada.periodoHasta.format()
      : null;

    getLlamadasByFilters(e, llamada, setLoading, setLlamadas);
  };

  useEffect(()=>{
    setDataToBeDownloaded({data:llamadas.map(llamada => [
      formatDate(llamada.fecha),
        llamada.tipollamada,
        llamada.usuario,
        llamada.numeroorigen,
        llamada.numerodestino,
        secondsToMinutues(llamada.duracion)
    ]), titulo:'Registro de llamadas',orientacion:'portrait',headers:["Fecha", "Tipo", "Nombre agente","N origen","N destino", "Duracion"],
    fileName:'registro de llamadas'})
  },[llamadas]);

  const columns = [
    { name: "Fecha", field: "e_nombre_completo", sortable: false },
    { name: "Tipo", field: "e_rnc", sortable: false },
    { name: "Nombre Agente", field: "e_contexto", sortable: false },
    { name: "Estado", field: "accion", sortable: false },
    { name: "Numero Origen", field: "accion", sortable: false },
    { name: "Numero Destino", field: "accion", sortable: false },
    { name: "Duracion", field: "accion", sortable: false },
    { name: "Grabacion", field: "accion", sortable: false },
  ];
  return (
    <>
      <RegistroLlamadasFilter
        onChangeRegistroLlamadasByFilters={handleGetRegistroLlamadasByFilters}
      />
      <TableComponent
        title="Reporte llamadas"
        handleShow={handleShow}
        columns={columns}
        showSearch={false}
        showAddButton={false}
      >
        {(currentPage, ITEMS_PER_PAGE, setTotalItems, sorting, searchText,setCurrentPage, setLoading) => (
          <LlamadasList
            currentPage={currentPage}
            ITEMS_PER_PAGE={ITEMS_PER_PAGE}
            setTotalItems={setTotalItems}
            sorting={sorting}
            searchText={searchText}
            llamadas={llamadas?.length === 0 ? [] : llamadas}
            setCurrentPage={setCurrentPage}
          />
        )}
      </TableComponent>
    </>
  );
};

const mapStateToProps = state=>{
  return{
      dataToBeDownloaded:state.downloadble.dataToBeDownloaded
  }
}

const mapDispatchToProps = dispatch => {
  return {
      setDataToBeDownloaded: (data) => {
          dispatch({type:downloadPdf(), payload:data})
      },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistroLlamadas);
