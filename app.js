/**
 * mockData — имитация таблиц БД (MS SQL), для последующей замены на API.
 * Связи: Dish.ingredients → Ingredient.id; Menu.dishId → Dish.id
 */

const DAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const MEAL_TYPES = ["завтрак", "второй завтрак", "обед", "полдник", "ужин"];
const MEAL_LABELS = {
  завтрак: "Завтрак",
  "второй завтрак": "Второй завтрак",
  обед: "Обед",
  полдник: "Полдник",
  ужин: "Ужин",
};
const CATEGORY_EMOJI = {
  завтрак: "🌅",
  "второй завтрак": "🌤️",
  обед: "🍽️",
  полдник: "🍎",
  ужин: "🌙",
};

let mockData = {
  ingredients: [
    { id: 1, name: "Молоко", unit: "мл" },
    { id: 2, name: "Овсяные хлопья", unit: "г" },
    { id: 3, name: "Яйца", unit: "шт" },
    { id: 4, name: "Бекон", unit: "г" },
    { id: 5, name: "Творог", unit: "г" },
    { id: 6, name: "Мука", unit: "г" },
    { id: 7, name: "Сахар", unit: "г" },
    { id: 8, name: "Гранола", unit: "г" },
    { id: 9, name: "Йогурт", unit: "г" },
    { id: 10, name: "Ягоды", unit: "г" },
    { id: 11, name: "Куриное филе", unit: "г" },
    { id: 12, name: "Морковь", unit: "шт" },
    { id: 13, name: "Лук", unit: "шт" },
    { id: 14, name: "Картофель", unit: "г" },
    { id: 15, name: "Гречка", unit: "г" },
    { id: 16, name: "Фарш", unit: "г" },
    { id: 17, name: "Паста", unit: "г" },
    { id: 18, name: "Сливки", unit: "мл" },
    { id: 19, name: "Пармезан", unit: "г" },
    { id: 20, name: "Лосось", unit: "г" },
    { id: 21, name: "Брокколи", unit: "г" },
    { id: 22, name: "Лимон", unit: "шт" },
    { id: 23, name: "Рыба (филе)", unit: "г" },
    { id: 24, name: "Зелень", unit: "г" },
    { id: 25, name: "Салат листовой", unit: "г" },
    { id: 26, name: "Сухарики", unit: "г" },
    { id: 27, name: "Соус Цезарь", unit: "мл" },
    { id: 28, name: "Перец болгарский", unit: "шт" },
    { id: 29, name: "Баклажан", unit: "шт" },
    { id: 30, name: "Кабачок", unit: "шт" },
    { id: 31, name: "Оливковое масло", unit: "ст.л" },
    { id: 32, name: "Киноа", unit: "г" },
    { id: 33, name: "Шпинат", unit: "г" },
    { id: 34, name: "Хлеб цельнозерновой", unit: "шт" },
    { id: 35, name: "Банан", unit: "шт" },
    { id: 36, name: "Арахисовая паста", unit: "ст.л" },
    { id: 37, name: "Тунец консервированный", unit: "г" },
    { id: 38, name: "Фасоль консервированная", unit: "г" },
    { id: 39, name: "Авокадо", unit: "шт" },
    { id: 40, name: "Семена льна", unit: "г" },
    { id: 41, name: "Греческий йогурт", unit: "г" },
    { id: 42, name: "Орехи грецкие", unit: "г" },
    { id: 43, name: "Сыр твёрдый", unit: "г" },
    { id: 44, name: "Индейка", unit: "г" },
    { id: 45, name: "Рис бурый", unit: "г" },
    { id: 46, name: "Тыква", unit: "г" },
    { id: 47, name: "Сельдь", unit: "г" },
    { id: 48, name: "Свёкла", unit: "шт" },
    { id: 49, name: "Сметана", unit: "ст.л" },
    { id: 50, name: "Горох", unit: "г" },
    { id: 51, name: "Яблоко", unit: "г" },
    { id: 52, name: "Семена чиа", unit: "г" },
    { id: 53, name: "Кефир", unit: "мл" },
    { id: 54, name: "Мёд", unit: "г" },
    { id: 55, name: "Ячменная крупа", unit: "г" },
    { id: 56, name: "Капуста белокочанная", unit: "г" },
    { id: 57, name: "Рис белый", unit: "г" },
    { id: 58, name: "Нут консервированный", unit: "г" },
    { id: 59, name: "Помидор", unit: "г" },
    { id: 60, name: "Цветная капуста", unit: "г" },
    { id: 61, name: "Какао-порошок", unit: "г" },
    { id: 62, name: "Курага", unit: "г" },
    { id: 63, name: "Лаваш", unit: "г" },
    { id: 64, name: "Семена подсолнечника", unit: "г" },
    { id: 65, name: "Огурец", unit: "г" },
    { id: 66, name: "Чечевица сухая", unit: "г" },
    { id: 67, name: "Молоко овсяное", unit: "мл" },
    { id: 68, name: "Молоко соевое", unit: "мл" },
    { id: 69, name: "Молоко миндальное", unit: "мл" },
    { id: 70, name: "Йогурт растительный", unit: "г" },
    { id: 71, name: "Тофу", unit: "г" },
  ],

  nutritionProfiles: [
    {
      id: 1,
      name: "Студент",
      description: "Бюджетные и быстрые в приготовлении блюда.",
      suitableFor: "budget_quick",
    },
    {
      id: 2,
      name: "Сотрудник организации",
      description: "Сбалансированные, энергичные блюда на рабочий день.",
      suitableFor: "balanced_energy",
    },
    {
      id: 3,
      name: "Пенсионер",
      description: "Лёгкие, полезные, щадящие блюда.",
      suitableFor: "light_gentle",
    },
    {
      id: 4,
      name: "Активный образ жизни",
      description: "Высококалорийные, белковые блюда для нагрузок.",
      suitableFor: "high_protein",
    },
    {
      id: 5,
      name: "Умственный труд",
      description: "Омега-3, витамины группы B — для концентрации.",
      suitableFor: "brain_focus",
    },
  ],

  /**
   * Блюда: profileTags соответствуют suitableFor профилей (многие ко многим логически).
   */
  dishes: [],

  /** Пустой шаблон меню — слоты заполняются из localStorage */
  menu: [],
};

/** Группы ингредиентов для списка покупок (как справочник в БД) */
const INGREDIENT_GROUP_ORDER = [
  "dairy",
  "meat",
  "fish",
  "vegetables",
  "fruits",
  "grains",
  "bakery",
  "nuts",
  "other",
];
const GROUP_LABELS_RU = {
  dairy: "Молочные продукты и яйца",
  meat: "Мясо и птица",
  fish: "Рыба и морепродукты",
  vegetables: "Овощи и зелень",
  fruits: "Фрукты и ягоды",
  grains: "Крупы, макароны, бобовые",
  bakery: "Хлеб и выпечка",
  nuts: "Орехи, семена, сухофрукты",
  other: "Прочее (соусы, специи)",
};

const INGREDIENT_GROUP_BY_ID = {
  1: "dairy",
  2: "grains",
  3: "dairy",
  4: "meat",
  5: "dairy",
  6: "bakery",
  7: "other",
  8: "grains",
  9: "dairy",
  10: "fruits",
  11: "meat",
  12: "vegetables",
  13: "vegetables",
  14: "vegetables",
  15: "grains",
  16: "meat",
  17: "grains",
  18: "dairy",
  19: "dairy",
  20: "fish",
  21: "vegetables",
  22: "fruits",
  23: "fish",
  24: "vegetables",
  25: "vegetables",
  26: "bakery",
  27: "other",
  28: "vegetables",
  29: "vegetables",
  30: "vegetables",
  31: "other",
  32: "grains",
  33: "vegetables",
  34: "bakery",
  35: "fruits",
  36: "other",
  37: "fish",
  38: "nuts",
  39: "fruits",
  40: "nuts",
  41: "dairy",
  42: "nuts",
  43: "dairy",
  44: "meat",
  45: "grains",
  46: "vegetables",
  47: "fish",
  48: "vegetables",
  49: "dairy",
  50: "vegetables",
  51: "fruits",
  52: "nuts",
  53: "dairy",
  54: "other",
  55: "grains",
  56: "vegetables",
  57: "grains",
  58: "nuts",
  59: "vegetables",
  60: "vegetables",
  61: "other",
  62: "fruits",
  63: "bakery",
  64: "nuts",
  65: "vegetables",
  66: "grains",
  67: "other",
  68: "other",
  69: "other",
  70: "other",
  71: "other",
};

/** КБЖУ на 100 г (или 100 мл для жидкостей в «г» строке таблиц — молоко/кефир) по справочникам, сопоставимым с официальными таблицами Роспотребнадзора / USDA FDC */
const INGREDIENT_NUTRITION_REF = {
  1: { kcal: 64, protein: 3.2, fat: 3.6, carbs: 4.8 },
  2: { kcal: 389, protein: 12.5, fat: 6.2, carbs: 69.1 },
  3: { kcal: 157, protein: 12.7, fat: 11.5, carbs: 0.7 },
  4: { kcal: 541, protein: 37.0, fat: 41.5, carbs: 1.4 },
  5: { kcal: 121, protein: 16.5, fat: 5.0, carbs: 1.8 },
  6: { kcal: 334, protein: 10.3, fat: 1.1, carbs: 71.5 },
  7: { kcal: 399, protein: 0.0, fat: 0.0, carbs: 99.8 },
  8: { kcal: 471, protein: 10.0, fat: 20.0, carbs: 66.0 },
  9: { kcal: 59, protein: 10.0, fat: 3.0, carbs: 3.6 },
  10: { kcal: 57, protein: 0.7, fat: 0.3, carbs: 14.5 },
  11: { kcal: 165, protein: 31.0, fat: 3.6, carbs: 0.0 },
  12: { kcal: 41, protein: 0.9, fat: 0.2, carbs: 7.2 },
  13: { kcal: 41, protein: 1.4, fat: 0.2, carbs: 9.3 },
  14: { kcal: 77, protein: 2.0, fat: 0.4, carbs: 16.7 },
  15: { kcal: 343, protein: 13.3, fat: 3.4, carbs: 71.5 },
  16: { kcal: 254, protein: 12.0, fat: 23.0, carbs: 0.0 },
  17: { kcal: 350, protein: 11.0, fat: 1.5, carbs: 71.7 },
  18: { kcal: 119, protein: 3.0, fat: 10.0, carbs: 4.5 },
  19: { kcal: 392, protein: 35.8, fat: 29.2, carbs: 3.2 },
  20: { kcal: 208, protein: 20.4, fat: 13.4, carbs: 0.0 },
  21: { kcal: 34, protein: 2.8, fat: 0.4, carbs: 6.6 },
  22: { kcal: 34, protein: 0.9, fat: 0.1, carbs: 3.0 },
  23: { kcal: 112, protein: 17.6, fat: 4.5, carbs: 0.0 },
  24: { kcal: 36, protein: 3.7, fat: 0.4, carbs: 7.6 },
  25: { kcal: 20, protein: 1.2, fat: 0.2, carbs: 3.1 },
  26: { kcal: 397, protein: 11.3, fat: 15.3, carbs: 60.3 },
  27: { kcal: 221, protein: 2.0, fat: 21.0, carbs: 7.0 },
  28: { kcal: 31, protein: 1.3, fat: 0.1, carbs: 6.9 },
  29: { kcal: 24, protein: 1.2, fat: 0.1, carbs: 5.1 },
  30: { kcal: 24, protein: 0.6, fat: 0.3, carbs: 5.7 },
  31: { kcal: 884, protein: 0.0, fat: 100.0, carbs: 0.0 },
  32: { kcal: 368, protein: 14.1, fat: 6.1, carbs: 64.2 },
  33: { kcal: 23, protein: 2.9, fat: 0.3, carbs: 2.0 },
  34: { kcal: 247, protein: 8.8, fat: 1.1, carbs: 50.1 },
  35: { kcal: 89, protein: 1.1, fat: 0.3, carbs: 23.0 },
  36: { kcal: 588, protein: 25.0, fat: 50.0, carbs: 20.0 },
  37: { kcal: 96, protein: 21.5, fat: 1.0, carbs: 0.0 },
  38: { kcal: 99, protein: 7.8, fat: 0.5, carbs: 17.1 },
  39: { kcal: 160, protein: 2.0, fat: 14.7, carbs: 8.5 },
  40: { kcal: 534, protein: 18.3, fat: 42.2, carbs: 28.9 },
  41: { kcal: 82, protein: 9.0, fat: 5.1, carbs: 4.0 },
  42: { kcal: 654, protein: 15.2, fat: 65.2, carbs: 13.7 },
  43: { kcal: 363, protein: 23.0, fat: 30.0, carbs: 0.0 },
  44: { kcal: 104, protein: 21.6, fat: 2.2, carbs: 0.2 },
  45: { kcal: 337, protein: 7.4, fat: 1.8, carbs: 72.9 },
  46: { kcal: 26, protein: 1.3, fat: 0.1, carbs: 6.5 },
  47: { kcal: 203, protein: 17.7, fat: 12.7, carbs: 0.0 },
  48: { kcal: 42, protein: 1.5, fat: 0.1, carbs: 8.8 },
  49: { kcal: 206, protein: 3.0, fat: 15.0, carbs: 3.0 },
  50: { kcal: 298, protein: 22.5, fat: 1.7, carbs: 49.5 },
  51: { kcal: 52, protein: 0.3, fat: 0.2, carbs: 14.0 },
  52: { kcal: 486, protein: 16.5, fat: 30.7, carbs: 7.7 },
  53: { kcal: 40, protein: 3.0, fat: 1.0, carbs: 4.0 },
  54: { kcal: 329, protein: 0.8, fat: 0.0, carbs: 81.0 },
  55: { kcal: 352, protein: 10.4, fat: 2.3, carbs: 66.4 },
  56: { kcal: 25, protein: 1.8, fat: 0.1, carbs: 4.7 },
  57: { kcal: 365, protein: 7.5, fat: 0.6, carbs: 78.9 },
  58: { kcal: 164, protein: 7.0, fat: 2.6, carbs: 19.5 },
  59: { kcal: 18, protein: 0.9, fat: 0.2, carbs: 3.9 },
  60: { kcal: 30, protein: 2.5, fat: 0.3, carbs: 4.2 },
  61: { kcal: 374, protein: 24.2, fat: 17.5, carbs: 31.5 },
  62: { kcal: 200, protein: 5.2, fat: 0.3, carbs: 51.0 },
  63: { kcal: 277, protein: 9.1, fat: 1.2, carbs: 56.0 },
  64: { kcal: 601, protein: 20.7, fat: 52.9, carbs: 10.5 },
  65: { kcal: 15, protein: 0.7, fat: 0.1, carbs: 2.5 },
  66: { kcal: 358, protein: 24.0, fat: 1.1, carbs: 63.0 },
  67: { kcal: 45, protein: 1.0, fat: 1.5, carbs: 7.0 }, // овсяное молоко
  68: { kcal: 33, protein: 3.3, fat: 1.8, carbs: 0.6 }, // соевое молоко
  69: { kcal: 15, protein: 0.6, fat: 1.2, carbs: 0.3 }, // миндальное молоко
  70: { kcal: 60, protein: 4.0, fat: 2.8, carbs: 5.5 }, // растительный йогурт
  71: { kcal: 76, protein: 8.0, fat: 4.8, carbs: 1.9 }, // тофу
};

mockData.ingredients.forEach((ing) => {
  const ref = INGREDIENT_NUTRITION_REF[ing.id];
  if (ref) ing.per100g = ref;
  ing.group = INGREDIENT_GROUP_BY_ID[ing.id] || "other";
});

const API_BASE = "/api";

/** Эмодзи блюд с сервера (GET /api/bootstrap → dishEmojis), иначе — из mockData */
let bootstrapDishEmojis = null;

/** Гостевые блюда только в памяти вкладки — пропадают при обновлении страницы */
let guestCustomDishesMemory = [];
/** Полный каталог (без пользовательских скрытий) */
let catalogDishesCache = [];
/** Удалённые пользовательские блюда с сервера */
let deletedCustomDishesCache = [];
/** Избранное и скрытые id — гость (память) / пользователь (с сервера) */
let guestFavoriteIds = new Set();
let guestHiddenIds = new Set();
let userFavoriteIds = new Set();
let userHiddenIds = new Set();

/** Один продукт для исключения (key уникален, не связан с другими вариантами того же id) */
function genOne(id, label) {
  return [{ key: `${id}:default`, label, patterns: [] }];
}

/**
 * Варианты исключения: каждый пункт — отдельно.
 * patterns — ключевые слова в названии/рецепте блюда;
 * genericOnly — только если нет совпадения с другими вариантами этого id.
 */
const GEN_EXCLUDE_VARIANTS = {
  1: genOne(1, "Молоко коровье"),
  2: genOne(2, "Овсяные хлопья"),
  3: genOne(3, "Яйцо куриное"),
  4: genOne(4, "Бекон"),
  5: genOne(5, "Творог"),
  6: genOne(6, "Мука пшеничная"),
  7: genOne(7, "Сахар"),
  8: genOne(8, "Гранола"),
  9: genOne(9, "Йогурт натуральный"),
  10: [
    { key: "10:малина", label: "Малина", patterns: ["малин"] },
    { key: "10:клубника", label: "Клубника", patterns: ["клубник"] },
    { key: "10:черника", label: "Черника", patterns: ["черник"] },
    { key: "10:смородина", label: "Смородина", patterns: ["смородин"] },
    { key: "10:голубика", label: "Голубика", patterns: ["голубик"] },
    {
      key: "10:смесь",
      label: "Ягодная смесь (без уточнения)",
      patterns: [],
      genericOnly: true,
    },
  ],
  11: genOne(11, "Куриное филе"),
  12: genOne(12, "Морковь"),
  13: genOne(13, "Лук репчатый"),
  14: genOne(14, "Картофель"),
  15: genOne(15, "Гречневая крупа"),
  16: [
    { key: "16:говяжий", label: "Фарш говяжий", patterns: ["говядин", "говяж"] },
    { key: "16:свиной", label: "Фарш свиной", patterns: ["свин"] },
    {
      key: "16:мясной",
      label: "Фарш мясной (без уточнения)",
      patterns: [],
      genericOnly: true,
    },
  ],
  17: genOne(17, "Макароны / паста"),
  18: genOne(18, "Сливки"),
  19: genOne(19, "Пармезан"),
  20: genOne(20, "Лосось"),
  21: genOne(21, "Брокколи"),
  22: genOne(22, "Лимон"),
  23: [
    { key: "23:треска", label: "Треска", patterns: ["треск"] },
    { key: "23:минтай", label: "Минтай", patterns: ["минтай"] },
    {
      key: "23:белая",
      label: "Рыба белая (без уточнения)",
      patterns: [],
      genericOnly: true,
    },
  ],
  24: [
    { key: "24:петрушка", label: "Петрушка", patterns: ["петрушк"] },
    { key: "24:укроп", label: "Укроп", patterns: ["укроп"] },
    {
      key: "24:зелень",
      label: "Зелень (без уточнения)",
      patterns: [],
      genericOnly: true,
    },
  ],
  25: genOne(25, "Салат листовой"),
  26: genOne(26, "Сухарики"),
  27: genOne(27, "Соус Цезарь"),
  28: genOne(28, "Болгарский перец"),
  29: genOne(29, "Баклажан"),
  30: genOne(30, "Кабачок"),
  31: genOne(31, "Оливковое масло"),
  32: genOne(32, "Киноа"),
  33: genOne(33, "Шпинат"),
  34: genOne(34, "Хлеб цельнозерновой"),
  35: genOne(35, "Банан"),
  36: genOne(36, "Арахисовая паста"),
  37: [
    { key: "37:масле", label: "Тунец в масле", patterns: ["в масле", "масле"] },
    {
      key: "37:сок",
      label: "Тунец в собственном соку",
      patterns: ["собствен", "соку"],
    },
    {
      key: "37:консерв",
      label: "Тунец консервированный",
      patterns: ["консервирован", "консерв"],
    },
    {
      key: "37:общий",
      label: "Тунец (без уточнения)",
      patterns: [],
      genericOnly: true,
    },
  ],
  38: genOne(38, "Фасоль консервированная"),
  39: genOne(39, "Авокадо"),
  40: genOne(40, "Семена льна"),
  41: genOne(41, "Греческий йогурт"),
  42: genOne(42, "Грецкие орехи"),
  43: genOne(43, "Сыр твёрдый"),
  44: genOne(44, "Индейка"),
  45: genOne(45, "Рис бурый"),
  46: genOne(46, "Тыква"),
  47: genOne(47, "Сельдь"),
  48: genOne(48, "Свёкла"),
  49: genOne(49, "Сметана"),
  50: genOne(50, "Горох сушёный"),
  51: genOne(51, "Яблоко"),
  52: genOne(52, "Семена чиа"),
  53: genOne(53, "Кефир"),
  54: genOne(54, "Мёд"),
  55: genOne(55, "Перловка"),
  56: genOne(56, "Капуста белокочанная"),
  57: genOne(57, "Рис белый"),
  58: genOne(58, "Нут"),
  59: genOne(59, "Помидор"),
  60: genOne(60, "Цветная капуста"),
  61: genOne(61, "Какао-порошок"),
  62: genOne(62, "Курага"),
  63: genOne(63, "Лаваш"),
  64: genOne(64, "Семена подсолнечника"),
  65: genOne(65, "Огурец"),
  66: [
    { key: "66:красная", label: "Чечевица красная", patterns: ["красн"] },
    { key: "66:зелёная", label: "Чечевица зелёная", patterns: ["зелён", "зелен"] },
    {
      key: "66:общая",
      label: "Чечевица (без уточнения)",
      patterns: [],
      genericOnly: true,
    },
  ],
  67: genOne(67, "Молоко овсяное"),
  68: genOne(68, "Молоко соевое"),
  69: genOne(69, "Молоко миндальное"),
  70: genOne(70, "Йогурт растительный"),
  71: genOne(71, "Тофу"),
};

