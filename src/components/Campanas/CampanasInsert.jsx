
import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { getEmpresa, GetDepartamentosById } from '../../services/AdministracionService';
import Select from "react-select";
import useLoading from './../../hooks/useLoading';
import moment from "moment";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-daterangepicker/daterangepicker.css";
import { addCampanas, ImportCampanaRegistros, updateCampana } from '../../services/campanasService';
import { setHoraMinutosSegundos } from '../../lib/dateHelpers';
import TooltipComponent from '../Toolttip/TooltipComponent';
import { FaDownload, FaEye, FaUpload } from 'react-icons/fa';
import { importarExcelEjemplo, importExcel } from '../../lib/exportHelpers'
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';


const initialState = {

  nombre: "",
  id_empresa: 0,
  id_departamento: 0,
  periodoDesde: moment(),
  periodoHasta: moment(),
  hora_inicio: "",
  hora_fin: "",
  cola_id: "",
  troncal: "",
  contexto: "",
  script: "",
  reintentos_max: 0,
  usuario: 0,
  nombre_cola: "",
  nombre_departamento: "",
  nombre_empresa: "",
  peso: 0,

  formulario_id: null,
  url_externo: null
};

const initialState2 = {

  nombre: "Combris",
  id_empresa: 14,
  id_departamento: "",
  periodoDesde: moment(),
  periodoHasta: moment(),
  hora_inicio: "02:00:00",
  hora_fin: "02:15:00",
  cola_id: "",
  troncal: "DH",
  contexto: "",
  script: "",
  reintentos_max: 1,
  usuario: 70,
  peso: 10,
  tiempo_entre_llamadas: "02:15:00",

  formulario_id: null,
  url_externo: null
};



