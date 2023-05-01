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
  const [toast, setToast] = useState({show:false, message:'', type: ''});

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
      }}
    >
      {children}
    </ElementsContext.Provider>
  );
};

export const useElementsContext = () => useContext(ElementsContext);
