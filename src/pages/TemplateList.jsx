import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./TemplateList.css";
import { STATUS_CODE } from "../constants/constants";
const TemplateList = () => {
  const [templates, setTemplates] = useState([]);

  const getTemplates = async () => {
    try {
      const response = await fetch("http://localhost:4000/template/getAll");
      const data = await response.json();
      setTemplates(data.templates);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTemplates();
  }, []);

  return (
    <>
      <h1>Templates</h1>
      <div className="template-list">
        {templates.map((template) => (
          <Link
            key={template._id}
            to={`/${template._id}/screens`}
            className="template-card"
          >
            <h2 className="template-name">{template?._id}</h2>
            <p
              className={`template-status`}
              style={{ backgroundColor: `${STATUS_CODE[template.status]}` }}
            >
              {template.status}
            </p>
            <div className="flex justify-content-between">
              <p>Library - {template?.library}</p>
              <p>totalScreen : {template?.totalScreen}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default TemplateList;
