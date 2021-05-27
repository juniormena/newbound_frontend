
import { useState, useEffect, useRef } from 'react';
import Select from "react-select";
import useLoading from '../../hooks/useLoading';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-daterangepicker/daterangepicker.css";
import { UpdateRegistroCampana } from '../../services/campanasService';

const initialState = {

  nombre: "",
  reintentos_max: 0,
  reintentos_actuales: 0,
  estado: 0
};

const initialState2 = {

  nombre: "Colchones Eidy",
  reintentos_max: 16,
  reintentos_actuales: 8,
  estado: 100
};



export default function CampanasRegistroEditar({ campanaRegistroEdit, campanaEstados }) {

  const [formValues, setformValues] = useState(initialState);
  const { reintentos_max, reintentos_actuales, estado } = formValues

  const [loading, setLoading] = useLoading();


  useEffect(() => {


    if (campanaRegistroEdit[0] !== undefined) {

      console.log(campanaRegistroEdit[0]?.estado);
      setformValues({
        id: campanaRegistroEdit[0]?.id,
        reintentos_max: campanaRegistroEdit[0]?.reintentos_max,
        reintentos_actuales: campanaRegistroEdit[0]?.reintentos_actuales,
        estado: campanaRegistroEdit[0]?.estado
      })
    }

  }, [campanaRegistroEdit])




  const handleSubmit = (e) => {
    e.preventDefault()

    UpdateRegistroCampana(formValues, setLoading)

  }
  return (
    <>
      <form >

        <div className="form-row">

          <div className="form-group col-12 col-md-6 col-lg-6">

            <label htmlFor="archivo" className="font-weight-bold text-uppercase">Reintentos Maximo</label>
            <input
              placeholder="Inserte penalidad minimo"
              required
              min="0"
              type="number"
              value={reintentos_max}
              className="form-control mb-2"
              onChange={(e) =>
                setformValues({ ...formValues, reintentos_max: Number(e.target.value) })
              }
            />

          </div>

          <div className="form-group col-12 col-md-6 col-lg-6">

            <label className="font-weight-bold text-uppercase">Reintentos Actuales</label>
            <input
              placeholder="Inserte Reintentos Actuales"
              required
              min="0"
              type="number"
              value={reintentos_actuales}
              className="form-control mb-2"
              onChange={(e) =>
                setformValues({ ...formValues, reintentos_actuales: Number(e.target.value) })
              }
            />

          </div>


          <div className="form-group col-md-12 col-lg-12 ">
            <label htmlFor="membername" className="font-weight-bold text-uppercase">Estado</label>

            <Select
              maxMenuHeight={100}
              onChange={(e => setformValues({ ...formValues, estado: e.value }))}
              className="mb-2"
              placeholder="Seleccione el estado"
              value={campanaEstados.length > 0 && campanaEstados.filter(obj => obj.value === estado)}
              options={campanaEstados}
            />
          </div>

        </div>


      </form>



      <div className="row ">
        <div className="col-md-12 ">
          <button
            disabled={loading ? true : false}
            onClick={handleSubmit}
            type="submit" className="btn btn-primary float-right ">
            Guardar
                   </button>
        </div>
      </div>


    </>


  )

}