export default function CampanasInsert({ currentUser, titulo, campanaDatos }) {

  const [formValues, setformValues] = useState(initialState);
  const { nombre, id_empresa, id_departamento, cola_id, troncal, contexto, reintentos_max, script,
    periodoDesde, periodoHasta, hora_inicio, hora_fin, peso, tiempo_entre_llamadas } = formValues

  const [departamentos, setDepartamentos] = useState([]);
  const [empresaData, setEmpresaData] = useState([]);
  const { u_id_empresa, is_superuser, u_usuario } = useSelector(state => state.user.currentUser.userLogin.data[0])
  const { departamentos_supervision } = useSelector(state => state.user.currentUser)
  const [NombreEmpresa, setNombreEmpresa] = useState("")

  const [loading, setLoading] = useLoading();

  const [colas, setColas] = useState([])

  const fileRef = useRef()
  const [file, setFile] = useState([]);

  


  //Use Effects

  useEffect(() => {

    getEmpresa(setEmpresaData);
  }, [setEmpresaData]);


  //Departamentos
  useEffect(() => {
    GetDepartamentosById(departamentos_supervision, setDepartamentos);
  }, [setDepartamentos, departamentos_supervision]);


  useEffect(() => {

    if (titulo === 'Editar Campaña') {

      if (campanaDatos[0] !== undefined) {


        ImportCampanaRegistros(file, campanaDatos[0],setLoading)
      }
    }

  }, [file])




  useEffect(() => {

    if (titulo === 'Editar Campaña') {

      if (campanaDatos[0] !== undefined) {
        console.log(campanaDatos[0]);
        setformValues({
          id: campanaDatos[0].id,
          nombre: campanaDatos[0].nombre,
          id_empresa: campanaDatos[0].id_empresa,
          id_departamento: campanaDatos[0].id_departamento,
          cola_id: campanaDatos[0].cola_id,
          periodoDesde: campanaDatos[0].fecha_inicio.split('T')[0],
          periodoHasta: campanaDatos[0].fecha_fin.split('T')[0],
          hora_inicio: setHoraMinutosSegundos(campanaDatos[0].hora_inicio.hours, campanaDatos[0].hora_inicio.minutes, campanaDatos[0].hora_inicio.seconds),
          hora_fin: setHoraMinutosSegundos(campanaDatos[0].hora_fin.hours, campanaDatos[0].hora_fin.minutes, campanaDatos[0].hora_fin.seconds),
          contexto: campanaDatos[0].contexto,
          script: campanaDatos[0].script,
          reintentos_max: campanaDatos[0].reintentos_max,
          troncal: campanaDatos[0].troncal,
          usuario: campanaDatos[0].usuario,
          peso: campanaDatos[0].peso,
          tiempo_entre_llamadas: setHoraMinutosSegundos(campanaDatos[0]?.tiempo_entre_llamadas?.hours,
            campanaDatos[0]?.tiempo_entre_llamadas?.minutes, campanaDatos[0]?.tiempo_entre_llamadas?.seconds),
         
        })
      }
    }

  }, [titulo, campanaDatos])


  useEffect(() => {
    empresaData.filter(empresa => {

      if (u_id_empresa === empresa.e_id) {

        setNombreEmpresa(empresa.e_nombre_completo)
        setformValues({ ...formValues, id_empresa: u_id_empresa, usuario: u_usuario, nombre_empresa: empresa.e_nombre_completo })
      }

    })

  }, [empresaData, setNombreEmpresa, setformValues])



  useEffect(() => {

    if (currentUser !== undefined) {
      setColas(
        currentUser.cola_supervision?.data.map((data) => ({
          value: data.name,
          label: data.nombre,
        }))
      );

    }

  }, [currentUser, setColas])


  const handleImportExcel = () => {
    if (fileRef.current?.files[0] !== undefined) {
      importExcel(fileRef.current.files[0], setFile);
    }
  };

  const handelDescargarImportEjemplo=()=>{
    
    let data=[{
      codigo_campana:"",
      llamar_desde:"",
      llamar_hasta:"",
      estado:"",
      codigo_ref:"",
      nombre:"",
      indice_contacto:"",
      nombre_contacto:"",
      numero_contacto:"",
      extension_contacto:"",
      peso:"",
      reintentos_max:"",
      script:"",
      agente_id:"",
      formulario_id:"",
      url_externo:"",
      ultimo_acceso:""
    }]
      importarExcelEjemplo("Ejemplo de Importacion",data)
    }
  


  const handleSubmit = (e) => {
    let campanaFecha = { ...formValues };
    campanaFecha.periodoDesde = moment.isMoment(campanaFecha.periodoDesde)
      ? campanaFecha.periodoDesde.format()
      : null;

    campanaFecha.periodoHasta = moment.isMoment(campanaFecha.periodoHasta)
      ? campanaFecha.periodoHasta.format()
      : null;
    e.preventDefault()

    if (titulo === 'Editar Campaña') {
      updateCampana(formValues, setLoading)

    } else {
      addCampanas(formValues, setLoading);
    }



  }
  return (
    <>
      <form >
        {/*      Primer Row */}
        <div className="form-row ">

          <div className="form-group col-12 col-md-12 col-lg-4 ">
            <label htmlFor="nombreregla" className="text-semibold"> NOMBRE</label>
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


          <div className="form-group col-6 col-md-6 col-lg-4 ">
            <label className="font-weight-bold text-uppercase">Empresa</label>
            <select
              disabled={is_superuser === '1' ? false : true}
              required
              placeholder="Inserte el tiempo"
              name="empresa"
              value={id_empresa}
              onChange={(e) => setformValues({ ...formValues, id_empresa: e.target.value, nombre_empresa: NombreEmpresa })}
              className="custom-select"
            >
              <option hidden value={u_id_empresa}>{NombreEmpresa}</option>

              {empresaData !== undefined &&
                empresaData.map((emp) => (
                  <>
                    <option hidden value="">
                      Seleccione una Empresa
                    </option>
                    <option key={emp.e_nombre_completo} value={emp.e_id}>
                      {emp.e_nombre_completo}
                    </option>
                  </>
                ))}
            </select>

          </div>

          <div className="form-group col-6 col-md-6 col-lg-4 ">
            <label htmlFor="membername" className="font-weight-bold text-uppercase">DEPARTAMENTO</label>

            <Select
              maxMenuHeight={100}
              onChange={(e => setformValues({ ...formValues, id_departamento: e.value, nombre_departamento: e.label }))}
              value={departamentos.length > 0 && departamentos.filter(obj => obj.value === id_departamento)}
              className="mb-2"
              placeholder="Seleccione el departamento"
              options={departamentos.length > 0 && departamentos}
            />
          </div>
        </div>


        {/*      Segundo Row */}
        <div className="form-row">

          <div className="form-group col-6  col-md-6 col-lg-4 ">
            <label className="font-weight-bold text-uppercase">Fecha Inicio</label>

            <input
              value={periodoDesde}
              className="form-control"
              type="date"
              onChange={(e) => setformValues({ ...formValues, periodoDesde: e.target.value })}
            />

          </div>

          <div className="form-group col-6 col-md-6 col-lg-4 ">
            <label className="font-weight-bold text-uppercase">Fecha Fin</label>

            <input className="form-control"
              type="date"
              value={periodoHasta}
              onChange={(e) => setformValues({ ...formValues, periodoHasta: e.target.value })}
            />

          </div>

          <div className="form-group col-12 col-md-12 col-lg-4 ">

            <label htmlFor="Troncal" className="font-weight-bold text-uppercase">Troncal</label>
            <input
              placeholder="Inserte Troncal"
              required
              type="text"
              value={troncal}
              className="form-control mb-2"
              onChange={(e) =>
                setformValues({ ...formValues, troncal: e.target.value })
              }
            />

          </div>
        </div>

        {/*      Tercer Row */}
        <div className="form-row">

          <div className="form-group col-6 col-md-6 col-lg-3">
            <label className="font-weight-bold text-uppercase"> Hora Inicio </label>
            <input
              type="time"
              step="1"
              value={hora_inicio}
              onChange={(e) => setformValues({ ...formValues, hora_inicio: e.target.value })}
              className="form-control"
            />
          </div>

          <div className="form-group col-6 col-md-6 col-lg-3">
            <label className="font-weight-bold text-uppercase"> Hora Fin</label>
            <input
              type="time"
              step="1"
              value={hora_fin}
              className="form-control"
              onChange={(e) => setformValues({ ...formValues, hora_fin: e.target.value })}
            />
          </div>

          <div className="form-group col-12 col-md-6 col-lg-3">
            <label htmlFor="membername" className="font-weight-bold text-uppercase">COLA</label>
            <Select
              maxMenuHeight={100}
              onChange={(e => setformValues({ ...formValues, cola_id: e.value, nombre_cola: e.label }))}
              value={colas.filter(obj => obj.value === cola_id)}
              className="mb-2"
              placeholder="Seleccione la cola"
              options={colas}
            />
          </div>

          <div className="form-group col-12 col-md-12 col-lg-3">

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
        </div>

        {/*      Cuarto Row */}
        <div className="form-row">


          <div className="form-group col-6 col-md-6 col-lg-4">

            <label htmlFor="archivo" className="font-weight-bold text-uppercase">Contexto</label>
            <input
              placeholder="Inserte Contexto"
              required
              min="0"
              type="text"
              value={contexto}
              className="form-control mb-2"
              onChange={(e) =>
                setformValues({ ...formValues, contexto: e.target.value })
              }
            />

          </div>

          <div className="form-group col-6 col-md-6 col-lg-4">

            <label htmlFor="peso" className="font-weight-bold text-uppercase">Peso</label>
            <input
              placeholder="Inserte Peso"
              required
              min="0"
              type="text"
              value={peso}
              className="form-control mb-2"
              onChange={(e) =>
                setformValues({ ...formValues, peso: e.target.value })
              }
            />

          </div>

          <div className="form-group col-12 col-md-16 col-lg-4">

            <label htmlFor="peso" className="font-weight-bold text-uppercase">Tiempo Entre Llamada</label>
            <input
              placeholder="Inserte Tiempo Entre Llamada"
              required
              min="0"
              type="time"
              step="1"
              value={tiempo_entre_llamadas}
              className="form-control mb-2"
              onChange={(e) =>
                setformValues({ ...formValues, tiempo_entre_llamadas: e.target.value })
              }
            />

          </div>

          <div className="form-group col-12 col-md-12 col-lg-12 ">

            <label htmlFor="desc" className="font-weight-bold text-uppercase">
              Script
            </label>
            <textarea
              maxLength={500}
              required
              rows="5"
              className="form-control"
              value={script}
              onChange={(e) =>
                setformValues({ ...formValues, script: e.target.value })
              }
            ></textarea>
          </div>
        </div>
      </form>


      {
        titulo === 'Editar Campaña'
        &&
        <div className="row ">
          <div className="col-md-12 my-4 ">
            <TooltipComponent text="Importar excel">
              <label class="btn btn-secondary float-right">
                <FaUpload />
                <input
                  type="file"
                  hidden
                  ref={fileRef}
                  accept=".xls,.xlsx, .csv"
                  onChange={handleImportExcel}
                />
              </label>
            </TooltipComponent>

            <TooltipComponent text="Descargar Ejemplo Del documento de  Importacion">
             
             <Button
               className="mr-2 btn-info float-right"
               onClick={handelDescargarImportEjemplo}
             >
                <FaDownload />
             </Button>
           </TooltipComponent>


           

          </div>


        </div>

      }


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

