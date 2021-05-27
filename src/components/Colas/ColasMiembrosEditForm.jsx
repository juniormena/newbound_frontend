import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import useLoading from "../../hooks/useLoading";
import { getUsuariosMiembros, UpdateColaMember } from "../../services/ColaMiembrosEstaticos";
import { UpdateColaMemberDinamicos } from "../../services/ColasMiembrosDinamicos";
import { getUsuariosByDepertamentoDinamicos, getUsuariosByDepertamentoEstaticos } from "../../services/ColasService";
import TooltipComponent from "../Toolttip/TooltipComponent";

function ColasMiembrosEditForm({ Miembro, setMiembro,titulo}) {


    const [users, setusers] = useState([])
    const [extensiones, setExtensiones] = useState([])
    const [loading, setLoading] = useLoading();
    const { currentUser } = useSelector(state => state.user)
    useEffect(() => {
        

        if (titulo==="Editar Miembro Estatico") {
            getUsuariosByDepertamentoEstaticos(setusers, currentUser)
        }

        if (titulo==="Editar Miembro Dinamico") {
            getUsuariosByDepertamentoDinamicos(setusers, currentUser)

        }
     
    }, [setusers])

   

    let { penalty, paused, wrapuptime, membername,uniqueid} = Miembro


    useEffect(() => {
        if (Miembro[0] !== undefined) {
            console.log(Miembro[0].paused);
            setMiembro({
                queue_name: Miembro[0].queue_name,
                membername: Miembro[0].membername,
                penalty: Miembro[0].penalty,
                paused: Miembro[0].paused,
                wrapuptime: Miembro[0].wrapuptime,
                interface: Miembro[0].interface,
               uniqueid: Miembro[0].uniqueid
              
            })
        }

        
    }, [setMiembro, Miembro])

 
    useEffect(() => {
       users.filter(usuario => {
         /*   console.log(usuario.value); */

            if ( usuario.value === Number(membername)) {
        
              //console.log(usuario.extension);
              setExtensiones(usuario.extension)
            }
        
          })
    }, [users,setExtensiones,setusers,extensiones,membername])



    const handleSubmit = (e) => {
        e.preventDefault()
        
        if (titulo==="Editar Miembro Estatico") {
            UpdateColaMember(Miembro,setLoading)
        }

        if (titulo==="Editar Miembro Dinamico") {
            UpdateColaMemberDinamicos(Miembro,setLoading)
        }
        
    }

   
    return (

        <>
            <form onSubmit={handleSubmit}>


                <div className="form-row">
                    <div className="col-md-6">

                        <label htmlFor="paused" className="font-weight-bold text-uppercase">Extensiones</label>

                        <select
                             value={Miembro.interface}
                            onChange={(e) => setMiembro({ ...Miembro, interface: e.target.value })}
                            className="custom-select mb-2"
                            defaultValue=""
                        >
                            <option hidden value={Miembro.interface}>{Miembro.interface}</option>
                            {
                                  extensiones.map(ext=>(
                                    <option value={`PJSIP/${ext.id}`}>{`PJSIP/${ext.id}`}</option>
                                  ))
                                
                            }
                        </select>

                        <label htmlFor="paused" className="font-weight-bold text-uppercase">Pausa</label>

                        <select
                            value={paused}
                            onChange={(e) => setMiembro({ ...Miembro, paused: e.target.value })}
                            className="custom-select mb-2"
                            defaultValue=""
                        >
                            <option hidden value="">Seleccione una Opcion</option>
                            <option value={1}>Si</option>
                            <option value={0}>No</option>

                        </select>
                    </div>
                    <div className="col-md-6">

                        <label htmlFor="penalty" className="font-weight-bold text-uppercase">Penalidad </label>
                        <input

                            type="number"
                            value={penalty}
                            className="form-control mb-2"
                            onChange={(e) => setMiembro({ ...Miembro, penalty: e.target.value })}
                        />
                        <label htmlFor="wrapuptime" className="font-weight-bold text-uppercase">
                            Tiempo descanso Agente
                        </label>

                        <input
                            type="number"
                            value={wrapuptime}
                            className="form-control mb-2"
                            onChange={(e) => setMiembro({ ...Miembro, wrapuptime: e.target.value })}
                        />
                    </div>
                </div>

                <button className="btn btn-primary text-uppercase mt-1  float-right" disabled={loading} >guardar</button>
            </form>



        </>
    )
}

export default ColasMiembrosEditForm
