import React, { useEffect } from "react";
import "./App.css";
import Menubar from "./components/Menubar/Menubar";
import MainDisplay from "./components/MainDisplay";
import img1 from "./data/fuse/page.png";
import { useElementsContext } from "./context";
import Toast from "./components/Toast/Toast";

const App = () => {
  const {
    data,
    setData,
    selectedGroupElements,
    setSelectedGroupElements,
    setDistinctElements,
    setIndividualElements,
    setSelectedIndividualElements,
    selectedIndividualElements,
    setCurrentHighlightedElement,
    toast,
    setTotalSelectedElements,
  } = useElementsContext([]);

  useEffect(() => {
    setTotalSelectedElements(selectedIndividualElements.length);
  }, [selectedIndividualElements]);
  
  useEffect(() => {
    const disElements = [...new Set(data.map((item) => item.elementType))];
    setDistinctElements(disElements);
    setSelectedGroupElements(disElements);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    setIndividualElements([
      ...data.filter((item) =>
        selectedGroupElements.includes(item.elementType)
      ),
    ]);
    setSelectedIndividualElements([
      ...data.filter((item) =>
        selectedGroupElements.includes(item.elementType)
      ),
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGroupElements, data]);

  useEffect(() => {
    setCurrentHighlightedElement(selectedIndividualElements[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndividualElements]);

  useEffect(() => {
    const getFileNames = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/data");
        const data = await response.json();
        setData(data);
      } catch (err) {
        console.log(err);
      }
    };
    getFileNames();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (data === null) {
    return <div>Loading data...</div>;
  }

  return (
    <div className="app">
      <Menubar />
      <MainDisplay data={data} img={img1} />
      {toast.show && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
};

export default App;
