import { useEffect, useState } from "react";

import Insert from "./Insert.jsx";
import "./App.css";

function App() {
  const studentsDataApiV1 =
    "https://api-postgres.vercel.app/api/v1/students_data";
  const [backendData, setBackendData] = useState(null);

  useEffect(() => {
    fetch(studentsDataApiV1)
      .then((res) => res.json())
      .then((data) => setBackendData(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="title">Access Scores Database</div>
      <div className="input-block">
        <Insert />
        {console.log(backendData)}
        {backendData === null ? (
          <p>Loading...</p>
        ) : (
          backendData.map((student, index) => {
            return (
              <div key={index}>
                <p>Name: {student.name}</p>
                <p>NIS: {student.nis}</p>
                <p>Class: {student.class}</p>
                <p>UH1: {student.uh1}</p>
                <p>UH2: {student.uh2}</p>
                <p>UH3: {student.uh3}</p>
                <p>PTS: {student.pts}</p>
                <p>PAS: {student.pas}</p>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}

export default App;
