import React, { useState } from "react";
import "./BoundingBox.css";
import { useElementsContext } from "../../context";
import { colorsComponentLink } from '../Util/colorsComponentLink'

const BoundingBox = ({
  width,
  height,
  top,
  right,
  bottom,
  left,
  border,
  position,
  fileName,
  isHighlighted,
  depth,
  component
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const componentDefaultColor = colorsComponentLink[component];
  const { selectedIndividualElements, setCurrentHighlightedElement } =
    useElementsContext();

  const handleMouseEnter = (e) => {
    const isInSelectedList = selectedIndividualElements.some(
      (element) => element.fileName === e.target.dataset.id
    );
    if (isInSelectedList) {
      setIsHovering(true);
    }
  };
  const handleMouseLeave = (e) => {
    setIsHovering(false);
  };
  const handleClick = (e) => {
    const isInSelectedList = selectedIndividualElements.some(
      (element) => element.fileName === e.target.dataset.id
    );
    if (isInSelectedList) {
      const foundElement = selectedIndividualElements.find((element) => {
        return element.fileName === e.target.dataset.id;
      });
      setCurrentHighlightedElement(foundElement);
    }
  };
  return (
    <div
      style={{
        width: width,
        height: height,
        top: top,
        right: right,
        bottom: bottom,
        left: left,
        border: border,
        position: position,
        zIndex: depth,
        boxSizing: "border-box",
        borderColor: `${
          isHighlighted ? "red" : isHovering ? "#114df3" : componentDefaultColor
        }`,
        backgroundColor: `${
          isHighlighted ? "#f5cece53" : isHovering ? "#98b2f72d" : ""
        }`,
        borderWidth: `${isHighlighted || isHovering ? "4px" : "1px"}`,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      data-id={fileName}
    />
  );
};

export default BoundingBox;
