
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getEmpresa } from '../../services/AdministracionService';
import { addColasRule, getColaRuleListaAgregar } from '../../services/ColasRulesService';
import useLoading from './../../hooks/useLoading';
import { ColasRulesListaAgregadas } from './ColasRulesListaAgregadas';

const initialState = {

  id_empresa: 0,
  max_penalty: "",
  min_penalty: "",
  rule_name: "",
  time: "",
  raise_penalty: ""
  , rule_id: ""
};

const initialState2 = {

  id_empresa: 14,
  max_penalty: "20",
  min_penalty: "30",
  rule_name: "Rule Cola 6",
  time: "15",
  raise_penalty: "10",
  rule_id: ""
};


export default function ColasRulesInsert() {

  const [formValues, setformValues] = useState(initialState);
  const { rule_name, id_empresa, time, max_penalty, min_penalty, raise_penalty } = formValues
  const [empresaData, setEmpresaData] = useState([]);
  const { u_id_empresa } = useSelector(state => state.user.currentUser.userLogin.data[0])
  const [NombreEmpresa, setNombreEmpresa] = useState("")
  const [ruleData, setRuleData] = useState({ data: [] })
  const [RuleExiste, setRuleExiste] = useState(null)
  const [ProvId, setProvId] = useState(0)

  const [loading, setLoading] = useLoading();


  //Empresa get
  useEffect(() => {
    getEmpresa(setEmpresaData);
  }, [setEmpresaData]);


  useEffect(() => {
    empresaData.filter(empresa => {

      if (u_id_empresa === empresa.e_id) {

        setNombreEmpresa(empresa.e_nombre_completo)
        setformValues({ ...formValues, id_empresa: u_id_empresa })
      }

    })

  }, [empresaData, setNombreEmpresa, setformValues])



  const handleRuleData = () => {

    getColaRuleListaAgregar({ rule_name, id_empresa }, setRuleExiste)
 
  }

  useEffect(() => {
    setRuleExiste(null)
    if (RuleExiste===false) {
      console.log(RuleExiste);
    
      console.log(RuleExiste);
      setProvId(ProvId + 1)

      setRuleData({
        ...ruleData,
        rule_name: rule_name,
        id_empresa: id_empresa,
        data: [...ruleData.data.concat({
          raise_penalty: raise_penalty,
          max_penalty: max_penalty,
          min_penalty: min_penalty,
          time: time,

        })]
      })

       setformValues({ ...formValues, 
        raise_penalty: "",
        max_penalty: "",
        min_penalty: "",
        time: "",})
    }


  }, [RuleExiste, setRuleExiste])



  const handleSubmit = (e) => {
    e.preventDefault()

    if (ruleData.data.length > 0) {
      addColasRule(ruleData, setLoading)
    } else {
      toast.error("Debe Agregar los Datos antes de guardar", { autoClose: 2500 })

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
            disabled={ProvId > 0 ?true :false}
              placeholder="Inserte el nombre "
              required
              type="text"
              value={rule_name}
              className="form-control"
              onChange={(e) =>
                setformValues({ ...formValues, rule_name: e.target.value })
              }
            />
          </div>


          <div className="form-group col-12 col-md-12 col-lg-4 ">

            <label htmlFor="archivo" className="text-semibold">TIEMPO </label>
            <input
              placeholder="Inserte el tiempo"
              required
              min="0"
              type="number"
              value={time}
              className="form-control mb-2"
              onChange={(e) =>
                setformValues({ ...formValues, time: e.target.value })
              }
            />

          </div>

          <div className="form-group col-12 col-md-12 col-lg-4 ">
            <label className="font-weight-bold text-uppercase">Empresa</label>
            <select
              //disabled
              required
              placeholder="Inserte el tiempo"
              name="empresa"
              value={id_empresa}
              onChange={(e) => setformValues({ ...formValues, id_empresa: e.target.value })}
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
                    <option key={emp.e_nombre_completo} value={emp.e_id}>
                      {emp.e_nombre_completo}
                    </option>
                  </>
                ))}
            </select>

          </div>
        </div>


        {/*      Segundo Row */}
        <div className="form-row">
          <div className="form-group col-12 col-md-12 col-lg-4 ">

            <label htmlFor="penalidadmaxima" className="text-semibold">PENALIDAD MAXIMA</label>
            <input
              placeholder="Inserte penalidad maxima"
              required
              min="0"
              type="number"
              value={max_penalty}
              className="form-control mb-2"
              onChange={(e) =>
                setformValues({ ...formValues, max_penalty: e.target.value })
              }
            />

          </div>
          <div className="form-group col-12 col-md-12 col-lg-4 ">

            <label htmlFor="archivo" className="text-semibold">PENALIDAD MINIMA</label>
            <input
              placeholder="Inserte penalidad minimo"
              required
              min="0"
              type="number"
              value={min_penalty}
              className="form-control mb-2"
              onChange={(e) =>
                setformValues({ ...formValues, min_penalty: e.target.value })
              }
            />

          </div>
          <div className="form-group col-12 col-md-12 col-lg-4 ">

            <label htmlFor="archivo" className="text-semibold">ELEVAR PENALIDAD</label>
            <input
              placeholder="Inserte penalidad minimo"
              required
              min="0"
              type="number"
              value={raise_penalty}
              className="form-control mb-2"
              onChange={(e) =>
                setformValues({ ...formValues, raise_penalty: e.target.value })
              }
            />

          </div>
        </div>

      </form>



      <div className="row mb-3">
        <div className="col-md-12 ">
          <button
            disabled={min_penalty === "" || min_penalty === "" || time === "" || rule_name === "" || raise_penalty === "" ? true : false}
            onClick={handleRuleData}
            className="btn btn-secondary float-right ">
            Agregar Datos
                   </button>
        </div>
      </div>
      {
        ruleData.data.length > 0
        &&
        <div className="row mb-3">
          <div className="col-md-12 ">
            <ColasRulesListaAgregadas
              ruleData={ruleData}
              handleRemover={handleRemover}
            />
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
  function handleRemover(rule_id) {

    console.log(rule_id);

  }
}

