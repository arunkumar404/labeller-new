import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./TemplateList.css";
import { STATUS_CODE } from "../constants/constants";
import env from "../conf/env";
import CustomStatus from "../components/common/CustomStatus";
const TemplateList = () => {
  const [templates, setTemplates] = useState([]);

  const navigate = useNavigate()

  const getTemplates = async () => {
    try {
      const response = await fetch(`${env.REACT_APP_HTTP_URL}/template/getAll`);
      const data = await response.json();
      setTemplates(data.templates);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTemplates();
  }, []);

  const openScreen = (id, e) => {
    if( e.target.id === `${id}-card` ){
      navigate(`/${id}/screens`)
    }
  }

  const updateStatus = async (id, value) => {
    const response = await fetch(`${env.REACT_APP_HTTP_URL}/template/status/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: value }),
    });
  }


  return (
    <>
      <h1>Templates</h1>
      <div className="template-list">
        {templates.map((template, index) => (
          <div
            key={template._id}
            className="template-card"
            id={`${template._id}-card`}
            onClick={(event) => openScreen(template._id, event)}
          >
            <h3>{index + 1}</h3>
            <h2 className="template-name">{template?._id}</h2>
            {/* <p
              className={`template-status`}
              style={{ backgroundColor: `${STATUS_CODE[template.status]}` }}
            >
              {template.status}
            </p> */}
            <CustomStatus id={template._id} card_status={template.status} updateStatus={updateStatus} />
            <div className="flex flex-wrap justify-content-between">
              <p className="mx-3">Library - {template?.library}</p>
              <p className="mx-3">totalScreen : {template?.totalScreen}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TemplateList;
