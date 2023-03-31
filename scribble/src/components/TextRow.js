import React from "react";

const TextRow = ({ type, name, value, labelText }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {name}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        className="form-input"
        disabled={true}
      />
    </div>
  );
};

export default TextRow;
