import React, { useState } from "react";

function Insert() {
  const [fetchStatus, setFetchStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const studentsDataApiV1 =
    "https://api-postgres.vercel.app/api/v1/students_data";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      nis: e.target.nis.value,
      name: e.target.name.value,
      ["class"]: e.target.class.value,
      uh1: parseInt(e.target.uh1.value),
      uh2: parseInt(e.target.uh2.value),
      uh3: parseInt(e.target.uh3.value),
      pts: parseInt(e.target.pts.value),
      pas: parseInt(e.target.pas.value),
    };

    try {
      const response = await fetch(`${studentsDataApiV1}/${formData.nis}`);
      if (response) {
        setFetchStatus("duplicate");
        return;
      }
    } catch (error) {
      console.log(error.message);
    }

    try {
      const response = await fetch(studentsDataApiV1, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to add student");
      }

      setFetchStatus("success");
    } catch (error) {
      setErrorMessage(`${error.message}`);
      setFetchStatus("error");
    }
  };

  return (
    <>
      <div className="header-1">Add Students</div>{" "}
      <form
        className="forms"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="form-inputs">
          <div className="form-label">
            <label>Student NIS:</label>
            <label>Student Name:</label>
            <label>Student Class:</label>
            <label>UH1:</label>
            <label>UH2:</label>
            <label>UH3:</label>
            <label>PTS:</label>
            <label>PAS:</label>
          </div>

          <div className="form-input">
            <input
              type="text"
              name="nis"
              placeholder="Student's NIS"
            />
            <input
              type="text"
              name="name"
              placeholder="Student's Name"
            />
            <input
              type="text"
              name="class"
              placeholder="Student's Class"
            />
            <input
              type="text"
              name="uh1"
              placeholder="Student's UH1 Score"
            />
            <input
              type="text"
              name="uh2"
              placeholder="Student's UH2 Score"
            />
            <input
              type="text"
              name="uh3"
              placeholder="Student's UH3 Score"
            />
            <input
              type="text"
              name="pts"
              placeholder="Student's PTS Score"
            />
            <input
              type="text"
              name="pas"
              placeholder="Student's PAS Score"
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
      {fetchStatus === "duplicate" && <p>NIS already in database</p>}
      {fetchStatus === "success" && <p>Successfully added Student</p>}
      {fetchStatus === "error" && <p>Error: {errorMessage}</p>}
    </>
  );
}

export default Insert;
