import { useEffect } from "react";
import { useMemo } from "react";
import { useGuardaExcel } from "../../../hooks/useGuardaExcel";
import LlamadaRow from "./LlamadaRow";


function LlamadasList({
  currentPage,
  ITEMS_PER_PAGE,
  setTotalItems,
  sorting,
  searchText,
  llamadas,
  setCurrentPage

}) {

  useEffect(() => {
    setCurrentPage(1)
  }, [llamadas,setCurrentPage])
  const llamadasData = useMemo(() => {
    let computedLlamadas = llamadas;

    //searching
    if (searchText) {
      //console.log(searchText)
      computedLlamadas = llamadas.filter(
        (llamada) =>
          llamada.duration
            .toLowerCase()
            .includes(searchText.toLowerCase().trim()) ||
          llamada.dbcontext
            .toLowerCase()
            .includes(searchText.toLowerCase().trim())
      );

      //console.log('filter', empresasDar)
    }
   
    //sorting
    if (sorting.field) {
      try {
        const reversed = sorting.order === "asc" ? 1 : -1;
        computedLlamadas = llamadas.sort(
          (a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field])
        );
      } catch (err) {}
    }

    setTotalItems(computedLlamadas.length);

    //Current Page slice
    return computedLlamadas.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [
    llamadas,
    currentPage,
    searchText,
    sorting,
    ITEMS_PER_PAGE,
    setTotalItems,
  ]);



  return (
    <>
      {llamadasData.map((llamada) => (
        <LlamadaRow key={llamada.idllamada} llamada={llamada} />
      ))}
    </>
  );
}


export default LlamadasList;