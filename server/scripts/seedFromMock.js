const fs = require("fs");
const path = require("path");
const { getPool, sql } = require("../db");

async function main() {
  const appJsPath = path.resolve(__dirname, "../../app.js");
  const source = fs.readFileSync(appJsPath, "utf-8");
  const mockData = extractMockDataObject(source);

  if (!mockData) {
    throw new Error("Не удалось извлечь mockData из app.js");
  }

  const groupById = extractNamedConstObject(source, "INGREDIENT_GROUP_BY_ID") || {};
  const nutritionById =
    extractNamedConstObject(source, "INGREDIENT_NUTRITION_REF") || {};
  const ingredients = (mockData.ingredients || []).map((ing) => ({
    ...ing,
    group: ing.group || groupById[ing.id] || "other",
    per100g: ing.per100g || nutritionById[ing.id] || null,
  }));

  const catalogPath = path.join(__dirname, "../../data/dishes-catalog.json");
  const catalogDishes = fs.existsSync(catalogPath)
    ? JSON.parse(fs.readFileSync(catalogPath, "utf-8"))
    : mockData.dishes || [];

  const pool = await getPool();
  await upsertIngredients(pool, ingredients);
  await upsertProfiles(pool, mockData.nutritionProfiles || []);

  await pool.request().query(`
    DELETE FROM dbo.DishIngredients WHERE dishId IN (SELECT id FROM dbo.Dishes WHERE isCustom = 0);
    DELETE FROM dbo.DishProfileTags WHERE dishId IN (SELECT id FROM dbo.Dishes WHERE isCustom = 0);
    DELETE FROM dbo.Dishes WHERE isCustom = 0;
    UPDATE dbo.Dishes SET isDeleted = 0 WHERE isCustom = 0;
  `);

  const profileByTag = Object.fromEntries(
    (mockData.nutritionProfiles || []).map((p) => [p.suitableFor, p.id]),
  );
  await upsertDishes(pool, catalogDishes);
  await syncDishIngredients(pool, catalogDishes);
  await syncDishProfileTags(pool, catalogDishes, profileByTag);
  console.log("Seed completed successfully.");
}

function extractMockDataObject(source) {
  return extractNamedConstObject(source, "mockData", ["const ", "let "]);
}

function extractNamedConstObject(source, name, prefixes = ["const "]) {
  let start = -1;
  for (const prefix of prefixes) {
    const key = `${prefix}${name} =`;
    const ix = source.indexOf(key);
    if (ix >= 0) {
      start = ix;
      break;
    }
  }
  if (start === -1) return null;
  const objStart = source.indexOf("{", start);
  if (objStart === -1) return null;
  const end = findMatchingBrace(source, objStart);
  if (end === -1) return null;
  const objectLiteral = source.slice(objStart, end + 1);
  return Function(`"use strict"; return (${objectLiteral});`)();
}

