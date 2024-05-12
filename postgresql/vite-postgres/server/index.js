const express = require("express");
const studentsDataRoutes = require("./routes/student_data.routes");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

app.use("/api/v1/students_data", studentsDataRoutes);

app.listen(port, () => console.log(`Server started on port ${port}`));
