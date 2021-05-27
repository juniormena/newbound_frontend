import { Link } from "react-router-dom";
import TooltipComponent from "../../Toolttip/TooltipComponent";

function DepartamentoRow({ departamento }) {
  return (
    <>
      <tr>
        <td>{departamento.ds_descripcion}</td>
        <td>{departamento.e_nombre_completo}</td>
        <td>{departamento.se_descripcion}</td>
        <td className="text-right">
          <TooltipComponent text="Editar">
            <Link
              to={`/administracion/departamento/edit/${departamento.ds_id}`}
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

export default DepartamentoRow;
