const express = require("express");
const { getTasks, createTask} = require("../controllers/taskController");
const protect = require("../middlewares/authMiddleware");

console.log("getTasks:", getTasks);
console.log("protect:", protect);

const router = express.Router();

router.get("/", protect, getTasks);
router.post("/", protect, createTask);


module.exports = router;
