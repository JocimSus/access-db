import { useState } from "react";

function GetByNis() {
  const studentsDataApiV1 =
    "https://api-postgres.vercel.app/api/v1/students_data";
  const [backendData, setBackendData] = useState(null);
  const [fetchStatus, setFetchStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchStudentData = async (e) => {
    e.preventDefault();
    const nis = e.target.nis.value;
    try {
      const response = await fetch(`${studentsDataApiV1}/${nis}`);

      if (!response.ok) {
        throw new Error("Failed to fetch student data");
      }

      const data = await response.json();

      if (data.length === 0) {
        setFetchStatus("error");
        setErrorMessage("Student Not Found");
        return;
      }

      setBackendData(data);
      setFetchStatus("success");
    } catch (error) {
      setFetchStatus("error");
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <div className="header-1">Get Students by NIS</div>
      <form
        className="forms"
        onSubmit={(e) => fetchStudentData(e)}
      >
        <div className="form-inputs">
          <div className="form-label">
            <label>Student NIS:</label>
          </div>

          <div className="form-input">
            <input
              type="text"
              name="nis"
              placeholder="Student's NIS"
            />
          </div>
        </div>
        <div className="form-submit">
          <input
            type="submit"
            value="Submit"
          />
        </div>
      </form>
      {fetchStatus === "error" && <p>Error: {errorMessage}</p>}
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
          {fetchStatus === "success" &&
          backendData &&
          backendData.length > 0 ? (
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
          ) : (
            <tr>
              <td colSpan="8">No data found</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export default GetByNis;
