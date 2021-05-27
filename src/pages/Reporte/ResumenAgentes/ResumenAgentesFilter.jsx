import React from "react";
import FiltrosComponent from "./../../../components/Filtros/FiltrosComponent";

import ResumenAgentesForm from "../../../components/ResumenAgentes/ResumenAgentesForm";

const ResumenAgentesFilter = ({currentUser,heigth}) => {
  return (
    <FiltrosComponent titulo="Detalle de Colas" heigth={heigth} >
        {(closeFiltrosComponent)=>(<ResumenAgentesForm
        currentUser={currentUser}
        closeFiltrosComponent={closeFiltrosComponent}
      />)}
    </FiltrosComponent>
  );
};

export default ResumenAgentesFilter;
