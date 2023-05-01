import React from "react";
import "./Sidebar.css";
import ElementsGroupFilter from "./ElementsGroupFilter";
import { useElementsContext } from "../../context";
import ElementsIndividualFilter from "./ElementsIndividualFilter";
import LabelInput from "./LabelInput";
const Sidebar = () => {
  const { selectedSidebar,currentHighlightedElement } = useElementsContext();
  return (
    <div
      style={{ display: `${!selectedSidebar ? "none" : ""}` }}
      className="sidebar"
    >
      {selectedSidebar === "group_filter" && <ElementsGroupFilter />}
      {selectedSidebar === "individual_filter" && <ElementsIndividualFilter />}
      {selectedSidebar === "label_input" && currentHighlightedElement && <LabelInput />}
    </div>
  );
};

export default Sidebar;
