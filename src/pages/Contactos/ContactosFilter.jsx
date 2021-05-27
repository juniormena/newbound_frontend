
import ContactosFormFiltro from '../../components/Contactos/ContactosFormFiltros';
import FiltrosComponent from '../../components/Filtros/FiltrosComponent'

function ContactosFilter({filterResult,setfilterResult}) {

    return (
       <FiltrosComponent titulo="Lista Colas">
            {(closeFiltrosComponent)=>
            (<ContactosFormFiltro 
               
                filterResult={filterResult} 
                 setfilterResult={setfilterResult}
                 closeFiltrosComponent={closeFiltrosComponent}
            />)}
        </FiltrosComponent>
    )
}

export default ContactosFilter;