function dishHasIngredientId(dish, ingredientId) {
  const id = Number(ingredientId);
  if (Array.isArray(dish.ingredients) && dish.ingredients.some((x) => Number(x) === id)) {
    return true;
  }
  if (Array.isArray(dish.ingredientGrams)) {
    return dish.ingredientGrams.some((row) => Number(row.id) === id);
  }
  return false;
}

function dishTextForExcludeMatch(dish) {
  return `${dish.name || ""}\n${dish.recipe || ""}`.toLowerCase();
}

/** Какие ключи исключения срабатывают для данного блюда и ингредиента */
function getDishExcludeKeysForIngredient(dish, ingredientId) {
  if (!dishHasIngredientId(dish, ingredientId)) return [];
  const variants = GEN_EXCLUDE_VARIANTS[ingredientId];
  if (!variants || !variants.length) return [`${ingredientId}:default`];

  const text = dishTextForExcludeMatch(dish);
  const matched = [];
  let hasSpecific = false;

  for (const v of variants) {
    if (v.patterns && v.patterns.length > 0) {
      if (v.patterns.some((p) => text.includes(p))) {
        matched.push(v.key);
        hasSpecific = true;
      }
    }
  }
  for (const v of variants) {
    if (v.genericOnly) {
      if (!hasSpecific) matched.push(v.key);
    } else if (!v.patterns || v.patterns.length === 0) {
      matched.push(v.key);
    }
  }
  return matched;
}

function dishMatchesExcludedProducts(dish, excludedKeys) {
  if (!excludedKeys.size) return false;
  const ingIds = new Set();
  (dish.ingredients || []).forEach((x) => ingIds.add(Number(x)));
  (dish.ingredientGrams || []).forEach((row) => ingIds.add(Number(row.id)));
  for (const ingId of ingIds) {
    if (!Number.isFinite(ingId)) continue;
    const keys = getDishExcludeKeysForIngredient(dish, ingId);
    if (keys.some((k) => excludedKeys.has(k))) return true;
  }
  return false;
}

const PALETTE_IDS = ["lavender", "mint", "rose", "sky"];

const DEFAULT_DISH_EMOJI_OPTIONS = [
  "🍽️",
  "🥣",
  "🍳",
  "🥞",
  "🫐",
  "🍲",
  "🍛",
  "🍝",
  "🐟",
  "🍋",
  "🥗",
  "🫑",
  "🍗",
  "🍞",
  "🥙",
  "🦃",
  "🎃",
  "🐠",
  "🥄",
  "🥜",
  "🧀",
  "🍚",
  "🥪",
  "🥤",
  "🥑",
  "🥕",
  "🥘",
  "🍏",
  "🍌",
  "🍓",
  "🍎",
  "🍫",
  "🥛",
  "🍖",
  "🌯",
  "🍜",
];

function populateDishEmojiSelect(selected) {
  const sel = document.getElementById("dish-emoji-select");
  if (!sel) return;
  const fromDishes = [
    ...new Set(mockData.dishes.map((d) => d.emoji).filter(Boolean)),
  ];
  const list =
    bootstrapDishEmojis && bootstrapDishEmojis.length > 0
      ? [...new Set(bootstrapDishEmojis)]
      : [...new Set([...DEFAULT_DISH_EMOJI_OPTIONS, ...fromDishes])];
  list.sort((a, b) => a.localeCompare(b, "ru"));
  sel.innerHTML = "";
  list.forEach((em) => {
    const o = document.createElement("option");
    o.value = em;
    o.textContent = em;
    sel.appendChild(o);
  });
  const pick =
    selected && list.includes(selected) ? selected : list[0] || "🍽️";
  sel.value = pick;
}

/** Раньше пользовательские блюда шли с id ≥ 10000; теперь id выдаёт сервер (MAX+1). */
const CUSTOM_DISH_ID_MIN = 10000;
const CUSTOM_INGREDIENT_ID_MIN = 1000;

const INGREDIENT_UNIT_OPTIONS = ["г", "мл", "шт", "ст.л.", "ч.л."];
const TBSP_GRAMS = 15;
const TSP_GRAMS = 5;

function normalizeIngredientUnit(unit) {
  const u = String(unit || "г")
    .trim()
    .toLowerCase();
  if (u === "гр" || u === "грамм" || u === "граммы") return "г";
  if (u.includes("ст.л")) return "ст.л.";
  if (u.includes("ч.л")) return "ч.л.";
  return u;
}

function fillIngredientUnitSelect(selectEl, value, locked) {
  if (!selectEl) return;
  const norm = normalizeIngredientUnit(value || "г");
  selectEl.innerHTML = "";
  INGREDIENT_UNIT_OPTIONS.forEach((u) => {
    const o = document.createElement("option");
    o.value = u;
    o.textContent = u;
    selectEl.appendChild(o);
  });
  if (!INGREDIENT_UNIT_OPTIONS.includes(norm)) {
    const o = document.createElement("option");
    o.value = norm;
    o.textContent = norm;
    selectEl.appendChild(o);
  }
  selectEl.value = INGREDIENT_UNIT_OPTIONS.includes(norm) ? norm : norm;
  selectEl.disabled = !!locked;
}

function updateIngredientAmountField(row) {
  const unit = normalizeIngredientUnit(getIngredientUnitFromRow(row));
  const amountEl = row.querySelector(".ingredient-row__grams");
  if (!amountEl) return;
  if (unit === "шт" || unit === "ст.л." || unit === "ч.л.") {
    amountEl.step = "0.5";
    amountEl.min = "0.5";
    amountEl.placeholder = unit;
  } else {
    amountEl.step = "1";
    amountEl.min = "1";
    amountEl.placeholder = unit === "мл" ? "мл" : "г";
  }
}

function amountToStoredGrams(amount, unit, ingredient) {
  const u = normalizeIngredientUnit(unit);
  const a = Number(amount);
  if (!Number.isFinite(a) || a <= 0) return 0;
  if (u === "г" || u === "мл") return a;
  if (u === "шт") return a * inferPieceWeightGrams(ingredient);
  if (u === "ст.л.") return a * TBSP_GRAMS;
  if (u === "ч.л.") return a * TSP_GRAMS;
  return a;
}

function storedGramsToDisplayAmount(grams, unit, ingredient) {
  const u = normalizeIngredientUnit(unit);
  const g = Number(grams);
  if (!Number.isFinite(g) || g <= 0) return "";
  if (u === "г" || u === "мл") return String(Math.round(g));
  if (u === "шт") {
    const pw = inferPieceWeightGrams(ingredient);
    return String(Math.round((g / pw) * 10) / 10);
  }
  if (u === "ст.л.") return String(Math.round((g / TBSP_GRAMS) * 10) / 10);
  if (u === "ч.л.") return String(Math.round((g / TSP_GRAMS) * 10) / 10);
  return String(Math.round(g));
}

const INGREDIENT_ALIASES = {
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
};

const STORAGE_KEYS = {
  favorites: "mealPlanner_favorites",
  menu: "mealPlanner_menu",
  ratings: "mealPlanner_ratings",
  profile: "mealPlanner_profile",
  shoppingList: "mealPlanner_shoppingList",
  shoppingChecks: "mealPlanner_shoppingChecks",
  customDishes: "mealPlanner_customDishes",
  customIngredients: "mealPlanner_customIngredients",
  theme: "mealPlanner_theme",
  genSettings: "mealPlanner_genSettings",
  deletedDishes: "mealPlanner_deletedDishes",
  userMetrics: "mealPlanner_userMetrics",
  generationNonce: "mealPlanner_generationNonce",
  palette: "mealPlanner_palette",
  authToken: "mealPlanner_authToken",
  authUser: "mealPlanner_authUser",
};

let currentAuthToken = null;
let currentAuthUser = null;
/** Меню гостя только в памяти — после обновления страницы слоты снова пустые */
let guestMenuCache = null;

/** Все ключи для резервного копирования */
const ALL_STORAGE_KEYS = [
  STORAGE_KEYS.favorites,
  STORAGE_KEYS.menu,
  STORAGE_KEYS.ratings,
  STORAGE_KEYS.profile,
  STORAGE_KEYS.shoppingList,
  STORAGE_KEYS.shoppingChecks,
  STORAGE_KEYS.customDishes,
  STORAGE_KEYS.customIngredients,
  STORAGE_KEYS.theme,
  STORAGE_KEYS.genSettings,
  STORAGE_KEYS.deletedDishes,
  STORAGE_KEYS.userMetrics,
  STORAGE_KEYS.generationNonce,
  STORAGE_KEYS.palette,
  STORAGE_KEYS.authToken,
  STORAGE_KEYS.authUser,
];

/** Утилиты localStorage */
function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function debounce(fn, ms) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}

function loadCustomIngredients() {
  return loadJSON(STORAGE_KEYS.customIngredients, []);
}

function saveCustomIngredients(list) {
  saveJSON(STORAGE_KEYS.customIngredients, list);
}

function loadGuestCustomDishes() {
  return guestCustomDishesMemory;
}

function saveGuestCustomDishes(list) {
  guestCustomDishesMemory = Array.isArray(list) ? list.map((d) => ({ ...d })) : [];
}

function clearGuestSessionState() {
  guestCustomDishesMemory = [];
  guestFavoriteIds = new Set();
  guestHiddenIds = new Set();
  try {
    localStorage.removeItem(STORAGE_KEYS.favorites);
    localStorage.removeItem(STORAGE_KEYS.customDishes);
    localStorage.removeItem(STORAGE_KEYS.deletedDishes);
    sessionStorage.removeItem("mealPlanner_guestCustomDishes");
  } catch {
    /* noop */
  }
}

function clearGuestCustomDishes() {
  clearGuestSessionState();
}

function loadCustomDishes() {
  if (getAuthUser()) {
    return (mockData.dishes || []).filter((d) => d.isCustom);
  }
  return loadGuestCustomDishes();
}

async function nextCustomDishId() {
  try {
    const resp = await fetch(`${API_BASE}/dishes/next-id`);
    if (resp.ok) {
      const data = await resp.json();
      if (data && Number.isFinite(Number(data.id))) return Number(data.id);
    }
  } catch {
    /* fallback */
  }
  const custom = loadCustomDishes();
  const all = [...mockData.dishes, ...custom];
  return Math.max(0, ...all.map((d) => d.id), 0) + 1;
}

function getIngredientById(id) {
  const fromMock = mockData.ingredients.find((i) => i.id === id);
  if (fromMock) return fromMock;
  return loadCustomIngredients().find((i) => i.id === id);
}

function getAllDishes() {
  const hidden = getHiddenIdsSet();
  const catalog = catalogDishesCache.filter((d) => !hidden.has(d.id));
  const custom = loadCustomDishes()
    .filter((d) => !hidden.has(d.id))
    .map((d) => ({ ...d, isCustom: true }));
  return [...catalog, ...custom];
}

function findDishSnapshotById(id) {
  const n = Number(id);
  return (
    catalogDishesCache.find((d) => d.id === n) ||
    loadCustomDishes().find((d) => d.id === n) ||
    deletedCustomDishesCache.find((d) => d.id === n) ||
    getAllDishes().find((d) => d.id === n)
  );
}

function getDishById(id) {
  return getAllDishes().find((d) => d.id === id);
}

function isCustomDish(id) {
  const d = getAllDishes().find((x) => x.id === id);
  if (d && d.isCustom) return true;
  if (loadGuestCustomDishes().some((x) => x.id === id)) return true;
  return (mockData.dishes || []).some((x) => x.id === id && x.isCustom);
}

function removeDishFromMenu(id) {
  const menu = loadMenu();
  let changed = false;
  menu.forEach((s) => {
    if (s.dishId === id) {
      s.dishId = null;
      s.portionGrams = null;
      changed = true;
    }
  });
  if (changed) saveMenu(menu);
}

async function deleteDish(id) {
  const dishId = Number(id);
  const snapshot = findDishSnapshotById(dishId);
  const custom = !!(snapshot && snapshot.isCustom);
  removeDishFromMenu(dishId);

  if (getAuthUser()) {
    if (custom) {
      await apiDeleteDish(dishId);
      await loadRemoteBootstrap();
    } else {
      userHiddenIds.add(dishId);
      await saveUserDishPrefs();
    }
  } else if (custom) {
    saveGuestCustomDishes(
      loadGuestCustomDishes().filter((d) => d.id !== dishId),
    );
  } else {
    guestHiddenIds.add(dishId);
  }
  refreshAll();
}

async function restoreDish(id) {
  const dishId = Number(id);
  const custom = deletedCustomDishesCache.some((d) => d.id === dishId);

  if (getAuthUser()) {
    if (custom) {
      await apiRestoreDish(dishId);
      await loadRemoteBootstrap();
    } else {
      userHiddenIds.delete(dishId);
      await saveUserDishPrefs();
    }
  } else {
    guestHiddenIds.delete(dishId);
  }
  refreshAll();
}

function getDeletedDishes() {
  const hidden = getHiddenIdsSet();
  const hiddenCatalog = catalogDishesCache.filter((d) => hidden.has(d.id));
  return [...hiddenCatalog, ...deletedCustomDishesCache];
}

async function apiDeleteDish(id) {
  const token = getAuthToken();
  if (!token) return;
  try {
    await fetch(`${API_BASE}/dishes/${id}/delete`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch {
    /* noop */
  }
}

async function apiRestoreDish(id) {
  const token = getAuthToken();
  if (!token) return;
  try {
    await fetch(`${API_BASE}/dishes/${id}/restore`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch {
    /* noop */
  }
}

async function apiUpsertCustomDish(dish, ingredientSpecs) {
  const token = getAuthToken();
  if (!token) return null;
  try {
    const resp = await fetch(`${API_BASE}/dishes/custom`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...dish,
        ingredientSpecs: ingredientSpecs || [],
      }),
    });
    if (!resp.ok) return null;
    return resp.json().catch(() => null);
  } catch {
    return null;
  }
}

function findCatalogIngredient(name, unit) {
  const n = String(name || "").trim().toLowerCase();
  const u = normalizeIngredientUnit(unit || "г");
  if (!n) return null;

  const aliasName = INGREDIENT_ALIASES[n];
  if (aliasName) {
    const aliased = mockData.ingredients.find(
      (i) => i.name.toLowerCase() === aliasName.toLowerCase(),
    );
    if (aliased) return aliased;
  }

  let found =
    mockData.ingredients.find(
      (i) =>
        i.name.toLowerCase() === n &&
        normalizeIngredientUnit(i.unit) === u,
    ) ||
    mockData.ingredients.find((i) => i.name.toLowerCase() === n);
  if (found) return found;

  if (n.includes("овсян")) {
    found = mockData.ingredients.find((i) => i.id === 2);
    if (found) return found;
  }
  if (n.includes("черник") || n.includes("голубик") || n.includes("ягод")) {
    found = mockData.ingredients.find((i) => i.id === 10);
    if (found) return found;
  }
  return null;
}

function enrichIngredientSpec(spec) {
  const fromCatalog = findCatalogIngredient(spec.name, spec.unit);
  const per100g = fromCatalog?.per100g || null;
  return {
    ...spec,
    group: spec.group || fromCatalog?.group || "other",
    ...(per100g ? { per100g } : {}),
  };
}

async function apiDeleteCustomDish(id) {
  try {
    await fetch(`${API_BASE}/dishes/custom/${id}/delete`, { method: "POST" });
  } catch {
    /* noop */
  }
}

async function deleteCustomDish(id) {
  await deleteDish(id);
}

function getCurrentProfile() {
  const pid = loadJSON(STORAGE_KEYS.profile, 2);
  return (
    mockData.nutritionProfiles.find((p) => p.id === pid) ||
    mockData.nutritionProfiles[1]
  );
}

function dishMatchesProfile(dish, profile) {
  if (dish.isCustom) return true;
  if (!profile || !profile.suitableFor) return true;
  if (profile.suitableFor === "budget_quick" && dish.category === "ужин")
    return true;
  return dish.profileTags && dish.profileTags.includes(profile.suitableFor);
}

function getFilteredDishes() {
  const p = getCurrentProfile();
  return getAllDishes().filter((d) => dishMatchesProfile(d, p));
}

function getRating(dishId) {
  const ratings = loadJSON(STORAGE_KEYS.ratings, {});
  const dish = getDishById(dishId);
  const def = dish ? dish.rating : 0;
  return ratings[dishId] !== undefined ? ratings[dishId] : def;
}

function setRating(dishId, value) {
  const ratings = loadJSON(STORAGE_KEYS.ratings, {});
  ratings[dishId] = value;
  saveJSON(STORAGE_KEYS.ratings, ratings);
}

function getFavoritesSet() {
  return getAuthUser() ? userFavoriteIds : guestFavoriteIds;
}

function getHiddenIdsSet() {
  return getAuthUser() ? userHiddenIds : guestHiddenIds;
}

function toggleFavorite(dishId) {
  const set = getFavoritesSet();
  const id = Number(dishId);
  if (set.has(id)) set.delete(id);
  else set.add(id);
  if (getAuthUser()) scheduleDishPrefsPush();
}

async function loadUserDishPrefs() {
  const token = getAuthToken();
  if (!token) return;
  try {
    const r = await fetch(`${API_BASE}/user/dish-prefs`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!r.ok) return;
    const data = await r.json();
    userFavoriteIds = new Set(
      (data.favoriteIds || []).map(Number).filter(Number.isFinite),
    );
    userHiddenIds = new Set(
      (data.hiddenIds || []).map(Number).filter(Number.isFinite),
    );
  } catch {
    /* noop */
  }
}

async function saveUserDishPrefs() {
  const token = getAuthToken();
  if (!token) return;
  try {
    await fetch(`${API_BASE}/user/dish-prefs`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        favoriteIds: [...userFavoriteIds],
        hiddenIds: [...userHiddenIds],
      }),
    });
  } catch {
    /* noop */
  }
}

