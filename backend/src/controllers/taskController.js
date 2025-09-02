const pool = require("../config/db");
// CREATE new task
const createTask = async (req, res) => {
  try {
    const { title, description, status, project_id } = req.body;

    if (!project_id) {
      return res.status(400).json({ message: "Project ID is required" });
    }

    const result = await pool.query(
      "INSERT INTO tasks (title, description, status, project_id) VALUES ($1,$2,$3,$4) RETURNING *",
      [title, description, status || "pending", project_id]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET tasks for a project
const getTasks = async (req, res) => {
  try {
    const { project_id } = req.query;

    if (!project_id) {
      return res.status(400).json({ message: "Project ID is required" });
    }

    const result = await pool.query(
      "SELECT * FROM tasks WHERE project_id=$1 ORDER BY id DESC",
      [project_id]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getTasks, createTask };