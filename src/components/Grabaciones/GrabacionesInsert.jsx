import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useLoading from '../../hooks/useLoading';
import { getEmpresa } from '../../services/AdministracionService';
import { addGrabaciones } from '../../services/GrabacionesService';

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
  estado:null
};

export default function GrabacionesInsert() {

  const [formValues, setformValues] = useState(initialState);
  const { name, empresa_id, description } = formValues
  const [empresaData, setEmpresaData] = useState([]);
  const [archivoAudio, setArchivoAudio] = useState("");
  const { u_id_empresa } = useSelector(state => state.user.currentUser.userLogin.data[0])
  const [NombreEmpresa, setNombreEmpresa] = useState("")
  const [empresaInput, setEmpresaInput] = useState();
  const [loading, setLoading] = useLoading();

  const fileRef = useRef();

  useEffect(() => {
    if (fileRef.current.files[0] !== undefined) {
      openFile(fileRef.current.files[0]);
    }
  }, [archivoAudio])


  //Empresa get
  useEffect(() => {
    getEmpresa(setEmpresaData);
  }, [setEmpresaData]);



  useEffect(() => {
    empresaData.filter(empresa => {

      if (u_id_empresa === empresa.e_id) {

        setNombreEmpresa(empresa.e_nombre_completo)
        setformValues({...formValues,empresa_id:u_id_empresa,carpeta:empresa.e_nombre_completo})
      }

    })

  }, [empresaData, setNombreEmpresa,setformValues])

  useEffect(() => {

    if (empresaInput !== undefined) {
      let coma = empresaInput.indexOf(",");
      let id = parseInt(empresaInput.substr(0, coma));
     
      let empresa = empresaInput.substr(coma + 1);
      setformValues({ ...formValues, carpeta:empresa, empresa_id: id });
    }
  }, [empresaInput]);


  //Funcion Con Reader
  const openFile = function (archivo) {
    let reader = new FileReader();

    reader.onload = function () {
      let dataURL = reader.result;
      const punto = archivoAudio.indexOf(".");
      setformValues(({
        ...formValues,
        file: dataURL.split(',')[1],
        format: archivoAudio.substr(punto + 1),
      }));
    };

    reader.readAsDataURL(archivo);
  };

  const handleSubmit = (e) => {
    e.preventDefault()

    addGrabaciones(formValues,setLoading)
    
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        {/*      Primer Row */}
        <div className="form-row ">

          <div className="form-group col-12 col-md-12 col-lg-4 ">
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


          <div className="form-group col-12 col-md-12 col-lg-4 ">

            <label htmlFor="archivo" className="text-semibold">SELECCIONE EL ARCHIVO  </label>
            <div className="custom-file">
              <input
                required
                value={archivoAudio}
                accept="audio/mp3,audio/wav,audio/opus,audio/ogg"
                type="file"
                ref={fileRef}
                name="archivoAudio"
                className="custom-file-input"
                onChange={(e) => setArchivoAudio(e.target.value)}
              />
              <label className="custom-file-label text-success" for="inputGroupFile01" >
                {archivoAudio.substr(12)}
              </label>
            </div>
          </div>

          <div className="form-group col-12 col-md-12 col-lg-4 ">
            <label className="font-weight-bold text-uppercase">Empresa:</label>
            <select
             //disabled
              required
              name="empresa"
              value={empresaInput}
              onChange={(e) => setEmpresaInput(e.target.value)}
              className="custom-select"
              defaultValue=""
            >
              <option hidden value={u_id_empresa}>{NombreEmpresa}</option>
              
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
