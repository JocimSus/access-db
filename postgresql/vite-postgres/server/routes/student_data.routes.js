const { Router } = require("express");
const controller = require("../controllers/student_data.controller");

const router = Router();

router.get("/", controller.getStudents);
router.post("/", controller.addStudent);
router.get("/:nis", controller.getStudentsByNis);
router.put("/:nis", controller.updateStudent);
router.delete("/:nis", controller.deleteStudent);

module.exports = router;
