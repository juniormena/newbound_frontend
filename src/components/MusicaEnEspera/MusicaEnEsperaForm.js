import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import useLoading from "../../hooks/useLoading";

import { getEmpresa } from "../../services/AdministracionService";
import { addMusicaEspera, musicOnHoldSelectTypes } from "../../services/MusicaEsperaService";
import { MusicaEnEsperaLista2 } from "./MusicaEnEsperaLista2";

const initialState = {
  nombre: "", //nombre carpera
  mode: "", //custom= lista externa, playlist= seleccion de posicion, file= como entre sin posicion
  empresa_id: 0,
  empresa: "",
  sort: "",
  description: "", // descripcion de carpeta
  application: null,
  playlist: [],
};

export const MusicaEnEsperaForm = () => {

  //UseStates

  const [modes, setModes] = useState([])
  const [archivoAudio, setArchivoAudio] = useState("");
  const [mode, setMode] = useState("");
  const [linkInput, setLinkInput] = useState("");
  const [empresaData, setEmpresaData] = useState([]);
  const [empresaInput, setEmpresaInput] = useState();
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useLoading();
  const { u_id_empresa } = useSelector(state => state.user.currentUser.userLogin.data[0])
  const [NombreEmpresa, setNombreEmpresa] = useState("")

  const [listaAudios, setListaAudios] = useState({
    nombreAudio: [],
  });

  const fileRef = useRef();

  const [formValues, setformValues] = useState(initialState);

  const { nombre, description, sort, playlist } = formValues;

  const { nombreAudio } = listaAudios;

   //UseStates

  //Carga los modos desde la base de datos

  useEffect(() => {
   
    musicOnHoldSelectTypes(setModes)
 
  }, [])
  

  //Use Effects carga operacion dependiendo el modo de reproduccion
  useEffect(() => {

    //If Mode is playlist
    if (mode === "playlist") {
      if (fileRef.current.files[0] !== undefined) {
        openFile(fileRef.current.files[0]);

        setListaAudios({
          ...listaAudios,
          nombreAudio: [...nombreAudio.concat(fileRef.current.files[0].name)],
        });
      }
      setformValues({ ...formValues, mode: mode });
    } 
    
    //If Mode is files
    else if (mode === "files") {
      setformValues({ ...formValues, playlist: [] });
      if (fileRef.current.files[0] !== undefined) {
        openFile(fileRef.current.files[0]);
        setListaAudios({
          ...listaAudios,
          nombreAudio: [...nombreAudio.concat(fileRef.current.files[0].name)],
        });
      }
      setformValues({ ...formValues, mode: mode });
    } 
    
    //If Mode is custom
    else if (mode === "custom") {
    
      setArchivoAudio("");

      setIndex(index + 1);

      if (linkInput!=="") {
        
      setformValues((prevFormValues) => ({
        ...prevFormValues,
        mode: mode,
        playlist: [
          ...prevFormValues.playlist,
          {
            directory: null,
            order: index,
            position: formValues.playlist.length + 1,
            error: "",
            file: "",
            format: "",
            name: "",
            save: null,
            stamp: null,
            link:linkInput
          },
        ],
      }));
      } 

      setListaAudios({ ...listaAudios, nombreAudio: [] });
    }

  }, [archivoAudio, mode,linkInput]);


  //Carga Informacion desde getempresa
  useEffect(() => {
    getEmpresa(setEmpresaData);
  }, [setEmpresaData]);


//Guarda y divide la informacion de enviar empresa
useEffect(() => {
  empresaData.filter(empresa => {

    if (u_id_empresa === empresa.e_id) {

      setNombreEmpresa(empresa.e_nombre_completo)
      setformValues({...formValues,empresa_id:u_id_empresa,empresa:empresa.e_nombre_completo})
    }

  })

}, [empresaData, setNombreEmpresa,setformValues])

  useEffect(() => {

    if (empresaInput !== undefined) {
      let coma = empresaInput.indexOf(",");
      let id = parseInt(empresaInput.substr(0, coma));
     
      let empresa = empresaInput.substr(coma + 1);
      setformValues({ ...formValues, empresa, empresa_id: id });
    }
  }, [empresaInput]);


  //Submit con Validaciones

  const handleSubmit = (e) => {

     if (nombre === "") {
      return toast.error("Nombre no puede quedar vacio");
    }
    if (mode === "") {
      return toast.error("Debe seleccionar un modo de reproducion");
    }
    if (mode === "playlist" ) 
      {
        if (archivoAudio === "") {
          return toast.error("Debe seleccionar un Archivo de audio");
        }
      }

      if (mode === "files" ) 
      {
        if (archivoAudio === "") {
          return toast.error("Debe seleccionar un Archivo de audio");
        }
      }


    if (mode === "custom") {
      if (linkInput === "") {
        return toast.error("debe Seleccionar un linkInput");
      }
    }
    if (description === "") {
      return toast.error("Debe introducir una descripcion");
    }
  /*   if (empresaInput === undefined) {
      return toast.error("Debe seleccionar una empresa");
    } */
    if (sort === "") {
      return toast.error("Debe seleccionar un orden de reproduccion");
    } 

   
    /* debugger */
    addMusicaEspera(formValues,setLoading);
    console.log(formValues)
  };


  //Funcion Con Reader
  let openFile = function (archivo) {
    let reader = new FileReader();

      reader.onload = function () {
      let dataURL = reader.result; // esto es lo que me mandaras en la priopiedad file
      const punto = archivoAudio.indexOf(".");
        
      if (nombreAudio.includes(archivo.name)) {
        toast.error("Ya existe un audio con ese nombre");
      } else {
        setIndex(index + 1);

        setformValues((prevFormValues) => ({
          ...prevFormValues,
          playlist: [
            ...prevFormValues.playlist,
            {
              directory: null,
              order: index,
              position: formValues.playlist.length + 1,
              error: "",
              file: dataURL.split(',')[1],
              format: archivoAudio.substr(punto + 1),
              linkInput: "",
              name: archivo.name,
              save: null,
              stamp: null,
            },
          ],
        }));
      }
    };

    reader.readAsDataURL(archivo);
  };

  return (

    //Formulario
    <>
      <form>
        {/*      Primer Row */}
        <div className="form-row ">
          <div className="form-group col-12 col-md-4 col-lg-4 ">
            <label htmlFor="nombre" className="text-semibold"> MUSICA ESPERA </label>
            <input
              required
              type="text"
              nombre="nombre"
              value={nombre}
              className="form-control"
              onChange={(e) =>
                setformValues({ ...formValues, nombre: e.target.value })
              }
              placeholder="Nombre"
            />
          </div>

          <div className="form-group col-12 col-md-4 col-lg-4">
            <label className="font-weight-bold text-uppercase">Empresa</label>
            <select
              //disabled
              required
              nombre="empresa"
              value={empresaInput}
              onChange={(e) => setEmpresaInput(e.target.value)}
              className="custom-select"
              defaultValue=""
            >
              <option hidden value={`${u_id_empresa},${NombreEmpresa}`}>{NombreEmpresa}</option>

              {empresaData !== undefined &&
                empresaData.map((emp) => (
                  <>
                    <option key={emp.e_nombre_completo} value={`${emp.e_id},${emp.e_nombre_completo}`}>
                      {emp.e_nombre_completo}
                    </option>
                  </>
                ))}
            </select>
          </div>
     
     
          <div className="form-group col-12 col-md-4 col-lg-4">
            <label className="font-weight-bold text-uppercase">
              Orden de reproduccion
            </label>
            <select
              required
              nombre=""
              className="custom-select"
              defaultValue=""
              value={sort}
              onChange={(e) =>
                setformValues({ ...formValues, sort: e.target.value })
              }
            >
              <option hidden value="">Seleccione Orden</option>
              <option value="random">Aleatorio</option>
              <option value="alpha">Aplha</option>
              <option value="randstart">RandStart</option>
            </select>
          </div>

    
        </div>

        {/*      Segundo Row */}


        <div className="form-row ">
          
        <div className="form-group col-12 col-md-4 col-lg-4 ">
            <label htmlFor="nombre" className="text-semibold">MODO REPRODUCCION</label>
            <select
              required
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              nombre="mode"
              className="custom-select"
              defaultValue=""
            >
              <option hidden value="">
                Seleccione el modo
              </option>
              {modes.map(mode=>(<option value={mode.unnest}>{mode.unnest.toUpperCase()}</option>))}
            </select>
          </div>

          <div className="form-group col-12 col-md-4 col-lg-4 ">
            {mode !== "custom" ? (
              <>
                <label htmlFor="nombre" className="text-semibold">SELECCIONE EL ARCHIVO  </label>
                <div className="custom-file">
                  <input
                    required
                    disabled={mode !== "" ? false : true}
                    value={archivoAudio}
                    accept="audio/mp3,audio/wav"
                    type="file"
                    ref={fileRef}
                    nombre="archivoAudio"
                    className="custom-file-input"
                    onChange={(e) => setArchivoAudio(e.target.value)}
                  />
                  <label
                    className="custom-file-label text-success"
                    for="inputGroupFile01"
                  >
                    {archivoAudio.substr(12)}
                  </label>
                </div>
              </>
            ) : (
              <>
                <label htmlFor="nombre" className="text-semibold"> INGRESE LA LISTA EXTERNA</label>
                <input
                  required
                  placeholder="https://www.ejemplo.com"
                  pattern="https://.*"
                  type="url"
                  className="form-control"
                  value={linkInput}
                  onChange={(e) => {
                    setLinkInput(e.target.value);
                  }}
                />
              </>
            )}
          </div>

        </div>

{/*  tercer row */}
        <div className="form-row">
          <div className="form-group col-12 col-md-12 col-lg-12 ">
            <label htmlFor="desc" className="font-weight-bold text-uppercase">
              Descripcion de la playlist
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
      </form>

      <div className="form-row d-flex justify-content-center text-center">
        <div className="form-group col-12 col-md-12 col-lg-12 ">
          {archivoAudio !== "" && (
            <MusicaEnEsperaLista2
              playlist={playlist}
              setformValues={setformValues}
              formValues={formValues}
            />
          )}
        </div>
      </div>

      <div className="form-row ">
        <div className="form-group col-12 col-md-12 col-lg-12 ">
          <button
            onClick={handleSubmit}
            className="btn btn-primary float-right"
            disabled={loading}
          >
            GUARDAR
          </button>
        </div>
      </div>
    </>
  );
};
