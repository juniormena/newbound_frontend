export function useEmpresas(empresas){
    const optionsEmpresas =  empresas.map(empresa=>
        <option key={empresa.e_id} value={empresa.e_id}>{empresa.e_nombre_completo}</option>
    );

    return optionsEmpresas;
}