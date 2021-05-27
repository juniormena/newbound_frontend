import { useState } from "react";

function SearchTableComponent({ onSearch }) {
  const [search, setSearch] = useState("");
  function onInputChange(value) {
    setSearch(value);
    onSearch(value);
  }
  return (
    <div className="col-md-4">
      <input
        type="text"
        className="form-control"
        placeholder="Buscar"
        value={search}
        onChange={(e) => onInputChange(e.target.value)}
      />
    </div>
  );
}

export default SearchTableComponent;
