import { formatDate2} from '../../lib/dateHelpers';

function LlamadasAbandonadasRow({ LLamadasA}) {



let {fecha,cola}= LLamadasA

  return (
    <>
      <tr style={{fontSize:"12px"}}>
       <td >{formatDate2(fecha)}</td>
       <td >{cola}</td>
       <td >{LLamadasA[0]}</td>
       <td >{LLamadasA[1]}</td>
       <td >{LLamadasA[2]}</td>
       <td >{LLamadasA[3]}</td>
       <td >{LLamadasA[4]}</td>
       <td >{LLamadasA[5]}</td>
       <td >{LLamadasA[6]}</td>
       <td >{LLamadasA[7]}</td>
       <td >{LLamadasA[8]}</td>
       <td >{LLamadasA[9]}</td>
       <td >{LLamadasA[10]}</td>
       <td >{LLamadasA[11]}</td>
       <td >{LLamadasA[12]}</td>
       <td >{LLamadasA[13]}</td>
       <td >{LLamadasA[14]}</td>
       <td >{LLamadasA[15]}</td>
       <td >{LLamadasA[16]}</td>
       <td >{LLamadasA[17]}</td>
       <td >{LLamadasA[18]}</td>
       <td >{LLamadasA[19]}</td>
       <td >{LLamadasA[20]}</td>
       <td >{LLamadasA[21]}</td>
       <td >{LLamadasA[22]}</td>
       <td >{LLamadasA[23]}</td>
      </tr>
    </>
  );
}

export default LlamadasAbandonadasRow;
