import React from "react";

const FormRowSelect = ({ name, value, handleChange, options, labeltext }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labeltext || name}
      </label>
      <select
        name={name}
        id={name}
        value={value}
        onChange={handleChange}
        className="form-select"
      >
        {options.map((option, index) => {
          return (
            <option key={index} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormRowSelect;
