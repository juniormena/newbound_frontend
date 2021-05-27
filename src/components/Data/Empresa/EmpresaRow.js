
import { Link } from "react-router-dom";
import TooltipComponent from "../../Toolttip/TooltipComponent";


function EmpresaRow({ empresa }) {
  return (
    <>
      <tr>
        <td>{empresa.e_nombre_completo}</td>
        <td>{empresa.e_rnc}</td>
        <td>{empresa.e_rango_extension}</td>
        <td>{empresa.e_contexto}</td>
        
          <td className="text-right">
          <TooltipComponent text="Editar" >
            <Link
              to={`/administracion/empresa/edit/${empresa.e_id}`}
              className="btn btn-primary"
            >
              <i className="fa fa-edit"></i>
            </Link>
            </TooltipComponent>
          </td>
       
      </tr>
    </>
  );
}

export default EmpresaRow;
