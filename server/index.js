const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const path = require("path");
require("dotenv").config();

const BCRYPT_ROUNDS = 10;

const { getPool, sql } = require("./db");
const {
  nutritionForNewIngredient,
  groupForNewIngredient,
} = require("./ingredientRefs");

const JWT_SECRET = process.env.JWT_SECRET || "dev-meal-planner-secret-change-me";
const JWT_EXPIRES = process.env.JWT_EXPIRES || "7d";

const app = express();
app.use(express.json({ limit: "2mb" }));
app.use(cors());

// Раздаём фронтенд на том же порту, что и API.
// Это позволяет открыть сайт по http://localhost:3001/ .
const frontendDir = path.join(__dirname, "..");
app.use(express.static(frontendDir));
app.get("/", (_req, res) => {
  res.sendFile(path.join(frontendDir, "index.html"));
});

function signUserToken(userId) {
  return jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
}

function readUserIdFromAuthHeader(req) {
  const h = req.headers.authorization || "";
  const m = h.match(/^Bearer\s+(.+)$/i);
  if (!m) return null;
  try {
    const payload = jwt.verify(m[1], JWT_SECRET);
    const id = Number(payload.sub);
    return Number.isFinite(id) && id > 0 ? id : null;
  } catch {
    return null;
  }
}

function authMiddleware(req, res, next) {
  const id = readUserIdFromAuthHeader(req);
  if (!id) {
    return res.status(401).json({ error: "Требуется авторизация" });
  }
  req.userId = id;
  next();
}

function optionalAuthMiddleware(req, _res, next) {
  req.userId = readUserIdFromAuthHeader(req);
  next();
}

function isUniqueConstraintError(err) {
  const n = err && (err.number ?? err.originalError?.number);
  return n === 2627 || n === 2601;
}

