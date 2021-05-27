import React from "react";
import FiltrosComponent from "./../../../components/Filtros/FiltrosComponent";

import ResumenColasForm from "../../../components/ResumenColas/ResumenColasForm";

const ResumenColasFilter = ({currentUser,resumenData, setResumenData}) => {
  return (
    <FiltrosComponent titulo="Detalle de Colas">
        {(closeFiltrosComponent)=>(<ResumenColasForm
        currentUser={currentUser}
        closeFiltrosComponent={closeFiltrosComponent}
        resumenData={resumenData} setResumenData={setResumenData}
      />)}
    </FiltrosComponent>
  );
};

export default ResumenColasFilter;
