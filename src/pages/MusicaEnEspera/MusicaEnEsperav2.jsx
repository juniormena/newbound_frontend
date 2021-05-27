import React from 'react'
import ModalComponent from '../../components/Modal/ModalComponent';
import { MusicaEnEsperaForm } from '../../components/MusicaEnEspera/MusicaEnEsperaForm';
import MusicaEnEsperaLista from '../../components/MusicaEnEspera/MusicaEnEsperaLista';
import TableComponent from '../../components/Table/TableComponent';
import useModal from '../../hooks/useModal'

function MusicaEnEsperav2() {

    const [show, handleShow, handleClose] = useModal();

  
    const titulo = "MUSICA EN ESPERA";
    const columns= [
        {name:'Musica en espera', field:'nombre', sortable:true},
        {name:'descripcion', field:'descripcion', sortable:true},
        {name:'Orden', field:'orden', sortable:true},
        {name:'Modo de Reproduccion', field:'modo', sortable:true},
        {name:'Acciones', field:'operacion', sortable:true}   
    ]

    return (
     <>
      
       <TableComponent title={titulo} handleShow={handleShow} columns={columns}>
       {(currentPage,ITEMS_PER_PAGE, setTotalItems,sorting,searchText)=>(<MusicaEnEsperaLista currentPage={currentPage} 
                    ITEMS_PER_PAGE={ITEMS_PER_PAGE} setTotalItems={setTotalItems} sorting={sorting} searchText={searchText}/>)}
       </TableComponent>
       <ModalComponent show={show} handleClose={handleClose} title={titulo}>
            
            <MusicaEnEsperaForm titulo={titulo}/>
       </ModalComponent>
     </>
    )
}

export default MusicaEnEsperav2