const scheduleDishPrefsPush = debounce(() => {
  saveUserDishPrefs();
}, 500);

function isFavorite(dishId) {
  return getFavoritesSet().has(dishId);
}

/** Меню: массив { id, day, mealType, dishId } — id уникален для слота */
function createEmptyMenu() {
  let nid = 1;
  const rows = [];
  DAYS.forEach((day) => {
    MEAL_TYPES.forEach((mealType) => {
      rows.push({ id: nid++, day, mealType, dishId: null, portionGrams: null });
    });
  });
  return rows;
}

function menuUserStorageKey(userId) {
  return `mealPlanner_menu_user_${userId}`;
}

function getAuthToken() {
  return currentAuthToken;
}

function getAuthUser() {
  return currentAuthUser;
}

function setAuthSession(token, user) {
  currentAuthToken = token;
  currentAuthUser = user && user.id ? user : null;
  if (currentAuthToken && currentAuthUser) {
    localStorage.setItem(STORAGE_KEYS.authToken, currentAuthToken);
    saveJSON(STORAGE_KEYS.authUser, currentAuthUser);
  } else {
    localStorage.removeItem(STORAGE_KEYS.authToken);
    localStorage.removeItem(STORAGE_KEYS.authUser);
  }
}

function clearAuthSession() {
  currentAuthToken = null;
  currentAuthUser = null;
  localStorage.removeItem(STORAGE_KEYS.authToken);
  localStorage.removeItem(STORAGE_KEYS.authUser);
}

async function pushMenuToServerOnce(menu) {
  const token = getAuthToken();
  if (!token) return;
  try {
    await fetch(`${API_BASE}/user/menu`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ menu }),
    });
  } catch {
    /* сеть */
  }
}

const scheduleMenuPush = debounce((menu) => {
  pushMenuToServerOnce(menu);
}, 700);

function loadMenu() {
  const user = getAuthUser();
  if (user) {
    const saved = loadJSON(menuUserStorageKey(user.id), null);
    if (saved && Array.isArray(saved)) return saved;
    return createEmptyMenu();
  }
  if (guestMenuCache && Array.isArray(guestMenuCache)) return guestMenuCache;
  return createEmptyMenu();
}

function saveMenu(menu) {
  const user = getAuthUser();
  if (user) {
    saveJSON(menuUserStorageKey(user.id), menu);
    scheduleMenuPush(menu);
  } else {
    guestMenuCache = menu;
  }
}

async function fetchMenuFromApi() {
  const token = getAuthToken();
  if (!token) return null;
  const r = await fetch(`${API_BASE}/user/menu`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!r.ok) return null;
  const data = await r.json();
  return Object.prototype.hasOwnProperty.call(data, "menu") ? data.menu : null;
}

async function applyServerMenuToLocalUser(userId, serverMenu) {
  if (serverMenu && Array.isArray(serverMenu) && serverMenu.length > 0) {
    saveJSON(menuUserStorageKey(userId), serverMenu);
    return;
  }
  const empty = createEmptyMenu();
  saveJSON(menuUserStorageKey(userId), empty);
  await pushMenuToServerOnce(empty);
}

