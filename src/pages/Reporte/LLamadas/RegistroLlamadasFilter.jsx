import React from "react";
import FiltrosComponent from "./../../../components/Filtros/FiltrosComponent";
import ReporteRegistroLlamadasForm from "../../../components/Forms/ReporteRegistroLlamadasForm";

const RegistroLlamadasFilter = ({
  onChangeRegistroLlamadasByFilters,
  loading,
  setLoading,
  registroLlamada,
  setRegistroLlamada,
}) => {
  return (
    <FiltrosComponent titulo="Registros de Llamadas">
        {(closeFiltrosComponent)=>(<ReporteRegistroLlamadasForm
        onChangeRegistroLlamadasByFilters={onChangeRegistroLlamadasByFilters} closeFiltrosComponent={closeFiltrosComponent}
      />)}
    </FiltrosComponent>
  );
};

export default RegistroLlamadasFilter;