function findMatchingBrace(text, startIndex) {
  let depth = 0;
  let inString = false;
  let quote = "";
  let escaped = false;
  for (let i = startIndex; i < text.length; i++) {
    const ch = text[i];
    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (ch === "\\") {
        escaped = true;
      } else if (ch === quote) {
        inString = false;
        quote = "";
      }
      continue;
    }
    if (ch === '"' || ch === "'" || ch === "`") {
      inString = true;
      quote = ch;
      continue;
    }
    if (ch === "{") depth++;
    if (ch === "}") {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}

async function upsertIngredients(pool, rows) {
  for (const ing of rows) {
    const nutJson = ing.per100g ? JSON.stringify(ing.per100g) : null;
    await pool
      .request()
      .input("id", sql.Int, ing.id)
      .input("name", sql.NVarChar(200), ing.name)
      .input("unit", sql.NVarChar(30), ing.unit)
      .input("group", sql.NVarChar(50), ing.group || null)
      .input("nutritionPer100g", sql.NVarChar(sql.MAX), nutJson)
      .query(`
MERGE dbo.Ingredients AS target
USING (SELECT @id AS id) AS src
ON target.id = src.id
WHEN MATCHED THEN UPDATE SET
  name = @name, unit = @unit, [group] = @group, nutritionPer100g = @nutritionPer100g
WHEN NOT MATCHED THEN
  INSERT (id, name, unit, [group], nutritionPer100g) VALUES (@id, @name, @unit, @group, @nutritionPer100g);
`);
  }
}

async function upsertProfiles(pool, rows) {
  for (const p of rows) {
    await pool
      .request()
      .input("id", sql.Int, p.id)
      .input("name", sql.NVarChar(120), p.name)
      .input("description", sql.NVarChar(500), p.description || null)
      .input("suitableFor", sql.NVarChar(80), p.suitableFor)
      .query(`
MERGE dbo.NutritionProfiles AS target
USING (SELECT @id AS id) AS src
ON target.id = src.id
WHEN MATCHED THEN UPDATE SET
  name = @name, description = @description, suitableFor = @suitableFor
WHEN NOT MATCHED THEN
  INSERT (id, name, description, suitableFor) VALUES (@id, @name, @description, @suitableFor);
`);
  }
}

async function upsertDishes(pool, rows) {
  for (const d of rows) {
    await pool
      .request()
      .input("id", sql.Int, d.id)
      .input("name", sql.NVarChar(200), d.name)
      .input("category", sql.NVarChar(40), d.category)
      .input("rating", sql.Int, d.rating || 3)
      .input("emoji", sql.NVarChar(20), d.emoji || null)
      .input("profileTags", sql.NVarChar(sql.MAX), JSON.stringify(d.profileTags || []))
      .input("nutrition", sql.NVarChar(sql.MAX), JSON.stringify(d.nutrition || null))
      .input("recipe", sql.NVarChar(sql.MAX), d.recipe || "")
      .input("ingredientIds", sql.NVarChar(sql.MAX), JSON.stringify(d.ingredients || []))
      .input("isCustom", sql.Bit, d.isCustom ? 1 : 0)
      .query(`
MERGE dbo.Dishes AS target
USING (SELECT @id AS id) AS src
ON target.id = src.id
WHEN MATCHED THEN UPDATE SET
  name = @name, category = @category, rating = @rating, emoji = @emoji,
  profileTags = @profileTags, nutrition = @nutrition, recipe = @recipe,
  ingredientIds = @ingredientIds, isCustom = @isCustom
WHEN NOT MATCHED THEN
  INSERT (id, name, category, rating, emoji, profileTags, nutrition, recipe, ingredientIds, isCustom, isDeleted)
  VALUES (@id, @name, @category, @rating, @emoji, @profileTags, @nutrition, @recipe, @ingredientIds, @isCustom, 0);
`);
  }
}

async function syncDishProfileTags(pool, dishes, profileByTag) {
  for (const d of dishes) {
    const tags = Array.isArray(d.profileTags) ? d.profileTags : [];
    await pool
      .request()
      .input("dishId", sql.Int, Number(d.id))
      .query("DELETE FROM dbo.DishProfileTags WHERE dishId = @dishId");
    for (const tag of tags) {
      const profileId = profileByTag[tag];
      if (!profileId) continue;
      await pool
        .request()
        .input("dishId", sql.Int, Number(d.id))
        .input("profileId", sql.Int, profileId)
        .query(`
INSERT INTO dbo.DishProfileTags (dishId, profileId)
VALUES (@dishId, @profileId)
`);
    }
  }
}

async function syncDishIngredients(pool, dishes) {
  for (const d of dishes) {
    const links = Array.isArray(d.ingredients) ? d.ingredients : [];
    const gramsById = new Map(
      (Array.isArray(d.ingredientGrams) ? d.ingredientGrams : [])
        .map((x) => [Number(x.id), Number(x.grams)])
        .filter(([id]) => Number.isFinite(id)),
    );

    await pool
      .request()
      .input("dishId", sql.Int, Number(d.id))
      .query("DELETE FROM dbo.DishIngredients WHERE dishId = @dishId");

    for (const ingredientIdRaw of links) {
      const ingredientId = Number(ingredientIdRaw);
      if (!Number.isFinite(ingredientId)) continue;
      const gramsVal = gramsById.get(ingredientId);
      const grams = Number.isFinite(gramsVal) ? gramsVal : null;
      await pool
        .request()
        .input("dishId", sql.Int, Number(d.id))
        .input("ingredientId", sql.Int, ingredientId)
        .input("grams", sql.Decimal(10, 2), grams)
        .query(`
INSERT INTO dbo.DishIngredients (dishId, ingredientId, grams)
VALUES (@dishId, @ingredientId, @grams)
`);
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
