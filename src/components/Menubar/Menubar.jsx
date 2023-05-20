import React, { useEffect, useState } from "react";
import "./Menubar.css";
import { useElementsContext } from "../../context";
import Sidebar from "../Sidebar/Sidebar";

const Menubar = () => {
  const {
    selectedSidebar,
    setSelectedSidebar,
    totalSelectedElements,
    selectedIndividualElementsLF,
    applyLayoutFilters,
  } = useElementsContext();
  const handleSidebarToggle = (e) => {
    if (selectedSidebar === e.target.name) {
      setSelectedSidebar("");
    } else {
      setSelectedSidebar(e.target.name);
    }
  };
  const [totalSelectedElementsLF, setTotalSelectedElementsLF] = useState(0);
  useEffect(() => {
    setTotalSelectedElementsLF(selectedIndividualElementsLF.length);
  }, [selectedIndividualElementsLF]);

  return (
    <div className="menubar">
      <Sidebar />
      <p className="header">Labeller</p>
      <div className="options">
        <div className="selectedElements">
          <p>
            Total selected elements: <strong>{totalSelectedElements}</strong>
          </p>
          <p>
            Layout filtered elements: <strong>{totalSelectedElementsLF}</strong>
          </p>
        </div>
        <button
          class={`button-55 ${
            selectedSidebar === "layout_filter" && "selected"
          } ${
            applyLayoutFilters
              ? "layoutFiltersApplied"
              : "layoutFiltersNotApplied"
          }`}
          name="layout_filter"
          onClick={handleSidebarToggle}
        >
          Layout Filter
        </button>
        <button
          class={`button-55 ${
            selectedSidebar === "group_filter" && "selected"
          }`}
          name="group_filter"
          onClick={handleSidebarToggle}
        >
          Group Filter
        </button>
        <button
          class={`button-55 ${
            selectedSidebar === "individual_filter" && "selected"
          }`}
          name="individual_filter"
          onClick={handleSidebarToggle}
        >
          Individual Filter
        </button>
        <button
          class={`button-55 ${selectedSidebar === "label_input" && "selected"}`}
          name="label_input"
          onClick={handleSidebarToggle}
        >
          Label Input
        </button>
      </div>
    </div>
  );
};

export default Menubar;
