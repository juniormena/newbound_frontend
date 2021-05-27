import { formatDate, formatDate2 } from "../../lib/dateHelpers";

export default function CampanasRegistroDetalles({ titulo, contactoInfo }) {

  var result = [];

  for (const key in contactoInfo.contactos) {
    result.push(contactoInfo.contactos[key])
  }



  return (
    <div className="d-block d-lg-flex   ">
      <div className="border-right pr-4">
        <h6 className=' text-semibold mb-3 '>Informacion de Contacto</h6>
        {result?.map(e => (
          <div className="form-group  d-flex justify-content-between ">

            <div className="pl-0 col-4">
              <label htmlFor="nombreregla" className="text-semibold"> NOMBRE</label>
              <p>{e?.nombre}</p>

            </div>

            <div className="col-4">
              <label htmlFor="nombreregla" className="text-semibold"> TELEFONO</label>
              <p>{e?.telefono}</p>
            </div>


            <div className="col-4">
              <label htmlFor="nombreregla" className="text-semibold"> EXTENSION</label>
              <p>{e?.extension}</p>
            </div>

          </div>

        ))}
      </div>

     
      <div className="form-group col-12 col-lg-6 pl-0 pl-lg-4 " >
       
        <div className="form-group  ">
          <hr className="d-lg-none"/>
        <h6 className=' text-semibold  mb-3'>Detalle</h6>
          <div className="form-row  ">

            <div className="form-group col-4" >
              <label htmlFor="nombreregla" className="text-semibold"> ESTADO</label>
              <p>{contactoInfo?.nombre_estado}</p>
            </div>
            <div className="form-group col-4 ">
              <label htmlFor="nombreregla" className="text-semibold"> PESO</label>
              <p>{contactoInfo?.peso}</p>
            </div>
            <div className="form-group col-4  ">
              <label htmlFor="nombreregla" className="text-semibold"> REINTENTOS ACTUALES</label>
              <p>{contactoInfo?.reintentos_actuales}</p>
            </div>
          </div>
          <div className="form-row  ">

            <div className="form-group col-4 col-md-4 col-lg-4 " >
              <label htmlFor="nombreregla" className="text-semibold">AGENTE ID</label>
              <p>{contactoInfo?.agente_id}</p>
            </div>
            <div className="form-group col-4 col-md-4 col-lg-4 ">
              <label htmlFor="nombreregla" className="text-semibold">ULTIMO ACCESSO</label>
              <p>{formatDate(contactoInfo?.ultimo_acceso)}</p>
            </div>
            <div className="form-group col-4 col-md-4 col-lg-4 ">
              <label htmlFor="nombreregla" className="text-semibold">  REINTENTOS MAXIMO</label>
              <p>{contactoInfo?.reintentos_max}</p>
            </div>
          </div>
        </div>
      </div>

    </div>


  )

}

