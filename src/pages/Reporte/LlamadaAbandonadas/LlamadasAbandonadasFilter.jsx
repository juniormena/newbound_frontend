import React from "react";
import FiltrosComponent from "./../../../components/Filtros/FiltrosComponent";

import LlamadasAbandonadasForm from "../../../components/LlamadasAbandonadas/LlamadasAbandonadasForm";

const ResumenColasFilter = ({currentUser,abandonadasData, setAbandonadasData}) => {
  return (
    <FiltrosComponent titulo="Detalle de Colas">
        {(closeFiltrosComponent)=>(<LlamadasAbandonadasForm
        currentUser={currentUser}
        closeFiltrosComponent={closeFiltrosComponent}
        abandonadasData={abandonadasData}
        setAbandonadasData={setAbandonadasData}
      />)}
    </FiltrosComponent>
  );
};

export default ResumenColasFilter;
