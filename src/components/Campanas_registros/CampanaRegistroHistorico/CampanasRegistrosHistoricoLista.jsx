
import { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useGuardaExcel } from '../../../hooks/useGuardaExcel';


import { connect } from 'react-redux';
import { downloadPdf } from '../../../redux/actions/downloadbleActions';
//import CampanasRows from './CampanasRows';

import { getCampanaHistorico } from '../../../services/campanasService';
import CampanasRegistrosHistoricoRows from './CampanasRegistrosHistoricoRows';


function CampanasRegistrosHistoricoLista({ currentPage,
  ITEMS_PER_PAGE, setTotalItems,
 campanaInfo, columns }) {
  const [registrosHistorico, setRegistrosHistorico] = useState([])
  const [excel, setExcel] = useState({
    data: []
  })

  console.log(campanaInfo);
  const { CampanaRegistroData } = useSelector(state => state.campanas)




  useEffect(() => {
    getCampanaHistorico(campanaInfo, setRegistrosHistorico)
  }, [])


    const campanaRegistroLogsMemo = useMemo(() => {
  
      let computedData = registrosHistorico
  
      //console.log(computedData);
  
      if (CampanaRegistroData!== undefined) {
      
        setTotalItems(computedData.length)
        
        return computedData.slice(
          (currentPage - 1) * ITEMS_PER_PAGE,
          (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
        );
      }
  
    }, [registrosHistorico, currentPage, ITEMS_PER_PAGE, setTotalItems])
  
/*    console.log(campanaRegistroLogsMemo ); */

  return (
    <>
      {
       registrosHistorico!== undefined
        &&
        campanaRegistroLogsMemo.map((logs) => (
          <CampanasRegistrosHistoricoRows key={campanaRegistroLogsMemo.id} logs={logs} columns={columns}/>
        ))
      }
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

export default connect(mapStateToProps, mapDispatchToProps)(CampanasRegistrosHistoricoLista);