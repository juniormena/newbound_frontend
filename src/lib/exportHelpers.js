import { toast } from "react-toastify";

//Excel
import XLSX from "xlsx";
import { saveAs } from "file-saver";

//PDF
import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";


export const importExcel = (selectedFile, setFile) => {
   
  let data = [
    {
      name: "jayanth",
      data: "scd",
      abc: "sdef",
    },
  ];

  var datos=0

  

  XLSX.utils.json_to_sheet(data, "out.xlsx");
  if (selectedFile) {
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedFile);
    fileReader.onload = (event) => {
      let data = event.target.result;
      let workbook = XLSX.read(data, { type: "binary" });

      workbook.SheetNames.forEach((sheet) => {
        let rowObject = XLSX.utils.sheet_to_row_object_array(
          workbook.Sheets[sheet]
        );
       return datos=rowObject
      });

     setFile(datos)
    };
    
  }

};

export const importarExcelEjemplo = (sheetNames,data,columns) => {
  function s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  }

  var workbook = XLSX.utils.book_new();
  workbook.SheetNames.push(sheetNames);

  var workshet = XLSX.utils.json_to_sheet(data);

  workbook.Sheets[sheetNames] = workshet;

  var wbout = XLSX.write(workbook, {
    bookType: "xls",
    bookSST: true,
    type: "binary",
  });

  saveAs(
    new Blob([s2ab(wbout)], { type: "application/octet-stream" }),
    sheetNames + "_" + Date.now() + ".xls"
  );
};


export const descargarExcel = (sheetNames, data, columns) => {
  function s2ab(s) {
    let buf = new ArrayBuffer(s.length);
    let view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  }

  let workbook = XLSX.utils.book_new();
  workbook.SheetNames.push(sheetNames);

  let workshet = XLSX.utils.json_to_sheet(data);

  workbook.Sheets[sheetNames] = workshet;

  let wbout = XLSX.write(workbook, {
    bookType: "xls",
    bookSST: true,
    type: "binary",
  });

  saveAs(
    new Blob([s2ab(wbout)], { type: "application/octet-stream" }),
    sheetNames + "_" + Date.now() + ".xls"
  );
};

export function downloadPDF(
  dataToBeDownloaded,
  currentUser,
  newboundLogo,
  includeTables
) {
  let {
    data,
    titulo,
    orientacion,
    headers,
    fileName,
    extraData,
    LlamadasTotalesData,
  } = dataToBeDownloaded;

  try {
    if (data !== undefined && data.length !== 0) {
      if (includeTables === undefined) {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        let textX = 39;
        let textY = 35;
        let usuarioX = 480;
        let usuarioY = 810;
        let fechaX = 480;
        let fechaY = 825;
        let imageX = 485;
        let imageY = 10;
        let imageWidth = 70;
        let imageHeight = 30;
        const doc = new jsPDF(orientacion, unit, size);

        const title = titulo;
        doc.setFontSize(15);
        const headers1 = [headers];
        let content = {
          startY: 50,
          head: headers1,
          body: data,
          styles: {
            fontSize: 9,
          },
        };
        if (orientacion === "landscape") {
          imageX = 733;
          usuarioX = 715;
          usuarioY = 570;
          fechaX = 715;
          fechaY = 585;
        }
        doc.text(title, textX, textY);

        //User name and Date
        doc.setFontSize(8);
        doc.text(`Generado Por ${currentUser.u_usuario}`, usuarioX, usuarioY);
        doc.text(`Fecha: ${moment(Date()).format("L")}`, fechaX, fechaY);

        doc.addImage(
          newboundLogo,
          "PNG",
          imageX,
          imageY,
          imageWidth,
          imageHeight
        );

        doc.autoTable(content);
        //doc.addImage("../../assets/images/logo.png", "png", 10, 10, 20, 20);
        doc.save(`${fileName}.pdf`);
      } else {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        let textX = 39;
        let textY = 110;
        let usuarioX = 480;
        let usuarioY = 810;
        let fechaX = 480;
        let fechaY = 825;
        let imageX = 485;
        let imageY = 10;
        let imageWidth = 70;
        let imageHeight = 30;
        const doc = new jsPDF(orientacion, unit, size);

        const title = titulo;
        doc.setFontSize(15);

        const headers1 = [headers];

        let content = {
          startY: 600,
          head: headers1,
          body: data,
          styles: {
            fontSize: 8,
          },
        };

        let content2 = {
          theme: "grid",
          startY: 130,
          tableWidth: 300,
          body: extraData,
          styles: {
            fontSize: 13,
            marginLeft: 900,
          },
        };

        let content3 = {
          theme: "grid",
          margin: { left: 400 },
          startY: 130,
          tableWidth: 300,
          body: LlamadasTotalesData,
          styles: {
            fontSize: 13,
          },
        };

        if (orientacion === "landscape") {
          imageX = 733;
          usuarioX = 715;
          usuarioY = 570;
          fechaX = 715;
          fechaY = 585;
        }
        doc.text(title, textX, textY);
        doc.text("LlamadasTotales", 400, 110);
        //User name and Date
        doc.setFontSize(9);
        doc.text(`Generado Por ${currentUser.u_usuario}`, usuarioX, usuarioY);
        doc.text(`Fecha: ${moment(Date()).format("L")}`, fechaX, fechaY);

        doc.addImage(
          newboundLogo,
          "PNG",
          imageX,
          imageY,
          imageWidth,
          imageHeight
        );

        doc.autoTable(content2);
        doc.autoTable(content3);
        doc.autoTable(content);
        doc.save(`${fileName}.pdf`);
      }
    } else {
      toast.error("No Hay datos en la tabla", {
        autoClose: 3000,
      });
    }
  } catch (err) {}
}
