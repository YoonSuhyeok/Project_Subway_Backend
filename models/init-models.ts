import type { Sequelize, Model } from "sequelize";
import { Allergy } from "./Allergy";
import type { AllergyAttributes, AllergyCreationAttributes } from "./Allergy";
import { Bread } from "./Bread";
import type { BreadAttributes, BreadCreationAttributes } from "./Bread";
import { Choice_Ingredient } from "./Choice_Ingredient";
import type { Choice_IngredientAttributes, Choice_IngredientCreationAttributes } from "./Choice_Ingredient";
import { Ingredient } from "./Ingredient";
import type { IngredientAttributes, IngredientCreationAttributes } from "./Ingredient";
import { Menu } from "./Menu";
import type { MenuAttributes, MenuCreationAttributes } from "./Menu";
import { Rating(Comment) } from "./Rating(Comment)";
import type { Rating(Comment)Attributes, Rating(Comment)CreationAttributes } from "./Rating(Comment)";
import { Recipe } from "./Recipe";
import type { RecipeAttributes, RecipeCreationAttributes } from "./Recipe";
import { User } from "./User";
import type { UserAttributes, UserCreationAttributes } from "./User";
import { UserToAllergy } from "./UserToAllergy";
import type { UserToAllergyAttributes, UserToAllergyCreationAttributes } from "./UserToAllergy";

export {
  Allergy,
  Bread,
  Choice_Ingredient,
  Ingredient,
  Menu,
  Rating(Comment),
  Recipe,
  User,
  UserToAllergy,
};

export type {
  AllergyAttributes,
  AllergyCreationAttributes,
  BreadAttributes,
  BreadCreationAttributes,
  Choice_IngredientAttributes,
  Choice_IngredientCreationAttributes,
  IngredientAttributes,
  IngredientCreationAttributes,
  MenuAttributes,
  MenuCreationAttributes,
  Rating(Comment)Attributes,
  Rating(Comment)CreationAttributes,
  RecipeAttributes,
  RecipeCreationAttributes,
  UserAttributes,
  UserCreationAttributes,
  UserToAllergyAttributes,
  UserToAllergyCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  Allergy.initModel(sequelize);
  Bread.initModel(sequelize);
  Choice_Ingredient.initModel(sequelize);
  Ingredient.initModel(sequelize);
  Menu.initModel(sequelize);
  Rating(Comment).initModel(sequelize);
  Recipe.initModel(sequelize);
  User.initModel(sequelize);
  UserToAllergy.initModel(sequelize);

  Ingredient.belongsToMany(Recipe, { as: 'Recipe.id_Recipes', through: Choice_Ingredient, foreignKey: "Ingredient.id", otherKey: "Recipe.id" });
  Recipe.belongsToMany(Ingredient, { as: 'Ingredient.id_Ingredients', through: Choice_Ingredient, foreignKey: "Recipe.id", otherKey: "Ingredient.id" });
  Recipe.belongsToMany(User, { as: 'User_id_Users', through: Rating(Comment), foreignKey: "Combination_id", otherKey: "User_id" });
  User.belongsToMany(Recipe, { as: 'Combination_id_Recipes', through: Rating(Comment), foreignKey: "User_id", otherKey: "Combination_id" });
  Recipe.belongsTo(Bread, { as: "Bread", foreignKey: "Bread_id"});
  Bread.hasMany(Recipe, { as: "Recipes", foreignKey: "Bread_id"});
  Choice_Ingredient.belongsTo(Ingredient, { as: "Ingredient.", foreignKey: "Ingredient.id"});
  Ingredient.hasMany(Choice_Ingredient, { as: "Choice_Ingredients", foreignKey: "Ingredient.id"});
  Recipe.belongsTo(Menu, { as: "Menu", foreignKey: "Menu_id"});
  Menu.hasMany(Recipe, { as: "Recipes", foreignKey: "Menu_id"});
  Choice_Ingredient.belongsTo(Recipe, { as: "Recipe.", foreignKey: "Recipe.id"});
  Recipe.hasMany(Choice_Ingredient, { as: "Choice_Ingredients", foreignKey: "Recipe.id"});
  Rating(Comment).belongsTo(Recipe, { as: "Combination", foreignKey: "Combination_id"});
  Recipe.hasMany(Rating(Comment), { as: "Rating(Comment)s", foreignKey: "Combination_id"});
  Rating(Comment).belongsTo(User, { as: "User", foreignKey: "User_id"});
  User.hasMany(Rating(Comment), { as: "Rating(Comment)s", foreignKey: "User_id"});
  Recipe.belongsTo(User, { as: "User", foreignKey: "User_id"});
  User.hasMany(Recipe, { as: "Recipes", foreignKey: "User_id"});
  UserToAllergy.belongsTo(User, { as: "User", foreignKey: "User_id"});
  User.hasMany(UserToAllergy, { as: "UserToAllergies", foreignKey: "User_id"});

  return {
    Allergy: Allergy,
    Bread: Bread,
    Choice_Ingredient: Choice_Ingredient,
    Ingredient: Ingredient,
    Menu: Menu,
    Rating(Comment): Rating(Comment),
    Recipe: Recipe,
    User: User,
    UserToAllergy: UserToAllergy,
  };
}
