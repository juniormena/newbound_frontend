
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getEmpresa } from '../../services/AdministracionService';
import {  UpdateColasRule } from '../../services/ColasRulesService';
import TooltipComponent from '../Toolttip/TooltipComponent';
import useLoading from './../../hooks/useLoading';

const initialState = {

  id_empresa: 0,
  max_penalty: "",
  min_penalty: "",
  rule_name: "",
  time: "",
  raise_penalty:'',
  rule_id:""
};

export default function ColasRulesEditConfig({ colasReglas }) {
  

  const [formValues, setformValues] = useState(initialState);
  const { rule_name, id_empresa, time, max_penalty, min_penalty,raise_penalty } = formValues

  const [loading, setLoading] = useLoading();


  useEffect(() => {
    
           if (colasReglas[0]!==undefined) {
               
            
               setformValues({
                 rule_id:colasReglas[0].rule_id,
                  rule_name:colasReglas[0].rule_name,
                  id_empresa:colasReglas[0].id_empresa,
                  time:colasReglas[0].time,
                  max_penalty:colasReglas[0].max_penalty,
                  min_penalty:colasReglas[0].min_penalty,
                  raise_penalty:colasReglas[0].raise_penalty
                 
               })
           }

  }, [setformValues, colasReglas])

  const handleSubmit = (e) => {
    e.preventDefault()
     //console.log(formValues); 
     UpdateColasRule(formValues,setLoading)

  }
  return (
    <>
      <form onSubmit={handleSubmit}>
       
        <div className="form-row ">

          <div className="form-group col-12 col-md-12 col-lg-6 ">
            <label htmlFor="nombreCarpeta" className="text-semibold"> NOMBRE</label>
            <input
              disabled
              required
              type="text"
              nombreCarpeta="nombreCarpeta"
              value={rule_name}
              className="form-control"
              onChange={(e) =>
                setformValues({ ...formValues, rule_name: e.target.value })
              }
            />
          </div>


          <div className="form-group col-12 col-md-12 col-lg-6 ">

            <label htmlFor="archivo" className="text-semibold">TIEMPO </label>
            <input
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


        </div>


    
        <div className="form-row">
          <div className="form-group col-12 col-md-12 col-lg-6 ">

            <label htmlFor="archivo" className="text-semibold">PENALIDAD MAXIMA</label>
            <input
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
          <div className="form-group col-12 col-md-12 col-lg-6 ">

            <label htmlFor="archivo" className="text-semibold">PENALIDAD MINIMA</label>
            <input
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

          <div className="form-group col-12 col-md-12 col-lg-6 ">
            <label htmlFor="nombreCarpeta" className="text-semibold"> ELEVAR PENALIDAD</label>
            <input
            
              required
              type="text"
              nombreCarpeta="nombreCarpeta"
              value={raise_penalty}
              className="form-control"
              onChange={(e) =>
                setformValues({ ...formValues, raise_penalty: e.target.value })
              }
            />
          </div>
        </div>
      

        <div className="row ">
          <div className="col-md-12 ">
            <button disabled={loading ? true : false} type="submit" className="btn btn-primary float-right ">
              Guardar
                   </button>
          </div>
        </div>

      </form>

    </>
  )
}
