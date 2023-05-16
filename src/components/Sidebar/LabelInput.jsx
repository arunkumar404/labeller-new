import React, { useEffect, useState } from "react";
import { useElementsContext } from "../../context";

const LabelInput = () => {
  const {
    selectedIndividualElements,
    currentHighlightedElement,
    setCurrentHighlightedElement,
    changesQueue,
    setChangesQueue,
    setToast,
  } = useElementsContext([]);
  const [totalSelectedElements, setTotalSelectedElements] = useState("");

  const [currentElementComponent, setCurrentElementComponent] = useState("");
  const [currentElementLayout, setCurrentElementLayout] = useState("");
  const [showClassModal, setShowClassModal] = useState(false);
  useEffect(() => {
    setTotalSelectedElements(selectedIndividualElements.length);
  }, [selectedIndividualElements]);

  const nextPrevHandler = (e) => {
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

    const clickType = e.target.name;
    const totalSelectedElements = selectedIndividualElements.length;

    let currentElementIndex = selectedIndividualElements.indexOf(
      currentHighlightedElement
    );

    let next = currentElementIndex + 1;
    let prev = currentElementIndex - 1;

    if (next === totalSelectedElements) {
      next = 0;
    }
    if (prev < 0) {
      prev = totalSelectedElements - 1;
    }
    if (clickType === "next") {
      setCurrentHighlightedElement(selectedIndividualElements[next]);
    } else if (clickType === "prev") {
      setCurrentHighlightedElement(selectedIndividualElements[prev]);
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
        <strong>{currentHighlightedElement.fileName}</strong>
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
              {currentHighlightedElement?.layout?.rowContainer === true ? "Row-Container" : ""}
            </strong>
            <strong>
              {currentHighlightedElement?.layout?.columnContainer === true
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
      <div className="labelling_block">
        <h4>Label Editor</h4>
        <div className="single_detail">
          <p>Component:</p>
          <input
            type="text"
            value={currentElementComponent}
            onChange={(e) => setCurrentElementComponent(e.target.value)}
          />
        </div>
        <div className="single_detail">
          <p>Layout:</p>
          <input
            type="text"
            value={currentElementLayout}
            onChange={(e) => setCurrentElementLayout(e.target.value)}
          />
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
