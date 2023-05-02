import React from "react";
import BoundingBox from "./BoundingBox/BoundingBox";
import { useElementsContext } from "../context";

const MainDisplay = ({ data, img }) => {
  const { selectedIndividualElements, currentHighlightedElement } =
    useElementsContext([]);

  return (
    <div
      style={{
        marginTop: "1rem",
        position: "relative",
        width: "fit-content",
        height: "fit-content",
      }}
    >
      <img src={img} alt="img1" className="main_image" />
      {selectedIndividualElements.map((item, i) => {
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
