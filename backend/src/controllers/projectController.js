const pool = require("../config/db");

// GET all projects for logged-in user
const getProjects = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await pool.query("SELECT * FROM projects WHERE user_id=$1 ORDER BY id DESC", [userId]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// CREATE new project
const createProject = async (req, res) => {
  try {
    const { name, description } = req.body;
    const userId = req.user.id;

    const result = await pool.query(
      "INSERT INTO projects (name, description, user_id) VALUES ($1, $2, $3) RETURNING *",
      [name, description, userId]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE project
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const userId = req.user.id;

    const result = await pool.query(
      "UPDATE projects SET name=$1, description=$2 WHERE id=$3 AND user_id=$4 RETURNING *",
      [name, description, id, userId]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE project
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    await pool.query("DELETE FROM projects WHERE id=$1 AND user_id=$2", [id, userId]);
    res.json({ message: "Project deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getProjects, createProject, updateProject, deleteProject };
