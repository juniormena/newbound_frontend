export function useCampanaEstado(campanasEstado){
    const optionsCampanasEstado =  campanasEstado.map(camEstado=>
        <option key={camEstado.id} value={camEstado.cod_estado}>{camEstado.nombre}</option>
    );

    return optionsCampanasEstado;
}