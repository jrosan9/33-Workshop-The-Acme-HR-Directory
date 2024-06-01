const express = require("express");
const app = express();
const baseQuery = `/api/`;
app.use(express.json());

app.get(baseQuery, (req, res) => {
  res.json({
    success: true,
  });
});
app.use(baseQuery + "employee", require("./employees.js"));
app.use(baseQuery + "department", require("./department.js"));

app.listen(5080, () => {
  console.log("App is running at port 5080");
});
