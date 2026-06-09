const fs = require("fs");
const path = require("path");
const { getPool } = require("../db");

async function main() {
  const schemaPath = path.join(__dirname, "../sql/schema.sql");
  const sqlText = fs.readFileSync(schemaPath, "utf8");
  const batches = sqlText
    .split(/^\s*GO\s*$/gim)
    .map((b) => b.trim())
    .filter(Boolean);

  const pool = await getPool();
  for (let i = 0; i < batches.length; i++) {
    try {
      await pool.request().query(batches[i]);
    } catch (e) {
      console.error(`Batch ${i + 1} failed:`, e.message);
      throw e;
    }
  }
  console.log(`Schema applied (${batches.length} batches).`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
