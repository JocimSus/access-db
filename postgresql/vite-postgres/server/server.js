const express = require("express");
const studentsDataRoutes = require("./src/students_data/routes");

const app = express();
const port = 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<p>Hello Root</p>");
});

app.get("/api", (req, res) => {
  res.json({ users: ["user1", "user2", "user3"] });
});

app.use("/api/v1/students_data", studentsDataRoutes);

app.listen(port, () => console.log(`Server started on port ${port}`));
