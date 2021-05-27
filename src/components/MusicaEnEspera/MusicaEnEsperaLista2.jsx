import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ConfirmacionBorrar } from '../../lib/helpers'
import { musicaEliminar } from "../../redux/actions/musicaActions";
import { Pagination } from "./Pagination";
import { usePagination } from './../../hooks/usePagination';


export const MusicaEnEsperaLista2 = ({ playlist,setformValues,formValues}) => {

  const [musicaespera, setMusica] = useState([]);
  const dispatch = useDispatch()
  const state = useSelector(state => state.musicaEspera)
  //const [index, setindex] = useState(0)


  useEffect(() => {

    if (setformValues!==undefined) {
      
       setformValues((prevFormValues) => ({
          ...prevFormValues,
          playlist:state.musicaEliminada
        
        }))
      }
 
  }, [state,setformValues])


  useEffect(() => {
    setMusica(playlist)
  }, [playlist])


  /*const playerRef = useRef()
  const [playerStatus, setPlayerStatus] = useState(false)*/

  //Paginacion
  const [currentItems, totalItems, paginate, itemsPerPage, currentPage] = usePagination(musicaespera);
  //Paginacion


  //DragandDrop Function
  function handleOnDragEnd(result) {
 

    if (!result.destination) return;

    const items = Array.from(musicaespera);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setformValues((prevFormValues) => ({
      ...prevFormValues,
      playlist: items,
    }));

    setMusica(items);
  }
  //DragandDrop Function

  //FuncionesReproductor
  function handleAudioRemover(position) {

    ConfirmacionBorrar('Seguro de borrar archivo?', "Una vez hecho no prodra revertirlo!", () => {
      const musicaeliminada = musicaespera.filter((musica) => musica.position !== position)
      setMusica(musicaeliminada)
      toast.success("Archivo de audio borrado", {
        autoClose: 2500,
      });
           
      dispatch(musicaEliminar(musicaeliminada))
      
    }) 

  }


  return (
    <>
    

      <table className="table table-bordered text-center meLista">
        <thead>
          <tr>
            <th>NOMBRE</th>
            <th>ACCIONES</th>
          </tr>
        </thead>

        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="musicaespera">

            {(provided) => (
              <tbody {...provided.droppableProps} ref={provided.innerRef}>
                {
                  currentItems !== false
                  &&
                  currentItems.map(({ name, order,position}) => (
                    <Draggable key={order} draggableId={name} index={order}>
                      {(provided) => {
                        return(
                          <tr
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >                       
                          <td> <div className="nombre">{name}</div></td>
                          <td>
                           
                              <i onClick={() => handleAudioRemover(position)}className="fa fa-minus btn btn-danger mx-2 operaciones"></i>
                     
                          </td>
                        </tr>
                        )
                      }
                      }
                    </Draggable>
                  ))
                }
                {provided.placeholder}
              </tbody>
            )}
          </Droppable>
        </DragDropContext>
      </table>

      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        paginate={paginate}
        currentPage={currentPage}
      />
    </>
  );
};