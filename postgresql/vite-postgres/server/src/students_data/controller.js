const pool = require("../../db");
const queries = require("./queries");

const getStudents = (req, res) => {
  pool.query(queries.getStudents, (err, results) => {
    if (err) throw err;
    res.status(200).json(results.rows);
  });
};

const addStudent = (req, res) => {
  const { nis, name, class: st_class, uh1, uh2, uh3, pts, pas } = req.body;

  // check if same nis
  pool.query(queries.checkNisExists, [nis], (err, results) => {
    if (results.rows.length) {
      res.send("NIS already exists!");
    } else {
      //add student_data to db
      pool.query(
        queries.addStudent,
        [nis, name, st_class, uh1, uh2, uh3, pts, pas],
        (err, results) => {
          if (err) throw err;
          res.status(201).send("Student inserted successfully");
        }
      );
    }
  });
};

const getStudentsByNis = (req, res) => {
  const nis = parseInt(req.params.nis);
  pool.query(queries.getStudentsByNis, [nis], (err, results) => {
    if (err) throw err;
    res.status(200).json(results.rows);
  });
};

const deleteStudent = (req, res) => {
  const nis = parseInt(req.params.nis);
  pool.query(queries.checkNisExists, [nis], (err, results) => {
    if (!results.rows.length) {
      res.send("NIS does not exist!");
    } else {
      pool.query(queries.deleteStudent, [nis], (err, results) => {
        if (err) throw err;
        res.status(200).send("Student deleted successfully");
      });
    }
  });
};

const updateStudent = (req, res) => {
  const nis = parseInt(req.params.nis);
  const { name } = req.body;

  pool.query(queries.checkNisExists, [nis], (err, results) => {
    if (!results.rows.length) {
      res.send("NIS does not exist!");
    } else {
      pool.query(queries.updateStudent, [nis, name], (err, results) => {
        if (err) throw err;
        res.status(200).send("Student name updated successfully");
      });
    }
  });
};

module.exports = {
  getStudents,
  getStudentsByNis,
  addStudent,
  deleteStudent,
  updateStudent,
};
