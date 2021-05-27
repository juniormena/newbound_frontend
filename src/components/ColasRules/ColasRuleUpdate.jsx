
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getEmpresa } from '../../services/AdministracionService';
import {  UpdateColasRule } from '../../services/ColasRulesService';
import TooltipComponent from '../Toolttip/TooltipComponent';
import useLoading from './../../hooks/useLoading';


export default function ColasRulesInsert({ colasReglas }) {
  

  return (
    <>
 
 
  <h5 className="text-center my-3">Nombre: {colasReglas[0]!==undefined && colasReglas[0].rule_name}</h5>
        <table className="table table-bordered text-center meLista table-responsive ">
         
        <thead>
          <tr>

            <th>TIEMPO</th>
            <th>PENALIDAD MAXIMA</th>
            <th>PENALIDAD MINIMA</th>
            <th>ELEVAR PENALIDAD</th>
            <th>ACCIONES</th>
          </tr>
        </thead>
        <tbody>
       
          {
          

            colasReglas.map(e => (
              <tr>
              
                <td>{e.time}</td>
                <td>{e.max_penalty}</td>
                <td>{e.min_penalty}</td>
                <td>{e.raise_penalty}</td>
                <td>{
                <Link to={`/callcenter/colas-reglasconfig/edit/${e.rule_id}.${e.id_empresa}`} >
                <i className="fas fa-edit mb-1 mb-md-0 btn btn-primary fa-1x"></i></Link>
                }</td>
              </tr>
            ))
          }

        </tbody>
      </table>
{/* 
        <div className="row ">
          <div className="col-md-12 ">
            <button disabled={loading ? true : false} type="submit" className="btn btn-primary float-right ">
              Guardar
                   </button>
          </div>
        </div>

      </form> */}

    </>
  )
}
