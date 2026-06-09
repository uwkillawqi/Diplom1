const fs = require("fs");
const path = require("path");

let cache = null;

const ALIASES = {
  овсянка: "овсяные хлопья",
  "овсяная каша": "овсяные хлопья",
  "овсяная крупа": "овсяные хлопья",
  черника: "ягоды",
  голубика: "ягоды",
  малина: "ягоды",
  клубника: "ягоды",
  смородина: "ягоды",
  бананы: "банан",
  яйцо: "яйца",
  курица: "куриное филе",
  рис: "рис белый",
  творожный: "творог",
};

function loadRefs() {
  if (cache) return cache;
  const source = fs.readFileSync(
    path.join(__dirname, "../app.js"),
    "utf-8",
  );
  const nutritionById = extractNamedConst(source, "INGREDIENT_NUTRITION_REF") || {};
  const groupById = extractNamedConst(source, "INGREDIENT_GROUP_BY_ID") || {};
  const mockData = extractNamedConst(source, "mockData", ["const ", "let "]);
  const byName = new Map();
  for (const ing of mockData?.ingredients || []) {
    const key = ing.name.trim().toLowerCase();
    byName.set(key, {
      id: ing.id,
      name: ing.name,
      unit: ing.unit,
      group: groupById[ing.id] || "other",
      per100g: nutritionById[ing.id] || null,
    });
  }
  cache = { nutritionById, groupById, byName, aliases: ALIASES };
  return cache;
}

function extractNamedConst(source, name, prefixes = ["const "]) {
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

function normalizeName(name) {
  return String(name || "").trim().toLowerCase();
}

function lookupCatalogEntry(name) {
  const refs = loadRefs();
  const n = normalizeName(name);
  if (!n) return null;

  const alias = refs.aliases[n];
  if (alias && refs.byName.has(alias)) return refs.byName.get(alias);

  if (refs.byName.has(n)) return refs.byName.get(n);

  if (n.includes("овсян") && refs.byName.has("овсяные хлопья")) {
    return refs.byName.get("овсяные хлопья");
  }
  if (
    (n.includes("ягод") || n.includes("черник") || n.includes("голубик")) &&
    refs.byName.has("ягоды")
  ) {
    return refs.byName.get("ягоды");
  }

  for (const [key, entry] of refs.byName.entries()) {
    if (key.includes(n) || n.includes(key)) return entry;
  }
  return null;
}

function nutritionForNewIngredient(name, specPer100g) {
  if (specPer100g && typeof specPer100g === "object") return specPer100g;
  const entry = lookupCatalogEntry(name);
  return entry?.per100g || null;
}

function groupForNewIngredient(name, specGroup) {
  if (specGroup) return specGroup;
  const entry = lookupCatalogEntry(name);
  return entry?.group || "other";
}

module.exports = {
  loadRefs,
  lookupCatalogEntry,
  nutritionForNewIngredient,
  groupForNewIngredient,
};
