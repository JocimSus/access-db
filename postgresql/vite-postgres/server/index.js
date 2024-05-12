const express = require("express");
const studentsDataRoutes = require("./routes/student_data.routes");

const app = express();
const port = 5000;

app.use(express.json());

const cors = require("cors");
// Allow all origins
app.use(cors());
// Allow specific origin(s)
app.use(
  cors({
    origin: "https://yourdeployedsite.com",
  })
);

app.use("/api/v1/students_data", studentsDataRoutes);

app.listen(port, () => console.log(`Server started on port ${port}`));
