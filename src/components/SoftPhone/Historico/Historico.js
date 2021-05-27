import {historicoUI} from "../../../lib/softphoneHelpers";

function Historico({ historicos, sip, handleHistorico }) {


  return (
    <div id="history">
      <div className="header">Historico</div>
      <ul>
          {historicoUI(historicos, sip, handleHistorico)}
      </ul>
    </div>
  );
}

export default Historico;
