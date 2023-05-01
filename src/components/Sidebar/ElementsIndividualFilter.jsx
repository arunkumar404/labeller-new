import React from "react";
import { useElementsContext } from "../../context";
import "./Sidebar.css";
const ElementsIndividualFilter = () => {
  const {
    selectedGroupElements,
    setSelectedGroupElements,
    distinctElements,
    data,
    selectedIndividualElements,
    setSelectedIndividualElements,
    individualElements,
  } = useElementsContext([]);

  const handleFilterSelect = (e) => {
    const checkboxInput = e.currentTarget.querySelector(
      'input[type="checkbox"]'
    );
    const clickedElement = JSON.parse(checkboxInput.value);
    if (checkboxInput.checked) {
      setSelectedIndividualElements([
        ...selectedIndividualElements.filter(
          (item) => item.fileName !== clickedElement.fileName
        ),
      ]);
      checkboxInput.checked = false;
    } else {
      setSelectedIndividualElements([
        ...selectedIndividualElements,
        clickedElement,
      ]);
      checkboxInput.checked = true;
    }
  };
  const handleCheckboxFilterSelect = (e) => {
    const checkboxInput = e.target;
    const clickedElement = JSON.parse(checkboxInput.value);
    if (checkboxInput.checked) {
      setSelectedIndividualElements([
        ...selectedIndividualElements.filter(
          (item) => item.fileName !== clickedElement.fileName
        ),
      ]);
      checkboxInput.checked = false;
    } else {
      setSelectedIndividualElements([
        ...selectedIndividualElements,
        clickedElement,
      ]);
      checkboxInput.checked = true;
    }
  };
  return (
    <>
      <div className="elements">
        <button
          className="remove_btn"
          onClick={() => setSelectedGroupElements(distinctElements)}
        >
          Remove all Group Filters
        </button>
      </div>
      <div className="elements">
        <button
          className="remove_btn remove_filters"
          onClick={() =>
            setSelectedIndividualElements([
              ...data.filter((item) =>
                selectedGroupElements.includes(item.elementType)
              ),
            ])
          }
        >
          Remove all Individual Filters
        </button>
      </div>
      <div className="elements">
        <button
          className="remove_btn remove_all_bbs"
          onClick={() => setSelectedIndividualElements([])}
        >
          Unselect all elements
        </button>
      </div>
      {individualElements.map((element) => {
        return (
          <div
            key={element.filename}
            className="elements"
            onClick={handleFilterSelect}
          >
            <input
              type="checkbox"
              name={element.elementType}
              value={JSON.stringify(element)}
              checked={selectedIndividualElements.some(
                (item) => item.fileName === element.fileName
              )}
              onClick={handleCheckboxFilterSelect}
            />
            {element.elementType}
          </div>
        );
      })}
    </>
  );
};

export default ElementsIndividualFilter;
