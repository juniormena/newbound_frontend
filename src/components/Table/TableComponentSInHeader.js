import { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import {
  FaDownload,
  FaFileExcel,
  FaFilePdf,
  FaPlus,
  FaUpload,
} from "react-icons/fa";
import PaginationComponent from "./Pagination/PaginationComponent";
import HeaderTableComponent from "./HeaderTable/HeaderTableComponent";
import SearchTableComponent from "./SearchTable/SearchTableComponent";
import {
  descargarExcel,
  downloadPDF,
  importarExcelEjemplo,
  importExcel,
} from "../../lib/exportHelpers";
import { useSelector } from "react-redux";
import newboundLogo from "../../assets/images/newboundLogo.png";
import { toast } from "react-toastify";
import TooltipComponent from "./../Toolttip/TooltipComponent";
import {
  importContactos,
  importContactosSuperusuario,
} from "../../services/ContactosService";
function TableComponent({
  title,
  handleShow,
  columns,
  showSearch = true,
  showAddButton = true,
  showExportPdf = true,
  showExportExcel = true,
  showImportExcel = false,
  showExtraButton = '',

  children,
  dataToBeDownloaded,
  currentUser,
  headerFontSize,
  includeTables,
}) {
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [sorting, setSorting] = useState({ field: "", order: "" });
  const ITEMS_PER_PAGE = 12;

  const fileRef = useRef();
  const [file, setFile] = useState([]);
  const { u_id_empresa, u_usuario, is_superuser } = useSelector(
    (state) => state.user.currentUser.userLogin.data[0]
  );

  useEffect(() => {
    if (fileRef.current?.files[0] !== undefined) {
      if (is_superuser === "1") {
        importContactosSuperusuario(file, u_id_empresa, u_usuario);
      } else {
        importContactos(file, u_id_empresa, u_usuario);
      }
    }
  }, [file, u_id_empresa, u_usuario]);

  const handleImportExcel = () => {
    if (fileRef.current?.files[0] !== undefined) {
      importExcel(fileRef.current.files[0], setFile);
    }
  };

  const handelDescargarImportEjemplo = () => {
    let data = [
      {
        Nombre: "",
        Empresa: "",
        Cargo: "",
        Telefono: "",
        Flota: "",
      },
    ];
    importarExcelEjemplo("Ejemplo de Importacion", data);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const { datos } = useSelector((state) => state.guardarExcel);

  //console.log(datos)

  const handelDescargarExcel = () => {
    //descargarExcel(title,datos)

    if (datos !== undefined && datos.length !== 0) {
      descargarExcel(title, datos, columns);
    } else {
      toast.error("No Hay datos en la tabla", {
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <div className="main-card  card ">
        <div className="card-header pt-2 pb-2 ">
          {/*     {title} */}
          {showSearch && (
            <SearchTableComponent
              onSearch={(value) => {
                setSearchText(value);
                setCurrentPage(1);
              }}
            />
          )}

          <div className="btn-actions-pane-right">
            {showExportPdf && (
              <TooltipComponent text="Descargar en pdf">
                <Button
                  className="mr-2 bg-danger border-danger"
                  onClick={() =>
                    downloadPDF(
                      dataToBeDownloaded,
                      currentUser,
                      newboundLogo,
                      includeTables
                    )
                  }
                >
                  <FaFilePdf />
                </Button>
              </TooltipComponent>
            )}

            {showImportExcel && (
              <TooltipComponent text="Descargar Ejemplo Del documento de  Importacion">
                <Button
                  className="mr-2 btn-info"
                  onClick={handelDescargarImportEjemplo}
                >
                  <FaDownload />
                </Button>
              </TooltipComponent>
            )}
            {showImportExcel && (
              <TooltipComponent text="Importar excel">
                <label class="btn btn-secondary mt-2 mr-2">
                  <FaDownload />
                  <input
                    type="file"
                    hidden
                    ref={fileRef}
                    accept=".xls,.xlsx"
                    onChange={handleImportExcel}
                  />
                </label>
              </TooltipComponent>
            )}

            {showExportExcel && (
              <TooltipComponent text="Descargar en excel">
                <Button
                  className="mr-2 btn-success"
                  onClick={handelDescargarExcel}
                >
                  <FaFileExcel />
                </Button>
              </TooltipComponent>
            )}

            {showAddButton && (
              <TooltipComponent text="Crear">
                <Button variant="primary" onClick={handleShow}>
                  <FaPlus />
                </Button>
              </TooltipComponent>
            )}

           {/*  {showExtraButton  && (
              <TooltipComponent text="Crear">
                <Button variant="primary" onClick={handleShow}>
                  <FaPlus />
                </Button>
              </TooltipComponent>
            )} */}
          </div>
        </div>
        {/*    <div className="table-responsive table-responsive--font-size-normal p-2 "> */}
        <Table striped borderless hover responsive className="text-center">
          <HeaderTableComponent
            headerFontSize={headerFontSize}
            columns={columns}
            onSorting={(field, order) => setSorting({ field, order })}
          />
          <tbody>
            {children(
              currentPage,
              ITEMS_PER_PAGE,
              setTotalItems,
              sorting,
              searchText,
              setCurrentPage
            )}
          </tbody>
        </Table>
        <PaginationComponent
          total={totalItems}
          itemsPerPage={ITEMS_PER_PAGE}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          show={totalItems.length > 0 ? true : false}
        />
        {/*  </div> */}
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    dataToBeDownloaded: state.downloadble.dataToBeDownloaded,
    currentUser: state.user.currentUser.userLogin.data[0],
  };
};

export default connect(mapStateToProps)(TableComponent);