async function initAuthFromStorage() {
  const token = localStorage.getItem(STORAGE_KEYS.authToken);
  const savedUser = loadJSON(STORAGE_KEYS.authUser, null);
  if (!token || !savedUser || !savedUser.id) {
    currentAuthToken = null;
    currentAuthUser = null;
    return;
  }
  currentAuthToken = token;
  currentAuthUser = savedUser;
  let r;
  try {
    r = await fetch(`${API_BASE}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch {
    return;
  }
  if (r.status === 401) {
    clearAuthSession();
    return;
  }
  if (!r.ok) return;
  try {
    const data = await r.json();
    if (data.user) {
      currentAuthUser = data.user;
      saveJSON(STORAGE_KEYS.authUser, data.user);
    }
  } catch {
    return;
  }
  try {
    const mr = await fetch(`${API_BASE}/user/menu`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (mr.ok) {
      const md = await mr.json();
      await applyServerMenuToLocalUser(currentAuthUser.id, md.menu);
    }
  } catch {
    /* оставляем локальный кэш меню */
  }
  await loadUserDishPrefs();
}

function findMenuSlot(menu, day, mealType) {
  return menu.find((m) => m.day === day && m.mealType === mealType);
}

function setMenuDish(menu, day, mealType, dishId) {
  const slot = findMenuSlot(menu, day, mealType);
  if (slot) slot.dishId = dishId;
  if (slot && !dishId) slot.portionGrams = null;
  saveMenu(menu);
  return menu;
}

/** Drag state */
let dragPayload = null;

function getDragTrashEl() {
  return document.getElementById("drag-trash");
}

function setDragState(active) {
  document.body.classList.toggle("is-dragging", !!active);
  const trash = getDragTrashEl();
  if (trash) trash.hidden = !active;
  if (!active && trash) trash.classList.remove("is-active");
}

function clearDragState() {
  dragPayload = null;
  setDragState(false);
}

function removeMenuDishByPayload(data) {
  if (!data || data.type !== "menu" || !data.fromDay || !data.fromMeal) return false;
  const menu = loadMenu();
  const fromSlot = findMenuSlot(menu, data.fromDay, data.fromMeal);
  if (!fromSlot || !fromSlot.dishId) return false;
  fromSlot.dishId = null;
  fromSlot.portionGrams = null;
  saveMenu(menu);
  refreshAll();
  return true;
}

function showToast(message) {
  const el = document.getElementById("toast");
  el.textContent = message;
  el.classList.add("visible");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => el.classList.remove("visible"), 2200);
}

const NUTRITION_SOURCE_TEXT =
  "КБЖУ приведены для указанной порции и согласованы со справочными данными (USDA FoodData Central, таблицы энергетической ценности продуктов Роспотребнадзора; приближённые средние значения).";

const PROFILE_CALORIE_FACTORS = {
  budget_quick: 0.98,
  balanced_energy: 1,
  light_gentle: 0.9,
  high_protein: 1.12,
  brain_focus: 1.03,
};

const MAIN_PORTION_GRAMS = 300;
const SNACK_PORTION_GRAMS = 250;

function getTargetPortionGrams(category) {
  return category === "полдник" ? SNACK_PORTION_GRAMS : MAIN_PORTION_GRAMS;
}

function parsePortionGrams(portionNote, fallback) {
  const s = String(portionNote || "");
  const lead = s.match(/порция\s*~\s*(\d+(?:[.,]\d+)?)\s*г/i);
  if (lead) {
    const grams = Number(String(lead[1]).replace(",", "."));
    if (Number.isFinite(grams) && grams > 0) return grams;
  }
  let sumG = 0;
  for (const m of s.matchAll(/(\d+(?:[.,]\d+)?)\s*г/gi)) {
    sumG += Number(String(m[1]).replace(",", "."));
  }
  let sumMl = 0;
  for (const m of s.matchAll(/(\d+(?:[.,]\d+)?)\s*мл/gi)) {
    sumMl += Number(String(m[1]).replace(",", "."));
  }
  const total = sumG + sumMl;
  if (total > 0) return total;
  const one = s.match(/(\d+(?:[.,]\d+)?)\s*г/i);
  if (one) {
    const grams = Number(String(one[1]).replace(",", "."));
    if (Number.isFinite(grams) && grams > 0) return grams;
  }
  return fallback;
}

function getNormalizedDishNutrition(dish) {
  if (!dish || !dish.nutrition || dish.nutrition.kcal == null) return null;
  const n = dish.nutrition;
  const targetGrams = getTargetPortionGrams(dish.category);
  const fallbackBase = dish.category === "полдник" ? 250 : 300;
  const parsedGrams = parsePortionGrams(n.portionNote, fallbackBase);
  const minSource = dish.category === "полдник" ? 100 : 200;
  const maxSource = dish.category === "полдник" ? 400 : 500;
  const sourceGrams =
    parsedGrams >= minSource && parsedGrams <= maxSource
      ? parsedGrams
      : fallbackBase;
  if (!sourceGrams || sourceGrams <= 0) return null;
  // Линейный пересчёт на целевую порцию (300/250 г): КБЖУ ∝ граммы в исходных данных.
  const scale = targetGrams / sourceGrams;
  const kcal = Math.round((Number(n.kcal) || 0) * scale);
  return {
    kcal,
    protein: Number(((Number(n.protein) || 0) * scale).toFixed(1)),
    fat: Number(((Number(n.fat) || 0) * scale).toFixed(1)),
    carbs: Number(((Number(n.carbs) || 0) * scale).toFixed(1)),
    portionNote: `рекомендуемая порция ~${targetGrams} г`,
  };
}

function getUserMetrics() {
  return {
    gender: "male",
    height: 175,
    weight: 75,
    age: 30,
    activity: 1.55,
    goal: "maintain",
    ...loadJSON(STORAGE_KEYS.userMetrics, {}),
  };
}

function saveUserMetrics(partial) {
  saveJSON(STORAGE_KEYS.userMetrics, { ...getUserMetrics(), ...partial });
}

function mealKcalShare(mealType) {
  if (mealType === "завтрак") return 0.2;
  if (mealType === "второй завтрак") return 0.1;
  if (mealType === "обед") return 0.35;
  if (mealType === "полдник") return 0.15;
  return 0.2; // ужин
}

function calcCalorieTargets() {
  const m = getUserMetrics();
  const weight = Number(m.weight) || 75;
  const height = Number(m.height) || 175;
  const age = Number(m.age) || 30;
  const activity = Number(m.activity) || 1.55;
  const male = m.gender !== "female";
  const bmr = male
    ? 10 * weight + 6.25 * height - 5 * age + 5
    : 10 * weight + 6.25 * height - 5 * age - 161;
  const tdee = bmr * activity;
  const goalShift = m.goal === "lose" ? -450 : m.goal === "gain" ? 350 : 0;
  const profile = getCurrentProfile();
  const profileFactor = PROFILE_CALORIE_FACTORS[profile.suitableFor] || 1;
  const daily = Math.max(1200, Math.round((tdee + goalShift) * profileFactor));
  return { bmr: Math.round(bmr), tdee: Math.round(tdee), daily, weekly: daily * 7 };
}

function calcBmiInfo() {
  const m = getUserMetrics();
  const hM = (Number(m.height) || 175) / 100;
  const w = Number(m.weight) || 75;
  const bmi = w / (hM * hM);
  let status = "Норма";
  if (bmi < 18.5) status = "Дефицит";
  else if (bmi >= 25) status = "Профицит";
  return { bmi: Number(bmi.toFixed(1)), status };
}

function getAdjustedNutrition(dish) {
  // КБЖУ для стандартной порции (300/250 г), пересчитанные от граммовки в данных блюда — без масштаба «под цель дня».
  return getNormalizedDishNutrition(dish);
}

function getSlotPortionGrams(slot) {
  const base = getTargetPortionGrams(slot.mealType);
  const v = Number(slot.portionGrams);
  return Number.isFinite(v) && v > 0 ? v : base;
}

function clampPortionGrams(mealType, grams) {
  const g = Number(grams) || 0;
  // Разумные границы, чтобы попадать в цель без "сумасшедших" порций.
  const isSnack = mealType === "полдник";
  const min = isSnack ? 120 : 200;
  const max = isSnack ? 380 : 450;
  return Math.max(min, Math.min(max, Math.round(g)));
}

function getNutritionForSlot(dish, slot) {
  const base = getAdjustedNutrition(dish);
  if (!base || base.kcal == null) return null;
  const baseGrams = getTargetPortionGrams(dish.category);
  if (!baseGrams) return null;
  const grams = getSlotPortionGrams(slot);
  const factor = grams / baseGrams;
  return {
    kcal: Math.round((Number(base.kcal) || 0) * factor),
    protein: Number((Number(base.protein || 0) * factor).toFixed(1)),
    fat: Number((Number(base.fat || 0) * factor).toFixed(1)),
    carbs: Number((Number(base.carbs || 0) * factor).toFixed(1)),
    portionGrams: grams,
    portionNote: `рекомендуемая порция ~${Math.round(grams)} г`,
  };
}

function getMenuCaloriesByDay() {
  const menu = loadMenu();
  const byDay = {};
  DAYS.forEach((d) => {
    byDay[d] = 0;
  });
  menu.forEach((slot) => {
    if (!slot.dishId) return;
    const dish = getDishById(slot.dishId);
    if (!dish) return;
    const n = getNutritionForSlot(dish, slot);
    byDay[slot.day] += n && n.kcal ? Number(n.kcal) : 0;
  });
  return byDay;
}

function calculateDayCalories(menu, day) {
  return menu
    .filter((s) => s.day === day && s.dishId)
    .reduce((sum, slot) => {
      const dish = getDishById(slot.dishId);
      const n = dish ? getNutritionForSlot(dish, slot) : null;
      return sum + (n && n.kcal ? Number(n.kcal) : 0);
    }, 0);
}

function rebalanceDayPortions(menu, day) {
  if (!isDayFullyPlanned(menu, day)) return;
  const targetDaily = calcCalorieTargets().daily;
  const slots = menu.filter((s) => s.day === day && s.dishId);
  if (!slots.length) return;

  // Если раньше порции не были заданы — стартуем с "эталона" (300/250).
  slots.forEach((s) => {
    s.portionGrams = clampPortionGrams(s.mealType, getSlotPortionGrams(s));
  });

  let iter = 0;
  while (iter < 8) {
    const total = calculateDayCalories(menu, day);
    const diff = Math.abs(total - targetDaily);
    if (diff <= 100) return;
    if (!total) return;
    const factor = targetDaily / total;
    slots.forEach((s) => {
      const next = getSlotPortionGrams(s) * factor;
      s.portionGrams = clampPortionGrams(s.mealType, next);
    });
    iter += 1;
  }
}

function isDayFullyPlanned(menu, day) {
  return MEAL_TYPES.every((mealType) => {
    const slot = findMenuSlot(menu, day, mealType);
    return !!(slot && slot.dishId);
  });
}

function isWithinDailyTolerance(menu, day, targetDaily, tolerance = 100) {
  if (!isDayFullyPlanned(menu, day)) return true;
  const kcal = calculateDayCalories(menu, day);
  return Math.abs(kcal - targetDaily) <= tolerance;
}

function formatDishKbjuShort(dish) {
  const n = getAdjustedNutrition(dish);
  if (!n || n.kcal == null) return "";
  const kcal = Math.round(n.kcal);
  const p =
    n.protein != null ? Number(n.protein).toFixed(1).replace(/\.0$/, "") : "—";
  const f = n.fat != null ? Number(n.fat).toFixed(1).replace(/\.0$/, "") : "—";
  const c =
    n.carbs != null ? Number(n.carbs).toFixed(1).replace(/\.0$/, "") : "—";
  return `~${kcal} ккал · Б ${p} · Ж ${f} · У ${c}`;
}

function inferPieceWeightGrams(ingredient) {
  const name = String(ingredient?.name || "").toLowerCase();
  if (name.includes("яйц")) return 50;
  if (name.includes("яблоко")) return 150;
  if (name.includes("банан")) return 120;
  if (name.includes("помидор")) return 120;
  if (name.includes("огурец")) return 100;
  if (name.includes("перец")) return 120;
  if (name.includes("лук")) return 80;
  if (name.includes("морковь")) return 60;
  if (name.includes("лимон")) return 100;
  if (name.includes("баклажан")) return 250;
  if (name.includes("кабачок")) return 200;
  if (name.includes("свёк")) return 120;
  if (name.includes("капуста")) return 120;
  return 100;
}

function roundToStep(value, step) {
  return Math.round(value / step) * step;
}

function formatIngredientAmount(ing, grams) {
  const g = Math.max(0, Number(grams) || 0);
  const unit = String(ing?.unit || "г").toLowerCase();

  if (unit === "мл") return `${Math.round(g)} мл`;
  if (unit === "г" || unit === "гр") return `${Math.round(g)} г`;

  if (unit.includes("ст.л")) {
    const tbsp = g / 15; // усреднённо
    return `${Math.round(g)} г (≈${roundToStep(tbsp, 0.5)} ст.л.)`;
  }

  if (unit === "шт") {
    const pieceG = inferPieceWeightGrams(ing);
    const pieces = g / pieceG;
    return `${Math.round(g)} г (≈${roundToStep(pieces, 0.5)} шт)`;
  }

  return `${Math.round(g)} г`;
}

function guessCookingMethod(dish, ingredients) {
  const name = String(dish?.name || "").toLowerCase();
  const any = (s) => name.includes(s);
  if (any("суп") || any("бульон")) return "сварите/приготовьте до готовности";
  if (any("запеч") || any("запек")) return "запеките до румяности";
  if (any("сырник")) return "обжарьте сырники до золотистой корочки";
  if (any("омлет") || any("яичниц")) return "приготовьте на сковороде до готовности";
  if (any("салат")) return "нарежьте ингредиенты и смешайте";
  if (any("паста") || any("греч") || any("рис") || any("круп")) return "отварите основу до готовности";
  if (ingredients.some((i) => String(i?.name || "").toLowerCase().includes("рыба")))
    return "запеките или обжарьте рыбу до готовности";
  if (ingredients.some((i) => String(i?.name || "").toLowerCase().includes("кур"))) {
    return "обжарьте/запеките мясо до готовности и соберите блюдо";
  }
  return "приготовьте ингредиенты и соберите блюдо";
}

function buildCookingStepsDetailed(dish, ingredientPortions, portion) {
  const name = String(dish?.name || "").toLowerCase();
  const ingredients = ingredientPortions.map((x) => x.ing).filter(Boolean);
  const ingNames = ingredients.map((i) => String(i?.name || "").toLowerCase());
  const anyName = (s) => name.includes(s);
  const hasIng = (s) => ingNames.some((x) => x.includes(s));
  const findIng = (needle) =>
    ingredientPortions.find((x) =>
      String(x.ing?.name || "").toLowerCase().includes(String(needle).toLowerCase()),
    ) || null;
  const amt = (needle, fallback = "") => {
    const it = findIng(needle);
    return it ? it.amountText : fallback;
  };

  // Общая заготовка: шаг подготовки.
  const basePrep = `1) Подготовка: отмерьте ингредиенты по списку, при необходимости промойте/очистите и нарежьте.`;

  // Завтраки / перекусы: каши/пудинги/смуси/тосты/салаты
  if (anyName("овсян") && (anyName("каша") || anyName("каши"))) {
    const milk = amt("молоко", "молоко/вода");
    const oats = amt("овся", "овсяные хлопья");
    return [
      basePrep,
      `2) Налейте ${milk} в небольшую кастрюлю. Нагрейте на среднем огне до появления первых пузырьков по краям (почти кипение), не допускайте сильного «убегания».`,
      `3) Всыпьте ${oats}, перемешайте. Доведите до лёгкого кипения и уменьшите огонь до слабого.`,
      "4) Варите 5–7 минут, помешивая каждые 30–40 секунд (чтобы не пригорело).",
      `5) Снимите с огня, накройте крышкой и дайте настояться 2 минуты. Подайте порцию ~${Math.round(
        portion,
      )} г.`,
    ];
  }
  if ((anyName("рис") || anyName("рисов")) && anyName("каша")) {
    const milk = amt("молоко", "молоко/вода");
    const rice = amt("рис", "рис");
    return [
      basePrep,
      `2) Рис промойте до прозрачной воды (2–3 раза).`,
      `3) Налейте ${milk} в кастрюлю и нагрейте почти до кипения.`,
      `4) Добавьте ${rice}, перемешайте. Уменьшите огонь до минимального, чтобы каша едва «пыхтела».`,
      "5) Варите 20–25 минут, помешивая каждые 1–2 минуты (молочная каша легко пригорает).",
      `6) Снимите с огня, накройте и дайте постоять 5 минут. Подайте ~${Math.round(
        portion,
      )} г.`,
    ];
  }
  if ((anyName("ячмен") || anyName("перлов")) && anyName("каша")) {
    const milk = amt("молоко", "молоко/вода");
    const gr = amt("ячмен", "крупа");
    return [
      basePrep,
      "2) Крупу промойте 2–3 раза, чтобы убрать лишнюю пыль/крахмал.",
      `3) Налейте ${milk} в кастрюлю, нагрейте почти до кипения.`,
      `4) Добавьте ${gr}, перемешайте, уменьшите огонь до слабого.`,
      "5) Варите 25–35 минут под крышкой, помешивая каждые 2–3 минуты. Если густеет — добавьте 30–60 мл жидкости.",
      `6) Снимите с огня, дайте настояться 5 минут. Подайте ~${Math.round(
        portion,
      )} г.`,
    ];
  }
  if (anyName("киноа") && (anyName("каша") || anyName("круп"))) {
    const qn = amt("киноа", "киноа");
    return [
      basePrep,
      `2) Киноа промойте в мелком сите 20–30 секунд (это убирает горечь).`,
      `3) Переложите ${qn} в кастрюлю, залейте водой так, чтобы уровень был выше на 1–1.5 см. Доведите до кипения.`,
      "4) Уменьшите огонь до слабого и варите 12–15 минут до впитывания воды.",
      `5) Снимите с огня, накройте и дайте постоять 5 минут. Подайте ~${Math.round(
        portion,
      )} г.`,
    ];
  }

  if (anyName("overnight") || anyName("на ночь")) {
    return [
      basePrep,
      "2) В контейнере смешайте основу (хлопья/йогурт/молоко) до однородности.",
      "3) Накройте и уберите в холодильник минимум на 6–8 часов.",
      "4) Утром добавьте топпинги (ягоды/семена/мёд), перемешайте и подайте (~" +
        Math.round(portion) +
        " г).",
    ];
  }
  if (anyName("чиа")) {
    const chia = amt("чиа", "семена чиа");
    const base = amt("молоко", amt("йогурт", "молоко/йогурт"));
    return [
      basePrep,
      `2) Смешайте ${chia} с ${base}, хорошо перемешайте 30–40 секунд, чтобы не было комочков.`,
      "3) Подождите 10 минут и перемешайте ещё раз (это сильно улучшает текстуру).",
      "4) Уберите в холодильник на 2–3 часа (можно на ночь).",
      "5) Перед подачей добавьте фрукты/ягоды и подайте (~" + Math.round(portion) + " г).",
    ];
  }
  if (anyName("смузи")) {
    const liquid = amt("кефир", amt("молоко", "жидкая основа"));
    return [
      basePrep,
      `2) В чашу блендера добавьте ${liquid}, затем фрукты/ягоды/прочее.`,
      "3) Взбивайте 60–90 секунд до гладкой консистенции. Если густо — добавьте 20–40 мл жидкости и взбейте ещё 10–15 секунд.",
      "4) Перелейте в стакан и подайте сразу (~" + Math.round(portion) + " г).",
    ];
  }
  if (anyName("тост") || anyName("сэндвич") || anyName("бутерброд") || anyName("лаваш")) {
    return [
      basePrep,
      "2) Подсушите хлеб/лаваш: на сухой сковороде 30–60 секунд с каждой стороны или в тостере.",
      "3) Приготовьте начинку: разомните/нарежьте, при необходимости посолите и добавьте специи.",
      "4) Соберите: намажьте основу, выложите начинку слоями. При желании добавьте 1 ч.л. масла/соуса.",
      "5) Подавайте сразу (~" + Math.round(portion) + " г).",
    ];
  }
  if (anyName("салат")) {
    return [
      basePrep,
      "2) Нарежьте овощи/зелень, переложите в миску.",
      "3) Добавьте белковую часть (тунец/курица/нут/сыр) и перемешайте.",
      "4) Заправьте (масло/соус/йогурт) и ещё раз перемешайте 20–30 секунд.",
      "5) Подавайте сразу (~" + Math.round(portion) + " г).",
    ];
  }

  // Горячие блюда: супы/запекание/паста/крупы/омлет/тофу
  if (anyName("омлет") || anyName("яичниц") || anyName("скрэмбл") || hasIng("тофу")) {
    const isTofu = hasIng("тофу") || anyName("тофу");
    return [
      basePrep,
      "2) Разогрейте сковороду на среднем огне 1–2 минуты.",
      isTofu
        ? "3) Добавьте 1 ч.л. масла. Тофу разомните вилкой и обжаривайте 4–6 минут, помешивая.\n4) Добавьте овощи/зелень и готовьте ещё 2–3 минуты."
        : "3) Взбейте яйца 20–30 секунд (можно добавить 1–2 ст.л. молока/сливок).\n4) Вылейте на сковороду и готовьте 3–5 минут на слабом/среднем огне, помешивая или поднимая края.",
      `5) Посолите/приправьте в конце. Подавайте горячим (~${Math.round(portion)} г).`,
    ];
  }
  if (anyName("суп") || anyName("бульон")) {
    return [
      basePrep,
      "2) В кастрюле доведите воду до кипения. Если есть мясо — снимите пену после закипания.",
      "3) Добавьте основу: бобовые варите 15–25 минут до мягкости; мясо/птицу 20–30 минут до готовности.",
      "4) Добавьте овощи и варите ещё 10–15 минут. Посолите за 3–5 минут до конца.",
      "5) Если это крем‑суп: снимите с огня и пробейте блендером 20–40 секунд; при необходимости верните на огонь на 1–2 минуты.",
      `6) Дайте настояться 5 минут под крышкой и подайте (~${Math.round(portion)} г).`,
    ];
  }
  if (anyName("запеч") || anyName("запек")) {
    return [
      basePrep,
      "2) Разогрейте духовку до 180–200°C.",
      "3) Выложите ингредиенты в форму/на противень, при необходимости сбрызните 1–2 ч.л. масла и посолите.",
      "4) Запекайте до готовности: рыба 12–18 минут, курица/индейка 18–25 минут, овощи 20–30 минут.",
      `5) Дайте постоять 3 минуты и подайте (~${Math.round(portion)} г).`,
    ];
  }
  if (anyName("паста")) {
    return [
      basePrep,
      "2) Отварите пасту в подсоленной воде до al dente (обычно 8–11 минут). Сохраните 50–100 мл воды от пасты.",
      "3) На сковороде приготовьте соус/начинку 5–8 минут (бекон/курица/овощи).",
      "4) Смешайте пасту с соусом, добавьте немного воды от пасты для нужной консистенции, прогрейте 1–2 минуты.",
      "5) Подавайте горячим (~" + Math.round(portion) + " г).",
    ];
  }
  if (anyName("греч") || anyName("рис") || anyName("киноа") || anyName("круп")) {
    return [
      basePrep,
      "2) Отварите крупу: промойте, залейте водой и доведите до кипения. Варите до готовности (рис 15–18 мин, гречка 12–15 мин, киноа 12–15 мин).",
      "3) Параллельно приготовьте белковую часть: обжарьте на среднем огне 8–12 минут или запеките 18–25 минут до готовности.",
      "4) Смешайте/выложите на тарелку, добавьте зелень/овощи, по желанию 1 ч.л. масла.",
      "5) Подавайте (~" + Math.round(portion) + " г).",
    ];
  }

  // Фоллбек: чуть детальнее, чем раньше.
  const method = guessCookingMethod(dish, ingredients);
  const prepTime = dish?.category === "полдник" ? "10–15 минут" : "15–25 минут";
  return [
    basePrep,
    `2) Основной этап: ${method} (${prepTime}). Следите за готовностью по текстуре/цвету.`,
    "3) В конце доведите вкус: соль/специи/кислота (лимон) по желанию.",
    "4) Подавайте, порционируя на ~" + Math.round(portion) + " г.",
  ];
}

function buildDetailedRecipe(dish, portionGrams) {
  const p = Number(portionGrams) || getTargetPortionGrams(dish?.category) || 300;
  const portion = Math.round(p);
  const ingredientIds = Array.isArray(dish?.ingredients) ? dish.ingredients : [];
  const ingredients = ingredientIds.map(getIngredientById).filter(Boolean);
  if (!ingredients.length) return dish?.recipe || "Рецепт не указан.";

  // Распределяем массу между ингредиентами: первый (основа) больше, второй — средний, остальное — поровну.
  const count = ingredients.length;
  let weights = [];
  if (count === 1) {
    weights = [portion];
  } else if (count === 2) {
    weights = [portion * 0.55, portion * 0.45];
  } else {
    const wMain = portion * 0.42;
    const wSecond = portion * 0.28;
    const restTotal = portion - wMain - wSecond;
    const wRest = restTotal / (count - 2);
    weights = ingredients.map((_i, idx) => {
      if (idx === 0) return wMain;
      if (idx === 1) return wSecond;
      return wRest;
    });
  }

  // Дотягиваем последним ингредиентом сумму до порции (с учётом округлений дальше).
  if (weights.length) {
    const sum = weights.reduce((a, v) => a + v, 0);
    weights[weights.length - 1] += portion - sum;
  }

  const ingredientPortions = ingredients.map((ing, idx) => {
    // Округляем до «практичных» граммов.
    const g = roundToStep(weights[idx], 5);
    return { ing, grams: g, amountText: formatIngredientAmount(ing, g) };
  });
  const compositionLines = ingredientPortions.map(
    (x) => `- ${x.ing.name} — ${x.amountText}`,
  );

  const steps = buildCookingStepsDetailed(dish, ingredientPortions, portion);

  return `Подробный рецепт (на ~${portion} г)\nСостав:\n${compositionLines.join("\n")}\n\nПриготовление:\n${steps.join("\n")}`;
}

function openDishDetail(dishOrId, slot = null) {
  const dish = typeof dishOrId === "object" ? dishOrId : getDishById(dishOrId);
  if (!dish) return;
  const overlay = document.getElementById("dish-detail-modal");
  const title = document.getElementById("dish-detail-title");
  const body = document.getElementById("dish-detail-body");
  title.textContent = dish.name;
  body.innerHTML = "";

  const emojiRow = document.createElement("div");
  emojiRow.style.fontSize = "2.5rem";
  emojiRow.style.lineHeight = 1;
  emojiRow.style.marginBottom = "0.65rem";
  emojiRow.textContent = dish.emoji || "🍴";
  emojiRow.setAttribute("aria-hidden", "true");
  body.appendChild(emojiRow);

  const n = (slot ? getNutritionForSlot(dish, slot) : getAdjustedNutrition(dish)) || {};
  const hasKbju =
    n.kcal != null &&
    n.protein != null &&
    n.fat != null &&
    n.carbs != null &&
    !(
      Number(n.kcal) === 0 &&
      Number(n.protein) === 0 &&
      Number(n.fat) === 0 &&
      Number(n.carbs) === 0
    );

  if (hasKbju) {
    const grid = document.createElement("div");
    grid.className = "dish-kbju";
    const cells = [
      ["kcal", "Ккал", ""],
      ["protein", "Белки", "г"],
      ["fat", "Жиры", "г"],
      ["carbs", "Углеводы", "г"],
    ];
    cells.forEach(([key, lbl, suf]) => {
      const item = document.createElement("div");
      item.className = "dish-kbju__item";
      const val = document.createElement("div");
      val.className = "dish-kbju__val";
      const raw = n[key];
      if (key === "kcal") val.textContent = String(Math.round(Number(raw)));
      else val.textContent = String(Number(raw).toFixed(1)).replace(/\.0$/, "");
      const lab = document.createElement("div");
      lab.className = "dish-kbju__label";
      lab.textContent = suf ? `${lbl}, ${suf}` : lbl;
      item.appendChild(val);
      item.appendChild(lab);
      grid.appendChild(item);
    });
    body.appendChild(grid);
    if (n.portionNote) {
      const pn = document.createElement("p");
      pn.style.fontSize = "0.8rem";
      pn.style.color = "var(--text-muted)";
      pn.style.margin = "0 0 0.75rem";
      pn.textContent = n.portionNote;
      body.appendChild(pn);
    }
  } else {
    const miss = document.createElement("p");
    miss.className = "empty-hint";
    miss.style.textAlign = "left";
    miss.style.padding = "0.5rem 0";
    miss.textContent = "КБЖУ для этого блюда не указаны.";
    body.appendChild(miss);
  }

  const rh = document.createElement("h3");
  rh.style.fontSize = "0.9rem";
  rh.style.margin = "0 0 0.4rem";
  rh.textContent = "Рецепт приготовления";
  body.appendChild(rh);

  const recipeEl = document.createElement("div");
  recipeEl.className = "dish-recipe";
  const portionGrams = slot
    ? getSlotPortionGrams(slot)
    : getTargetPortionGrams(dish.category);
  const recipeText =
    dish?.recipe && String(dish.recipe).trim()
      ? dish.recipe
      : dish
        ? buildDetailedRecipe(dish, portionGrams)
        : "Рецепт не указан.";
  recipeEl.textContent = recipeText;
  body.appendChild(recipeEl);

  const src = document.createElement("p");
  src.className = "dish-nutrition-source";
  src.textContent = NUTRITION_SOURCE_TEXT;
  body.appendChild(src);

  overlay.hidden = false;
  document.getElementById("dish-detail-close").focus();
}

function closeDishDetail() {
  document.getElementById("dish-detail-modal").hidden = true;
}

function initDishDetailModal() {
  const overlay = document.getElementById("dish-detail-modal");
  document
    .getElementById("dish-detail-close")
    .addEventListener("click", closeDishDetail);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeDishDetail();
  });
  overlay.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDishDetail();
  });
}

function renderStarsInteractive(dishId) {
  const r = getRating(dishId);
  const wrap = document.createElement("div");
  wrap.className = "stars";
  wrap.setAttribute("role", "group");
  wrap.setAttribute("aria-label", `Рейтинг ${r} из 5`);
  for (let i = 1; i <= 5; i++) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "star" + (i <= r ? " filled" : "");
    btn.textContent = "★";
    btn.dataset.value = String(i);
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      setRating(dishId, i);
      refreshAll();
    });
    wrap.appendChild(btn);
  }
  return wrap;
}

function createDishCard(
  dish,
  {
    allowDrag = true,
    showCustomBadge = true,
    showEditDelete = false,
    showDeleteAction = false,
  } = {},
) {
  const card = document.createElement("article");
  card.className = "dish-card";
  card.dataset.dishId = String(dish.id);
  card.dataset.category = dish.category;
  card.tabIndex = 0;
  card.setAttribute(
    "aria-label",
    `${dish.name}. Нажмите, чтобы открыть КБЖУ и рецепт`,
  );
  if (allowDrag) {
    card.setAttribute("draggable", "true");
    card.addEventListener("dragstart", onDishDragStart);
    card.addEventListener("dragend", onDishDragEnd);
  }

  const emoji = document.createElement("div");
  emoji.className = "dish-card__emoji";
  emoji.textContent = dish.emoji || CATEGORY_EMOJI[dish.category] || "🍴";
  emoji.setAttribute("aria-hidden", "true");

  const main = document.createElement("div");
  main.className = "dish-card__main";

  const name = document.createElement("h3");
  name.className = "dish-card__name";
  name.appendChild(document.createTextNode(dish.name));
  if (showCustomBadge && dish.isCustom) {
    const b = document.createElement("span");
    b.className = "badge-custom";
    b.textContent = "моё";
    name.appendChild(b);
  }

  main.appendChild(name);

  const kbjuShort = formatDishKbjuShort(dish);
  if (kbjuShort) {
    const kh = document.createElement("p");
    kh.className = "dish-card__kbju-hint";
    kh.textContent = kbjuShort;
    main.appendChild(kh);
  }

  const stars = renderStarsInteractive(dish.id);

  const fav = document.createElement("button");
  fav.type = "button";
  fav.className = "btn-fav" + (isFavorite(dish.id) ? " is-favorite" : "");
  fav.textContent = isFavorite(dish.id) ? "❤️ В избранном" : "❤️ Любимое";
  fav.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleFavorite(dish.id);
    refreshAll();
  });

  main.appendChild(stars);
  main.appendChild(fav);

  if (showEditDelete && dish.isCustom) {
    const actions = document.createElement("div");
    actions.className = "dish-card__actions";
    const editBtn = document.createElement("button");
    editBtn.type = "button";
    editBtn.className = "btn-small";
    editBtn.textContent = "Изменить";
    editBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      openDishModal(dish.id);
    });
    const delBtn = document.createElement("button");
    delBtn.type = "button";
    delBtn.className = "btn-small btn-small--danger";
    delBtn.textContent = "Удалить";
    delBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (
        confirm(
          `Удалить блюдо «${dish.name}»? Оно попадёт во вкладку «Удалённые блюда».`,
        )
      ) {
        deleteCustomDish(dish.id).then(() => {
          showToast("Блюдо перемещено в удалённые.");
        });
      }
    });
    actions.appendChild(editBtn);
    actions.appendChild(delBtn);
    main.appendChild(actions);
  }

  if (showDeleteAction) {
    const actions = document.createElement("div");
    actions.className = "dish-card__actions";
    const delBtn = document.createElement("button");
    delBtn.type = "button";
    delBtn.className = "btn-small btn-small--danger";
    delBtn.textContent = "Удалить";
    delBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (
        confirm(
          `Удалить блюдо «${dish.name}»? Оно попадёт во вкладку «Удалённые блюда».`,
        )
      ) {
        deleteDish(dish.id).then(() => {
          showToast("Блюдо перемещено в удалённые.");
        });
      }
    });
    actions.appendChild(delBtn);
    main.appendChild(actions);
  }

  card.addEventListener("click", (e) => {
    if (card.dataset.dragJustEnded) return;
    if (e.target.closest("button")) return;
    if (e.target.closest(".stars")) return;
    openDishDetail(dish);
  });

  card.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const t = e.target;
    if (t.closest && (t.closest("button") || t.closest(".stars"))) return;
    e.preventDefault();
    openDishDetail(dish);
  });

  card.appendChild(emoji);
  card.appendChild(main);
  return card;
}

function onDishDragStart(e) {
  const id = Number(e.currentTarget.dataset.dishId);
  const cat = e.currentTarget.dataset.category;
  dragPayload = { type: "dish", dishId: id, category: cat };
  e.currentTarget.classList.add("dragging");
  setDragState(true);
  e.dataTransfer.effectAllowed = "copyMove";
  e.dataTransfer.setData("application/x-dish", JSON.stringify(dragPayload));
}

function onDishDragEnd(e) {
  e.currentTarget.classList.remove("dragging");
  setDragState(false);
  e.currentTarget.dataset.dragJustEnded = "1";
  setTimeout(() => delete e.currentTarget.dataset.dragJustEnded, 60);
}

function onCellDragStart(e) {
  const cell = e.currentTarget;
  const dishId = Number(cell.dataset.dishId);
  const dish = getDishById(dishId);
  if (!dish) return;
  dragPayload = {
    type: "menu",
    dishId: dish.id,
    category: dish.category,
    fromDay: cell.dataset.day,
    fromMeal: cell.dataset.mealType,
  };
  cell.classList.add("dragging");
  setDragState(true);
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData(
    "application/x-dish",
    JSON.stringify({ type: "menu", ...dragPayload }),
  );
}

function onCellDragEnd(e) {
  const cell = e.currentTarget;
  cell.classList.remove("dragging");
  setDragState(false);
  cell.dataset.dragJustEnded = "1";
  setTimeout(() => delete cell.dataset.dragJustEnded, 60);
}

function parseDragData(e) {
  try {
    const raw = e.dataTransfer.getData("application/x-dish");
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore */
  }
  return dragPayload;
}

function validateDrop(cellMealType, dishCategory) {
  return cellMealType === dishCategory;
}

function renderDishDatabase() {
  const container = document.getElementById("dish-database");
  container.innerHTML = "";
  // Вкладка "Все блюда" показывает базу целиком (не ограничиваем профилем),
  // чтобы в каждой категории было видно полный набор.
  const dishes = getAllDishes();
  const groups = Object.fromEntries(MEAL_TYPES.map((m) => [m, []]));
  dishes.forEach((d) => {
    if (groups[d.category]) groups[d.category].push(d);
  });

  MEAL_TYPES.forEach((cat) => {
    const list = groups[cat];
    if (!list.length) return;
    const sorted = [...list].sort((a, b) => {
      const ra = getRating(a.id);
      const rb = getRating(b.id);
      if (rb !== ra) return rb - ra;
      return String(a.name || "").localeCompare(String(b.name || ""), "ru");
    });
    const block = document.createElement("div");
    block.className = "category-block";
    const h = document.createElement("h3");
    h.className = "category-title";
    h.textContent = `${CATEGORY_EMOJI[cat]} ${MEAL_LABELS[cat]}`;
    const ul = document.createElement("div");
    ul.className = "dish-list";
    sorted
      .forEach((d) =>
        ul.appendChild(createDishCard(d, { showDeleteAction: true })),
      );
    block.appendChild(h);
    block.appendChild(ul);
    container.appendChild(block);
  });

  if (!dishes.length) {
    const p = document.createElement("p");
    p.className = "empty-hint";
    p.textContent = "Нет блюд для выбранного профиля. Смените профиль питания.";
    container.appendChild(p);
  }
}

function renderFavorites() {
  const container = document.getElementById("dish-favorites");
  container.innerHTML = "";
  const favIds = [...getFavoritesSet()];
  const dishes = favIds
    .map((id) => findDishSnapshotById(id))
    .filter(Boolean)
    .filter((d) => !getHiddenIdsSet().has(d.id));

  if (!dishes.length) {
    const p = document.createElement("p");
    p.className = "empty-hint";
    p.textContent = favIds.length
      ? "Некоторые избранные блюда скрыты или удалены."
      : "Пока нет любимых блюд. Отметьте сердечком в списке всех блюд.";
    container.appendChild(p);
    return;
  }

  const groups = Object.fromEntries(MEAL_TYPES.map((m) => [m, []]));
  dishes.forEach((d) => groups[d.category].push(d));

  MEAL_TYPES.forEach((cat) => {
    const list = groups[cat];
    if (!list.length) return;
    const block = document.createElement("div");
    block.className = "category-block";
    const h = document.createElement("h3");
    h.className = "category-title";
    h.textContent = `${CATEGORY_EMOJI[cat]} ${MEAL_LABELS[cat]}`;
    const ul = document.createElement("div");
    ul.className = "dish-list";
    list.forEach((d) => ul.appendChild(createDishCard(d)));
    block.appendChild(h);
    block.appendChild(ul);
    container.appendChild(block);
  });
}

function renderMyDishes() {
  const container = document.getElementById("dish-my-list");
  if (!container) return;
  container.innerHTML = "";
  const dishes = loadCustomDishes()
    .map((d) => ({ ...d, isCustom: true }))
    .filter((d) => dishMatchesProfile(d, getCurrentProfile()));

  if (!dishes.length) {
    const p = document.createElement("p");
    p.className = "empty-hint";
    p.textContent =
      loadCustomDishes().length > 0
        ? "Нет своих блюд для текущего профиля. Отредактируйте теги профилей или смените профиль."
        : getAuthUser()
          ? "Добавьте своё блюдо — оно появится здесь и в списке «Все блюда»."
          : "Добавьте своё блюдо (до обновления страницы). Войдите в аккаунт для постоянного хранения.";
    container.appendChild(p);
    return;
  }

  const groups = Object.fromEntries(MEAL_TYPES.map((m) => [m, []]));
  dishes.forEach((d) => groups[d.category].push(d));

  MEAL_TYPES.forEach((cat) => {
    const list = groups[cat];
    if (!list.length) return;
    const block = document.createElement("div");
    block.className = "category-block";
    const h = document.createElement("h3");
    h.className = "category-title";
    h.textContent = `${CATEGORY_EMOJI[cat]} ${MEAL_LABELS[cat]}`;
    const ul = document.createElement("div");
    ul.className = "dish-list";
    list.forEach((d) =>
      ul.appendChild(createDishCard(d, { showEditDelete: true })),
    );
    block.appendChild(h);
    block.appendChild(ul);
    container.appendChild(block);
  });
}

function renderDeletedDishes() {
  const container = document.getElementById("dish-deleted-list");
  if (!container) return;
  container.innerHTML = "";
  const dishes = getDeletedDishes();
  if (!dishes.length) {
    const p = document.createElement("p");
    p.className = "empty-hint";
    p.textContent = "Удаленных блюд пока нет.";
    container.appendChild(p);
    return;
  }
  const groups = Object.fromEntries(MEAL_TYPES.map((m) => [m, []]));
  dishes.forEach((d) => {
    if (groups[d.category]) groups[d.category].push(d);
  });
  MEAL_TYPES.forEach((cat) => {
    if (!groups[cat].length) return;
    const block = document.createElement("div");
    block.className = "category-block";
    const h = document.createElement("h3");
    h.className = "category-title";
    h.textContent = `${CATEGORY_EMOJI[cat]} ${MEAL_LABELS[cat]}`;
    const ul = document.createElement("div");
    ul.className = "dish-list";
    groups[cat].forEach((d) => {
      const card = createDishCard(d, { allowDrag: false, showCustomBadge: true });
      const actionWrap = document.createElement("div");
      actionWrap.className = "dish-card__actions";
      const restoreBtn = document.createElement("button");
      restoreBtn.type = "button";
      restoreBtn.className = "btn-small";
      restoreBtn.textContent = "Вернуть";
      restoreBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        restoreDish(d.id).then(() => {
          showToast("Блюдо возвращено в каталог.");
        });
      });
      actionWrap.appendChild(restoreBtn);
      card.querySelector(".dish-card__main").appendChild(actionWrap);
      ul.appendChild(card);
    });
    block.appendChild(h);
    block.appendChild(ul);
    container.appendChild(block);
  });
}

function renderPlanner() {
  const grid = document.getElementById("planner-grid");
  grid.innerHTML = "";
  const menu = loadMenu();

  const corner = document.createElement("div");
  corner.className = "planner-corner";
  corner.textContent = "Приём пищи";
  grid.appendChild(corner);

  DAYS.forEach((day) => {
    const head = document.createElement("div");
    head.className = "day-head";
    head.textContent = day;
    grid.appendChild(head);
  });

  MEAL_TYPES.forEach((mealType) => {
    const label = document.createElement("div");
    label.className = "meal-label";
    label.textContent = MEAL_LABELS[mealType];
    grid.appendChild(label);

    const mealIdx = MEAL_TYPES.indexOf(mealType);
    DAYS.forEach((day) => {
      const dayIdx = DAYS.indexOf(day);
      const slot = findMenuSlot(menu, day, mealType);
      const cell = document.createElement("div");
      cell.className = "drop-cell";
      cell.dataset.day = day;
      cell.dataset.mealType = mealType;
      cell.dataset.dayIndex = String(dayIdx);
      cell.dataset.mealIndex = String(mealIdx);
      cell.dataset.expectedCategory = mealType;
      cell.tabIndex = 0;
      cell.setAttribute("role", "gridcell");
      cell.setAttribute(
        "aria-label",
        `${day}, ${MEAL_LABELS[mealType]}${slot && slot.dishId ? ", " + (getDishById(slot.dishId)?.name || "") : ", пусто"}`,
      );
      cell.addEventListener("dragover", onCellDragOver);
      cell.addEventListener("dragleave", onCellDragLeave);
      cell.addEventListener("drop", onCellDrop);

      if (slot && slot.dishId) {
        const dish = getDishById(slot.dishId);
        if (dish) {
          cell.dataset.dishId = String(dish.id);
          cell.setAttribute("draggable", "true");
          cell.addEventListener("dragstart", onCellDragStart);
          cell.addEventListener("dragend", onCellDragEnd);
          cell.innerHTML = "";
          const inner = document.createElement("div");
          inner.className = "drop-cell__dish";
          const grams = getSlotPortionGrams(slot);
          const nu = getNutritionForSlot(dish, slot);
          const kcalTxt = nu && nu.kcal ? `~${Math.round(nu.kcal)} ккал` : "";
          inner.innerHTML = `<span class="drop-cell__dish-emoji">${dish.emoji || "🍴"}</span><span class="drop-cell__dish-name">${escapeHtml(dish.name)}</span><span class="drop-cell__dish-meta">${Math.round(grams)} г${kcalTxt ? ` · ${kcalTxt}` : ""}</span>`;
          inner.style.cursor = "pointer";
          inner.addEventListener("click", (e) => {
            e.stopPropagation();
            const c = inner.closest(".drop-cell");
            if (c && c.dataset.dragJustEnded) return;
            openDishDetail(dish, slot);
          });
          cell.appendChild(inner);
        } else {
          cell.removeAttribute("draggable");
          delete cell.dataset.dishId;
          cell.innerHTML = `<div class="drop-cell__placeholder">Перетащите блюдо</div>`;
        }
      } else {
        cell.removeAttribute("draggable");
        delete cell.dataset.dishId;
        cell.innerHTML = `<div class="drop-cell__placeholder">Перетащите блюдо</div>`;
      }

      cell.addEventListener("keydown", (e) => {
        const id = cell.dataset.dishId;
        if (e.key === "Enter") {
        if (!id) return;
        e.preventDefault();
        const d = getDishById(Number(id));
        if (d) openDishDetail(d);
          return;
        }
        if (e.key === "Delete" || e.key === "Backspace") {
          if (!id) return;
          e.preventDefault();
          setMenuDish(menu, day, mealType, null);
          refreshAll();
        }
      });

      grid.appendChild(cell);
    });
  });
}

function escapeHtml(s) {
  const div = document.createElement("div");
  div.textContent = s;
  return div.innerHTML;
}

function onCellDragOver(e) {
  e.preventDefault();
  const cell = e.currentTarget;
  const mealType = cell.dataset.mealType;
  const data =
    dragPayload ||
    (() => {
      try {
        return JSON.parse(e.dataTransfer.getData("application/x-dish"));
      } catch {
        return null;
      }
    })();
  if (!data || !data.dishId) {
    e.dataTransfer.dropEffect = "none";
    return;
  }
  const dish = getDishById(data.dishId);
  if (!dish) return;
  const ok = validateDrop(mealType, dish.category);
  cell.classList.toggle("drag-over-valid", ok);
  cell.classList.toggle("drag-over-invalid", !ok);
  e.dataTransfer.dropEffect = ok ? "move" : "none";
}

function onCellDragLeave(e) {
  const cell = e.currentTarget;
  cell.classList.remove("drag-over-valid", "drag-over-invalid");
}

function onCellDrop(e) {
  e.preventDefault();
  const cell = e.currentTarget;
  cell.classList.remove("drag-over-valid", "drag-over-invalid");
  const data = parseDragData(e);
  if (!data || !data.dishId) return;

  const dish = getDishById(data.dishId);
  if (!dish) return;
  const day = cell.dataset.day;
  const mealType = cell.dataset.mealType;

  if (!validateDrop(mealType, dish.category)) {
    showToast(
      `Нельзя: «${dish.name}» — это ${MEAL_LABELS[dish.category].toLowerCase()}, слот — ${MEAL_LABELS[mealType].toLowerCase()}.`,
    );
    clearDragState();
    return;
  }

  // Ручной выбор пользователя приоритетнее профильного фильтра:
  // если категория слота подходит, разрешаем перетаскивание.

  let menu = loadMenu();
  const targetSlot = findMenuSlot(menu, day, mealType);

  if (data.type === "menu" && data.fromDay !== undefined) {
    const fromSlot = findMenuSlot(menu, data.fromDay, data.fromMeal);
    if (fromSlot && targetSlot) {
      if (data.fromDay === day && data.fromMeal === mealType) {
        clearDragState();
        return;
      }
      const movingId = fromSlot.dishId;
      const targetId = targetSlot.dishId;

      if (targetId && movingId) {
        const movingDish = getDishById(movingId);
        const targetDish = getDishById(targetId);
        if (
          movingDish &&
          targetDish &&
          movingDish.category !== targetDish.category
        ) {
          showToast("Обмен невозможен: разные категории приёмов пищи.");
          clearDragState();
          return;
        }
      }

      fromSlot.dishId = targetId;
      fromSlot.portionGrams = null;
      targetSlot.dishId = movingId;
      targetSlot.portionGrams = null;
    }
  } else {
    if (targetSlot) {
      targetSlot.dishId = dish.id;
      targetSlot.portionGrams = null;
    }
  }

  const targetDaily = calcCalorieTargets().daily;

  saveMenu(menu);
  rebalanceDayPortions(menu, day);
  saveMenu(menu);
  clearDragState();
  if (isDayFullyPlanned(menu, day) && !isWithinDailyTolerance(menu, day, targetDaily, 100)) {
    const current = Math.round(calculateDayCalories(menu, day));
    showToast(`Внимание: ${day} сейчас ~${current} ккал, цель ${targetDaily}.`);
  }
  refreshAll();
}

function getGenSettings() {
  const def = {
    maxRepeat: 2,
    minRating: 1,
    avoidAdjacent: true,
    preferRating: true,
    excludedProductKeys: [],
  };
  const stored = loadJSON(STORAGE_KEYS.genSettings, {});
  const keys = Array.isArray(stored.excludedProductKeys)
    ? stored.excludedProductKeys
    : [];
  return { ...def, ...stored, excludedProductKeys: keys };
}

function saveGenSettings(partial) {
  const cur = getGenSettings();
  saveJSON(STORAGE_KEYS.genSettings, { ...cur, ...partial });
}

function getExcludedProductKeysSet() {
  const s = getGenSettings();
  const arr = Array.isArray(s.excludedProductKeys) ? s.excludedProductKeys : [];
  return new Set(arr.map((x) => String(x)).filter(Boolean));
}

function collectIngredientIdsUsedInCatalog() {
  const ids = new Set();
  const addDish = (d) => {
    if (!d) return;
    (d.ingredients || []).forEach((raw) => {
      const id = Number(raw);
      if (Number.isFinite(id)) ids.add(id);
    });
    (d.ingredientGrams || []).forEach((row) => {
      const id = Number(row.id);
      if (Number.isFinite(id)) ids.add(id);
    });
  };
  catalogDishesCache.forEach(addDish);
  (mockData.dishes || []).forEach(addDish);
  getAllDishes().forEach(addDish);
  return ids;
}

function getGenExcludeProductOptions() {
  const used = collectIngredientIdsUsedInCatalog();
  const options = [];
  for (const id of used) {
    const variants = GEN_EXCLUDE_VARIANTS[id];
    if (variants && variants.length) {
      variants.forEach((v) => {
        options.push({ key: v.key, label: v.label, ingredientId: id });
      });
      continue;
    }
    const ing = getIngredientById(id);
    if (!ing) continue;
    options.push({
      key: `${id}:default`,
      label: ing.name,
      ingredientId: id,
    });
  }
  options.sort((a, b) => a.label.localeCompare(b.label, "ru"));
  return options;
}

function renderExcludeIngredientsList() {
  const root = document.getElementById("gen-exclude-list");
  if (!root) return;
  const input = document.getElementById("gen-exclude-search");
  const q = String(input && input.value ? input.value : "")
    .trim()
    .toLowerCase();
  const selected = getExcludedProductKeysSet();

  const list = getGenExcludeProductOptions().filter(
    (item) => !q || item.label.toLowerCase().includes(q),
  );

  root.innerHTML = "";
  if (!list.length) {
    const p = document.createElement("p");
    p.className = "empty-hint";
    p.style.padding = "0.75rem 0.5rem";
    p.style.margin = 0;
    p.style.textAlign = "left";
    p.textContent = q
      ? "Ничего не найдено по этому запросу."
      : "Нет продуктов из каталога блюд.";
    root.appendChild(p);
    return;
  }

  list.forEach((item) => {
    const label = document.createElement("label");
    label.className = "gen-exclude-item";
    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.value = item.key;
    cb.checked = selected.has(item.key);
    cb.addEventListener("change", () => {
      const cur = getExcludedProductKeysSet();
      if (cb.checked) cur.add(item.key);
      else cur.delete(item.key);
      saveGenSettings({ excludedProductKeys: [...cur] });
      renderExcludeIngredientsList();
    });
    const name = document.createElement("span");
    name.textContent = item.label;
    label.appendChild(cb);
    label.appendChild(name);
    root.appendChild(label);
  });
}

/** Разнообразие + лимит повторов + опционально приоритет рейтинга */
function pickSmart(pool, counts, settings, lastPlacedMeal, rng = Math.random) {
  const maxR = Math.max(1, Math.min(28, settings.maxRepeat || 2));
  let pool2 = pool.filter((d) => (counts[d.id] ?? 0) < maxR);
  if (settings.avoidAdjacent && lastPlacedMeal != null) {
    const filtered = pool2.filter((d) => d.id !== lastPlacedMeal);
    if (filtered.length) pool2 = filtered;
  }
  if (!pool2.length) return null;
  const minCount = Math.min(...pool2.map((d) => counts[d.id] ?? 0));
  let candidates = pool2.filter((d) => (counts[d.id] ?? 0) === minCount);
  if (settings.preferRating) {
    candidates = [...candidates].sort(
      (a, b) => getRating(b.id) - getRating(a.id),
    );
    const topN = Math.max(1, Math.ceil(candidates.length / 2));
    candidates = candidates.slice(0, topN);
  }
  return candidates[Math.floor(rng() * candidates.length)];
}

function pickSmartByTarget(
  pool,
  counts,
  settings,
  lastPlacedMeal,
  targetMealKcal,
  forbiddenDishIds = [],
  rng = Math.random,
) {
  const base = pickSmart(pool, counts, settings, lastPlacedMeal, rng);
  if (!base) return null;
  const maxR = Math.max(1, Math.min(28, settings.maxRepeat || 2));
  let candidatePool = pool.filter((d) => (counts[d.id] ?? 0) < maxR);
  if (forbiddenDishIds && forbiddenDishIds.length) {
    const withoutForbidden = candidatePool.filter(
      (d) => !forbiddenDishIds.includes(d.id),
    );
    if (withoutForbidden.length) candidatePool = withoutForbidden;
  }
  if (settings.avoidAdjacent && lastPlacedMeal != null) {
    const filtered = candidatePool.filter((d) => d.id !== lastPlacedMeal);
    if (filtered.length) candidatePool = filtered;
  }
  if (!candidatePool.length) candidatePool = pool;
  const scored = candidatePool
    .map((d) => {
      const n = getAdjustedNutrition(d);
      const kcal = n && n.kcal ? Number(n.kcal) : 0;
      const diff = Math.abs(kcal - targetMealKcal);
      const usagePenalty = (counts[d.id] ?? 0) * 90;
      const ratingBonus = settings.preferRating ? getRating(d.id) * 3 : 0;
      return { d, score: diff + usagePenalty - ratingBonus };
    })
    .sort((a, b) => a.score - b.score);
  const top = scored.slice(0, Math.max(1, Math.min(6, scored.length)));
  return (top[Math.floor(rng() * top.length)] || { d: base }).d;
}

function shuffleArray(arr, rng = Math.random) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function hashStringToInt(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function createSeededRng(seedInt) {
  let x = seedInt || 123456789;
  return () => {
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    return ((x >>> 0) % 1000000) / 1000000;
  };
}

/** Сколько раз dishId встречается в типе приёма пищи, кроме указанного дня */
function countMealDishElsewhere(menu, mealType, dishId, exceptDay) {
  let n = 0;
  for (const d of DAYS) {
    if (d === exceptDay) continue;
    const sl = findMenuSlot(menu, d, mealType);
    if (sl && sl.dishId === dishId) n += 1;
  }
  return n;
}

function getGenerationSeed() {
  const m = getUserMetrics();
  const p = getCurrentProfile();
  const nonce = Number(loadJSON(STORAGE_KEYS.generationNonce, 0)) || 0;
  const s = JSON.stringify({
    gender: m.gender,
    height: m.height,
    weight: m.weight,
    age: m.age,
    activity: m.activity,
    goal: m.goal,
    profile: p.suitableFor,
    nonce,
  });
  return hashStringToInt(s);
}

function generateRandomMenu() {
  const oldMenu = loadMenu();
  const nonce = Number(loadJSON(STORAGE_KEYS.generationNonce, 0)) || 0;
  saveJSON(STORAGE_KEYS.generationNonce, nonce + 1);
  const rng = createSeededRng(getGenerationSeed());
  const settings = getGenSettings();
  const minR = Math.max(1, Math.min(5, settings.minRating || 1));
  const filtered = getFilteredDishes();
  const all = getAllDishes();
  const byCat = (list, cat) => list.filter((d) => d.category === cat);
  const uniqById = (list) => {
    const m = new Map();
    list.forEach((d) => m.set(d.id, d));
    return [...m.values()];
  };
  const excludedProductKeys = new Set(
    Array.isArray(settings.excludedProductKeys)
      ? settings.excludedProductKeys.map((x) => String(x)).filter(Boolean)
      : [],
  );

  const applyExclude = (list) =>
    excludedProductKeys.size
      ? list.filter((d) => !dishMatchesExcludedProducts(d, excludedProductKeys))
      : list;

  function buildPool(cat) {
    const profRated = applyExclude(byCat(filtered, cat)).filter(
      (d) => getRating(d.id) >= minR,
    );
    const profAny = applyExclude(byCat(filtered, cat));
    const allRated = applyExclude(byCat(all, cat)).filter(
      (d) => getRating(d.id) >= minR,
    );
    const allAny = applyExclude(byCat(all, cat));
    const customInCat = applyExclude(
      byCat(all, cat).filter((d) => d.isCustom),
    );
    let pool = profRated.length ? profRated : profAny;
    // If profile pool is too narrow, widen gradually to keep weekly diversity.
    if (pool.length < 7) pool = uniqById([...pool, ...allRated]);
    if (pool.length < 7) pool = uniqById([...pool, ...allAny]);
    pool = uniqById([...pool, ...customInCat]);
    return pool;
  }

  const breakfastPool = buildPool("завтрак");
  const secondBreakfastPool = buildPool("второй завтрак");
  const lunchPool = buildPool("обед");
  const dinnerPool = buildPool("ужин");
  const snackPool = buildPool("полдник");

  if (
    !breakfastPool.length ||
    !secondBreakfastPool.length ||
    !lunchPool.length ||
    !snackPool.length ||
    !dinnerPool.length
  ) {
    showToast(
      "Недостаточно блюд (проверьте профиль, свои блюда и мин. рейтинг).",
    );
    return;
  }

  const counts = {};
  const menu = createEmptyMenu();
  const lastPlaced = {
    завтрак: null,
    "второй завтрак": null,
    обед: null,
    полдник: null,
    ужин: null,
  };
  const recentByMeal = {
    завтрак: [],
    "второй завтрак": [],
    обед: [],
    полдник: [],
    ужин: [],
  };
  const target = calcCalorieTargets();

  const poolsByMeal = {
    завтрак: breakfastPool,
    "второй завтрак": secondBreakfastPool,
    обед: lunchPool,
    полдник: snackPool,
    ужин: dinnerPool,
  };

  const chooseFromPool = (mealType, dayIndex, pool, targetMealKcal) => {
    const effectiveMaxRepeat = Math.min(
      settings.maxRepeat || 2,
      pool.length >= 7 ? 1 : pool.length >= 4 ? 2 : 3,
    );
    const prevDishId = recentByMeal[mealType][recentByMeal[mealType].length - 1] || null;
    const prev2DishId = recentByMeal[mealType][recentByMeal[mealType].length - 2] || null;
    const scored = shuffleArray(pool, rng)
      .map((dish) => {
        const n = getAdjustedNutrition(dish);
        const kcal = n && n.kcal ? Number(n.kcal) : targetMealKcal;
        const kcalPenalty = Math.abs(kcal - targetMealKcal);
        const repeatPenalty = (counts[dish.id] ?? 0) * 120;
        const adjacentPenalty =
          (prevDishId && dish.id === prevDishId ? 900 : 0) +
          (prev2DishId && dish.id === prev2DishId ? 450 : 0);
        const ratingPenalty = settings.preferRating ? (5 - getRating(dish.id)) * 10 : 0;
        const dayShift = ((dayIndex + nonce) % 7) * 2;
        return {
          dish,
          score: kcalPenalty + repeatPenalty + adjacentPenalty + ratingPenalty + dayShift,
        };
      })
      .sort((a, b) => a.score - b.score)
      .map((x) => x.dish);

    const strict = scored.filter((d) => (counts[d.id] ?? 0) < effectiveMaxRepeat && d.id !== prevDishId);
    const soft = scored.filter((d) => (counts[d.id] ?? 0) < effectiveMaxRepeat);
    const fallback = scored;
    const source = strict.length ? strict : soft.length ? soft : fallback;
    const top = source.slice(0, Math.max(1, Math.min(7, source.length)));
    return top[Math.floor(rng() * top.length)] || source[0] || null;
  };

  MEAL_TYPES.forEach((mealType) => {
    const pool = poolsByMeal[mealType];
    const targetMealKcal = target.daily * mealKcalShare(mealType);
    if (pool.length >= DAYS.length) {
      const shuffled = shuffleArray([...pool], rng);
      DAYS.forEach((day, i) => {
        const slot = findMenuSlot(menu, day, mealType);
        if (!slot) return;
        const pick = shuffled[i];
        if (!pick) return;
        slot.dishId = pick.id;
        counts[pick.id] = (counts[pick.id] || 0) + 1;
        lastPlaced[mealType] = pick.id;
        recentByMeal[mealType].push(pick.id);
      });
      return;
    }
    DAYS.forEach((day, dayIndex) => {
      const slot = findMenuSlot(menu, day, mealType);
      if (!slot) return;
      const pick = chooseFromPool(mealType, dayIndex, pool, targetMealKcal);
      if (!pick) return;
      slot.dishId = pick.id;
      counts[pick.id] = (counts[pick.id] || 0) + 1;
      lastPlaced[mealType] = pick.id;
      recentByMeal[mealType].push(pick.id);
    });
  });

  // Подгонка ккал по дням без подмены всех слотов одним «идеальным» блюдом (не брать cand,
  // если оно уже стоит в этом же приёме пищи в другой день).
  DAYS.forEach((day) => {
    const maxIterations = 28;
    let iter = 0;
    while (iter < maxIterations) {
      const dayTotal = calculateDayCalories(menu, day);
      if (Math.abs(dayTotal - target.daily) <= 100) break;
      let best = null;
      MEAL_TYPES.forEach((mealType) => {
        const slot = findMenuSlot(menu, day, mealType);
        if (!slot || !slot.dishId) return;
        const curDish = getDishById(slot.dishId);
        const curN = curDish ? getAdjustedNutrition(curDish) : null;
        const curK = curN && curN.kcal ? Number(curN.kcal) : 0;
        poolsByMeal[mealType].forEach((cand) => {
          if (!cand || cand.id === slot.dishId) return;
          if (countMealDishElsewhere(menu, mealType, cand.id, day) > 0) return;
          const candN = getAdjustedNutrition(cand);
          const candK = candN && candN.kcal ? Number(candN.kcal) : 0;
          const newTotal = dayTotal - curK + candK;
          const oldDiff = Math.abs(dayTotal - target.daily);
          const newDiff = Math.abs(newTotal - target.daily);
          if (newDiff >= oldDiff) return;
          const adjacentPenalty = (() => {
            const prevDay = DAYS[DAYS.indexOf(day) - 1];
            const nextDay = DAYS[DAYS.indexOf(day) + 1];
            const prevSlot = prevDay ? findMenuSlot(menu, prevDay, mealType) : null;
            const nextSlot = nextDay ? findMenuSlot(menu, nextDay, mealType) : null;
            let p = 0;
            if (prevSlot && prevSlot.dishId === cand.id) p += 200;
            if (nextSlot && nextSlot.dishId === cand.id) p += 120;
            return p;
          })();
          const repeatPenalty = (counts[cand.id] ?? 0) * 35;
          const score = newDiff + repeatPenalty + adjacentPenalty;
          if (!best || score < best.score) {
            best = { slot, fromId: slot.dishId, toId: cand.id, score };
          }
        });
      });
      if (!best) break;
      counts[best.fromId] = Math.max(0, (counts[best.fromId] || 1) - 1);
      counts[best.toId] = (counts[best.toId] || 0) + 1;
      best.slot.dishId = best.toId;
      iter += 1;
    }
  });

  // Масштабируем граммовки по каждому дню так, чтобы фактические ккал
  // были близки к цели (дружит с новым полем `portionGrams`).
  DAYS.forEach((d) => rebalanceDayPortions(menu, d));

  saveMenu(menu);
  const oldSignature = JSON.stringify(oldMenu.map((s) => s.dishId));
  const newSignature = JSON.stringify(menu.map((s) => s.dishId));
  const byDay = DAYS.map((d) => Math.round(calculateDayCalories(menu, d)));
  const avgDelta =
    Math.round(
      byDay.reduce((sum, v) => sum + Math.abs(v - target.daily), 0) / byDay.length,
    ) || 0;
  showToast(
    oldSignature === newSignature
      ? "Меню сгенерировано заново с новой комбинацией."
      : `Меню сгенерировано: цель ${target.daily} ккал, среднее отклонение ~${avgDelta} ккал/день.`,
  );
  refreshAll();
}

function buildShoppingList() {
  const menu = loadMenu();
  const agg = new Map();
  menu.forEach((slot) => {
    if (!slot.dishId) return;
    const dish = getDishById(slot.dishId);
    if (!dish || !dish.ingredients) return;
    const portion = Number(slot.portionGrams) || getTargetPortionGrams(dish.category);
    const ingCount = Math.max(1, dish.ingredients.length);
    dish.ingredients.forEach((ingId) => {
      const ing = getIngredientById(ingId);
      if (!ing) return;
      const key = `${ing.id}`;
      if (!agg.has(key)) {
        agg.set(key, {
          id: ing.id,
          name: ing.name,
          unit: ing.unit,
          group: ing.group || "other",
          count: 0,
          amount: 0,
        });
      }
      const row = agg.get(key);
      row.count += 1;
      row.amount += estimateIngredientAmount(ing.unit, portion, ingCount);
    });
  });

  const items = [...agg.values()].sort((a, b) =>
    a.name.localeCompare(b.name, "ru"),
  );
  const checks = loadJSON(STORAGE_KEYS.shoppingChecks, {});
  // Если пользователь уже вычеркнул позицию, при "Обновить список"
  // не возвращаем её обратно в список.
  const visibleItems = items.filter((it) => !checks[`ing_${it.id}`]);
  saveJSON(STORAGE_KEYS.shoppingList, visibleItems);
  const newChecks = {};
  visibleItems.forEach((it) => {
    const k = `ing_${it.id}`;
    if (checks[k] !== undefined) newChecks[k] = checks[k];
    else newChecks[k] = false;
  });
  saveJSON(STORAGE_KEYS.shoppingChecks, newChecks);
  renderShoppingList(visibleItems);
}

function estimateIngredientAmount(unit, portion, ingredientCount) {
  const u = String(unit || "").toLowerCase().trim();
  if (u === "г" || u === "мл") {
    const base = portion / ingredientCount;
    return Math.round(base / 5) * 5;
  }
  if (u === "шт") {
    const pieces = portion / (ingredientCount * 120);
    return Math.max(0.5, Math.round(pieces * 2) / 2);
  }
  if (u.includes("ст.л")) {
    const spoons = portion / (ingredientCount * 90);
    return Math.max(0.5, Math.round(spoons * 2) / 2);
  }
  return Math.max(1, Math.round(portion / ingredientCount));
}

function renderShoppingListInto(root, items) {
  if (!root) return;
  root.innerHTML = "";
  const checks = loadJSON(STORAGE_KEYS.shoppingChecks, {});

  if (!items || !items.length) {
    const p = document.createElement("p");
    p.className = "empty-hint";
    p.style.margin = "0";
    p.textContent =
      "Сначала заполните меню и откройте «Список покупок».";
    root.appendChild(p);
    return;
  }

  const byGroup = new Map();
  items.forEach((it) => {
    const g = it.group || "other";
    if (!byGroup.has(g)) byGroup.set(g, []);
    byGroup.get(g).push(it);
  });

  const seen = new Set();
  const flushGroup = (g) => {
    const list = byGroup.get(g);
    if (!list || !list.length) return;
    seen.add(g);
    list.sort((a, b) => a.name.localeCompare(b.name, "ru"));
    const section = document.createElement("section");
    section.className = "shopping-section";
    const h = document.createElement("h3");
    h.className = "shopping-group";
    h.textContent = GROUP_LABELS_RU[g] || g;
    const ul = document.createElement("ul");
    ul.className = "shopping-list";
    list.forEach((it) => {
      const key = `ing_${it.id}`;
      const checked = !!checks[key];
      const li = document.createElement("li");
      li.className = "shopping-item" + (checked ? " checked" : "");
      const cb = document.createElement("input");
      cb.type = "checkbox";
      cb.id = `shop-${it.id}`;
      cb.checked = checked;
      cb.addEventListener("change", () => {
        const c = loadJSON(STORAGE_KEYS.shoppingChecks, {});
        c[key] = cb.checked;
        saveJSON(STORAGE_KEYS.shoppingChecks, c);
        li.classList.toggle("checked", cb.checked);
      });
      const lab = document.createElement("label");
      lab.htmlFor = `shop-${it.id}`;
      const amount =
        it.unit === "шт" || String(it.unit).includes("ст.л")
          ? Number(it.amount || 0).toFixed(1).replace(/\.0$/, "")
          : Math.round(Number(it.amount || 0));
      const qty = it.count > 1 ? ` · используется в ${it.count} блюдах` : "";
      lab.textContent = `${it.name} — ${amount} ${it.unit}${qty}`;
      li.appendChild(cb);
      li.appendChild(lab);
      ul.appendChild(li);
    });
    section.appendChild(h);
    section.appendChild(ul);
    root.appendChild(section);
  };

  INGREDIENT_GROUP_ORDER.forEach(flushGroup);
  byGroup.forEach((list, g) => {
    if (!seen.has(g)) flushGroup(g);
  });
}

function renderShoppingList(items) {
  const main = document.getElementById("shopping-list");
  if (main) renderShoppingListInto(main, items);
  const inline = document.getElementById("shopping-list-inline");
  if (inline) renderShoppingListInto(inline, items);
}

function updateProfileDesc() {
  const sel = document.getElementById("nutrition-profile");
  const desc = document.getElementById("profile-desc-text");
  const pr = mockData.nutritionProfiles.find((x) => x.id === Number(sel.value));
  desc.textContent = pr ? pr.description : "";
}

function syncProfileFromStorage() {
  const sel = document.getElementById("nutrition-profile");
  if (!sel) return;
  const saved = loadJSON(STORAGE_KEYS.profile, 2);
  sel.value = String(saved);
  updateProfileDesc();
}

function initProfileSelect() {
  const sel = document.getElementById("nutrition-profile");
  sel.innerHTML = "";
  mockData.nutritionProfiles.forEach((p) => {
    const opt = document.createElement("option");
    opt.value = String(p.id);
    opt.textContent = p.name;
    sel.appendChild(opt);
  });
  syncProfileFromStorage();
  sel.addEventListener("change", () => {
    saveJSON(STORAGE_KEYS.profile, Number(sel.value));
    updateProfileDesc();
    refreshAll();
  });
}

function renderCalorieSummary() {
  const root = document.getElementById("calorie-summary");
  if (!root) return;
  const t = calcCalorieTargets();
  const bmi = calcBmiInfo();
  const byDay = getMenuCaloriesByDay();
  const menu = loadMenu();
  const hasAny = menu.some((s) => !!s.dishId);
  const factWeek = DAYS.reduce((sum, d) => sum + (byDay[d] || 0), 0);
  const factDayAvg = Math.round(factWeek / 7);
  const daysText = DAYS.map((d) => `${d}: ${Math.round(byDay[d] || 0)}`).join(" · ");
  root.innerHTML = `
    <span class="summary-chip">🎯 Цель: <strong>${t.daily}</strong> ккал/день</span>
    <span class="summary-chip">${hasAny ? "📌 Факт" : "📌 Факт (пока пусто)"}: <strong>${hasAny ? factDayAvg : "—"}</strong> ккал/день</span>
    <span class="summary-chip">🧠 ИМТ: <strong>${bmi.bmi}</strong> (${bmi.status})</span>
    <span class="summary-chip summary-chip--muted">${hasAny ? daysText : "Сгенерируйте меню, чтоб увидеть фактический результат."}</span>
  `;
  updateHeaderHeightVar();
}

function initUserMetricsForm() {
  const m = getUserMetrics();
  const ids = ["user-gender", "user-height", "user-weight", "user-age", "user-activity", "user-goal"];
  document.getElementById("user-gender").value = m.gender;
  document.getElementById("user-height").value = String(m.height);
  document.getElementById("user-weight").value = String(m.weight);
  document.getElementById("user-age").value = String(m.age);
  document.getElementById("user-activity").value = String(m.activity);
  document.getElementById("user-goal").value = m.goal;
  ids.forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const evt = el.tagName === "SELECT" ? "change" : "input";
    el.addEventListener(evt, () => {
      saveUserMetrics({
        gender: document.getElementById("user-gender").value,
        height: Number(document.getElementById("user-height").value) || 175,
        weight: Number(document.getElementById("user-weight").value) || 75,
        age: Number(document.getElementById("user-age").value) || 30,
        activity: Number(document.getElementById("user-activity").value) || 1.55,
        goal: document.getElementById("user-goal").value,
      });
      renderCalorieSummary();
      refreshAll();
    });
  });
  renderCalorieSummary();
}

const TAB_IDS = ["tab-all", "tab-fav", "tab-my", "tab-deleted"];

function selectTab(which) {
  const tabs = TAB_IDS.map((id) => document.getElementById(id)).filter(Boolean);
  const panels = {
    all: document.getElementById("panel-all"),
    fav: document.getElementById("panel-fav"),
    my: document.getElementById("panel-my"),
    deleted: document.getElementById("panel-deleted"),
  };
  tabs.forEach((t) => {
    const sel = t.id === which;
    t.setAttribute("aria-selected", sel ? "true" : "false");
    t.tabIndex = sel ? 0 : -1;
  });
  panels.all.hidden = which !== "tab-all";
  panels.fav.hidden = which !== "tab-fav";
  panels.my.hidden = which !== "tab-my";
  panels.deleted.hidden = which !== "tab-deleted";
}

function initTabs() {
  const tablist = document.querySelector('[role="tablist"]');
  TAB_IDS.forEach((id) => {
    const tab = document.getElementById(id);
    if (!tab) return;
    tab.addEventListener("click", () => selectTab(id));
    tab.addEventListener("keydown", (e) => {
      const idx = TAB_IDS.indexOf(tab.id);
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        const next = TAB_IDS[(idx + 1) % TAB_IDS.length];
        document.getElementById(next).focus();
        selectTab(next);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        const prev = TAB_IDS[(idx - 1 + TAB_IDS.length) % TAB_IDS.length];
        document.getElementById(prev).focus();
        selectTab(prev);
      } else if (e.key === "Home") {
        e.preventDefault();
        document.getElementById(TAB_IDS[0]).focus();
        selectTab(TAB_IDS[0]);
      } else if (e.key === "End") {
        e.preventDefault();
        document.getElementById(TAB_IDS[TAB_IDS.length - 1]).focus();
        selectTab(TAB_IDS[TAB_IDS.length - 1]);
      }
    });
  });
  selectTab("tab-all");
}

function applyTheme(theme) {
  const t = theme === "dark" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", t);
  saveJSON(STORAGE_KEYS.theme, t);
  const btn = document.getElementById("btn-theme-toggle");
  const icon = document.getElementById("theme-icon");
  if (btn && icon) {
    btn.setAttribute("aria-pressed", t === "dark" ? "true" : "false");
    icon.textContent = t === "dark" ? "☀️" : "🌙";
    btn.title = t === "dark" ? "Светлая тема" : "Тёмная тема";
  }
}

function applyPalette(name) {
  const palette = PALETTE_IDS.includes(name) ? name : "lavender";
  document.documentElement.setAttribute("data-palette", palette);
  saveJSON(STORAGE_KEYS.palette, palette);
  const sel = document.getElementById("palette-select");
  if (sel) sel.value = palette;
}

function initTheme() {
  const saved = loadJSON(STORAGE_KEYS.theme, null);
  applyTheme(saved ? (saved === "dark" ? "dark" : "light") : "dark");
  applyPalette(loadJSON(STORAGE_KEYS.palette, "lavender"));
  document.getElementById("btn-theme-toggle").addEventListener("click", () => {
    const cur = document.documentElement.getAttribute("data-theme");
    applyTheme(cur === "dark" ? "light" : "dark");
  });
  const paletteSel = document.getElementById("palette-select");
  if (paletteSel) {
    paletteSel.value = loadJSON(STORAGE_KEYS.palette, "lavender");
    paletteSel.addEventListener("change", () => applyPalette(paletteSel.value));
  }
}

function updateHeaderHeightVar() {
  const header = document.querySelector(".app-header");
  if (!header) return;
  document.documentElement.style.setProperty(
    "--header-height",
    `${Math.round(header.offsetHeight)}px`,
  );
}

function syncGenPanelFromStorage() {
  const s = getGenSettings();
  const mr = document.getElementById("gen-max-repeat");
  const mn = document.getElementById("gen-min-rating");
  const adj = document.getElementById("gen-avoid-adjacent");
  const pr = document.getElementById("gen-prefer-rating");
  if (mr) mr.value = String(s.maxRepeat);
  if (mn) mn.value = String(s.minRating);
  if (adj) adj.checked = s.avoidAdjacent !== false;
  if (pr) pr.checked = s.preferRating !== false;
  renderExcludeIngredientsList();
}

function initGenPanel() {
  syncGenPanelFromStorage();

  const saveUi = debounce(() => {
    saveGenSettings({
      maxRepeat: Number(document.getElementById("gen-max-repeat").value) || 2,
      minRating: Number(document.getElementById("gen-min-rating").value) || 1,
      avoidAdjacent: document.getElementById("gen-avoid-adjacent").checked,
      preferRating: document.getElementById("gen-prefer-rating").checked,
    });
  }, 300);

  [
    "gen-max-repeat",
    "gen-min-rating",
    "gen-avoid-adjacent",
    "gen-prefer-rating",
  ].forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("change", saveUi);
      el.addEventListener("input", saveUi);
    }
  });
  const search = document.getElementById("gen-exclude-search");
  if (search) {
    search.addEventListener("input", debounce(renderExcludeIngredientsList, 120));
  }
  document.getElementById("btn-clear-exclusions")?.addEventListener("click", () => {
    saveGenSettings({ excludedProductKeys: [] });
    if (search) search.value = "";
    renderExcludeIngredientsList();
  });

  const btn = document.getElementById("btn-toggle-gen");
  const panel = document.getElementById("gen-panel");
  btn.addEventListener("click", () => {
    const open = panel.hidden;
    panel.hidden = !open;
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    if (open) {
      renderExcludeIngredientsList();
      document.getElementById("gen-exclude-search")?.focus();
    }
  });
}

function setPlannerMode(mode) {
  const isShopping = mode === "shopping";
  const plannerView = document.getElementById("planner-view");
  const shoppingView = document.getElementById("shopping-inline-view");
  const heading = document.getElementById("planner-heading");
  const btnOpen = document.getElementById("btn-open-shopping-inline");
  const btnExportMenu = document.getElementById("btn-export-menu-pdf");
  const btnExportShopping = document.getElementById("btn-export-shopping-pdf");
  if (!plannerView || !shoppingView) return;
  plannerView.hidden = isShopping;
  shoppingView.hidden = !isShopping;
  if (heading) heading.textContent = isShopping ? "Список покупок" : "Недельное меню";
  if (btnOpen) btnOpen.textContent = isShopping ? "📅 Показать меню" : "🛒 Список покупок";
  if (btnExportMenu) btnExportMenu.hidden = isShopping;
  if (btnExportShopping) btnExportShopping.hidden = !isShopping;
}

function applyShoppingPdfStyles(root) {
  if (!root) return;
  root.style.background = "#ffffff";
  root.style.color = "#1f2937";
  root.style.padding = "12px";
  root.querySelectorAll(".shopping-group").forEach((h) => {
    h.style.background = "#ede9fe";
    h.style.color = "#5b21b6";
    h.style.borderColor = "#e5e7eb";
  });
  root.querySelectorAll(".shopping-item").forEach((li) => {
    li.style.background = "#ffffff";
    li.style.color = "#1f2937";
    li.style.borderColor = "#e5e7eb";
  });
  root.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
    cb.remove();
  });
  root.querySelectorAll(".shopping-item label").forEach((lab) => {
    lab.style.textDecoration = "none";
    lab.style.color = "#1f2937";
    lab.style.marginLeft = "0";
  });
}

async function exportElementToPdf(elementId, filename, options = {}) {
  const el = document.getElementById(elementId);
  if (!el || !window.jspdf || !window.html2canvas) {
    showToast("Ошибка: PDF-инструменты не готовы.");
    return;
  }
  const canvas = await window.html2canvas(el, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff",
    logging: false,
    onclone: (_doc, clonedRoot) => {
      const clonedEl =
        clonedRoot.getElementById?.(elementId) ||
        clonedRoot.querySelector?.(`#${elementId}`);
      if (!clonedEl) return;
      if (options.prepareShoppingPdf) applyShoppingPdfStyles(clonedEl);
      if (options.onclone) options.onclone(_doc, clonedEl);
    },
  });
  const imgData = canvas.toDataURL("image/png");
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF("p", "mm", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 10;
  const printableWidth = pageWidth - margin * 2;
  const printableHeight = pageHeight - margin * 2;
  const imgHeight = (canvas.height * printableWidth) / canvas.width;

  let heightLeft = imgHeight;
  let offset = 0;

  pdf.addImage(imgData, "PNG", margin, margin, printableWidth, imgHeight);
  heightLeft -= printableHeight;

  while (heightLeft > 0) {
    offset += printableHeight;
    pdf.addPage();
    pdf.addImage(
      imgData,
      "PNG",
      margin,
      margin - offset,
      printableWidth,
      imgHeight,
    );
    heightLeft -= printableHeight;
  }
  pdf.save(filename);
}

