import { useState } from "react";

function Delete() {
  const studentsDataApiV1 =
    "https://api-postgres.vercel.app/api/v1/students_data";

  const [fetchStatus, setFetchStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const deleteStudent = async (e) => {
    e.preventDefault();
    const nis = e.target.nis.value;

    try {
      const response = await fetch(`${studentsDataApiV1}/${nis}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete student");
      }

      setFetchStatus("success");
    } catch (error) {
      setFetchStatus("error");
      setErrorMessage(error.message);
    }
  };
  return (
    <>
      <div className="header-1">Delete Students</div>
      <form
        className="forms"
        onSubmit={(e) => deleteStudent(e)}
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
      {fetchStatus === "success" && <p>Successfully Deleted Student</p>}
      {fetchStatus === "error" && <p>Error: {errorMessage}</p>}
    </>
  );
}
export default Delete;
