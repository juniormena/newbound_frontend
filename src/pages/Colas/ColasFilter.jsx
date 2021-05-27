import React from 'react'
import ColasFormFiltros from '../../components/Colas/ColasFormFiltros'
import FiltrosComponent from '../../components/Filtros/FiltrosComponent'

function ColasFilter() {
    return (
       <FiltrosComponent titulo="Lista Colas">
           {(closeFiltrosComponent)=>(<ColasFormFiltros  closeFiltrosComponent={closeFiltrosComponent}/>)}
       </FiltrosComponent>
    )
}

export default ColasFilter;
