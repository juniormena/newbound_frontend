import React from "react";
import FiltrosComponent from "./../../../components/Filtros/FiltrosComponent";

import ResumenAgentesColasForm from "../../../components/ResumenAgentesColas/ResumenAgentesColasForm";

const ResumenAgentesColasFilter = ({currentUser,heigth}) => {
  return (
    <FiltrosComponent titulo="Detalle de Colas" heigth={heigth} >
        {(closeFiltrosComponent)=>(<ResumenAgentesColasForm
        currentUser={currentUser}
        closeFiltrosComponent={closeFiltrosComponent}
      />)}
    </FiltrosComponent>
  );
};

export default ResumenAgentesColasFilter;
