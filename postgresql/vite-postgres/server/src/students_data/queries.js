const getStudents = "select * from students_scores";
const getStudentsByNis = "select * from students_scores where nis = $1";
const checkNisExists = "select ss from students_scores ss where ss.nis = $1";
const addStudent = `insert into students_scores 
  (nis, name, class, uh1, uh2, uh3, pts, pas)
  values
  ($1, $2, $3, $4, $5, $6, $7, $8)
`;
const deleteStudent = "delete from students_scores where nis = $1";
const updateStudent = "update students_scores set name = $2 where nis = $1";

module.exports = {
  getStudents,
  getStudentsByNis,
  checkNisExists,
  addStudent,
  deleteStudent,
  updateStudent,
};
