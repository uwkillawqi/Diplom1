/** Расчёт КБЖУ порции по ingredientGrams и справочнику на 100 г/мл */

const PIECE_GRAMS = {
  3: 55,
  12: 75,
  13: 75,
  22: 60,
  28: 130,
  29: 250,
  30: 200,
  34: 35,
  35: 120,
  39: 150,
  48: 150,
};

const TBSP_GRAMS = 15;

function tbspToGrams(grams) {
  return grams > 0 && grams <= 20 ? grams * TBSP_GRAMS : grams;
}

function calcNutrition(ingredientGrams, nutritionRef) {
  let kcal = 0;
  let protein = 0;
  let fat = 0;
  let carbs = 0;
  let mass = 0;

  for (const row of ingredientGrams) {
    const id = Number(row.id);
    const grams = Number(row.grams);
    if (!Number.isFinite(id) || !Number.isFinite(grams) || grams <= 0) continue;
    const ref = nutritionRef[id];
    if (!ref) continue;
    const factor = grams / 100;
    kcal += ref.kcal * factor;
    protein += ref.protein * factor;
    fat += ref.fat * factor;
    carbs += ref.carbs * factor;
    mass += grams;
  }

  return {
    kcal: Math.round(kcal),
    protein: Math.round(protein * 10) / 10,
    fat: Math.round(fat * 10) / 10,
    carbs: Math.round(carbs * 10) / 10,
    portionNote: `порция ~${Math.round(mass)} г`,
  };
}

function formatIngredientLine(ing, grams) {
  if (!ing) return null;
  const g = Math.round(grams);
  if (ing.unit === "шт") {
    const pw = PIECE_GRAMS[ing.id] || 80;
    const n = Math.max(1, Math.round(g / pw));
    return `• ${ing.name} — ${n} шт`;
  }
  if (ing.unit === "мл") return `• ${ing.name} — ${g} мл`;
  if (ing.unit === "ст.л") {
    const tbsp = Math.max(1, Math.round(g / TBSP_GRAMS));
    return `• ${ing.name} — ${tbsp} ст.л.`;
  }
  return `• ${ing.name} — ${g} г`;
}

function buildRecipeText(dish, ingredientById) {
  const ingredientGrams = Array.isArray(dish.ingredientGrams)
    ? dish.ingredientGrams
    : [];
  const lines = ingredientGrams
    .map((row) => formatIngredientLine(ingredientById.get(row.id), row.grams))
    .filter(Boolean);
  const steps = Array.isArray(dish.steps) ? dish.steps : [];
  const usedProducts = lines.map((l) => l.replace(/^•\s*/, ""));
  return [
    dish.name,
    `Категория: ${dish.category}.`,
    "",
    "Ингредиенты на порцию:",
    ...lines,
    "",
    usedProducts.length
      ? `В этом рецепте используются: ${usedProducts.join("; ")}.`
      : "",
    "",
    "Приготовление:",
    ...steps.map((s, i) => `${i + 1}. ${s}`),
  ]
    .filter((line) => line !== "")
    .join("\n");
}

module.exports = {
  calcNutrition,
  buildRecipeText,
  formatIngredientLine,
};
