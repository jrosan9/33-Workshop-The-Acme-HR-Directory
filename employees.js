const express = require("express");
const router = express.Router();
const pg = require("pg");
const client = new pg.Client("postgres://localhost/acme_human_resource");
client.connect();

router.get("/", async (req, res, next) => {
  try {
    const response = await client.query(`SELECT * FROM employee`);
    res.send(response.rows);
  } catch (err) {
    next(err);
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    const response = await client.query(
      `SELECT * FROM employee WHERE id = $1`,
      [req.params.id]
    );
    res.send(response.rows[0]);
  } catch (err) {
    next(err);
  }
});
router.post("/", async (req, res, next) => {
  try {
    const response = await client.query(
      `INSERT INTO employee(name, department_id) VALUES($1, $2)`,
      [req.body.name, req.body.department_id]
    );
    res.send({
      name: req.body.name,
      department_id: req.body.department_id,
    });
  } catch (err) {
    next(err);
  }
});
router.delete("/:id", async (req, res, next) => {
  try {
    const response = await client.query(`DELETE from employee WHERE id = $1`, [
      Number(req.params.id),
    ]);
    res
      .send({
        id: req.params.id,
      })
      .sendStatus(204);
  } catch (err) {
    next(err);
  }
});
router.put("/:id", async (req, res, next) => {
  try {
    const response = await client.query(
      `UPDATE employee SET name=$1, department_id=$2 WHERE id=$3 RETURNING *`,
      [req.body.name, req.body.department_id, Number(req.params.id)]
    );
    res.send(response.rows[0]);
  } catch (err) {
    next(err);
  }
});
module.exports = router;
