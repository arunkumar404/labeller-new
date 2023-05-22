import React, { useEffect, useState } from "react";
import { useElementsContext } from "../../context";
import DropdownInput from "./DropDownInput";
import CustomCheckbox from "../Util/CustomCheckbox";

const LabelInput = ({
  inputShowDropdown,
  setInputShowDropdown,
  inputDropdownType,
  setInputDropdownType,
}) => {
  const {
    selectedIndividualElements,
    currentHighlightedElement,
    setCurrentHighlightedElement,
    changesQueue,
    setChangesQueue,
    setToast,
    totalSelectedElements,
    applyLayoutFilters,
    selectedIndividualElementsLF,
  } = useElementsContext([]);

  const [currentElementComponent, setCurrentElementComponent] = useState("");
  const [currentElementLayout, setCurrentElementLayout] = useState("");
  const [showClassModal, setShowClassModal] = useState(false);
  const [isCommonClassEnabled, setIsCommonClassEnabled] = useState(true);
  const [commonClasses, setCommonClasses] = useState([]);

  const ComponentsList = [
    "Button",
    "Divider",
    "Card",
    "CardHeader",
    "CardBody",
    "CardFooter",
    "Table",
    "TableHead",
    "TableRow",
    "TableCell",
    "TableBody",
    "Header",
    "Footer",
    "Tabs",
    "Tab",
    "List",
    "ListItem",
    "Sidebar",
    "Accordion",
    "Select",
    "Icon",
    "Image",
    "Form",
    "Input",
    "Checkbox",
    "Radio",
    "RadioGroup",
    "Typography",
    "Avatar",
    "Slider",
    "Switch",
    "Badge",
    "Progress",
    "Breadcrumbs",
    "Link",
    "Menu",
    "Pagination"
  ];
  
  const LayoutList = ["Row-Container", "Column-Container"];

  const classSelectorButtonClickHandler = () => {
    const currentElementClasses = currentHighlightedElement?.classNames.split(' ')
    setCommonClasses([...currentElementClasses])
  }

  const handleCommonClassCheckboxChange = () => {
    setIsCommonClassEnabled(!isCommonClassEnabled);
  };
  const handleCommonClassInputChange = (e) => {
    const currentValue = e.target.value;
    let tempClasses = currentValue.split(' ')
    setCommonClasses([...tempClasses])
    console.log(commonClasses);
  }

  const addToQueue = () => {
    const currentElementChangeIndex = changesQueue.findIndex(
      (element) => element.fileName === currentHighlightedElement.fileName
    );

    if (currentElementChangeIndex === -1) {
      setChangesQueue([
        ...changesQueue,
        {
          fileName: currentHighlightedElement.fileName,
          elementType: currentHighlightedElement.elementType,
          component: currentElementComponent,
          layout: currentElementLayout,
          classNames: currentHighlightedElement.classNames,
        },
      ]);
    } else {
      const updatedChangesQueue = changesQueue.map((element) =>
        element.fileName === currentHighlightedElement.fileName
          ? {
              fileName: currentHighlightedElement.fileName,
              elementType: currentHighlightedElement.elementType,
              component: currentElementComponent,
              layout: currentElementLayout,
              classNames: currentHighlightedElement.classNames,
            }
          : element
      );
      setChangesQueue([...updatedChangesQueue]);
    }
  };

  const addToQueueHandler = () => {
    addToQueue();
  };

  const nextPrevHandler = (e) => {
    addToQueue();

    const clickType = e.target.name;
    let totalSelectedElementsLocal;
    let currentElementIndex;
    if (!applyLayoutFilters) {
      totalSelectedElementsLocal = selectedIndividualElements.length;
      currentElementIndex = selectedIndividualElements.indexOf(
        currentHighlightedElement
      );
    } else if (applyLayoutFilters) {
      totalSelectedElementsLocal = selectedIndividualElementsLF.length;
      currentElementIndex = selectedIndividualElementsLF.indexOf(
        currentHighlightedElement
      );
    }

    let next = currentElementIndex + 1;
    let prev = currentElementIndex - 1;

    if (next === totalSelectedElementsLocal) {
      next = 0;
    }
    if (prev < 0) {
      prev = totalSelectedElementsLocal - 1;
    }
    if (clickType === "next") {
      if (!applyLayoutFilters) {
        setCurrentHighlightedElement(selectedIndividualElements[next]);
      } else if (applyLayoutFilters) {
        setCurrentHighlightedElement(selectedIndividualElementsLF[next]);
      }
    } else if (clickType === "prev") {
      if (!applyLayoutFilters) {
        setCurrentHighlightedElement(selectedIndividualElements[prev]);
      } else if (applyLayoutFilters) {
        setCurrentHighlightedElement(selectedIndividualElementsLF[prev]);
      }
    }
  };

  useEffect(() => {
    const currentElementChangesQueued = changesQueue.find(
      (element) => element.fileName === currentHighlightedElement.fileName
    );
    if (currentElementChangesQueued) {
      setCurrentElementComponent(currentElementChangesQueued.component);
      setCurrentElementLayout(currentElementChangesQueued.layout);
    } else {
      setCurrentElementComponent("");
      setCurrentElementLayout("");
    }
  }, [currentHighlightedElement]);

  const deleteBBHandler = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/deletebb/${currentHighlightedElement.fileName}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (data.status === 200) {
        setToast({ show: true, message: data.message, type: "success" });
      } else {
        setToast({ show: true, message: data.message, type: "error" });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const saveProgressHandler = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/changes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(changesQueue),
      });

      const data = await response.json();
      if (response.status === 200) {
        setToast({ show: true, message: data.message, type: "success" });
      } else {
        setToast({ show: true, message: data.message, type: "error" });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClassContainerClick = () => {
    setShowClassModal(!showClassModal);
  };

  return (
    <div className="label_input_container">
      <p>
        Total Selected Elements: <strong>{totalSelectedElements}</strong>
      </p>
      <p>
        Element Id :<strong> {currentHighlightedElement.fileName}</strong>
      </p>
      <h4>Highlighted Element</h4>
      <div className="highlighted_element_details">
        <div className="single_detail">
          <p>Type:</p>
          <strong>{currentHighlightedElement.elementType}</strong>
        </div>
        <div className="single_detail">
          <p>Component:</p>
          <strong>{currentHighlightedElement?.component}</strong>
        </div>
        <div className="single_detail">
          <p>Layout:</p>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <strong>
              {currentHighlightedElement?.layout?.rowContainer === true
                ? "Row-Container"
                : currentHighlightedElement?.layout?.columnContainer === true
                ? "Column-Container"
                : ""}
            </strong>
          </div>
        </div>
        <div className="single_detail">
          <p>Class:</p>
          <div
            className={`class_container ${
              showClassModal ? "hide_class_container" : ""
            }`}
            onClick={handleClassContainerClick}
          >
            <strong>{currentHighlightedElement?.classNames}</strong>
            <strong>
              <span>...</span>
            </strong>
          </div>
          <div
            className={`full_class_modal ${
              showClassModal ? "show_class_modal" : ""
            }`}
          >
            <strong
              className="close_btn"
              onClick={() => setShowClassModal(!showClassModal)}
            >
              X
            </strong>
            <strong>{currentHighlightedElement?.classNames}</strong>
          </div>
        </div>
        <h5>Co-ordinates & Size</h5>
        <div className="detail_row">
          <div className="single_row_detail">
            <p>Left:</p>
            <strong>{currentHighlightedElement.boundingBox.left}</strong>
          </div>
          <div className="single_row_detail">
            <p>Right:</p>
            <strong>{currentHighlightedElement.boundingBox.right}</strong>
          </div>
        </div>
        <div className="detail_row">
          <div className="single_row_detail">
            <p>Top:</p>
            <strong>{currentHighlightedElement.boundingBox.top}</strong>
          </div>
          <div className="single_row_detail">
            <p>Bottom:</p>
            <strong>{currentHighlightedElement.boundingBox.bottom}</strong>
          </div>
        </div>
        <div className="detail_row">
          <div className="single_row_detail">
            <p>Width:</p>
            <strong>{currentHighlightedElement.boundingBox.width}</strong>
          </div>
          <div className="single_row_detail">
            <p>Height:</p>
            <strong>{currentHighlightedElement.boundingBox.height}</strong>
          </div>
        </div>
      </div>
      <button className="label_btn delete_bb_btn" onClick={deleteBBHandler}>
        Delete Bounding Box
      </button>
      <div className="labelling_block">
        <h4>Label Editor</h4>
        <div className="single_detail">
          <p>Component:</p>
          <DropdownInput
            type="component"
            options={ComponentsList}
            inputValue={currentElementComponent}
            setInputValue={setCurrentElementComponent}
            inputShowDropdown={inputShowDropdown}
            setInputShowDropdown={setInputShowDropdown}
            inputDropdownType={inputDropdownType}
            setInputDropdownType={setInputDropdownType}
          />
        </div>
        <div className="single_detail">
          <p>Layout:</p>
          <DropdownInput
            type="layout"
            options={LayoutList}
            inputValue={currentElementLayout}
            setInputValue={setCurrentElementLayout}
            inputShowDropdown={inputShowDropdown}
            setInputShowDropdown={setInputShowDropdown}
            inputDropdownType={inputDropdownType}
            setInputDropdownType={setInputDropdownType}
          />
        </div>
        <div className="commonClassSelectorContainer">
          <CustomCheckbox
            label="Common Class"
            isChecked={isCommonClassEnabled}
            handleChange={handleCommonClassCheckboxChange}
          />
          <button onClick={classSelectorButtonClickHandler}>Add all current classes</button>
        </div>
        <div className="single_detail">
          <p>Classes:</p>
          <input
            type="text"
            value={commonClasses.join(' ')}
            onChange={handleCommonClassInputChange}
          />
        </div>

        <div className="addtoqueuecontainer">
          <button
            className="label_btn add_to_queue_btn"
            onClick={addToQueueHandler}
          >
            Add to queue
          </button>
        </div>
        <div className="label_btns">
          <button className="label_btn" name="prev" onClick={nextPrevHandler}>
            Prev. Element
          </button>
          <button className="label_btn" name="next" onClick={nextPrevHandler}>
            Next Element
          </button>
        </div>
        <button
          className="label_btn save_progress_btn"
          onClick={saveProgressHandler}
        >
          Save Progress
        </button>
      </div>
    </div>
  );
};

export default LabelInput;
