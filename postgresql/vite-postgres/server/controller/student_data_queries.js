const student_data_queries = {
  getStudents: "select * from students_scores",
  getStudentsByNis: "select * from students_scores where nis = $1",
  checkNisExists: "select ss from students_scores ss where ss.nis = $1",
  addStudent: `insert into students_scores 
    (nis, name, class, uh1, uh2, uh3, pts, pas)
    values
    ($1, $2, $3, $4, $5, $6, $7, $8)
  `,
  deleteStudent: "delete from students_scores where nis = $1",
  updateStudent: "update students_scores set name = $2 where nis = $1",
};

module.exports = student_data_queries;
