export function useDepartamentos(departamentos){
    const optionsDepartamentos =  departamentos.map(departamento=>
        <option key={departamento.ds_id} value={departamento.ds_id}>{departamento.ds_descripcion}</option>
    );

    return optionsDepartamentos
}