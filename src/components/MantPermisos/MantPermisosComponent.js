import { handleChangeInput } from './../../lib/helpers';
import { useEmpresas } from './../../hooks/useEmpresas';

function MantPermisosComponent({ empresas, empresaid, setEmpresaid }) {

    
    const optionsEmpresas =  useEmpresas(empresas);

    /*console.log('sucursales', sucursales)*/
    return (
        <div className="card">
            <h5 className="card-header base-background-gradient text-uppercase text-white">Mantenimientos permisos</h5>
              <div className="card-body">
                <form>
                  <div className="form-row">

                    <div className="form-group col">
                        <label className="font-weight-bold text-uppercase">Empresa</label>
                        <select className="custom-select" required value={empresaid.Id} onChange={(e)=>handleChangeInput(e,'Id',empresaid, setEmpresaid)}>
                        {empresas.length===0 ? <option>no hay empresas</option> : 
                          <><option value={0}>Selecciona...</option> 
                          {optionsEmpresas}</>
                        }
                        </select>
                    </div>

                </div>
              </form>
            </div>
        </div>
    )
}

export default MantPermisosComponent;