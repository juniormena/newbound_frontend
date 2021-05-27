
import {  useState, useEffect } from 'react';
import useLoading from '../../hooks/useLoading';

import { getEmpresa } from '../../services/AdministracionService';
import {  UpdateGrabaciones } from '../../services/GrabacionesService';

const initialState = {
  carpeta: "", //nombreCarpeta carpeta
  name: "",
  empresa_id: 0,
  description: "",
  file: "",
  format: "",
  stamp: null,
  save:null,
  error:null,
  directory:null,
  estado:null,
  currentEmpId:0
};


export default function GrabacionesUpdate({datosAudio,empresaId}) {


  const [formValues, setformValues] = useState(initialState);
  const { name, empresa_id, description } = formValues
  const [empresaData, setEmpresaData] = useState([]);


  const [NombreEmpresa, setNombreEmpresa] = useState("")
  const [empresaInput, setEmpresaInput] = useState();
  const [loading, setLoading] = useLoading();



  //Empresa get
  useEffect(() => {
    getEmpresa(setEmpresaData);
  }, [setEmpresaData]);



  useEffect(() => {
    empresaData.filter(empresa => {

        if (Number(empresaId) === empresa.e_id) {

            setNombreEmpresa(empresa.e_nombre_completo) 
           
            if (datosAudio[0]!==undefined) {
                
             
                setformValues({
                    name:datosAudio[0].name,
                    description:datosAudio[0].descripcion,
                    carpeta:datosAudio[0].carpeta, //nombreCarpeta carpeta
                    empresa_id: datosAudio[0].empresa_id,
                    format:datosAudio[0].format,
                    stamp: null,
                    save:null,
                    error:null,
                    directory:datosAudio[0].directory,
                    estado:null,
                    audioId:datosAudio[0].id,
                    currentEmpId:datosAudio[0].empresa_id
                  
                })
            }
         }
    })

  }, [empresaData, setNombreEmpresa,setformValues,datosAudio])

  useEffect(() => {

    if (empresaInput !== undefined) {
      let coma = empresaInput.indexOf(",");
      let id = parseInt(empresaInput.substr(0, coma));
     
      let empresa = empresaInput.substr(coma + 1);
      setformValues({ ...formValues, carpeta:empresa, empresa_id: id,currentEmpId:datosAudio[0].empresa_id });
    }
  }, [empresaInput]);


  const handleSubmit = (e) => {
    e.preventDefault()
    UpdateGrabaciones(formValues,setLoading) 
    
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        {/*      Primer Row */}
        <div className="form-row ">

          <div className="form-group col-12 col-md-6 col-lg-6 ">
            <label htmlFor="nombreCarpeta" className="text-semibold"> Nombre </label>
            <input
              required
              type="text"
              nombreCarpeta="nombreCarpeta"
              value={name}
              className="form-control"
              onChange={(e) =>
                setformValues({ ...formValues, name: e.target.value })
              }
            />
          </div>


          <div className="form-group col-12 col-md-6 col-lg-6 ">
            <label className="font-weight-bold text-uppercase">Empresa:</label>
            <select
             // disabled
              required
              name="empresa"
              value={empresaInput}
              onChange={(e) => setEmpresaInput(e.target.value)}
              className="custom-select"
              defaultValue=""
            >
              <option hidden value={empresaId}>{NombreEmpresa}</option>
              
              {empresaData !== undefined &&
                empresaData.map((emp) => (
                  <>
                    <option hidden value="">
                      Seleccione una Empresa
                    </option>
                    <option key={emp.e_nombre_completo} value={`${emp.e_id},${emp.e_nombre_completo}`}>
                      {emp.e_nombre_completo}
                    </option>
                  </>
                ))}
            </select>

          </div>
        </div>


        {/*      Segundo Row */}
        <div className="form-row">
          <div className="form-group col-12 col-md-12 col-lg-12 ">
            <label htmlFor="desc" className="font-weight-bold text-uppercase">
              Descripcion
            </label>
            <textarea
             required
              rows="2"
              className="form-control"
              value={description}
              onChange={(e) =>
                setformValues({ ...formValues, description: e.target.value })
              }
            ></textarea>
          </div>
        </div>

        <div className="row ">
          <div className="col-md-12 ">
            <button type="submit" className="btn btn-primary float-right " disabled={loading}>
              Guardar
                   </button>
          </div>
        </div>

      </form>

    </>
  )
}
