
import { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useGuardaExcel } from '../../hooks/useGuardaExcel';
import { ConfirmacionBorrar } from '../../lib/helpers';


import { connect } from 'react-redux';

import { downloadPdf } from '../../redux/actions/downloadbleActions';
import ColasRulesRows from './ColasRulesRows';
import { getColasRuleByEmpresa } from '../../services/ColasRulesService';
import { getColasRulesAction } from '../../redux/actions/colasActions';

function ColasRulesLista({ currentPage, ITEMS_PER_PAGE, setTotalItems, sorting, setDataToBeDownloaded }) {

  const { colasRules } = useSelector(state => state.colas)

  const [datos, setDatos] = useState([])
  const dispatch = useDispatch()
  const { data } = useSelector(state => state.user.currentUser.userLogin)
  const [excel, setExcel] = useState({
    data: []
  })

  useEffect(() => {

    if (data[0] !== undefined) {

      getColasRuleByEmpresa(data[0].u_id_empresa, setDatos)
    }

  }, [data])



  useEffect(() => {
    dispatch(getColasRulesAction(datos))
  }, [dispatch, setDatos, datos])

  //PDF
  useEffect(() => {

    if (colasRules !== undefined) {
      setDataToBeDownloaded({
        data: colasRules.map(d => [
          d.rule_id,
          d.rule_name, d.time, d.max_penalty, d.min_penalty, d.e_nombre_completo,d.raise_penalty
        ]), titulo: 'Newbound- Listado de Reglas De Colas', orientacion: 'portrait', headers: ["ID Regla", "Nombre De Regla", 
        "Tiempo", "Penalidad Maxima", "Penalidad Minima", "Empresa", "Elevar Penalidad"],
        fileName: 'Reglas De Colas'
      })

    }

  }, [colasRules])

console.log(colasRules);
  //Excel
  useEffect(() => {

    setExcel((prevFormValues) => ({ data: [], }));

    if (colasRules !== undefined) {


      colasRules.map(cola => {

        setExcel((prevFormValues) => ({
          data: [
            ...prevFormValues.data,
            {
              rule_id: cola.rule_id,
              Nombre_De_Regla: cola.rule_name,
              TIEMPO: cola.time,
              Penalidad_Maxima: cola.max_penalty,
              Penalidad_Minima: cola.min_penalty,
              Empresa: cola.e_nombre_completo,
              raise_penalty: cola.raise_penalty,

            },
          ],
        }));
      })

    }
  }, [colasRules])



  useGuardaExcel(excel.data)

  const colasRulesData = useMemo(() => {

    let computedColasRulesData = colasRules;

    if (colasRules !== undefined) {

      setTotalItems(computedColasRulesData.length)
      //Current Page slice
      return computedColasRulesData.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
      );
    }

  }, [colasRules, currentPage, ITEMS_PER_PAGE, setTotalItems])

  var colas = []

  if (colasRules !== undefined) {
    var hash = {};
    colas = colasRulesData.filter(function (current) {
      var exists = !hash[current.rule_name];
      hash[current.rule_name] = true;
      return exists;
    });

    //console.log(colas);
  }


  return (
    <>
      {
        colasRules !== undefined
        &&
        colas.map((cola) => (
           //console.log(cola)
          <ColasRulesRows key={cola.rule_name} cola={cola} />

        ))}
    </>
  )
}

const mapStateToProps = state => {
  return {
    dataToBeDownloaded: state.downloadble.dataToBeDownloaded
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setDataToBeDownloaded: (data) => {
      dispatch({ type: downloadPdf(), payload: data })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ColasRulesLista);