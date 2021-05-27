import {useEffect, useState} from "react";
import Pagination from "react-bootstrap/Pagination";

function PaginationComponent({
  total,
  itemsPerPage = 5,
  currentPage,
  onPageChange,
  limit = 9,
  show = true
}) {
  let [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (total > 0 && itemsPerPage > 0) {
      setTotalPages(Math.ceil(total / itemsPerPage));
    }
  }, [total, itemsPerPage]);

  function goToSpecPage(e){
    let { value } = e.target;

    if(isNaN(value)){
      onPageChange(1);
    }
    else if(Number(value) > totalPages){
      onPageChange(1);
    }
    else if(Number(value) === 0){
      onPageChange(1);
    }
    else{
      onPageChange(Number(value))
    }
  }


 if (total === 0) {
    return (
      <h5 className="d-flex justify-content-center">
        No hay Datos Disponibles
      </h5>
    );
  }

  return (
    <Pagination size="sm">
      <Pagination.Prev
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />
      <Pagination.Item disabled={true}>{currentPage}</Pagination.Item>
      <Pagination.Item disabled={true}>{'DE'}</Pagination.Item>
      <Pagination.Item disabled={true}>{totalPages}</Pagination.Item>
      <Pagination.Next
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
      <div className="center">
      <div className="input-group input-group-sm ml-1">
        <div className="input-group-prepend">
          <span className="input-group-text">Ir a página</span>
        </div>
        <input
            className="text-dark"
            type="number"
            min={1}
            max={totalPages}
            onChange={goToSpecPage}
        />
      </div>
      </div>
    </Pagination>
  );
}

export default PaginationComponent;
