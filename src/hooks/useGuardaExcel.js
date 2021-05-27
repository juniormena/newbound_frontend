import { useDispatch } from "react-redux";
import { GuardarExcelFunction } from "../redux/actions/guardarExcelActions";
import { useEffect } from "react";

export function useGuardaExcel(datos) {
   
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(GuardarExcelFunction(datos));
    }, [dispatch,datos]);

}

