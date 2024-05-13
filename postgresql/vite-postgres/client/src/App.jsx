import React, { useState } from "react";

import Insert from "./Insert.jsx";
import Get from "./Get.jsx";
import GetByNis from "./GetByNis.jsx";
import Delete from "./Delete.jsx";
import Update from "./Update.jsx";
import "./App.css";

function App() {
  const [selectedComponent, setSelectedComponent] = useState(null);

  const handleChange = (event) => {
    setSelectedComponent(event.target.value);
  };

  const renderComponent = () => {
    switch (selectedComponent) {
      case "get_students":
        return <Get />;
      case "get_students_by_nis":
        return <GetByNis />;
      case "add_students":
        return <Insert />;
      case "delete_students":
        return <Delete />;
      case "update_students":
        return <Update />;
    }
  };
  return (
    <>
      <div className="title">Access Students Scores</div>
      <select
        onChange={handleChange}
        className="selection"
      >
        <option value="">Select...</option>
        <option value="get_students">Get Students</option>
        <option value="get_students_by_nis">Get Students By NIS</option>
        <option value="add_students">Add Students</option>
        <option value="delete_students">Delete Students</option>
        {/* <option value="update_students">Update Students</option> */}
      </select>
      <div className="input-block">
        <div>{renderComponent()}</div>
      </div>
    </>
  );
}

export default App;
