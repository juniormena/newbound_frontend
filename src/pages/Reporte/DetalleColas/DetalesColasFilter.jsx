import React from "react";
import FiltrosComponent from "./../../../components/Filtros/FiltrosComponent";
import  DetalleColasForm from "../../../components/DetalleColas/DetalleColasForm";

const DetalleColasFilter = ({currentUser}) => {
  return (
    <FiltrosComponent titulo="Detalle de Colas">
        {(closeFiltrosComponent)=>(<DetalleColasForm 
        currentUser={currentUser}
        closeFiltrosComponent={closeFiltrosComponent}
      />)}
    </FiltrosComponent>
  );
};

export default DetalleColasFilter;
