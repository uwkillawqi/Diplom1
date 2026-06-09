/**
 * Собирает data/dishes-catalog.json из вручную описанного data/curated-dishes.js
 */
const fs = require("fs");
const path = require("path");
const { calcNutrition, buildRecipeText } = require("../lib/catalogNutrition");

function extractFromAppJs() {
  const appJsPath = path.resolve(__dirname, "../../app.js");
  const source = fs.readFileSync(appJsPath, "utf-8");
  const mockData = extractNamedConstObject(source, "mockData", ["const ", "let "]);
  const nutritionRef =
    extractNamedConstObject(source, "INGREDIENT_NUTRITION_REF") || {};
  return { ingredients: mockData?.ingredients || [], nutritionRef };
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
  return Function(`"use strict"; return (${source.slice(objStart, end + 1)});`)();
}

function findMatchingBrace(text, startIndex) {
  let depth = 0;
  let inString = false;
  let quote = "";
  let escaped = false;
  for (let i = startIndex; i < text.length; i++) {
    const ch = text[i];
    if (inString) {
      if (escaped) escaped = false;
      else if (ch === "\\") escaped = true;
      else if (ch === quote) inString = false;
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

function main() {
  const curated = require("../../data/curated-dishes");
  const { ingredients, nutritionRef } = extractFromAppJs();
  const ingredientById = new Map(ingredients.map((i) => [i.id, i]));

  const dishes = curated.map((dish, index) => {
    const ingredientGrams = dish.ingredientGrams.map((row) => ({
      id: row.id,
      grams: row.grams,
    }));
    const ingredientsIds = ingredientGrams.map((x) => x.id);
    const nutrition = calcNutrition(ingredientGrams, nutritionRef);
    const recipe = buildRecipeText(
      { ...dish, ingredientGrams },
      ingredientById,
    );

    return {
      id: index + 1,
      name: dish.name,
      category: dish.category,
      rating: dish.rating ?? 4,
      emoji: dish.emoji || "🍽️",
      profileTags: dish.profileTags || ["balanced_energy"],
      ingredients: ingredientsIds,
      ingredientGrams,
      nutrition,
      recipe,
      isFavorite: false,
      isCustom: false,
    };
  });

  const outPath = path.join(__dirname, "../../data/dishes-catalog.json");
  fs.writeFileSync(outPath, JSON.stringify(dishes, null, 2), "utf-8");
  console.log(`Written ${dishes.length} curated dishes to ${outPath}`);
}

main();
