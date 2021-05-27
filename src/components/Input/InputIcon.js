import React from "react";

function InputIcon({ titulo, icon, children, labelClass }) {
  return (
    <div className="form-group">
      <label
        className={labelClass ? labelClass : ""}
      >
        {titulo}:
      </label>
      <div className="input-group">
        <span className="input-group-prepend">
          <span className="input-group-text">
            <i className={`fa ${icon}`} aria-hidden="true"></i>
          </span>
        </span>
        {children}
      </div>
    </div>
  );
}

export default InputIcon;
