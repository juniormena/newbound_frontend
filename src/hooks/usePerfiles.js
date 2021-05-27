export function usePerfiles(perfiles){
    const optionsPerfiles =  perfiles.map(perfil=>
        <option key={perfil.p_id} value={perfil.p_id}>{perfil.p_descripcion}</option>
    );

    return optionsPerfiles
}