import React, { useEffect, useRef, useState } from "react";
import { getEmpresa } from "../../services/AdministracionService";
import { UpdateMusicOnHold } from '../../services/MusicaEsperaService'
import { musicOnHoldSelectTypes } from "../../services/MusicaEsperaService";
import { MusicaEnEsperaListaEdit } from "./MusicaEnEsperaListaEdit";
import { MusicaEnEsperaLista2 } from "./MusicaEnEsperaLista2";
import { toast } from "react-toastify";
import useLoading from "../../hooks/useLoading";


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

export const MusicaEnEsperaUpdate = ({ datosCarpeta, empresaId }) => {


 //UseStates

  const [modes, setModes] = useState([])

  const [archivoAudio, setArchivoAudio] = useState("");
  const [mode, setMode] = useState("");
  const [linkInput, setLinkInput] = useState("");
  const [empresaData, setEmpresaData] = useState([]);
  const [empresaInput, setEmpresaInput] = useState();
  const [index, setIndex] = useState(0);

  const [NombreEmpresa, setNombreEmpresa] = useState("")

  const [listaAudios, setListaAudios] = useState({
    nombreAudio: [],
  });


  const fileRef = useRef();

  const [formValues, setformValues] = useState(initialState);

  const { nombre, description, sort, playlist } = formValues;

  const { nombreAudio } = listaAudios;

  const [loading, setLoading] = useLoading();

  //UseStates
 
//Use Effect Carga informacion del update

  useEffect(() => {
    empresaData.filter(empresa => {

      if (Number(empresaId) === empresa.e_id) {

         setNombreEmpresa(empresa.e_nombre_completo) 
        /* console.log(datosCarpeta) */
       
        datosCarpeta.map(datos => {
          //console.log(datos); 
          setformValues({
            nombre: datosCarpeta[0].name,
            mode: datosCarpeta[0].mode,
            empresa: empresa.e_nombre_completo,
            empresa_id: empresa.e_id,
            sort: datosCarpeta[0].sort,
            description: datosCarpeta[0].description,
            application: null,
            playlist: [
             
            ]
          })
          setMode(datosCarpeta[0].mode)
        })

      }

    })

  }, [datosCarpeta, setformValues, empresaId,setNombreEmpresa])


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
  
        
  
     /*  setformValues({ ...formValues, mode: mode }); */
      setListaAudios({ ...listaAudios, nombreAudio: [] });
    }

  }, [archivoAudio, mode,linkInput]);

  //Carga Informacion desde getempresa

  useEffect(() => {
    getEmpresa(setEmpresaData);
  }, [setEmpresaData]);

  //Guarda y divide la informacion de enviar empresa

  useEffect(() => {
    if (empresaInput !== undefined) {
      let coma = empresaInput.indexOf(",");
      let id = parseInt(empresaInput.substr(0, coma));

      let empresa = empresaInput.substr(coma + 1);
    

      return setformValues({ ...formValues, empresa, empresa_id: id });
    }

  }, [empresaInput, setNombreEmpresa]);


//Submit con Validaciones
  const handleSubmit = (e) => {
    e.preventDefault()

    if (nombre === "") {
      return toast.error("Nombre no puede quedar vacio");
    }
    if (mode === "") {
      return toast.error("Debe seleccionar un modo de reproducion");
    }
    if (mode === "playlist" && mode === "files") 
      {
        if (archivoAudio === "") {
          return toast.error("Debe seleccionar un Archivo de audio");
        }
      }

   /*  if (mode === "custom") {
      if (linkInput === "") {
        return toast.error("debe Seleccionar un linkInput");
      }
    } */
    if (description === "") {
      return toast.error("Debe introducir una descripcion");
    }

    if (sort === "") {
      return toast.error("Debe seleccionar un orden de reproduccion");
    } 

    console.log(formValues);
     UpdateMusicOnHold(formValues,datosCarpeta,setLoading) 
  
  };

//Reader 
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
              link: "",
              name: archivo.name,
              save: null,
              stamp: null,
            }

          ],
        }));
      }
    };

    reader.readAsDataURL(archivo);
  };

//Formulario

  return (
    <div className=" MusicaUpdate">
      <form className="form-group col-12 col-md-12 ">

        {/*      Primer Row */}
        <div className="form-row ">

          <div className="form-group col-12 col-md-4 col-lg-4">
            <label className="font-weight-bold text-uppercase">Empresa</label>
            <select
              disabled
              required
              nombre="empresa"
              value={empresaInput}
              onChange={(e) => setEmpresaInput(e.target.value)}
              className="custom-select"
              defaultValue=""
            >
              <option hidden value={`${empresaId},${NombreEmpresa}`}>{NombreEmpresa}</option>

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

          <div className="form-group col-12 col-md-4 col-lg-4 ">
            <label htmlFor="nombre" className="text-semibold">  MUSICA ESPERA  </label>
            <input
              disabled
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
            <label className="font-weight-bold text-uppercase">
              Orden
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

          <div className="form-group col-12 col-md-6 col-lg-6 ">
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
              {modes.map(mode => (<option  value={mode.unnest}>{mode.unnest.toUpperCase()}</option>))}
            </select>
          </div>

          <div className="form-group col-12 col-md-6 col-lg-6 ">
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
                  <label htmlFor="nombre" className="text-semibold"> LISTA EXTERNA</label>
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

        {/*     Tercer Row */}
        <div className="form-row">
          <div className="form-group col-12 col-md-12 col-lg-12 ">
            <label htmlFor="desc" className="font-weight-bold text-uppercase">
              Descripcion del Audio
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
        <div className="form-row ">
          <div className="form-group col-12 col-md-12 col-lg-12 ">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="btn btn-primary float-right"
            >
              GUARDAR
          </button>
          </div>
        </div>
      </form>



      <div className=" text-center form-group col-12 col-md-12  " >
        
      <MusicaEnEsperaListaEdit datosCarpeta={datosCarpeta} />
      {archivoAudio !== "" && (
            <MusicaEnEsperaLista2
              playlist={playlist}
              setformValues={setformValues}
              formValues={formValues}
            />
          )}
      
        
      </div>
    </div >
  )
}
