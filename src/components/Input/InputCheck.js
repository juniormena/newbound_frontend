function InputCheck({ titulo, children }) {
  return (
    <div className="input-group mb-3">
      <div className="input-group-append">
        <div className="input-group-text">{children}</div>
      </div>
      <input
        type="text"
        className="form-control"
        placeholder={titulo}
        aria-label="Text input with checkbox"
        disabled={true}
      />
    </div>
  );
}

export default InputCheck;