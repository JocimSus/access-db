function Insert() {
  function handleSubmit(e) {
    e.preventDefault();
    let st_nis = e.target.nis.value;
    let st_name = e.target.name.value;
    let st_class = e.target.class.value;

    console.log(`Name: ${st_name}\nClass: ${st_class}\nNumber: ${st_nis}`);
  }

  return (
    <>
      <div className="header-1">Insert Data</div>{" "}
      <form
        className="forms"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="form-inputs">
          <div className="form-label">
            <label>Student NIS:</label>
            <label>Student Name:</label>
            <label>Student Class:</label>
          </div>

          <div className="form-input">
            <input
              type="text"
              name="number"
              placeholder="Student's Number"
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
          </div>
        </div>
        <div className="form-submit">
          <input
            type="submit"
            value="Submit"
          />
        </div>
      </form>
    </>
  );
}

export default Insert;
