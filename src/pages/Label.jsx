import React, { useEffect, useState } from "react";
import '../App.css'
import Menubar from "../components/Menubar/Menubar";
import MainDisplay from "../components/MainDisplay";
// import img1 from "./data/fuse/page.png";
import { useElementsContext } from "../context";
import Toast from "../components/Toast/Toast";
import { useParams } from "react-router-dom";

const Label = () => {
  const { templateId, screenId } = useParams();

  const [image_url, setImage_url] = useState('')

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
    applyLayoutFilters,
    selectedIndividualElementsLF
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
    if (!applyLayoutFilters) {
      setCurrentHighlightedElement(selectedIndividualElements[0]);
    } else if (applyLayoutFilters) {
      setCurrentHighlightedElement(selectedIndividualElementsLF[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndividualElements,applyLayoutFilters,selectedIndividualElementsLF]);

  useEffect(() => {
    const getFileNames = async () => {
      try {
        const response = await fetch(`http://localhost:4000/node/private/getDom/${screenId}`);
        const data = await response.json();
        setData(data.data.nodes);
        setImage_url(data.data.screen_url)
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
      <MainDisplay data={data} img={image_url} />
      {toast.show && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
};

export default Label;
