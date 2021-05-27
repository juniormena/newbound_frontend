import CampanasFormFiltros from '../../components/Campanas/CampanasFormFiltros';

import FiltrosComponent from '../../components/Filtros/FiltrosComponent'

function CampanasFilter() {

    return (
       <FiltrosComponent titulo="Lista Colas">
            {(closeFiltrosComponent)=>
            (<CampanasFormFiltros closeFiltrosComponent={closeFiltrosComponent}/>)}
        </FiltrosComponent>
    )
}

export default CampanasFilter;
