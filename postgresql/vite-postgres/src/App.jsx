import React from "react"
import "./App.css"

function handleSubmit(e) {
  e.preventDefault()
  let st_name = e.target.name.value
  let st_class = e.target.class.value
  let st_number = e.target.number.value

  console.log(`Name: ${st_name}\nClass: ${st_class}\nNumber: ${st_number}`)
}

function App() {
  return (
    <>
      <div className="title">Access Scores Database</div>
      <div className="input-block">
        <div className="header-1">Input Data</div>
        <form
          className="forms"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="form-inputs">
            <div className="form-label">
              <label>Student Name:</label>
              <label>Student Class:</label>
              <label>Student Number:</label>
            </div>

            <div className="form-input">
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
                name="number"
                placeholder="Student's Number"
              />
            </div>
          </div>
          <input
            type="submit"
            value="Submit"
          />
        </form>
      </div>
    </>
  )
}

export default App
