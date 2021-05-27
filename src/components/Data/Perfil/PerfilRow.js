

function PerfilRow({ perfil, setPerfilid,perfilid }) {
    return (
        <tr className={`make-a-pointer ${perfil.p_id === perfilid.Id  ? 'tr-selected text-white' : ''}`} onClick={()=>{setPerfilid({Id:perfil.p_id})}}>
            <td>{perfil.p_descripcion}</td>
        </tr>
    )
}

export default PerfilRow;