async function exportShoppingListToPdf() {
  const items = loadJSON(STORAGE_KEYS.shoppingList, []);
  if (!items.length) {
    showToast("Список пуст. Заполните меню и откройте «Список покупок».");
    return;
  }
  await exportElementToPdf("shopping-list-inline", "spisok-pokupok.pdf", {
    prepareShoppingPdf: true,
  });
}

function exportToPdf() {
  if (!window.jspdf || !window.jspdf.jsPDF) {
    showToast("Ошибка: библиотека PDF не загружена.");
    return;
  }
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const t = calcCalorieTargets();
  const profile = getCurrentProfile();
  const m = getUserMetrics();
  const lines = [
    "Meal Planner Report",
    `Profile: ${profile.name}`,
    `Gender: ${m.gender}, Height: ${m.height} cm, Weight: ${m.weight} kg, Age: ${m.age}`,
    `Activity: ${m.activity}, Goal: ${m.goal}`,
    `Daily kcal target: ${t.daily}, Weekly kcal target: ${t.weekly}`,
    "",
    "Weekly menu:",
  ];
  const menu = loadMenu();
  DAYS.forEach((day) => {
    lines.push(`- ${day}`);
    MEAL_TYPES.forEach((mealType) => {
      const slot = findMenuSlot(menu, day, mealType);
      const dish = slot && slot.dishId ? getDishById(slot.dishId) : null;
      if (!dish) {
        lines.push(`  ${MEAL_LABELS[mealType]}: -`);
      } else {
        const n = getAdjustedNutrition(dish);
        lines.push(
          `  ${MEAL_LABELS[mealType]}: ${dish.name} (${n ? `${n.kcal} kcal` : "kcal n/a"})`,
        );
      }
    });
  });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text(lines, 40, 40, { maxWidth: 515, lineHeightFactor: 1.35 });
  doc.save(`meal-planner-${new Date().toISOString().slice(0, 10)}.pdf`);
  showToast("PDF экспортирован.");
}

