import { useState, useEffect } from "react";
import { useSelector, connect } from "react-redux";
import { useGuardaExcel } from "../../hooks/useGuardaExcel";
import { downloadPdf } from "../../redux/actions/downloadbleActions";
import { formatDate2, setHoraMinutosSegundos } from "../../lib/dateHelpers";
import moment from "moment";
import LlamadasAbandonadasRow from "./LlamadasAbandonadasRow";

function LlamadasAbandonadasList({
  currentPage,
  ITEMS_PER_PAGE,
  setTotalItems,
  sorting,
  setCurrentPage,
  setDataToBeDownloaded

}) {

  //console.log(resumenData)

  const [excel, setExcel] = useState({ data: [] })

  const { llamadasAbandonadas } = useSelector(state => state.llamadasAbandonadas)

  const [AbandonadasDatos, setAbandonadasDatos] = useState([])

console.log(AbandonadasDatos);
  //useEffect Excel

  useEffect(() => {
    

    if (llamadasAbandonadas !== undefined) {
      llamadasAbandonadas.map(abandonadas => {

        setExcel((prevFormValues) => ({
          data: [
            ...prevFormValues.data,
            {
              "Fecha": formatDate2(abandonadas.fecha),
              "Cola": abandonadas.cola,
              "0": abandonadas[0],
              "1": abandonadas[1],
              "2": abandonadas[2],
              "3": abandonadas[3],
              "4": abandonadas[4],
              "5": abandonadas[5],
              "6": abandonadas[6],
              "7": abandonadas[7],
              "8": abandonadas[8],
              "9": abandonadas[9],
              "10": abandonadas[10],
              "11": abandonadas[11],
              "12": abandonadas[12],
              "13": abandonadas[13],
              "14": abandonadas[14],
              "15": abandonadas[15],
              "16": abandonadas[16],
              "17": abandonadas[17],
              "18": abandonadas[18],
              "19": abandonadas[19],
              "20": abandonadas[20],
              "21": abandonadas[21],
              "22": abandonadas[22],
              "23": abandonadas[23],

            }
          ]

        }))

      })
    }

  }, [llamadasAbandonadas])


  useGuardaExcel(excel.data)

  //useEffect PDF

  useEffect(() => {
    if (llamadasAbandonadas !== undefined) {

      setDataToBeDownloaded({
        data: llamadasAbandonadas.map(abandonadas => [

          formatDate2(abandonadas.fecha),
          abandonadas.cola,
          abandonadas[0],
          abandonadas[1],
          abandonadas[2],
          abandonadas[3],
          abandonadas[4],
          abandonadas[5],
          abandonadas[6],
          abandonadas[7],
          abandonadas[8],
          abandonadas[9],
          abandonadas[10],
          abandonadas[11],
          abandonadas[12],
          abandonadas[13],
          abandonadas[14],
          abandonadas[15],
          abandonadas[16],
          abandonadas[17],
          abandonadas[18],
          abandonadas[19],
          abandonadas[20],
          abandonadas[21],
          abandonadas[22],
          abandonadas[23],


        ]), titulo: 'Llamadas Abandonadas',
        orientacion: "landscape",
        headers: [
         "Fecha",
         "Cola",
          "0",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
        ],
        fileName: 'Llamadas Abandonadas'
      })

    }

  }, [llamadasAbandonadas, setDataToBeDownloaded])



  useEffect(() => {
    const datos = abandonadasData()

    setAbandonadasDatos(datos)

  }, [llamadasAbandonadas, setTotalItems, currentPage, ITEMS_PER_PAGE])


  useEffect(() => {
    setCurrentPage(1)
  }, [llamadasAbandonadas, setCurrentPage])



  let abandonadasData = () => {

    let computedData = llamadasAbandonadas

    if (computedData !== undefined) {
      setTotalItems(computedData.length)

      return computedData.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
      );
    }
    else {
      setTotalItems(0)
    }
  }


  return (
    <>

      {
        AbandonadasDatos !== undefined
        &&
        AbandonadasDatos.map((LlamadasA,index) => (
          <LlamadasAbandonadasRow LLamadasA={LlamadasA} key={index+1}/>)
        )
      }
    </>
  );
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


export default connect(mapStateToProps, mapDispatchToProps)(LlamadasAbandonadasList);