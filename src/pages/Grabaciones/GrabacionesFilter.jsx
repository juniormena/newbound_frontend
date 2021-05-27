import React from 'react'
import FiltrosComponent from '../../components/Filtros/FiltrosComponent'
import GrabacionesFormFiltros from '../../components/Grabaciones/GrabacionesFormFiltros'

function GrabacionesFilter() {
    return (
       <FiltrosComponent titulo="Lista De Grabaciones">
           {(closeFiltrosComponent)=>(<GrabacionesFormFiltros closeFiltrosComponent={closeFiltrosComponent}/>)}
       </FiltrosComponent>
    )
}

export default GrabacionesFilter