function initExport() {
  const btn = document.getElementById("btn-export");
  if (btn) btn.addEventListener("click", exportToPdf);
}

let dishModalPrevFocus = null;

function getFocusableInModal() {
  const modal = document.getElementById("dish-modal-dialog");
  if (!modal) return [];
  return [
    ...modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    ),
  ].filter((el) => !el.disabled && el.offsetParent !== null);
}

function openDishModal(editId = null) {
  const overlay = document.getElementById("dish-modal");
  const title = document.getElementById("dish-modal-title");
  const form = document.getElementById("dish-form");
  const editField = document.getElementById("dish-edit-id");
  const checksRoot = document.getElementById("dish-profile-checks");
  checksRoot.innerHTML = "";
  mockData.nutritionProfiles.forEach((p) => {
    const lab = document.createElement("label");
    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.value = p.suitableFor;
    cb.dataset.profileKey = p.suitableFor;
    cb.id = `prof-${p.id}`;
    lab.appendChild(cb);
    lab.appendChild(document.createTextNode(" " + p.name));
    checksRoot.appendChild(lab);
  });

  document.getElementById("ingredient-rows").innerHTML = "";
  if (editId) {
    const dish = loadCustomDishes().find((d) => d.id === editId);
    if (!dish) return;
    title.textContent = "Редактировать блюдо";
    editField.value = String(editId);
    document.getElementById("dish-name").value = dish.name;
    populateDishEmojiSelect(dish.emoji || "🍽️");
    document.getElementById("dish-category").value = dish.category;
    checksRoot.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
      cb.checked = (dish.profileTags || []).includes(cb.value);
    });
    const gramsById = new Map(
      (dish.ingredientGrams || []).map((x) => [Number(x.id), x]),
    );
    (dish.ingredients || []).forEach((ingId) => {
      const ing = getIngredientById(ingId);
      const rowData = gramsById.get(Number(ingId));
      if (ing) {
        const savedUnit = rowData?.unit ? normalizeIngredientUnit(rowData.unit) : null;
        const unit = savedUnit || ing.unit;
        const amount =
          rowData?.amount != null && rowData.amount !== ""
            ? String(rowData.amount)
            : storedGramsToDisplayAmount(rowData?.grams, unit, ing);
        addIngredientRow({
          catalogId: ingId,
          name: ing.name,
          unit,
          group: ing.group || "other",
          amount,
        });
      }
    });
    if (!(dish.ingredients || []).length) addIngredientRow();
    const nu = dish.nutrition || {};
    document.getElementById("dish-kcal").value = nu.kcal != null ? nu.kcal : "";
    document.getElementById("dish-protein").value =
      nu.protein != null ? nu.protein : "";
    document.getElementById("dish-fat").value = nu.fat != null ? nu.fat : "";
    document.getElementById("dish-carbs").value =
      nu.carbs != null ? nu.carbs : "";
    document.getElementById("dish-portion-note").value = nu.portionNote || "";
    document.getElementById("dish-recipe").value = dish.recipe || "";
  } else {
    title.textContent = "Новое блюдо";
    editField.value = "";
    form.reset();
    checksRoot.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
      cb.checked = true;
    });
    populateDishEmojiSelect("🍽️");
    document.getElementById("dish-kcal").value = "";
    document.getElementById("dish-protein").value = "";
    document.getElementById("dish-fat").value = "";
    document.getElementById("dish-carbs").value = "";
    document.getElementById("dish-portion-note").value = "";
    document.getElementById("dish-recipe").value = "";
    addIngredientRow();
    addIngredientRow();
  }

  dishModalPrevFocus = document.activeElement;
  overlay.hidden = false;
  const nameInput = document.getElementById("dish-name");
  if (nameInput) nameInput.focus();

  overlay.onclick = (e) => {
    if (e.target === overlay) closeDishModal();
  };
}

