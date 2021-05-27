import React, { useEffect, useRef, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ConfirmacionBorrar } from '../../lib/helpers'
import { musicaEliminar } from "../../redux/actions/musicaActions";
import { DeleteMusicOnHold } from '../../services/MusicaEsperaService'
import AudioComponent from "../AudioComponent/AudioComponent";

export const MusicaEnEsperaListaEdit = ({ datosCarpeta }) => {

  const [musicaespera, setMusica] = useState([]);

  const dispatch = useDispatch()
  const state = useSelector(state => state.musicaEspera)
  let [Modo, setModo] = useState(false);





  useEffect(() => {

    setMusica(datosCarpeta)

  }, [datosCarpeta])

  useEffect(() => {

    if (datosCarpeta[0]) {

      if (datosCarpeta[0].mode === 'custom') {
        setModo(true)
      }
    }

  }, [datosCarpeta])

  //DragandDrop Function
  function handleOnDragEnd(result) {


    if (!result.destination) return;

    const items = Array.from(musicaespera);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);


    setMusica(items);

  }


  //DragandDrop Function



  function handleAudioRemover(position, entry, name, directory) {

    ConfirmacionBorrar('Seguro de borrar archivo?', "Una vez hecho no prodra revertirlo!", () => {
      const musicaeliminada = musicaespera.filter((musica) => musica.position !== position)
      DeleteMusicOnHold({ position, entry, name, directory })
      dispatch(musicaEliminar(musicaeliminada))
      setMusica(musicaeliminada)
      toast.success("Archivo de audio borrado", {
        autoClose: 2500,
      });

    })

  }




  return (
    <div className="d-flex flex-column col-12 col-md-12  ">


      <table className="table table-bordered tabla2 ">

        <thead>
          <tr>
            <th>NOMBRE AUDIO</th>

            {Modo !== true
              &&
              <th>AUDIO</th>
            }

            <th>ACCIONES</th>
          </tr>
        </thead>

        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="musicaespera">

            {(provided) => (
              <tbody  {...provided.droppableProps} ref={provided.innerRef} >
                {
                  musicaespera !== false
                  &&
                  musicaespera.map(({ name, order, position, entry, directory }, index) => (

                    <Draggable /* key={entry} draggableId={entry.substr(entry.lastIndexOf("\\") + 1, entry.length)} index={index} */>


                      {

                        (provided) => {
                          return (
                            <tr
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                            >

                              <td className="nombre"> {entry.substr(entry.lastIndexOf("\\") + 1, entry.length)}</td>
                              <td>  {
                                datosCarpeta[0].mode !== "custom"
                                &&
                                <AudioComponent
                                  rutagrabacion={entry}
                                ></AudioComponent>
                              }
                              </td>
                              <td ><button className="fa fa-minus btn btn-danger text-center align-self-center "
                                onClick={() => handleAudioRemover(position, entry, name, directory)}></button>  </td>

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

    </div>
  );
};