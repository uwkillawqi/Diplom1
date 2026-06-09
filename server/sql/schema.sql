IF OBJECT_ID('dbo.Dishes', 'U') IS NULL
BEGIN
  CREATE TABLE dbo.Dishes (
    id INT NOT NULL PRIMARY KEY,
    name NVARCHAR(200) NOT NULL,
    category NVARCHAR(40) NOT NULL,
    rating INT NOT NULL DEFAULT 3,
    emoji NVARCHAR(20) NULL,
    profileTags NVARCHAR(MAX) NULL,
    nutrition NVARCHAR(MAX) NULL,
    recipe NVARCHAR(MAX) NULL,
    ingredientIds NVARCHAR(MAX) NULL,
    isCustom BIT NOT NULL DEFAULT 0,
    isDeleted BIT NOT NULL DEFAULT 0,
    userId INT NULL
  );
END
GO

IF COL_LENGTH('dbo.Dishes', 'userId') IS NULL
BEGIN
  ALTER TABLE dbo.Dishes ADD userId INT NULL;
END
GO

IF OBJECT_ID('dbo.Ingredients', 'U') IS NULL
BEGIN
  CREATE TABLE dbo.Ingredients (
    id INT NOT NULL PRIMARY KEY,
    name NVARCHAR(200) NOT NULL,
    unit NVARCHAR(30) NOT NULL,
    [group] NVARCHAR(50) NULL,
    nutritionPer100g NVARCHAR(MAX) NULL
  );
END
GO

IF COL_LENGTH('dbo.Ingredients', 'nutritionPer100g') IS NULL
BEGIN
  ALTER TABLE dbo.Ingredients ADD nutritionPer100g NVARCHAR(MAX) NULL;
END
GO

IF OBJECT_ID('dbo.NutritionProfiles', 'U') IS NULL
BEGIN
  CREATE TABLE dbo.NutritionProfiles (
    id INT NOT NULL PRIMARY KEY,
    name NVARCHAR(120) NOT NULL,
    description NVARCHAR(500) NULL,
    suitableFor NVARCHAR(80) NOT NULL
  );
END
GO

IF NOT EXISTS (
  SELECT 1
  FROM sys.indexes
  WHERE name = 'IX_Dishes_Category_IsDeleted'
    AND object_id = OBJECT_ID('dbo.Dishes')
)
BEGIN
  CREATE INDEX IX_Dishes_Category_IsDeleted ON dbo.Dishes(category, isDeleted);
END
GO

IF NOT EXISTS (
  SELECT 1
  FROM sys.indexes
  WHERE name = 'UQ_Ingredients_Name_Unit'
    AND object_id = OBJECT_ID('dbo.Ingredients')
)
BEGIN
  CREATE UNIQUE INDEX UQ_Ingredients_Name_Unit ON dbo.Ingredients(name, unit);
END
GO

IF OBJECT_ID('dbo.Users', 'U') IS NULL
BEGIN
  CREATE TABLE dbo.Users (
    id INT IDENTITY(1, 1) NOT NULL PRIMARY KEY,
    login NVARCHAR(64) NOT NULL,
    email NVARCHAR(255) NOT NULL,
    passwordHash NVARCHAR(255) NOT NULL,
    createdAt DATETIME2 NOT NULL CONSTRAINT DF_Users_createdAt DEFAULT SYSUTCDATETIME(),
    CONSTRAINT UQ_Users_Login UNIQUE (login),
    CONSTRAINT UQ_Users_Email UNIQUE (email)
  );
END
GO

IF OBJECT_ID('dbo.UserMenus', 'U') IS NULL
BEGIN
  CREATE TABLE dbo.UserMenus (
    userId INT NOT NULL PRIMARY KEY,
    menuJson NVARCHAR(MAX) NOT NULL,
    updatedAt DATETIME2 NOT NULL CONSTRAINT DF_UserMenus_updatedAt DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_UserMenus_Users FOREIGN KEY (userId) REFERENCES dbo.Users(id) ON DELETE CASCADE
  );
END
GO

IF OBJECT_ID('dbo.DishIngredients', 'U') IS NULL
BEGIN
  CREATE TABLE dbo.DishIngredients (
    dishId INT NOT NULL,
    ingredientId INT NOT NULL,
    grams DECIMAL(10,2) NULL,
    CONSTRAINT PK_DishIngredients PRIMARY KEY (dishId, ingredientId),
    CONSTRAINT FK_DishIngredients_Dishes FOREIGN KEY (dishId) REFERENCES dbo.Dishes(id) ON DELETE CASCADE,
    CONSTRAINT FK_DishIngredients_Ingredients FOREIGN KEY (ingredientId) REFERENCES dbo.Ingredients(id) ON DELETE CASCADE
  );
END
GO

IF COL_LENGTH('dbo.DishIngredients', 'grams') IS NULL
BEGIN
  ALTER TABLE dbo.DishIngredients ADD grams DECIMAL(10,2) NULL;
END
GO

IF COL_LENGTH('dbo.DishIngredients', 'unit') IS NULL
BEGIN
  ALTER TABLE dbo.DishIngredients ADD unit NVARCHAR(30) NULL;
END
GO

IF COL_LENGTH('dbo.DishIngredients', 'amount') IS NULL
BEGIN
  ALTER TABLE dbo.DishIngredients ADD amount DECIMAL(10,2) NULL;
END
GO

IF OBJECT_ID('dbo.DishProfileTags', 'U') IS NULL
BEGIN
  CREATE TABLE dbo.DishProfileTags (
    dishId INT NOT NULL,
    profileId INT NOT NULL,
    CONSTRAINT PK_DishProfileTags PRIMARY KEY (dishId, profileId),
    CONSTRAINT FK_DishProfileTags_Dishes FOREIGN KEY (dishId) REFERENCES dbo.Dishes(id) ON DELETE CASCADE,
    CONSTRAINT FK_DishProfileTags_Profiles FOREIGN KEY (profileId) REFERENCES dbo.NutritionProfiles(id) ON DELETE CASCADE
  );
END
GO

IF OBJECT_ID('dbo.UserDishPrefs', 'U') IS NULL
BEGIN
  CREATE TABLE dbo.UserDishPrefs (
    userId INT NOT NULL PRIMARY KEY,
    favoriteIds NVARCHAR(MAX) NOT NULL CONSTRAINT DF_UserDishPrefs_favoriteIds DEFAULT N'[]',
    hiddenIds NVARCHAR(MAX) NOT NULL CONSTRAINT DF_UserDishPrefs_hiddenIds DEFAULT N'[]',
    updatedAt DATETIME2 NOT NULL CONSTRAINT DF_UserDishPrefs_updatedAt DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_UserDishPrefs_Users FOREIGN KEY (userId) REFERENCES dbo.Users(id) ON DELETE CASCADE
  );
END
GO

IF NOT EXISTS (
  SELECT 1
  FROM sys.foreign_keys
  WHERE name = 'FK_Dishes_Users'
)
BEGIN
  ALTER TABLE dbo.Dishes
    ADD CONSTRAINT FK_Dishes_Users FOREIGN KEY (userId) REFERENCES dbo.Users(id) ON DELETE SET NULL;
END
GO
