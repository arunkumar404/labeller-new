import React from "react";
import { useElementsContext } from "../../context";

const ElementsGroupFilter = () => {
  const { selectedGroupElements, setSelectedGroupElements, distinctElements } =
    useElementsContext([]);
  const handleFilterSelect = (e) => {
    const checkboxInput = e.currentTarget.querySelector(
      'input[type="checkbox"]'
    );
    if (checkboxInput.checked) {
      setSelectedGroupElements([
        ...selectedGroupElements.filter((item) => item !== checkboxInput.value),
      ]);
      checkboxInput.checked = false;
    } else {
      setSelectedGroupElements([
        ...new Set([...selectedGroupElements, checkboxInput.value]),
      ]);
      checkboxInput.checked = true;
    }
  };
  const handleCheckboxFilterSelect = (e) => {
    const checkboxInput = e.target;
    if (checkboxInput.checked) {
      setSelectedGroupElements([
        ...selectedGroupElements.filter((item) => item !== checkboxInput.value),
      ]);
      checkboxInput.checked = false;
    } else {
      setSelectedGroupElements([
        ...new Set([...selectedGroupElements, checkboxInput.value]),
      ]);
      checkboxInput.checked = true;
    }
  };
  return (
    <>
      <div className="elements">
        <button
          className="remove_btn remove_filters"
          onClick={() => setSelectedGroupElements(distinctElements)}
        >
          Remove all Filters
        </button>
      </div>
      <div className="elements">
        <button
          className="remove_btn remove_all_bbs"
          onClick={() => setSelectedGroupElements([])}
        >
          Unselect all elements
        </button>
      </div>
      {distinctElements.map((element, i) => {
        return (
          <div
            key={`${element}${i}`}
            className="elements"
            onClick={handleFilterSelect}
          >
            <input
              type="checkbox"
              name={element}
              value={element}
              checked={selectedGroupElements.includes(element)}
              onClick={handleCheckboxFilterSelect}
            />
            {element}
          </div>
        );
      })}
    </>
  );
};

export default ElementsGroupFilter;
