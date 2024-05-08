const { Client } = require("pg")

const client = new Client({
  // users need to setup the server themselves
  // need ideas to automate this
  user: "postgres",
  database: "students_data",
  port: 5432,
  host: "localhost",
})
