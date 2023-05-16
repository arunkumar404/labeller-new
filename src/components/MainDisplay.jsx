import React, { useEffect } from "react";
import BoundingBox from "./BoundingBox/BoundingBox";
import { useElementsContext } from "../context";

const MainDisplay = ({ data, img }) => {
  const {
    selectedIndividualElements,
    currentHighlightedElement,
    layoutFilterType,
    selectedIndividualElementsLF,
    setSelectedIndividualElementsLF,
    applyLayoutFilters
  } = useElementsContext([]);

  useEffect(() => {
    let tempArray = [];
    if (layoutFilterType.includes("row-container")) {
      tempArray = [
        ...tempArray,
        ...selectedIndividualElements.filter(
          (element) => element?.layout?.rowContainer === true
        ),
      ];
    }
    if (layoutFilterType.includes("column-container")) {
      tempArray = [
        ...tempArray,
        ...selectedIndividualElements.filter(
          (element) => element?.layout?.columnContainer === true
        ),
      ];
    }
    if (layoutFilterType.includes("unnamed")) {
      tempArray = [
        ...tempArray,
        ...selectedIndividualElements.filter(
          (element) =>
            element?.layout?.rowContainer === false &&
            element?.layout?.columnContainer === false
        ),
      ];
    }
    setSelectedIndividualElementsLF([...tempArray]);
  }, [selectedIndividualElements, layoutFilterType]);

  return (
    <div
      style={{
        marginTop: "calc(70px + 1rem)",
        position: "relative",
        width: "fit-content",
        height: "fit-content",
      }}
    >
      <img src={img} alt="img1" className="main_image" />
      {(!applyLayoutFilters?selectedIndividualElements:selectedIndividualElementsLF).map((item, i) => {
        const isHighlighted =
          item.fileName === currentHighlightedElement?.fileName;
        return (
          <BoundingBox
            key={`${item.elementType}${i}`}
            width={item.boundingBox.width}
            height={item.boundingBox.height}
            top={item.boundingBox.top}
            right={item.boundingBox.right}
            bottom={item.boundingBox.bottom}
            left={item.boundingBox.left}
            border="1px solid #b5d834"
            position="absolute"
            isHighlighted={isHighlighted}
            fileName={item.fileName}
            depth={item.depth}
          />
        );
      })}
    </div>
  );
};

export default MainDisplay;
