export function useSucursales(sucursales){
    const optionsSucursales =  sucursales.map(sucursal=>
        <option key={sucursal.se_id} value={sucursal.se_id}>{sucursal.se_descripcion}</option>
    );

    return optionsSucursales;
}