import React from "react";
import "./CustomCheckbox.css";

const Checkbox = ({ label, isChecked, handleChange, isDisabled }) => {
  return !isDisabled ? (
    <div
      className="checkbox_container"
      onClick={handleChange}
    >
      <input
        className="checkbox_input"
        type="checkbox"
        checked={isChecked}
      />
      <p className="checkbox_label">{label}</p>
    </div>
  ) : (
    <div className="checkbox_container cursor-block">
      <input
        className="checkbox_input cursor-block"
        type="checkbox"
        checked={isChecked}
        disabled={isDisabled}
      />
      <p className="checkbox_label cursor-block">{label}</p>
    </div>
  );
};

export default Checkbox;