app.get("/api/health", async (_req, res) => {
  try {
    const pool = await getPool();
    await pool.request().query("SELECT 1 as ok");
    res.json({ ok: true, db: "connected" });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

function mapDishRow(d, linkByDish) {
  return {
    id: d.id,
    name: d.name,
    category: d.category,
    rating: d.rating,
    emoji: d.emoji,
    recipe: d.recipe || "",
    profileTags: safeJsonParse(d.profileTags, []),
    nutrition: safeJsonParse(d.nutrition, null),
    ingredients:
      linkByDish.get(Number(d.id))?.map((x) => x.id) ||
      safeJsonParse(d.ingredientIds, []),
    ingredientGrams: linkByDish.get(Number(d.id)) || [],
    isFavorite: false,
    isCustom: !!d.isCustom,
    userId: d.userId == null ? null : Number(d.userId),
  };
}

app.get("/api/bootstrap", optionalAuthMiddleware, async (req, res) => {
  try {
    const pool = await getPool();
    const userId = req.userId || null;
    const dishScopeSql = userId
      ? "(isCustom = 0 OR (isCustom = 1 AND userId = @userId))"
      : "isCustom = 0";

    const dishReq = () => {
      const r = pool.request();
      if (userId) r.input("userId", sql.Int, userId);
      return r;
    };

    const [
      ingredientsRs,
      profilesRs,
      dishesRs,
      deletedRs,
      emojisRs,
      dishIngRs,
    ] = await Promise.all([
      pool
        .request()
        .query(
          "SELECT id, name, unit, [group], nutritionPer100g FROM dbo.Ingredients ORDER BY id",
        ),
      pool.request().query(
        "SELECT id, name, description, suitableFor FROM dbo.NutritionProfiles ORDER BY id",
      ),
      dishReq().query(`
        SELECT id, name, category, rating, emoji, profileTags, nutrition, recipe, ingredientIds, isCustom, isDeleted, userId
        FROM dbo.Dishes
        WHERE isDeleted = 0 AND ${dishScopeSql}
        ORDER BY id
      `),
      userId
        ? dishReq().query(`
        SELECT id, name, category, rating, emoji, profileTags, nutrition, recipe, ingredientIds, isCustom, isDeleted, userId
        FROM dbo.Dishes
        WHERE isDeleted = 1 AND isCustom = 1 AND userId = @userId
        ORDER BY id
      `)
        : Promise.resolve({ recordset: [] }),
      pool
        .request()
        .query(
          "SELECT DISTINCT emoji FROM dbo.Dishes WHERE isDeleted = 0 AND emoji IS NOT NULL AND LTRIM(RTRIM(emoji)) <> N'' ORDER BY emoji",
        ),
      pool
        .request()
        .query(
          "SELECT dishId, ingredientId, grams, unit, amount FROM dbo.DishIngredients ORDER BY dishId, ingredientId",
        ),
    ]);

    const linkByDish = new Map();
    for (const r of dishIngRs.recordset || []) {
      const dishId = Number(r.dishId);
      if (!linkByDish.has(dishId)) linkByDish.set(dishId, []);
      linkByDish.get(dishId).push({
        id: Number(r.ingredientId),
        grams: r.grams == null ? null : Number(r.grams),
        unit: r.unit || null,
        amount: r.amount == null ? null : Number(r.amount),
      });
    }

    const dishes = dishesRs.recordset.map((d) => mapDishRow(d, linkByDish));
    const deletedDishes = deletedRs.recordset.map((d) => mapDishRow(d, linkByDish));

    const ingredients = ingredientsRs.recordset.map((row) => ({
      id: row.id,
      name: row.name,
      unit: row.unit,
      group: row.group,
      per100g: safeJsonParse(row.nutritionPer100g, null),
    }));

    res.json({
      ingredients,
      nutritionProfiles: profilesRs.recordset,
      dishes,
      deletedDishes,
      dishEmojis: emojisRs.recordset.map((r) => r.emoji).filter(Boolean),
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/api/dishes/:id/delete", authMiddleware, async (req, res) => {
  try {
    const dishId = Number(req.params.id);
    const pool = await getPool();
    const rs = await pool
      .request()
      .input("id", sql.Int, dishId)
      .query(
        "SELECT id, isCustom, userId, isDeleted FROM dbo.Dishes WHERE id = @id",
      );
    const dish = rs.recordset[0];
    if (!dish) return res.status(404).json({ error: "Блюдо не найдено" });
    if (!dish.isCustom) {
      return res.status(400).json({
        error: "Каталожные блюда скрываются через настройки пользователя",
      });
    }
    if (Number(dish.userId) !== Number(req.userId)) {
      return res.status(403).json({ error: "Нет доступа к этому блюду" });
    }
    await softDeleteDish(pool, dishId);
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/api/dishes/:id/restore", authMiddleware, async (req, res) => {
  try {
    const dishId = Number(req.params.id);
    const pool = await getPool();
    const rs = await pool
      .request()
      .input("id", sql.Int, dishId)
      .query(
        "SELECT id, isCustom, userId FROM dbo.Dishes WHERE id = @id",
      );
    const dish = rs.recordset[0];
    if (!dish) return res.status(404).json({ error: "Блюдо не найдено" });
    if (!dish.isCustom) {
      return res.status(400).json({
        error: "Каталожные блюда восстанавливаются через настройки пользователя",
      });
    }
    if (Number(dish.userId) !== Number(req.userId)) {
      return res.status(403).json({ error: "Нет доступа к этому блюду" });
    }
    await pool
      .request()
      .input("id", sql.Int, dishId)
      .query("UPDATE dbo.Dishes SET isDeleted = 0 WHERE id = @id");
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/api/dishes/next-id", async (_req, res) => {
  try {
    const pool = await getPool();
    const rs = await pool
      .request()
      .query("SELECT ISNULL(MAX(id), 0) + 1 AS id FROM dbo.Dishes");
    res.json({ id: rs.recordset[0].id });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/api/dishes/custom", authMiddleware, async (req, res) => {
  try {
    const d = req.body || {};
    const pool = await getPool();
    const userId = req.userId;
    let id = Number(d.id);
    if (!Number.isFinite(id) || id <= 0) {
      const nextRs = await pool
        .request()
        .query("SELECT ISNULL(MAX(id), 0) + 1 AS id FROM dbo.Dishes");
      id = nextRs.recordset[0].id;
    }
    let ingredientIds = [];
    let ingredientGrams = [];

    if (Array.isArray(d.ingredientSpecs) && d.ingredientSpecs.length) {
      const resolved = await resolveIngredientSpecs(pool, d.ingredientSpecs);
      ingredientIds = resolved.map((x) => x.id);
      ingredientGrams = resolved;
    } else {
      ingredientIds = Array.isArray(d.ingredients)
        ? d.ingredients.map((x) => Number(x)).filter(Number.isFinite)
        : [];
      ingredientGrams = Array.isArray(d.ingredientGrams)
        ? d.ingredientGrams
            .map((x) => ({
              id: Number(x.id),
              grams: x.grams == null ? null : Number(x.grams),
              unit: x.unit ? String(x.unit).trim() : null,
              amount: x.amount == null ? null : Number(x.amount),
            }))
            .filter((x) => Number.isFinite(x.id))
        : [];
    }
    await pool
      .request()
      .input("id", sql.Int, id)
      .input("name", sql.NVarChar(200), String(d.name || "").trim())
      .input("category", sql.NVarChar(40), String(d.category || "").trim())
      .input("rating", sql.Int, Number(d.rating) || 3)
      .input("emoji", sql.NVarChar(20), d.emoji || null)
      .input("profileTags", sql.NVarChar(sql.MAX), JSON.stringify(d.profileTags || []))
      .input("nutrition", sql.NVarChar(sql.MAX), JSON.stringify(d.nutrition || null))
      .input("recipe", sql.NVarChar(sql.MAX), d.recipe || "")
      .input("ingredientIds", sql.NVarChar(sql.MAX), JSON.stringify(ingredientIds))
      .input("userId", sql.Int, userId)
      .query(`
MERGE dbo.Dishes AS target
USING (SELECT @id AS id) AS src
ON target.id = src.id
WHEN MATCHED THEN UPDATE SET
  name = @name, category = @category, rating = @rating, emoji = @emoji,
  profileTags = @profileTags, nutrition = @nutrition, recipe = @recipe,
  ingredientIds = @ingredientIds, isCustom = 1, isDeleted = 0, userId = @userId
WHEN NOT MATCHED THEN
  INSERT (id, name, category, rating, emoji, profileTags, nutrition, recipe, ingredientIds, isCustom, isDeleted, userId)
  VALUES (@id, @name, @category, @rating, @emoji, @profileTags, @nutrition, @recipe, @ingredientIds, 1, 0, @userId);
`);

    await pool
      .request()
      .input("dishId", sql.Int, id)
      .query("DELETE FROM dbo.DishIngredients WHERE dishId = @dishId");
    for (const ingredientId of ingredientIds) {
      const gramsObj = ingredientGrams.find((x) => x.id === ingredientId);
      await pool
        .request()
        .input("dishId", sql.Int, id)
        .input("ingredientId", sql.Int, ingredientId)
        .input(
          "grams",
          sql.Decimal(10, 2),
          gramsObj && Number.isFinite(gramsObj.grams) ? gramsObj.grams : null,
        )
        .input(
          "unit",
          sql.NVarChar(30),
          gramsObj && gramsObj.unit ? String(gramsObj.unit).trim() : null,
        )
        .input(
          "amount",
          sql.Decimal(10, 2),
          gramsObj && Number.isFinite(gramsObj.amount) ? gramsObj.amount : null,
        )
        .query(`
INSERT INTO dbo.DishIngredients (dishId, ingredientId, grams, unit, amount)
VALUES (@dishId, @ingredientId, @grams, @unit, @amount)
`);
    }

    await syncDishProfileTagsForDish(
      pool,
      id,
      Array.isArray(d.profileTags) ? d.profileTags : [],
    );

    res.json({
      ok: true,
      id,
      ingredients: ingredientIds,
      ingredientGrams,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/api/dishes/custom/:id/delete", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const pool = await getPool();
    await softDeleteDish(pool, id);
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/api/auth/register", async (req, res) => {
  try {
    const login = normalizeLogin(req.body && req.body.login);
    const email = normalizeEmail(req.body && req.body.email);
    const password = String((req.body && req.body.password) || "");
    const errMsg = validateAuthFields(login, email, password);
    if (errMsg) return res.status(400).json({ error: errMsg });

    const pool = await getPool();
    const passwordHash = await hashPassword(password);
    const ins = await pool
      .request()
      .input("login", sql.NVarChar(64), login)
      .input("email", sql.NVarChar(255), email)
      .input("passwordHash", sql.NVarChar(255), passwordHash)
      .query(
        `INSERT INTO dbo.Users (login, email, passwordHash)
         OUTPUT INSERTED.id AS id, INSERTED.login AS login, INSERTED.email AS email
         VALUES (@login, @email, @passwordHash)`,
      );
    const row = ins.recordset[0];
    const token = signUserToken(row.id);
    res.status(201).json({
      token,
      user: { id: row.id, login: row.login, email: row.email },
    });
  } catch (e) {
    if (isUniqueConstraintError(e)) {
      return res.status(409).json({ error: "Логин или почта уже заняты" });
    }
    res.status(500).json({ error: e.message });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const login = normalizeLogin(req.body && req.body.login);
    const password = String((req.body && req.body.password) || "");
    if (!login || password.length < 1) {
      return res.status(400).json({ error: "Введите логин и пароль" });
    }
    const pool = await getPool();
    const rs = await pool
      .request()
      .input("login", sql.NVarChar(64), login)
      .query(
        "SELECT id, login, email, passwordHash FROM dbo.Users WHERE login = @login",
      );
    if (!rs.recordset.length) {
      return res.status(401).json({ error: "Неверный логин или пароль" });
    }
    const row = rs.recordset[0];
    const ok = await verifyPassword(password, row.passwordHash);
    if (!ok) {
      return res.status(401).json({ error: "Неверный логин или пароль" });
    }
    if (!isBcryptHash(row.passwordHash)) {
      const upgraded = await hashPassword(password);
      await pool
        .request()
        .input("id", sql.Int, row.id)
        .input("passwordHash", sql.NVarChar(255), upgraded)
        .query("UPDATE dbo.Users SET passwordHash = @passwordHash WHERE id = @id");
    }
    const token = signUserToken(row.id);
    res.json({
      token,
      user: { id: row.id, login: row.login, email: row.email },
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/api/auth/me", authMiddleware, async (req, res) => {
  try {
    const pool = await getPool();
    const rs = await pool
      .request()
      .input("id", sql.Int, req.userId)
      .query("SELECT id, login, email FROM dbo.Users WHERE id = @id");
    if (!rs.recordset.length) {
      return res.status(401).json({ error: "Пользователь не найден" });
    }
    const row = rs.recordset[0];
    res.json({ user: { id: row.id, login: row.login, email: row.email } });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/api/user/menu", authMiddleware, async (req, res) => {
  try {
    const pool = await getPool();
    const rs = await pool
      .request()
      .input("userId", sql.Int, req.userId)
      .query("SELECT menuJson FROM dbo.UserMenus WHERE userId = @userId");
    if (!rs.recordset.length) {
      return res.json({ menu: null });
    }
    const raw = rs.recordset[0].menuJson;
    try {
      const menu = typeof raw === "string" ? JSON.parse(raw) : raw;
      res.json({ menu: Array.isArray(menu) ? menu : null });
    } catch {
      res.json({ menu: null });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.put("/api/user/menu", authMiddleware, async (req, res) => {
  try {
    const menu = req.body && req.body.menu;
    if (!Array.isArray(menu)) {
      return res.status(400).json({ error: "Ожидался массив menu" });
    }
    const json = JSON.stringify(menu);
    const pool = await getPool();
    await pool
      .request()
      .input("userId", sql.Int, req.userId)
      .input("menuJson", sql.NVarChar(sql.MAX), json)
      .query(`
        IF EXISTS (SELECT 1 FROM dbo.UserMenus WHERE userId = @userId)
          UPDATE dbo.UserMenus SET menuJson = @menuJson, updatedAt = SYSUTCDATETIME() WHERE userId = @userId
        ELSE
          INSERT INTO dbo.UserMenus (userId, menuJson) VALUES (@userId, @menuJson)
      `);
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/api/user/dish-prefs", authMiddleware, async (req, res) => {
  try {
    const pool = await getPool();
    const rs = await pool
      .request()
      .input("userId", sql.Int, req.userId)
      .query(
        "SELECT favoriteIds, hiddenIds FROM dbo.UserDishPrefs WHERE userId = @userId",
      );
    if (!rs.recordset.length) {
      return res.json({ favoriteIds: [], hiddenIds: [] });
    }
    const row = rs.recordset[0];
    res.json({
      favoriteIds: safeJsonParse(row.favoriteIds, []),
      hiddenIds: safeJsonParse(row.hiddenIds, []),
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.put("/api/user/dish-prefs", authMiddleware, async (req, res) => {
  try {
    const favoriteIds = Array.isArray(req.body?.favoriteIds)
      ? req.body.favoriteIds.map(Number).filter(Number.isFinite)
      : [];
    const hiddenIds = Array.isArray(req.body?.hiddenIds)
      ? req.body.hiddenIds.map(Number).filter(Number.isFinite)
      : [];
    const pool = await getPool();
    await pool
      .request()
      .input("userId", sql.Int, req.userId)
      .input("favoriteIds", sql.NVarChar(sql.MAX), JSON.stringify(favoriteIds))
      .input("hiddenIds", sql.NVarChar(sql.MAX), JSON.stringify(hiddenIds))
      .query(`
        MERGE dbo.UserDishPrefs AS target
        USING (SELECT @userId AS userId) AS src
        ON target.userId = src.userId
        WHEN MATCHED THEN UPDATE SET
          favoriteIds = @favoriteIds,
          hiddenIds = @hiddenIds,
          updatedAt = SYSUTCDATETIME()
        WHEN NOT MATCHED THEN
          INSERT (userId, favoriteIds, hiddenIds)
          VALUES (@userId, @favoriteIds, @hiddenIds);
      `);
    res.json({ ok: true, favoriteIds, hiddenIds });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

if (typeof PhusionPassenger !== "undefined") {
  PhusionPassenger.configure({ autoInstall: false });
}

const PORT = Number(process.env.PORT || 3001);

if (typeof PhusionPassenger !== "undefined") {
  app.listen("passenger");
} else {
  app.listen(PORT, () => {
    console.log(`API started: http://localhost:${PORT}`);
  });
}

function safeJsonParse(value, fallback) {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function normalizeLogin(s) {
  return String(s || "")
    .trim()
    .slice(0, 64);
}

function normalizeEmail(s) {
  return String(s || "")
    .trim()
    .toLowerCase()
    .slice(0, 255);
}

function isBcryptHash(value) {
  const s = String(value || "");
  return s.startsWith("$2a$") || s.startsWith("$2b$") || s.startsWith("$2y$");
}

async function hashPassword(password) {
  return bcrypt.hash(String(password), BCRYPT_ROUNDS);
}

async function verifyPassword(password, storedHash) {
  const stored = String(storedHash || "");
  if (isBcryptHash(stored)) {
    return bcrypt.compare(String(password), stored);
  }
  return String(password) === stored;
}

async function resolveIngredientSpecs(pool, specs) {
  const resolved = [];
  for (const spec of specs) {
    const name = String(spec.name || "").trim();
    const unit = String(spec.unit || "г").trim() || "г";
    const grams = spec.grams == null ? null : Number(spec.grams);
    const amount = spec.amount == null ? null : Number(spec.amount);
    const catalogId = Number(spec.catalogId);
    if (!name && !Number.isFinite(catalogId)) continue;

    const group = groupForNewIngredient(name, spec.group);
    const per100g = nutritionForNewIngredient(name, spec.per100g);
    const nutJson = per100g ? JSON.stringify(per100g) : null;

    let foundId = null;
    if (Number.isFinite(catalogId) && catalogId > 0) {
      const byId = await pool
        .request()
        .input("id", sql.Int, catalogId)
        .query("SELECT id FROM dbo.Ingredients WHERE id = @id");
      if (byId.recordset.length) foundId = catalogId;
    }

    if (!foundId && name) {
      const exact = await pool
        .request()
        .input("name", sql.NVarChar(200), name)
        .input("unit", sql.NVarChar(30), unit)
        .query(
          "SELECT id, nutritionPer100g FROM dbo.Ingredients WHERE LOWER(name) = LOWER(@name) AND unit = @unit",
        );
      if (exact.recordset.length) {
        foundId = exact.recordset[0].id;
        if (!exact.recordset[0].nutritionPer100g && nutJson) {
          await pool
            .request()
            .input("id", sql.Int, foundId)
            .input("nutritionPer100g", sql.NVarChar(sql.MAX), nutJson)
            .input("group", sql.NVarChar(50), group)
            .query(
              "UPDATE dbo.Ingredients SET nutritionPer100g = @nutritionPer100g, [group] = COALESCE([group], @group) WHERE id = @id",
            );
        }
      } else {
        const byName = await pool
          .request()
          .input("name", sql.NVarChar(200), name)
          .query(
            "SELECT id, unit, nutritionPer100g FROM dbo.Ingredients WHERE LOWER(name) = LOWER(@name) ORDER BY id",
          );
        if (byName.recordset.length) {
          const match =
            byName.recordset.find((r) => r.unit === unit) || byName.recordset[0];
          foundId = match.id;
          if (!match.nutritionPer100g && nutJson) {
            await pool
              .request()
              .input("id", sql.Int, foundId)
              .input("nutritionPer100g", sql.NVarChar(sql.MAX), nutJson)
              .input("group", sql.NVarChar(50), group)
              .query(
                "UPDATE dbo.Ingredients SET nutritionPer100g = @nutritionPer100g, [group] = COALESCE([group], @group) WHERE id = @id",
              );
          }
        }
      }
    }

    if (!foundId) {
      const nextRs = await pool
        .request()
        .query("SELECT ISNULL(MAX(id), 0) + 1 AS nextId FROM dbo.Ingredients");
      foundId = nextRs.recordset[0].nextId;
      await pool
        .request()
        .input("id", sql.Int, foundId)
        .input("name", sql.NVarChar(200), name)
        .input("unit", sql.NVarChar(30), unit)
        .input("group", sql.NVarChar(50), group)
        .input("nutritionPer100g", sql.NVarChar(sql.MAX), nutJson)
        .query(`
INSERT INTO dbo.Ingredients (id, name, unit, [group], nutritionPer100g)
VALUES (@id, @name, @unit, @group, @nutritionPer100g)
`);
    }

    resolved.push({
      id: Number(foundId),
      grams: Number.isFinite(grams) ? grams : null,
      unit: unit || null,
      amount: Number.isFinite(amount) ? amount : null,
    });
  }
  return resolved;
}

async function softDeleteDish(pool, dishId) {
  await pool
    .request()
    .input("id", sql.Int, dishId)
    .query("UPDATE dbo.Dishes SET isDeleted = 1 WHERE id = @id");
}

async function hardDeleteDish(pool, dishId) {
  await pool
    .request()
    .input("id", sql.Int, dishId)
    .query(`
      DELETE FROM dbo.DishIngredients WHERE dishId = @id;
      DELETE FROM dbo.DishProfileTags WHERE dishId = @id;
      DELETE FROM dbo.Dishes WHERE id = @id;
    `);
}

async function syncDishProfileTagsForDish(pool, dishId, profileTags) {
  const tags = Array.isArray(profileTags) ? profileTags : [];
  await pool
    .request()
    .input("dishId", sql.Int, dishId)
    .query("DELETE FROM dbo.DishProfileTags WHERE dishId = @dishId");
  if (!tags.length) return;

  const profilesRs = await pool
    .request()
    .query("SELECT id, suitableFor FROM dbo.NutritionProfiles");
  const byTag = new Map(
    profilesRs.recordset.map((r) => [r.suitableFor, r.id]),
  );

  for (const tag of tags) {
    const profileId = byTag.get(tag);
    if (!profileId) continue;
    await pool
      .request()
      .input("dishId", sql.Int, dishId)
      .input("profileId", sql.Int, profileId)
      .query(`
INSERT INTO dbo.DishProfileTags (dishId, profileId)
VALUES (@dishId, @profileId)
`);
  }
}

function validateAuthFields(login, email, password) {
  if (!login || login.length < 3) {
    return "Логин: минимум 3 символа";
  }
  if (!/^[a-zA-Zа-яА-ЯёЁ0-9._-]+$/.test(login)) {
    return "Логин: только буквы, цифры, «.», «_», «-»";
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Укажите корректную почту";
  }
  if (password.length < 6) {
    return "Пароль: минимум 6 символов";
  }
  return "";
}
