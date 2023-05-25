import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ScreenList.css";
import { STATUS_CODE } from "../constants/constants";
import env from "../conf/env";
const ScreenList = () => {
  const { templateId } = useParams();

  const navigate = useNavigate()

  const [screens, setScreens] = useState([]);

  const getTemplates = async () => {
    try {
      const response = await fetch(`${env.REACT_APP_HTTP_URL}/screen/getAll/${templateId}`);
      const data = await response.json();
      setScreens(data.screens);
    } catch (err) {
      console.log(err);
    }
  };

  const openScreen = ( screenId ) => {
    navigate(`/${templateId}/${screenId}`)
  }

  useEffect(() => {
    getTemplates();
  }, [templateId]);

  return (
    <div className="screen-list">
      {screens.map((screen) => (
        <div key={screen._id} className={`screen-card`} onClick={() => openScreen(screen._id)}>
          <h2 className="screen-name">{screen.screen_name}</h2>
          <img
            src={screen.img_url}
            alt={screen.screen_name}
            className="screen-image"
          />
          <p
            className="screen-status"
            style={{
              backgroundColor: STATUS_CODE[screen.status],
            }}
          >
            {screen.status}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ScreenList;
