import React, { useState } from "react";
const STATUS_CODE = {
    TODO: 'rgb(225 207 19)',
    INPROGRESS: '#6a6ae3',
    DONE: '#41ca41',
    RESTRICTED: 'red'
}

const CustomStatus = ({ id, card_status, updateStatus }) => {
    const [status, setStatus] = useState(card_status)

  const handleStatusChange = (event) => {
    setStatus(event.target.value)
    updateStatus(id, event.target.value);
  };

  const handleDropdownClick = (event) => {
    event.stopPropagation(); // Stop event propagation
  };
  return (
    <div className={`template-dropdown`} onClick={handleDropdownClick}>
      <select
        className={`template-status  ${status}`}
        value={status}
        style={{ backgroundColor: STATUS_CODE[status] }}
        onChange={(event) => handleStatusChange(event)}
      >
        <option value="TODO">Todo</option>
        <option value="INPROGRESS">In Progress</option>
        <option value="DONE">Done</option>
        <option value="RESTRICTED">Restricted</option>
      </select>
    </div>
  );
};

export default CustomStatus;
