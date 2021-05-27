export function useUsuarios(usuarios){
    const optionsUsuarios =  usuarios.map(usuario=>
        <option key={usuario.u_id} value={usuario.u_id}>{usuario.u_usuario}</option>
    );

    return optionsUsuarios;
}