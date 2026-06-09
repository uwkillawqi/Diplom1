require("dotenv").config();

const { getPool } = require("../db");

async function main() {
  const pool = await getPool();
  const rs = await pool
    .request()
    .query("SELECT MAX(id) AS maxId FROM dbo.Dishes");
  const maxId = rs.recordset && rs.recordset[0] ? rs.recordset[0].maxId : null;
  process.stdout.write(String(maxId ?? ""));
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    process.exit(1);
  });

