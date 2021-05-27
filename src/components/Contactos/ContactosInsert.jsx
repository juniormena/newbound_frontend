
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getEmpresa } from '../../services/AdministracionService';
import { addCOntacto, addCOntactoaddContactosSuperUsuario, getContactos, updateContactos,updateContactosSuperUser } from '../../services/ContactosService';
//import { addColasRule, getColaRuleListaAgregar } from '../../services/ColasRulesService';
import useLoading from './../../hooks/useLoading';


const initialState = {
  cod_empresa: 0,
  telefono: "",
  nombre: "",
  cargo: "",
  empresa: "",
  flota: "",
  estado: 0,
  usuario: "",
};


const initialState2 = {
cargo: "Progreamador",
cod_empresa: 14,
empresa: "Coco",
estado: 0,
flota: "",
nombre: "eidy Trinidad",
telefono: "8296844009",
usuario: "etrinidad2",
};




export default function ContactosInsert({titulo,contacto}) {

 

  const [formValues, setformValues] = useState(initialState);
  const { nombre,  empresa, flota, telefono, cargo, } = formValues
  const { u_id_empresa, u_usuario, is_superuser } = useSelector(state => state.user.currentUser.userLogin.data[0])
  const [loading, setLoading] = useLoading();


  useEffect(() => {
        setformValues({ ...formValues, cod_empresa: u_id_empresa, usuario:u_usuario})
  }, [ u_id_empresa,u_usuario, setformValues])


  useEffect(() => {

    if (titulo==="Editar Contacto") {

      if (contacto!==undefined) {
      
        setformValues({
           ...formValues, 
           cargo: contacto[0].cargo,
           cod_empresa: contacto[0].cod_empresa, 
           empresa: contacto[0].empresa,
           estado:contacto[0].estado,
           flota: contacto[0].flota,
           id:contacto[0].id,
           nombre: contacto[0].nombre,
           telefono: contacto[0].telefono,
           usuario:contacto[0].usuario,
          })
      }
    }
  }, [titulo,contacto])


  const handleSubmit = (e) => {
    e.preventDefault()

    if (flota==="") {
      toast.error("No Puede dejar campos vacios",2500)
    }
    else{

      if (titulo==="Editar Contacto") {

       
        if (is_superuser === '1') {
          updateContactosSuperUser(formValues,setLoading)
        } else {
          updateContactos(formValues,setLoading)
        }
       
      }
      else{
        if (is_superuser === '1') {
          addCOntactoaddContactosSuperUsuario(formValues,setLoading)
        } else {
          addCOntacto(formValues,setLoading)
        }
       
      }
    
    }
    
    
  }
  return (
    <>
      <form >
        {/*      Primer Row */}
        <div className="form-row ">

          <div className="form-group col-12 col-md-12 col-lg-4 ">
            <label htmlFor="nombre" className="text-semibold"> NOMBRE</label>
            <input

              placeholder="Inserte el nombre "
              required
              type="text"
              value={nombre}
              className="form-control"
              onChange={(e) =>
                setformValues({ ...formValues, nombre: e.target.value })
              }
            />
          </div>


          <div className="form-group col-12 col-md-12 col-lg-4 ">

            <label htmlFor="Telefono" className="text-semibold">TELEFONO </label>
            <input
              placeholder="Inserte el telefono"
              required
              type="tel"
              value={telefono}
              className="form-control"
              onChange={(e) =>
                setformValues({ ...formValues, telefono: e.target.value })
              }
            />

          </div>

         
          <div className="form-group col-12 col-md-12 col-lg-4 ">

            <label htmlFor="FLOTA" className="text-semibold">FLOTA</label>
            <select
              value={flota}
              onChange={(e) => setformValues({ ...formValues, flota: Number(e.target.value) })}
              className="custom-select mb-2"
              defaultValue=""
            >
              <option hidden value="">Seleccione una Opcion</option>
              <option value={1}>Si</option>
              <option value={0}>No</option>

            </select>
          </div>

        </div>


        {/*      Segundo Row */}
        <div className="form-row">
          <div className="form-group col-12 col-md-12 col-lg-6 ">

            <label htmlFor="CARGO" className="text-semibold">CARGO</label>
            <input
              placeholder="Inserte el Cargo"
              required
              type="text"
              value={cargo}
              className="form-control"
              onChange={(e) =>
                setformValues({ ...formValues, cargo: e.target.value })
              }
            />

          </div>

          <div className="form-group col-12 col-md-12 col-lg-6 ">
            <label className="font-weight-bold text-uppercase">Empresa</label>
            <input
              placeholder="Inserte la Empresa"
              required
              type="text"
              value={empresa}
              className="form-control"
              onChange={(e) =>
                setformValues({ ...formValues, empresa: e.target.value })
              }
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

