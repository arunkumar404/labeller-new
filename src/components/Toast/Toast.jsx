import React, { useState, useEffect } from "react";
import "./Toast.css";
import { useElementsContext } from "../../context";
const Toast = ({ message }) => {
  const [visible, setVisible] = useState(true);
  const { setToast } = useElementsContext();
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setToast({ show: false, message: "", type: "" });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`toast ${visible ? "show" : ""}`}>
      <p>{message}</p>
    </div>
  );
};

export default Toast;