function closeDishModal() {
  const overlay = document.getElementById("dish-modal");
  overlay.hidden = true;
  overlay.onclick = null;
  if (dishModalPrevFocus && dishModalPrevFocus.focus)
    dishModalPrevFocus.focus();
}

function getIngredientsForNutritionMatch() {
  return [...mockData.ingredients, ...loadCustomIngredients()];
}

function getSortedCatalogIngredients() {
  return [...mockData.ingredients].sort((a, b) =>
    a.name.localeCompare(b.name, "ru"),
  );
}

function getIngredientNameFromRow(row) {
  const pick = row.querySelector(".ingredient-row__pick");
  if (!pick) {
    return row.querySelector(".ingredient-row__name")?.value.trim() || "";
  }
  if (pick.value === "__custom__") {
    return row.querySelector(".ingredient-row__name-custom")?.value.trim() || "";
  }
  const ing = mockData.ingredients.find((i) => String(i.id) === pick.value);
  return ing?.name || "";
}

function getIngredientUnitFromRow(row) {
  const unitEl = row.querySelector(".ingredient-row__unit");
  return normalizeIngredientUnit(unitEl?.value || "г");
}

function getCatalogIngredientIdFromRow(row) {
  const pick = row.querySelector(".ingredient-row__pick");
  if (!pick || pick.value === "__custom__" || !pick.value) return null;
  const id = Number(pick.value);
  return Number.isFinite(id) ? id : null;
}

function getIngredientRefFromRow(row) {
  const catalogId = getCatalogIngredientIdFromRow(row);
  if (catalogId) {
    const ing = getIngredientById(catalogId);
    if (ing) return ing;
  }
  const name = getIngredientNameFromRow(row);
  const unit = getIngredientUnitFromRow(row);
  if (!name) return null;
  const merged = getIngredientsForNutritionMatch();
  return (
    findCatalogIngredient(name, unit) ||
    merged.find((i) => i.name.toLowerCase() === name.toLowerCase() && i.unit === unit) ||
    merged.find((i) => i.name.toLowerCase() === name.toLowerCase()) ||
    { name, unit }
  );
}

function addIngredientRow(prefill = null) {
  const wrap = document.getElementById("ingredient-rows");
  const row = document.createElement("div");
  row.className = "ingredient-row ingredient-row--picker";

  const pickWrap = document.createElement("div");
  pickWrap.className = "ingredient-row__name-cell";

  const pick = document.createElement("select");
  pick.className = "ingredient-row__pick";
  pick.required = true;
  const opt0 = document.createElement("option");
  opt0.value = "";
  opt0.textContent = "— выберите продукт —";
  pick.appendChild(opt0);
  getSortedCatalogIngredients().forEach((ing) => {
    const o = document.createElement("option");
    o.value = String(ing.id);
    o.textContent = ing.name;
    pick.appendChild(o);
  });
  const optCustom = document.createElement("option");
  optCustom.value = "__custom__";
  optCustom.textContent = "✏️ Свой продукт…";
  pick.appendChild(optCustom);

  const nameCustom = document.createElement("input");
  nameCustom.type = "text";
  nameCustom.className = "ingredient-row__name-custom";
  nameCustom.placeholder = "Название своего продукта";
  nameCustom.hidden = true;

  const grams = document.createElement("input");
  grams.type = "number";
  grams.className = "ingredient-row__grams";
  grams.min = "0";
  grams.max = "5000";
  grams.step = "1";
  grams.value =
    prefill && prefill.amount != null && prefill.amount !== ""
      ? String(prefill.amount)
      : prefill && prefill.grams != null && prefill.grams !== ""
        ? String(prefill.grams)
        : "";
  const unit = document.createElement("select");
  unit.className = "ingredient-row__unit";
  fillIngredientUnitSelect(unit, prefill && prefill.unit != null ? prefill.unit : "г", false);
  const group = document.createElement("select");
  group.className = "ingredient-row__group";
  INGREDIENT_GROUP_ORDER.forEach((g) => {
    const o = document.createElement("option");
    o.value = g;
    o.textContent = GROUP_LABELS_RU[g] || g;
    group.appendChild(o);
  });
  group.value = prefill && prefill.group ? prefill.group : "vegetables";

  const applyCatalogSelection = ({ resetUnit = false, keepUnit = false } = {}) => {
    const isCustom = pick.value === "__custom__";
    nameCustom.hidden = !isCustom;
    nameCustom.required = isCustom;
    if (!isCustom && pick.value) {
      const ing = mockData.ingredients.find((i) => String(i.id) === pick.value);
      if (ing) {
        const nextUnit =
          resetUnit || !keepUnit
            ? ing.unit
            : unit.value || ing.unit;
        fillIngredientUnitSelect(unit, nextUnit, false);
        group.value = ing.group || INGREDIENT_GROUP_BY_ID[ing.id] || "other";
      }
    } else {
      fillIngredientUnitSelect(
        unit,
        keepUnit && unit.value ? unit.value : prefill?.unit || unit.value || "г",
        false,
      );
    }
    updateIngredientAmountField(row);
  };

  pick.addEventListener("change", () => applyCatalogSelection({ resetUnit: true }));

  if (prefill && prefill.catalogId != null) {
    pick.value = String(prefill.catalogId);
  } else if (prefill && prefill.name) {
    const found = findCatalogIngredient(prefill.name, prefill.unit);
    if (found) pick.value = String(found.id);
    else {
      pick.value = "__custom__";
      nameCustom.value = prefill.name;
      nameCustom.hidden = false;
    }
  }
  applyCatalogSelection({
    keepUnit: !!(prefill && (prefill.unit != null || prefill.amount != null)),
  });

  const removeBtn = document.createElement("button");
  removeBtn.type = "button";
  removeBtn.className = "ingredient-row__remove";
  removeBtn.setAttribute("aria-label", "Удалить строку");
  removeBtn.textContent = "×";
  removeBtn.addEventListener("click", () => {
    row.remove();
  });

  pickWrap.appendChild(pick);
  pickWrap.appendChild(nameCustom);
  row.appendChild(pickWrap);
  row.appendChild(grams);
  row.appendChild(unit);
  row.appendChild(group);
  row.appendChild(removeBtn);
  wrap.appendChild(row);

  unit.addEventListener("change", () => updateIngredientAmountField(row));
  updateIngredientAmountField(row);
}

