const app = require("./backend/src/app");
const pool = require("./backend/src/config/db");

const PORT = process.env.PORT || 5000;

pool.connect()
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch(err => console.error("❌ DB connection error", err));

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
