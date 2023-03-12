import React from "react";

const FormSelectRow = ({
  type,
  name,
  value,
  handleChange,
  options,
  labelText,
}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {name}
      </label>
      <select
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        className="form-input"
      >
        {options.forEach((option) => {
          return <option value={option}>{option}</option>;
        })}
      </select>
    </div>
  );
};

export default FormSelectRow;
