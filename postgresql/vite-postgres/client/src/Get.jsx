import { useEffect, useState } from "react";

function Get() {
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
      <div className="header-1">Get Students</div>
      <table>
        <thead>
          <tr>
            <th>NIS</th>
            <th>Name</th>
            <th>Class</th>
            <th>UH1</th>
            <th>UH2</th>
            <th>UH3</th>
            <th>PTS</th>
            <th>PAS</th>
          </tr>
        </thead>
        <tbody>
          {backendData === null ? (
            <tr>
              <td>Loading...</td>
            </tr>
          ) : (
            backendData.map((student, index) => (
              <tr key={index}>
                <td>{student.nis}</td>
                <td>{student.name}</td>
                <td>{student.class}</td>
                <td>{student.uh1}</td>
                <td>{student.uh2}</td>
                <td>{student.uh3}</td>
                <td>{student.pts}</td>
                <td>{student.pas}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
}

export default Get;
