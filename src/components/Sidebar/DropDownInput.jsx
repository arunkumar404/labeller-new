import React, { useEffect, useState } from 'react';

const DropdownInput = ({ options, inputValue, setInputValue,type, inputShowDropdown, setInputShowDropdown,inputDropdownType,setInputDropdownType }) => {
  const [filteredOptions, setFilteredOptions] = useState([]);

  useEffect(() => {
    const filtered = options.filter((option) =>
      option.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredOptions(filtered);
  },[])

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    const filtered = options.filter((option) =>
      option.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOptions(filtered);
  };

  const handleInputClick = () => {
    const filtered = options.filter((option) =>
    option.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredOptions(filtered);
    setInputDropdownType(type);
    setInputShowDropdown(!inputShowDropdown);

  };

  const handleOptionClick = (option) => {
    setInputValue(option);
    setInputShowDropdown(false);
  };

  return (
    <div className='inputElementContainer'>
      <input
        type="text"
        value={inputValue}
        onClick={handleInputClick}
        onChange={handleInputChange}
      />

      {inputShowDropdown && inputDropdownType===type &&(
        <div className='inputDropdown'>
          {filteredOptions.map((option) => (
            <div key={option} className='inputOptions' onClick={() => handleOptionClick(option)}>
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownInput;
