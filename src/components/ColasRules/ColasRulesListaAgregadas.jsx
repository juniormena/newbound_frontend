import React from "react";


import TooltipComponent from "../Toolttip/TooltipComponent";

import { usePagination } from './../../hooks/usePagination';


export const ColasRulesListaAgregadas = ({ ruleData}) => {

  return (
    <>
      <table className="table table-bordered text-center meLista">
        <thead>
          <tr>

            <th>TIEMPO</th>
            <th>PENALIDAD MAXIMA</th>
            <th>PENALIDAD MINIMA</th>
            <th>ELEVAR PENALIDAD</th>
          
          </tr>
        </thead>
        <tbody>
          {

            ruleData.data.map(e => (
              <tr>
              
                <td>{e.time}</td>
                <td>{e.max_penalty}</td>
                <td>{e.min_penalty}</td>
                <td>{e.raise_penalty}</td>
            
              </tr>
            ))
          }

        </tbody>
      </table>

      {/*  <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        paginate={paginate}
        currentPage={currentPage}
      /> */}
    </>
  );
};