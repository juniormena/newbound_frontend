import ColasRulesFormFiltros from '../../components/ColasRules/ColasRulesFormFiltros'
import FiltrosComponent from '../../components/Filtros/FiltrosComponent'

function ColasRulesFilter() {

    return (
       <FiltrosComponent titulo="Lista Colas">
            {(closeFiltrosComponent)=>
            (<ColasRulesFormFiltros closeFiltrosComponent={closeFiltrosComponent}/>)}
        </FiltrosComponent>
    )
}

export default ColasRulesFilter;
