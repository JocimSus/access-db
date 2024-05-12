const pool = require("../db");
const queries = require("./student_data_queries");

const studentController = {
  getStudents: async (req, res) => {
    try {
      const { rows } = await pool.query(queries.getStudents);
      res.status(200).json(rows);
    } catch (error) {
      res.json({ msg: error.message });
    }
  },

  addStudent: async (req, res) => {
    const { nis, name, class: st_class, uh1, uh2, uh3, pts, pas } = req.body;

    try {
      const existingStudent = await pool.query(queries.checkNisExists, [nis]);
      if (existingStudent.rows.length) {
        return res.send("NIS already exists!");
      } else {
        await pool.query(queries.addStudent, [
          nis,
          name,
          st_class,
          uh1,
          uh2,
          uh3,
          pts,
          pas,
        ]);
        res.status(201).send("Student inserted successfully");
      }
    } catch (error) {
      res.json({ msg: error.message });
    }
  },

  getStudentsByNis: async (req, res) => {
    const nis = parseInt(req.params.nis);
    try {
      const { rows } = await pool.query(queries.getStudentsByNis, [nis]);
      res.status(200).json(rows);
    } catch (error) {
      res.json({ msg: error.message });
    }
  },

  deleteStudent: async (req, res) => {
    const nis = parseInt(req.params.nis);
    try {
      const existingStudent = await pool.query(queries.checkNisExists, [nis]);
      if (!existingStudent.rows.length) {
        return res.send("NIS does not exist!");
      } else {
        await pool.query(queries.deleteStudent, [nis]);
        res.status(200).send("Student deleted successfully");
      }
    } catch (error) {
      res.json({ msg: error.message });
    }
  },

  updateStudent: async (req, res) => {
    const nis = parseInt(req.params.nis);
    const { name } = req.body;

    try {
      const existingStudent = await pool.query(queries.checkNisExists, [nis]);
      if (!existingStudent.rows.length) {
        return res.send("NIS does not exist!");
      } else {
        await pool.query(queries.updateStudent, [nis, name]);
        res.status(200).send("Student name updated successfully");
      }
    } catch (error) {
      res.json({ msg: error.message });
    }
  },
};

module.exports = studentController;
