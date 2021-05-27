import { useEffect, useState } from "react"
import { getEmpresa} from "../../services/AdministracionService";
import { addMotivo_Pausa, disableMotivo_Pausa, updateMotivo_Pausa } from "../../services/EstadoAgenteService";
import { options } from '../../lib/iconList';
import Select from "react-select";

const initialState = {
    codigo: "",
    descripcionF: "",
    descripcionC: "",
    empresa: "",
    icono: "",
    minuto: "",
    visible: "",
    estado: ""
}
function MantAgenteEstadoinsert({ titulo, agenteEstado }) {


    const [formValues, setFormValues] = useState(initialState)

    const [empresaData, setEmpresaData] = useState([])


    const [color, setColor] = useState([])
    const [comb, setComb] = useState("");
    const {
        codigo,
        descripcionF,
        descripcionC,
        empresa,
        icono,
        minuto,
        visible,
        estado
    } = formValues


    let styles = {
        option: (provided, state) => ({
            ...provided,
            color: color,
        }),
        singleValue: (provided, state) => ({
            ...provided,
            color: color,
        }),
    };

    const handleIcono = (e) => {
        console.log(e.value);
        setFormValues({ ...formValues, icono: e.value });
    };


    useEffect(() => {
        getEmpresa(setEmpresaData)


        setComb(`${icono},${color}`)
    }, [setEmpresaData, color, icono])

    useEffect(() => {
        if (titulo === "ESTADOS DE AGENTE") {

        } else {
            setFormValues({
                codigo: agenteEstado.lo_codigo,
                descripcionF: agenteEstado.lo_descripcion,
                descripcionC: agenteEstado.lo_descripcion_mini,
                empresa: agenteEstado.lo_empresa,
                estado: agenteEstado.lo_estado,
                icono: agenteEstado.lo_icono,
                minuto: agenteEstado.lo_minutos_alerta,
                visible: agenteEstado.lo_visible_agente
            })
        }
    }, [titulo, agenteEstado])



    const [loading, setLoading] = useState(false);




    const handleSubmit = (e) => {
        e.preventDefault()


        if (titulo === "ESTADOS DE AGENTE") {
         

            addMotivo_Pausa(formValues, setLoading, comb)

        } else {
            updateMotivo_Pausa(formValues, setLoading, comb)
            disableMotivo_Pausa({ codigo, empresa, estado }, setLoading)
        }

    }



    return (

        <form
            onSubmit={handleSubmit}
            className="card-body formMantenimientoEstado"

        >


            {/*    Primer Row */}

            <div className="form-row ">
                <div className="form-group col-12 col-md-12 col-lg-4">
                    <label className="font-weight-bold text-uppercase">Codigo</label>
               {
                   titulo==="ESTADOS DE AGENTE"
                   ?
                   <input
                   min="0"
                   required
                   type="text"
                   name="codigo"
                   className="form-control"
                 
                   onChange={(e) => setFormValues({ ...formValues, codigo: e.target.value })}
                   value={codigo} />
                   :
                   <input

                   disabled
                   min="0"
                   required
                   type="text"
                   name="codigo"
                   className="form-control"
                   placeholder="Codigo De Empleado"
                   onChange={(e) => setFormValues({ ...formValues, codigo: e.target.value })}
                   value={codigo} />
               }
                </div>


                <div className="form-group col-12 col-md-12 col-lg-4">
                    <label className="font-weight-bold text-uppercase">Nombre</label>
                    <input
                        required
                        type="text"
                        name="descripcionC"
                        className="form-control"
                        placeholder="Descripcion Corta"
                        onChange={(e) => setFormValues({ ...formValues, descripcionC: e.target.value })}
                        value={descripcionC}
                        maxLength="50" />
                </div>

                <div className="form-group col-12 col-md-12 col-lg-4">
                    <label className="font-weight-bold text-uppercase">Empresa</label>
                    <select
                        required
                        name="empresa"
                        value={empresa}
                        onChange={(e) => setFormValues({ ...formValues, empresa: parseInt(e.target.value) })}
                        className="custom-select"
                        defaultValue=""
                    >
                        {
                            empresaData !== undefined
                            &&
                            empresaData.map(emp => (
                                <>
                                    <option hidden value=""> Seleccione una Empresa</option>
                                    <option value={emp.e_id}>{emp.e_nombre_completo}</option>
                                </>
                            ))}
                    </select>
                </div>

            </div>

            {/*   Segundo Row */}

            <div className="form-row ">
                <div className="form-group col-12 col-md-12 col-lg-4  ">
                    <label className="font-weight-bold text-uppercase">Icono</label>
                    <div class="input-group IconoGroup">

                        <Select
                      
                            placeholder="Seleccione"
                            className="customSelect "
                            onChange={handleIcono}
                            options={options}
                            styles={styles}
                            
                        />
                        <div class="input-group-append">
                            <input
                           
                                className="colorInput "
                                type="color"
                                name="color"
                                value={color}
                                onChange={(e) => setColor(e.target.value)} />
                        </div>
                    </div>

                </div>


                <div className="form-group col-12 col-md-12 col-lg-4">
                    <label className="font-weight-bold text-uppercase">Minutos para alertar</label>
                    <input
                        required
                        min="0"
                        type="number"
                        name="minuto"
                        className="form-control"
                        placeholder="Introduzca Minutos para recivir una altera"
                        onChange={(e) => setFormValues({ ...formValues, minuto: parseInt(e.target.value) })}
                        value={minuto} />
                </div>
                <div className="form-group col-12 col-md-12 col-lg-4">
                    <label className="font-weight-bold text-uppercase">Visible para el agente</label>
                    <select
                        required
                        value={visible}
                        name="visible"
                        className="form-control"
                        onChange={(e) => {
                            setFormValues({ ...formValues, visible: JSON.parse(e.target.value) })
                        }}
                        defaultValue=""
                    >
                        <option hidden value=""> Seleccione Visibilidad </option>
                        <option value="true">Visible</option>
                        <option value="false">No Visible</option>
                    </select>
                </div>

            </div>

            {/*    Tercer Row */}

            <div className="form-row">


                <div className="form-group col-12 col-md-12 col-lg-4">
                    <label className="font-weight-bold text-uppercase">Estado</label>
                    <select
                        required
                        name="estado"
                        value={estado}
                        className="custom-select"
                        onChange={(e) => setFormValues({ ...formValues, estado: parseInt(e.target.value) })}
                        defaultValue=""
                    >
                        <option hidden value=""> Seleccione Estado </option>
                        <option value="1">Activo</option>
                        <option value="0">Inactivo</option>
                    </select>
                </div>

            </div>
            <div className="form-row">

                <div className="form-group col-12 col-md-12 col-lg-12">
                    <label className="font-weight-bold text-uppercase">Descripcion Larga</label>
                    <textarea
                        required

                        style={{ resize: "none" }}
                        className="form-control"
                        rows="4"

                        name="descripcionF"
                        placeholder="Inserte descripcion Larga"
                        onChange={(e) => setFormValues({ ...formValues, descripcionF: e.target.value })}
                        value={descripcionF}></textarea>
                </div>

            </div>

            <div className="form-row justify-content-end">
                <div className="form-group col-12 col-md-4 col-lg-4 ">
                    <button className="btn btn-primary btn-lg float-right" disabled={loading}>GUARDAR</button>
                </div>
            </div>

        </form >

    )
}

export default MantAgenteEstadoinsert