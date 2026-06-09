require("dotenv").config();

const { getPool } = require("../db");

async function main() {
  const pool = await getPool();
  const rs = await pool.request().query(`
    SELECT category, COUNT(1) AS cnt
    FROM dbo.Dishes
    WHERE isDeleted = 0
    GROUP BY category
    ORDER BY category
  `);
  const out = {};
  for (const row of rs.recordset || []) {
    out[String(row.category)] = Number(row.cnt) || 0;
  }
  process.stdout.write(JSON.stringify(out, null, 2));
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    process.exit(1);
  });

