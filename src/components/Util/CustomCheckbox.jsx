import React from "react";
import "./CustomCheckbox.css";

const Checkbox = ({ label, isChecked, handleChange }) => {
  return (
    <div className="checkbox_container" onClick={handleChange}>
      <input
        className="checkbox_input"
        type="checkbox"
        checked={isChecked}
      />
      <p className="checkbox_label">{label}</p>
    </div>
  );
};

export default Checkbox;
