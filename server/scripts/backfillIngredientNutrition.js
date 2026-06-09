const { getPool, sql } = require("../db");
const {
  nutritionForNewIngredient,
  groupForNewIngredient,
} = require("../ingredientRefs");

async function main() {
  const pool = await getPool();
  const rs = await pool
    .request()
    .query(
      "SELECT id, name, [group], nutritionPer100g FROM dbo.Ingredients WHERE nutritionPer100g IS NULL OR LTRIM(RTRIM(nutritionPer100g)) = ''",
    );
  let updated = 0;
  for (const row of rs.recordset) {
    const per100g = nutritionForNewIngredient(row.name, null);
    if (!per100g) continue;
    const group = groupForNewIngredient(row.name, row.group);
    await pool
      .request()
      .input("id", sql.Int, row.id)
      .input("group", sql.NVarChar(50), group)
      .input("nutritionPer100g", sql.NVarChar(sql.MAX), JSON.stringify(per100g))
      .query(
        "UPDATE dbo.Ingredients SET [group] = @group, nutritionPer100g = @nutritionPer100g WHERE id = @id",
      );
    updated++;
  }
  console.log(`Updated ${updated} ingredients with nutrition data.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
