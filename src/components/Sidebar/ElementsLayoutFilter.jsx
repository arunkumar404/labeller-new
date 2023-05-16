import React from "react";
import { useElementsContext } from "../../context";

const ElementsLayoutFilter = () => {
  const { layoutFilterType,setLayoutFilterType } =
    useElementsContext([]);
  const handleFilterSelect = (e) => {
    const checkboxInput = e.currentTarget.querySelector(
      'input[type="checkbox"]'
    );
    if (checkboxInput.checked) {
      setLayoutFilterType([
        ...layoutFilterType.filter((item) => item !== checkboxInput.value),
      ]);
      checkboxInput.checked = false;
    } else {
      setLayoutFilterType([
        ...new Set([...layoutFilterType, checkboxInput.value]),
      ]);
      checkboxInput.checked = true;
    }
  };
  const handleCheckboxFilterSelect = (e) => {
    const checkboxInput = e.target;
    if (checkboxInput.checked) {
      setLayoutFilterType([
        ...layoutFilterType.filter((item) => item !== checkboxInput.value),
      ]);
      checkboxInput.checked = false;
    } else {
      setLayoutFilterType([
        ...new Set([...layoutFilterType, checkboxInput.value]),
      ]);
      checkboxInput.checked = true;
    }
  };
  return (
    <>
      <div className="elements">
        <button
          className="remove_btn remove_filters"
          onClick={() => setLayoutFilterType(['row-container','column-container','unnamed'])}
        >
          Remove all Filters
        </button>
      </div>
      <div className="elements">
        <button
          className="remove_btn remove_all_bbs"
          onClick={() => setLayoutFilterType([])}
        >
          Unselect all elements
        </button>
      </div>
      {['Row-Container','Column-Container','Unnamed'].map((element, i) => {
        return (
          <div
            key={`${element}${i}`}
            className="elements"
            onClick={handleFilterSelect}
          >
            <input
              type="checkbox"
              name={element}
              value={element.toLowerCase()}
              checked={layoutFilterType.includes(element.toLowerCase())}
              onClick={handleCheckboxFilterSelect}
            />
            {element}
          </div>
        );
      })}
    </>
  );
};

export default ElementsLayoutFilter;
