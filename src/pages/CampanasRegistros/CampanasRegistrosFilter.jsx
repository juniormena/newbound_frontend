import CampanasRegistroFormFiltros from '../../components/Campanas_registros/CampanasRegistroFormFiltros';

import FiltrosComponent2 from '../../components/Filtros/FiltrosComponent2'

function CampanasRegistrosFilter({campanaEstados}) {
 

    return (
       <FiltrosComponent2 titulo="Lista Colas">
            {(closeFiltrosComponent2)=>
            (<CampanasRegistroFormFiltros closeFiltrosComponent2={closeFiltrosComponent2} campanaEstados={campanaEstados}/>)}
        </FiltrosComponent2>
    )
}

export default CampanasRegistrosFilter;
