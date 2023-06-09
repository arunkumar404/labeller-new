import { createContext, useContext, useState } from "react";

const ElementsContext = createContext(null);

export const ContextProvider = ({ children }) => {
  const [selectedGroupElements, setSelectedGroupElements] = useState([]);
  const [data, setData] = useState([]);
  const [selectedSidebar, setSelectedSidebar] = useState("");
  const [distinctElements, setDistinctElements] = useState([]);
  const [individualElements, setIndividualElements] = useState([]);
  const [selectedIndividualElements, setSelectedIndividualElements] = useState(
    []
  );
  const [currentHighlightedElement, setCurrentHighlightedElement] =
    useState(null);
  const [changesQueue, setChangesQueue] = useState([]);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [layoutFilterType, setLayoutFilterType] = useState(['row-container','column-container','unnamed']);

  const [totalSelectedElements, setTotalSelectedElements] = useState("");
  const [selectedIndividualElementsLF, setSelectedIndividualElementsLF] =
    useState([]);
  const [applyLayoutFilters, setApplyLayoutFilters] = useState(false);

  return (
    <ElementsContext.Provider
      value={{
        selectedGroupElements,
        setSelectedGroupElements,
        data,
        setData,
        setDistinctElements,
        distinctElements,
        selectedSidebar,
        setSelectedSidebar,
        selectedIndividualElements,
        setSelectedIndividualElements,
        individualElements,
        setIndividualElements,
        currentHighlightedElement,
        setCurrentHighlightedElement,
        changesQueue,
        setChangesQueue,
        toast,
        setToast,
        layoutFilterType,
        setLayoutFilterType,
        totalSelectedElements,
        setTotalSelectedElements,
        selectedIndividualElementsLF,
        setSelectedIndividualElementsLF,
        applyLayoutFilters,
        setApplyLayoutFilters
      }}
    >
      {children}
    </ElementsContext.Provider>
  );
};

export const useElementsContext = () => useContext(ElementsContext);
