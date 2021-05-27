import { useEffect } from "react";
import moment from "moment";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-daterangepicker/daterangepicker.css";

// expose jQuery to window for debugging
const DateRangePickert = ({
  onChangeDateRange,
  data,
  startName = "start",
  endName = "end",
}) => {
  let start = data.periodoDesde;
  let end = data.periodoHasta;
  const label = start.format("MMMM D, YYYY") + " - " + end.format("MMMM D, YYYY");

  useEffect(function(){
      let ranges = document.getElementsByClassName("ranges");
      let cancelBtn = document.querySelector(".cancelBtn");
      let  applyBtn = document.querySelector(".applyBtn");

      cancelBtn.innerText = "Cancelar";
      applyBtn.innerText = "Aceptar";
      ranges[0].children[0].lastChild.innerText = "Personalizado";

  },[])

  return (
    <DateRangePicker
    className="datePicker"
      initialSettings={{
        startDate: start.toDate(),
        endDate: end.toDate(),
        ranges: {
          "Hoy": [moment().toDate(), moment().toDate()],
          "Ayer": [
            moment().subtract(1, "days").toDate(),
            moment().subtract(1, "days").toDate(),
          ],
          "Ultimo  7 Dias": [
            moment().subtract(6, "days").toDate(),
            moment().toDate(),
          ],
          "Ultimo 30 Dias": [
            moment().subtract(29, "days").toDate(),
            moment().toDate(),
          ],
          "Mes actual": [
            moment().startOf("month").toDate(),
            moment().endOf("month").toDate(),
          ],
          "Ultimo Mes": [
            moment().subtract(1, "month").startOf("month").toDate(),
            moment().subtract(1, "month").endOf("month").toDate(),
          ],
            "Inicio a&ntilde;o": [
                moment().startOf("year").toDate(),
                moment().toDate(),
            ],
        },
      }}
      onCallback={onChangeDateRange}
    >
        <div
            className=" form-control"
            style={{
                background: "#fff",
                cursor: "pointer",
                padding: "5px 10px",
                border: "1px solid #ccc",
                width: "100%",
            }}
        >
            <i className="fa fa-calendar"/>&nbsp;
            <span>{label}</span> <i className="fa fa-caret-down"/>
        </div>
    </DateRangePicker>
  );
};

export default DateRangePickert;