function initDishModal() {
  document
    .getElementById("btn-add-dish")
    .addEventListener("click", () => openDishModal(null));
  document
    .getElementById("dish-modal-close")
    .addEventListener("click", closeDishModal);
  document
    .getElementById("dish-modal-cancel")
    .addEventListener("click", closeDishModal);
  document
    .getElementById("btn-add-ingredient")
    .addEventListener("click", () => addIngredientRow());

  document.getElementById("dish-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("dish-name").value.trim();
    if (!name) return;
    const emoji =
      document.getElementById("dish-emoji-select").value.trim() || "🍽️";
    const category = document.getElementById("dish-category").value;
    const profileTags = [];
    document
      .querySelectorAll('#dish-profile-checks input[type="checkbox"]:checked')
      .forEach((cb) => {
        profileTags.push(cb.value);
      });
    if (!profileTags.length) {
      showToast("Отметьте хотя бы один профиль питания.");
      return;
    }

    const rows = document.querySelectorAll("#ingredient-rows .ingredient-row");
    const specs = [];
    rows.forEach((row) => {
      const amountIn = row.querySelector(".ingredient-row__grams");
      const groupSel = row.querySelector(".ingredient-row__group");
      if (!groupSel) return;
      const n = getIngredientNameFromRow(row);
      if (!n) return;
      const unit = getIngredientUnitFromRow(row);
      const amountRaw = parseFloat(
        String(amountIn && amountIn.value ? amountIn.value : "").replace(",", "."),
      );
      const ingRef = getIngredientRefFromRow(row);
      const storedGrams = amountToStoredGrams(amountRaw, unit, ingRef);
      specs.push({
        name: n,
        unit,
        group: groupSel.value,
        catalogId: getCatalogIngredientIdFromRow(row),
        amount: Number.isFinite(amountRaw) && amountRaw > 0 ? amountRaw : 0,
        grams: storedGrams,
      });
    });
    if (!specs.length) {
      showToast("Добавьте хотя бы один ингредиент.");
      return;
    }
    if (specs.some((s) => !s.amount || s.amount <= 0)) {
      showToast("Укажите количество каждого ингредиента (число больше нуля).");
      return;
    }

    const apiSpecs = specs.map((s) => enrichIngredientSpec(s));

    const customIngs = loadCustomIngredients().filter(
      (c) =>
        !mockData.ingredients.some(
          (m) =>
            m.name.toLowerCase() === c.name.toLowerCase() && m.unit === c.unit,
        ),
    );
    const ingIds = [];
    let nextIngId =
      Math.max(
        CUSTOM_INGREDIENT_ID_MIN - 1,
        ...mockData.ingredients.map((i) => i.id),
        ...customIngs.map((i) => i.id),
        0,
      ) + 1;

    specs.forEach((spec) => {
      if (spec.catalogId) {
        ingIds.push(spec.catalogId);
        return;
      }
      const fromCatalog = findCatalogIngredient(spec.name, spec.unit);
      if (fromCatalog) {
        ingIds.push(fromCatalog.id);
        return;
      }
      const fromCustom = customIngs.find(
        (i) =>
          i.name.toLowerCase() === spec.name.toLowerCase() &&
          i.unit === spec.unit,
      );
      if (fromCustom) {
        ingIds.push(fromCustom.id);
        return;
      }
      const row = {
        id: nextIngId++,
        name: spec.name,
        unit: spec.unit,
        group: spec.group,
        per100g: spec.per100g || null,
      };
      customIngs.push(row);
      ingIds.push(row.id);
    });

    const ingredientGrams = ingIds.map((id, i) => {
      const spec = specs[i];
      return {
        id,
        grams: spec && spec.grams > 0 ? spec.grams : 0,
        unit: spec?.unit || null,
        amount: spec?.amount > 0 ? spec.amount : null,
      };
    });
    saveCustomIngredients(customIngs);

    const portionNote = document
      .getElementById("dish-portion-note")
      .value.trim();
    const recipeText = document.getElementById("dish-recipe").value.trim();
    const kc = document.getElementById("dish-kcal").value.trim();
    const pr = document.getElementById("dish-protein").value.trim();
    const ft = document.getElementById("dish-fat").value.trim();
    const cr = document.getElementById("dish-carbs").value.trim();
    if (!kc || !pr || !ft || !cr) {
      showToast("Заполните все поля КБЖУ на порцию (ккал, белки, жиры, углеводы).");
      return;
    }
    const nutrition = {
      kcal: Math.round(parseFloat(kc)),
      protein: parseFloat(pr),
      fat: parseFloat(ft),
      carbs: parseFloat(cr),
    };
    if (portionNote) nutrition.portionNote = portionNote;

    const editVal = document.getElementById("dish-edit-id").value;
    const dishes = loadCustomDishes();
    const prev = editVal ? dishes.find((d) => d.id === Number(editVal)) : null;
    const payload = {
      id: editVal ? Number(editVal) : 0,
      name,
      category,
      emoji,
      profileTags,
      ingredients: ingIds,
      ingredientGrams,
      rating: prev && prev.rating != null ? prev.rating : 3,
      isFavorite: false,
      isCustom: true,
      nutrition,
      recipe: recipeText,
    };
    const loggedIn = !!getAuthUser();

    if (loggedIn) {
      const data = await apiUpsertCustomDish(payload, apiSpecs);
      const finalId = data && data.id ? Number(data.id) : payload.id;
      if (!finalId) {
        showToast("Не удалось сохранить блюдо. Проверьте вход в аккаунт.");
        return;
      }
      await loadRemoteBootstrap();
      showToast("Блюдо сохранено в вашем аккаунте.");
      closeDishModal();
      refreshAll();
      return;
    }

    let finalId = editVal ? Number(editVal) : 0;
    if (!finalId) finalId = await nextCustomDishId();
    const newDish = {
      ...payload,
      id: finalId,
      ingredients: payload.ingredients,
      ingredientGrams: payload.ingredientGrams,
    };
    const guestDishes = loadGuestCustomDishes();
    if (editVal) {
      const ix = guestDishes.findIndex((d) => d.id === Number(editVal));
      if (ix >= 0) guestDishes[ix] = newDish;
      else guestDishes.push(newDish);
    } else {
      guestDishes.push(newDish);
    }
    saveGuestCustomDishes(guestDishes);
    showToast(
      "Блюдо сохранено до обновления страницы. Войдите в аккаунт, чтобы хранить постоянно.",
    );
    closeDishModal();
    refreshAll();
  });

  document.getElementById("dish-modal").addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      closeDishModal();
    }
    if (e.key === "Tab" && !document.getElementById("dish-modal").hidden) {
      const list = getFocusableInModal();
      if (!list.length) return;
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
}

function initPlannerKeyboard() {
  const grid = document.getElementById("planner-grid");
  grid.addEventListener("keydown", (e) => {
    const cell = e.target.closest(".drop-cell");
    if (!cell || !grid.contains(cell)) return;
    const di = Number(cell.dataset.dayIndex);
    const mi = Number(cell.dataset.mealIndex);
    if (Number.isNaN(di) || Number.isNaN(mi)) return;
    let ndi = di;
    let nmi = mi;
    if (e.key === "ArrowRight") ndi = Math.min(6, di + 1);
    else if (e.key === "ArrowLeft") ndi = Math.max(0, di - 1);
    else if (e.key === "ArrowDown") nmi = Math.min(MEAL_TYPES.length - 1, mi + 1);
    else if (e.key === "ArrowUp") nmi = Math.max(0, mi - 1);
    else return;
    e.preventDefault();
    const next = grid.querySelector(
      `.drop-cell[data-day-index="${ndi}"][data-meal-index="${nmi}"]`,
    );
    if (next) next.focus();
  });
}

function captureDishPanelsScroll() {
  const activeTab =
    document.querySelector('.tabs [role="tab"][aria-selected="true"]')?.id || "tab-all";
  return {
    activeTab,
    all: document.getElementById("dish-database")?.scrollTop || 0,
    fav: document.getElementById("dish-favorites")?.scrollTop || 0,
    myList: document.getElementById("dish-my-list")?.scrollTop || 0,
    deleted: document.getElementById("dish-deleted-list")?.scrollTop || 0,
  };
}

function restoreDishPanelsScroll(state) {
  if (!state) return;
  if (state.activeTab) selectTab(state.activeTab);
  const all = document.getElementById("dish-database");
  const fav = document.getElementById("dish-favorites");
  const myList = document.getElementById("dish-my-list");
  const deleted = document.getElementById("dish-deleted-list");
  if (all) all.scrollTop = state.all || 0;
  if (fav) fav.scrollTop = state.fav || 0;
  if (myList) myList.scrollTop = state.myList || 0;
  if (deleted) deleted.scrollTop = state.deleted || 0;
}

function refreshAll() {
  const scrollState = captureDishPanelsScroll();
  renderDishDatabase();
  renderFavorites();
  renderMyDishes();
  renderDeletedDishes();
  renderPlanner();
  renderCalorieSummary();
  const hasAnyMenuDish = loadMenu().some((s) => !!s.dishId);
  if (hasAnyMenuDish) buildShoppingList();
  else renderShoppingList([]);
  syncPanelsHeight();
  // Восстанавливаем скролл после всех перерасчётов layout.
  restoreDishPanelsScroll(scrollState);
  requestAnimationFrame(() => restoreDishPanelsScroll(scrollState));
}

function clearAllWeeklyMenu() {
  clearDragState();
  saveMenu(createEmptyMenu());
  refreshAll();
  showToast("Недельное меню очищено.");
}

function syncPanelsHeight() {
  const left = document.querySelector(".panel--dishes");
  const planner = document.querySelector(".panel--planner");
  if (!left || !planner) return;
  const tabs = left.querySelector(".tabs");
  const tabPanels = left.querySelector(".tab-panels");
  left.style.height = "";
  left.style.minHeight = "";
  if (tabPanels) tabPanels.style.height = "";
  const h = planner.offsetHeight;
  if (h > 0) {
    left.style.height = `${h}px`;
    left.style.minHeight = `${h}px`;
    // Жёстко задаём высоту области вкладок, чтобы скролл блюд шёл внутри левого блока,
    // а низ блока блюд совпадал с низом блока меню.
    if (tabPanels) {
      const tabsH = tabs ? tabs.offsetHeight : 0;
      const panelsH = Math.max(120, h - tabsH);
      tabPanels.style.height = `${panelsH}px`;
    }
  }
}

function clearGuestMenuSession() {
  guestMenuCache = null;
}

function setAuthFormError(el, text) {
  if (!el) return;
  if (text) {
    el.textContent = text;
    el.hidden = false;
  } else {
    el.textContent = "";
    el.hidden = true;
  }
}

function openAuthOverlay(overlay) {
  if (!overlay) return;
  overlay.hidden = false;
  const focusTarget = overlay.querySelector("input:not([type=hidden]), button.btn-close-round");
  if (focusTarget) {
    setTimeout(() => focusTarget.focus(), 0);
  }
}

function closeAuthOverlay(overlay) {
  if (overlay) overlay.hidden = true;
}

function updateAuthHeaderUI() {
  const guest = document.getElementById("header-auth-guest");
  const userBlk = document.getElementById("header-auth-user");
  const u = getAuthUser();
  if (u) {
    if (guest) guest.hidden = true;
    if (userBlk) userBlk.hidden = false;
  } else {
    if (guest) guest.hidden = false;
    if (userBlk) userBlk.hidden = true;
  }
  updateHeaderHeightVar();
}

function fillProfileModal() {
  const u = getAuthUser();
  const loginEl = document.getElementById("profile-display-login");
  const emailEl = document.getElementById("profile-display-email");
  if (loginEl) loginEl.textContent = u && u.login ? u.login : "—";
  if (emailEl) emailEl.textContent = u && u.email ? u.email : "—";
}

async function completeLoginOrRegister(token, user) {
  clearGuestSessionState();
  userFavoriteIds = new Set();
  userHiddenIds = new Set();
  setAuthSession(token, user);
  await loadRemoteBootstrap();
  await loadUserDishPrefs();
  const serverMenu = await fetchMenuFromApi();
  await applyServerMenuToLocalUser(user.id, serverMenu);
  updateAuthHeaderUI();
  closeAuthOverlay(document.getElementById("auth-login-modal"));
  closeAuthOverlay(document.getElementById("auth-register-modal"));
  refreshAll();
}

async function logoutUser() {
  clearAuthSession();
  clearGuestMenuSession();
  clearGuestSessionState();
  userFavoriteIds = new Set();
  userHiddenIds = new Set();
  await loadRemoteBootstrap();
  updateAuthHeaderUI();
  closeAuthOverlay(document.getElementById("profile-modal"));
  refreshAll();
  showToast("Вы вышли из аккаунта.");
}

function initAuthUI() {
  const regOverlay = document.getElementById("auth-register-modal");
  const loginOverlay = document.getElementById("auth-login-modal");
  const profileOverlay = document.getElementById("profile-modal");

  document
    .getElementById("btn-open-register")
    ?.addEventListener("click", () => {
    setAuthFormError(document.getElementById("auth-register-error"), "");
    openAuthOverlay(regOverlay);
  });
  document.getElementById("btn-open-login")?.addEventListener("click", () => {
    setAuthFormError(document.getElementById("auth-login-error"), "");
    openAuthOverlay(loginOverlay);
  });

  document
    .getElementById("auth-register-close")
    ?.addEventListener("click", () => closeAuthOverlay(regOverlay));
  document
    .getElementById("auth-login-close")
    ?.addEventListener("click", () => closeAuthOverlay(loginOverlay));
  document
    .getElementById("profile-modal-close")
    ?.addEventListener("click", () => closeAuthOverlay(profileOverlay));

  [regOverlay, loginOverlay, profileOverlay].forEach((ov) => {
    if (!ov) return;
    ov.addEventListener("click", (e) => {
      if (e.target === ov) closeAuthOverlay(ov);
    });
    ov.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeAuthOverlay(ov);
    });
  });

  document
    .getElementById("auth-register-form")
    ?.addEventListener("submit", async (e) => {
      e.preventDefault();
      const errEl = document.getElementById("auth-register-error");
      setAuthFormError(errEl, "");
      const login = document.getElementById("auth-reg-login").value.trim();
      const email = document.getElementById("auth-reg-email").value.trim();
      const password = document.getElementById("auth-reg-password").value;
      try {
        const r = await fetch(`${API_BASE}/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ login, email, password }),
        });
        const data = await r.json().catch(() => ({}));
        if (!r.ok) {
          setAuthFormError(errEl, data.error || "Ошибка регистрации");
          return;
        }
        showToast("Регистрация успешна. Добро пожаловать!");
        document.getElementById("auth-register-form").reset();
        await completeLoginOrRegister(data.token, data.user);
      } catch {
        setAuthFormError(errEl, "Нет связи с сервером. Проверьте API.");
      }
    });

  document
    .getElementById("auth-login-form")
    ?.addEventListener("submit", async (e) => {
      e.preventDefault();
      const errEl = document.getElementById("auth-login-error");
      setAuthFormError(errEl, "");
      const login = document.getElementById("auth-in-login").value.trim();
      const password = document.getElementById("auth-in-password").value;
      try {
        const r = await fetch(`${API_BASE}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ login, password }),
        });
        const data = await r.json().catch(() => ({}));
        if (!r.ok) {
          setAuthFormError(errEl, data.error || "Ошибка входа");
          return;
        }
        showToast(`С возвращением, ${data.user.login}!`);
        document.getElementById("auth-login-form").reset();
        await completeLoginOrRegister(data.token, data.user);
      } catch {
        setAuthFormError(errEl, "Нет связи с сервером. Проверьте API.");
      }
    });

  document.getElementById("btn-profile")?.addEventListener("click", () => {
    fillProfileModal();
    openAuthOverlay(profileOverlay);
  });

  document.getElementById("btn-logout")?.addEventListener("click", () => {
    logoutUser();
  });
}

async function loadRemoteBootstrap() {
  try {
    const headers = {};
    const token = getAuthToken();
    if (token) headers.Authorization = `Bearer ${token}`;
    const resp = await fetch(`${API_BASE}/bootstrap`, { headers });
    if (!resp.ok) return false;
    const data = await resp.json();
    if (
      !data ||
      !Array.isArray(data.ingredients) ||
      !Array.isArray(data.nutritionProfiles) ||
      !Array.isArray(data.dishes)
    ) {
      return false;
    }
    bootstrapDishEmojis = Array.isArray(data.dishEmojis) ? data.dishEmojis : null;
    const allActive = data.dishes || [];
    catalogDishesCache = allActive.filter((d) => !d.isCustom);
    deletedCustomDishesCache = Array.isArray(data.deletedDishes)
      ? data.deletedDishes
      : [];
    mockData = {
      ...mockData,
      ingredients: data.ingredients.map((row) => {
        const id = row.id;
        const g = row.group || INGREDIENT_GROUP_BY_ID[id] || "other";
        const ref = INGREDIENT_NUTRITION_REF[id];
        const per =
          row.per100g && typeof row.per100g === "object"
            ? row.per100g
            : ref || null;
        return { ...row, group: g, per100g: per };
      }),
      nutritionProfiles: data.nutritionProfiles,
      dishes: allActive,
    };
    renderExcludeIngredientsList();
    return true;
  } catch {
    return false;
  }
}

async function init() {
  clearGuestSessionState();
  userFavoriteIds = new Set();
  userHiddenIds = new Set();
  await initAuthFromStorage();
  const loaded = await loadRemoteBootstrap();
  if (loaded) showToast("Данные загружены из MS SQL API.");
  initTheme();
  initProfileSelect();
  initUserMetricsForm();
  initTabs();
  initGenPanel();
  initExport();
  initDishDetailModal();
  initDishModal();
  initAuthUI();
  initPlannerKeyboard();
  document
    .getElementById("btn-random-menu")
    .addEventListener("click", generateRandomMenu);
  const btnShoppingSidebar = document.getElementById("btn-build-shopping");
  if (btnShoppingSidebar)
    btnShoppingSidebar.addEventListener("click", buildShoppingList);
  document
    .getElementById("btn-open-shopping-inline")
    .addEventListener("click", () => {
      const inShopping = !document.getElementById("shopping-inline-view").hidden;
      setPlannerMode(inShopping ? "planner" : "shopping");
      if (!inShopping) buildShoppingList();
    });
  document
    .getElementById("btn-export-menu-pdf")
    .addEventListener("click", () =>
      exportElementToPdf("planner-view", "nedelnoe-menyu.pdf"),
    );
  document
    .getElementById("btn-export-shopping-pdf")
    .addEventListener("click", () => exportShoppingListToPdf());

  document
    .getElementById("btn-clear-menu")
    ?.addEventListener("click", () => clearAllWeeklyMenu());

  const dragTrash = getDragTrashEl();
  if (dragTrash) {
    dragTrash.addEventListener("dragover", (e) => {
      const data = parseDragData(e);
      if (!data || data.type !== "menu") return;
      e.preventDefault();
      dragTrash.classList.add("is-active");
      if (e.dataTransfer) e.dataTransfer.dropEffect = "move";
    });
    dragTrash.addEventListener("dragleave", () => {
      dragTrash.classList.remove("is-active");
    });
    dragTrash.addEventListener("drop", (e) => {
      e.preventDefault();
      dragTrash.classList.remove("is-active");
      const data = parseDragData(e);
      const removed = removeMenuDishByPayload(data);
      if (removed) showToast("Блюдо убрано из меню.");
      clearDragState();
    });
  }

  window.addEventListener("dragend", () => {
    setDragState(false);
    document.querySelectorAll(".drop-cell").forEach((c) => {
      c.classList.remove("drag-over-valid", "drag-over-invalid");
    });
  });

  window.addEventListener("resize", updateHeaderHeightVar);
  window.addEventListener("resize", syncPanelsHeight);

  refreshAll();
  setPlannerMode("planner");
  updateAuthHeaderUI();
  updateHeaderHeightVar();
  syncPanelsHeight();
}

document.addEventListener("DOMContentLoaded", () => {
  init().catch(() => {
    showToast("Ошибка инициализации, проверьте консоль.");
  });
});

/** Экспорт для отладки */
window.__mealPlannerMock = mockData;
