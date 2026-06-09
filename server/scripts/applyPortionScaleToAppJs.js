/**
 * Пересчёт порций: основные приёмы 300 г, полдник 250 г.
 * Масштабирует КБЖУ и числа «г/мл» в recipe и portionNote относительно прежних 275 / 200 г.
 * Перезаписывает массив mockData.dishes в ../../app.js
 */
const fs = require("fs");
const path = require("path");

const MAIN_OLD = 275;
const MAIN_NEW = 300;
const SNACK_OLD = 200;
const SNACK_NEW = 250;

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

function findMatchingSquareBracket(text, startIndex) {
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
    if (ch === "[") depth++;
    if (ch === "]") {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}

function extractMockDataObject(source) {
  const keyLet = "let mockData =";
  const startLet = source.indexOf(keyLet);
  if (startLet === -1) return null;
  const objStart = source.indexOf("{", startLet);
  if (objStart === -1) return null;
  const end = findMatchingBrace(source, objStart);
  if (end === -1) return null;
  const objectLiteral = source.slice(objStart, end + 1);
  return Function(`"use strict"; return (${objectLiteral});`)();
}

function scaleNumsInText(text, factor) {
  if (!text || typeof text !== "string") return text;
  return text.replace(/(\d+(?:[.,]\d+)?)(\s*)(г|мл)/gi, (_, num, sp, unit) => {
    const v = Number(String(num).replace(",", "."));
    if (!Number.isFinite(v)) return _;
    const scaled = Math.round(v * factor);
    return `${scaled}${sp}${unit}`;
  });
}

function factorForDish(category) {
  return category === "полдник" ? SNACK_NEW / SNACK_OLD : MAIN_NEW / MAIN_OLD;
}

function round1(x) {
  return Math.round(x * 10) / 10;
}

function dishToJsBlock(d) {
  const n = d.nutrition || {};
  const tags = JSON.stringify(d.profileTags || []);
  const ings = JSON.stringify(d.ingredients || []);
  const recipeStr = JSON.stringify(d.recipe || "");
  return `    {
      id: ${d.id},
      name: ${JSON.stringify(d.name)},
      category: ${JSON.stringify(d.category)},
      rating: ${d.rating},
      isFavorite: ${!!d.isFavorite},
      ingredients: ${ings},
      emoji: ${JSON.stringify(d.emoji)},
      profileTags: ${tags},
      nutrition: {
        kcal: ${n.kcal},
        protein: ${n.protein},
        fat: ${n.fat},
        carbs: ${n.carbs},
        portionNote: ${JSON.stringify(n.portionNote || "")},
      },
      recipe: ${recipeStr},
    }`;
}

function main() {
  const appJsPath = path.resolve(__dirname, "../../app.js");
  let source = fs.readFileSync(appJsPath, "utf-8");
  const mock = extractMockDataObject(source);
  if (!mock || !Array.isArray(mock.dishes)) {
    throw new Error("mockData.dishes not found");
  }

  const dishes = mock.dishes.map((d) => {
    const f = factorForDish(d.category);
    const n = d.nutrition ? { ...d.nutrition } : {};
    if (n.kcal != null) n.kcal = Math.round(Number(n.kcal) * f);
    if (n.protein != null) n.protein = round1(Number(n.protein) * f);
    if (n.fat != null) n.fat = round1(Number(n.fat) * f);
    if (n.carbs != null) n.carbs = round1(Number(n.carbs) * f);
    const label = d.category === "полдник" ? 250 : 300;
    const oldPrefix = n.portionNote || "";
    let detail = scaleNumsInText(oldPrefix, f).replace(/^порция\s*~\s*\d+\s*г\s*,?\s*/i, "").trim();
    n.portionNote = detail
      ? `порция ~${label} г — ${detail}`
      : `порция ~${label} г`;
    const recipe = scaleNumsInText(d.recipe || "", f);
    return { ...d, nutrition: n, recipe };
  });

  const startMarker = "  dishes: [";
  const startIdx = source.indexOf(startMarker);
  if (startIdx === -1) throw new Error("dishes: [ not found");
  const bracketStart = startIdx + startMarker.length - 1;
  const endIdx = findMatchingBrace(source, bracketStart);
  if (endIdx === -1) throw new Error("matching ] for dishes not found");

  const newDishesInner = dishes.map(dishToJsBlock).join(",\n");
  const newSection = `  dishes: [\n${newDishesInner},\n  ],`;

  const before = source.slice(0, startIdx);
  const after = source.slice(endIdx + 1);
  const tailNeedle = "\n\n  /** Пустой шаблон меню";
  const afterIdx = after.indexOf(tailNeedle);
  if (afterIdx === -1) {
    throw new Error("expected /** Пустой шаблон after dishes array");
  }
  const fixedAfter = after.slice(afterIdx);
  const out = before + newSection + fixedAfter;
  fs.writeFileSync(appJsPath, out, "utf-8");
  console.log("Updated", dishes.length, "dishes in app.js (300 g main / 250 g snack scale).");
}

main();
