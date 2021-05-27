
import { useState, useEffect } from 'react'
import { ColasDescriptions } from '../../../lib/ColasHelper'
import { getColasRuleByEmpresa } from '../../../services/ColasRulesService'
import TooltipComponent from '../../Toolttip/TooltipComponent'

function OpcionesAgentesTab({ formValues, setformValues, empresa }) {
    const { autopause, autopausedelay, autopausebusy, autopauseunavail, reportholdtime, ringinuse, memberdelay, defaultrule } = formValues

    const [colasRules, setColasRules] = useState([])


    useEffect(() => {

        if (empresa !== 0) {
            getColasRuleByEmpresa(empresa, setColasRules)
        }

    }, [empresa])

    var colas = []

    if (colasRules !== undefined) {
        var hash = {};
        colas = colasRules.filter(function (current) {
            var exists = !hash[current.rule_name];
            hash[current.rule_name] = true;
            return exists;
        });

        
    }




    return (
        <div className="tab-pane active" id="formAgentes" role="tabpanel">

            <span className="text-danger ml-1 py-2 card-body row ">Campos con * son requeridos</span>

            <div className="card-body row">
                <div className="col-md-6">
                    <label htmlFor="autopause" className="font-weight-bold text-uppercase">Auto Pausa * </label>
                    <TooltipComponent text={ColasDescriptions.autopause} placement='bottom'>
                        <i class="fas fa-question-circle ml-2"></i>
                    </TooltipComponent>
                    <select
                        value={autopause}
                        onChange={(e) => setformValues({ ...formValues, autopause: e.target.value })}
                        className="custom-select mb-2"
                        defaultValue=""
                    >
                        <option hidden value="">Seleccione una Opcion</option>
                        <option value="yes">Si</option>
                        <option value="no">No</option>
                        <option value="all">Todo</option>
                    </select>

                    <label htmlFor="autopausedelay" className="font-weight-bold text-uppercase">Retraso Auto Pausa * </label>
                    <TooltipComponent text={ColasDescriptions.autopausedelay} >
                        <i class="fas fa-question-circle ml-2"></i>
                    </TooltipComponent>
                    <input
                        min="0"
                        type="number"
                        value={autopausedelay}
                        className="form-control mb-2"
                        onChange={(e) =>
                            setformValues({ ...formValues, autopausedelay: Number(e.target.value) })
                        }
                    />

                    <label htmlFor="autopausebusy" className="font-weight-bold text-uppercase">Auto Pausa Ocupado </label>
                    <TooltipComponent text={ColasDescriptions.autopausebusy} >
                        <i class="fas fa-question-circle ml-2"></i>
                    </TooltipComponent>
                    <select
                        value={autopausebusy}
                        onChange={(e) => setformValues({ ...formValues, autopausebusy: e.target.value })}
                        className="custom-select mb-2"
                        defaultValue=""
                    >
                        <option hidden value="">Seleccione una Opcion</option>
                        <option value="yes">Si</option>
                        <option value="no">No</option>
                    </select>

                    <label htmlFor="autopauseunavail" className="font-weight-bold text-uppercase">
                        Auto Pausa No Disponible
                        <TooltipComponent text={ColasDescriptions.autopauseunavail} >
                            <i class="fas fa-question-circle ml-2"></i>
                        </TooltipComponent>
                    </label>

                    <select
                        value={autopauseunavail}
                        onChange={(e) => setformValues({ ...formValues, autopauseunavail: e.target.value })}
                        className="custom-select mb-2"
                        defaultValue=""
                    >
                        <option hidden value="">Seleccione una Opcion</option>
                        <option value="yes">Si</option>
                        <option value="no">No</option>
                    </select>


                </div>

                {/* Segundo Row */}
                <div className="col-md-6">
                    <label htmlFor="reportholdtime" className="font-weight-bold text-uppercase">
                        Reportar tiempo espera
                        <TooltipComponent text={ColasDescriptions.reportholdtime} >
                            <i class="fas fa-question-circle ml-2"></i>
                        </TooltipComponent>
                    </label>

                    <select
                        value={reportholdtime}
                        onChange={(e) => setformValues({ ...formValues, reportholdtime: e.target.value })}
                        className="custom-select mb-2"
                        defaultValue=""
                    >
                        <option hidden value="">Seleccione una Opcion</option>
                        <option value="yes">Si</option>
                        <option value="no">No</option>
                    </select>

                    <label htmlFor="ringinuse" className="font-weight-bold text-uppercase">Tono en Uso</label>
                    <TooltipComponent text={ColasDescriptions.ringinuse} >
                        <i class="fas fa-question-circle ml-2"></i>
                    </TooltipComponent>
                    <select
                        value={ringinuse}
                        onChange={(e) => setformValues({ ...formValues, ringinuse: e.target.value })}
                        className="custom-select mb-2"
                        defaultValue=""
                    >
                        <option hidden value="">Seleccione una Opcion</option>
                        <option value="yes">Si</option>
                        <option value="no">No</option>
                    </select>


                    <label htmlFor="memberdelay" className="font-weight-bold text-uppercase">Delay de Conexión</label>
                    <TooltipComponent text={ColasDescriptions.memberdelay} >
                        <i class="fas fa-question-circle ml-2"></i>
                    </TooltipComponent>
                    <input
                        min="0"
                        type="number"
                        value={memberdelay}
                        className="form-control mb-2"
                        onChange={(e) =>
                            setformValues({ ...formValues, memberdelay: Number(e.target.value) })
                        }
                    />

                    <label htmlFor="musiconHold" className="font-weight-bold text-uppercase">Reglas de cola </label>
                    <TooltipComponent text={ColasDescriptions.rules}>
                        <i class="fas fa-question-circle ml-2"></i>
                    </TooltipComponent>
                    <select
                        //disabled
                        required

                        value={defaultrule}
                        onChange={(e) => setformValues({ ...formValues, defaultrule: e.target.value })}
                        className="custom-select mb-2"
                        defaultValue=""
                    >
                        {
                            colas.map((rule) => (
                                <>
                                    <option hidden value="">
                                        Seleccione una Opcion
                    </option>
                                    {<option key={rule.rule_name} value={rule.rule_name}>
                                        {rule.rule_name}
                                    </option>

                                    }

                                </>
                            ))}
                    </select>

                </div>
            </div>
        </div>
    )
}

export default OpcionesAgentesTab
