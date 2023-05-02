import React, { useState } from "react";
import "./Sidebar.css";
import ElementsGroupFilter from "./ElementsGroupFilter";
import { useElementsContext } from "../../context";
import ElementsIndividualFilter from "./ElementsIndividualFilter";
import LabelInput from "./LabelInput";
const Sidebar = () => {
  const { selectedSidebar,currentHighlightedElement } = useElementsContext();

  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = (event) => {
    setIsDragging(true);
    setDragStart({ x: event.clientX, y: event.clientY });
  };

  const handleMouseMove = (event) => {
    if (!isDragging) return;
    const dx = event.clientX - dragStart.x;
    setPosition({ x: position.x - dx, y: 0 });
    setDragStart({ x: event.clientX, y: event.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      style={{ display: `${!selectedSidebar ? "none" : ""}`,right:position.x }}
      className="sidebar"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={()=>setIsDragging(false)}
    >
      {selectedSidebar === "group_filter" && <ElementsGroupFilter />}
      {selectedSidebar === "individual_filter" && <ElementsIndividualFilter />}
      {selectedSidebar === "label_input" && currentHighlightedElement && <LabelInput />}
    </div>
  );
};

export default Sidebar;
