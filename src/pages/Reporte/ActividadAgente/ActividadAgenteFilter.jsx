import React from "react";
import FiltrosComponent from "./../../../components/Filtros/FiltrosComponent";

import ActividadAgenteForm from "../../../components/ActividadAgente/ActividadAgenteForm";

const ActividadAgenteFilter = ({currentUser,heigth}) => {
  return (
    <FiltrosComponent titulo="Detalle de Colas" heigth={heigth} >
        {(closeFiltrosComponent)=>(<ActividadAgenteForm
        currentUser={currentUser}
        closeFiltrosComponent={closeFiltrosComponent}
      />)}
    </FiltrosComponent>
  );
};

export default ActividadAgenteFilter;
