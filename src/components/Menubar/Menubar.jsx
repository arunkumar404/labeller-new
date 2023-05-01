import React from "react";
import "./Menubar.css";
import { useElementsContext } from "../../context";

const Menubar = () => {
  const { selectedSidebar, setSelectedSidebar } = useElementsContext();
  const handleSidebarToggle = (e) => {
    if (selectedSidebar === e.target.name) {
      setSelectedSidebar("");
    } else {
      setSelectedSidebar(e.target.name);
    }
  };

  return (
    <div className="menubar">
      <p className="header">Labeller</p>
      <div className="options">
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
