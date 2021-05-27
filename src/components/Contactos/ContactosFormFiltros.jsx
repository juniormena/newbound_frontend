import React from 'react'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getContactosByFilter, getContactosByFiltersandEmpresa } from '../../services/ContactosService';


const initialState = {
    empresa: "",
    nombre: "",
    telefono: "",
    cod_empresa: ""
}
function ContactosFormFiltro({ filterResult, setfilterResult, closeFiltrosComponent }) {


    const [formValues, setformValues] = useState(initialState)
    const { empresa, nombre, telefono } = formValues
    const dispatch = useDispatch()


    const { data } = useSelector(state => state.user.currentUser.userLogin)



    useEffect(() => {

        if (data[0] !== undefined) {

            setformValues({ ...formValues, cod_empresa: data[0].u_id_empresa })
        }


    }, [data])

    //Submit

    const handleSubmit = (e) => {
        e.preventDefault()
       

        if (data[0] !== undefined) {

            if (data[0].is_superuser==='1') {
                getContactosByFilter(formValues, setfilterResult) 
            }
            else{
                getContactosByFiltersandEmpresa(formValues, setfilterResult)
            }
        }
        closeFiltrosComponent();
    };



    return (
        <form onSubmit={handleSubmit}>
            <div className="form-row">
                <div className="col-12 col-md-4 border-right border-left ">
                    <label className="font-weight-bold text-uppercase">Nombre: </label>
                    <input
                        onChange={(e) => setformValues({ ...formValues, nombre: e.target.value })}
                        type="text"
                        className="form-control"
                        value={nombre}
                    //required
                    />
                </div>

                <div className="form-group col-12 col-md-4 col-lg-4 ">
                    <label htmlFor="Telefono" className="text-semibold">TELEFONO </label>
                    <input

                        //required
                        type="tel"
                        value={telefono}
                        className="form-control"
                        onChange={(e) =>
                            setformValues({ ...formValues, telefono: e.target.value })
                        }
                    />
                </div>


                <div className="col-12 col-md-4 border-right">
                    <label className="font-weight-bold text-uppercase">Empresa:</label>
                    <input
                        //required
                        type="text"
                        value={empresa}
                        className="form-control"
                        onChange={(e) =>
                            setformValues({ ...formValues, empresa: e.target.value })
                        }
                    />
                </div>

            </div>
            <div className="row ">
                <div className="col-md-12 mt-2">
                    <button type="submit" className="btn btn-danger float-right ">
                        Buscar
                   </button>
                </div>
            </div>
        </form>
    )
}

export default ContactosFormFiltro
