import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Bread, BreadId } from './Bread';
import type { Choice_Ingredient, Choice_IngredientId } from './Choice_Ingredient';
import type { Ingredient, IngredientId } from './Ingredient';
import type { Menu, MenuId } from './Menu';
import type { Rating(Comment), Rating(Comment)Id } from './Rating(Comment)';
import type { User, UserId } from './User';

export interface RecipeAttributes {
  Recipe_id: number;
  Recipe_name: string;
  User_id: number;
  Menu_id: number;
  Bread_id: number;
  Recipe_dateCreated: string;
}

export type RecipePk = "Recipe_id" | "User_id" | "Menu_id" | "Bread_id";
export type RecipeId = Recipe[RecipePk];
export type RecipeCreationAttributes = Optional<RecipeAttributes, RecipePk>;

export class Recipe extends Model<RecipeAttributes, RecipeCreationAttributes> implements RecipeAttributes {
  Recipe_id!: number;
  Recipe_name!: string;
  User_id!: number;
  Menu_id!: number;
  Bread_id!: number;
  Recipe_dateCreated!: string;

  // Recipe belongsTo Bread via Bread_id
  Bread!: Bread;
  getBread!: Sequelize.BelongsToGetAssociationMixin<Bread>;
  setBread!: Sequelize.BelongsToSetAssociationMixin<Bread, BreadId>;
  createBread!: Sequelize.BelongsToCreateAssociationMixin<Bread>;
  // Recipe belongsTo Menu via Menu_id
  Menu!: Menu;
  getMenu!: Sequelize.BelongsToGetAssociationMixin<Menu>;
  setMenu!: Sequelize.BelongsToSetAssociationMixin<Menu, MenuId>;
  createMenu!: Sequelize.BelongsToCreateAssociationMixin<Menu>;
  // Recipe hasMany Choice_Ingredient via Recipe.id
  Choice_Ingredients!: Choice_Ingredient[];
  getChoice_Ingredients!: Sequelize.HasManyGetAssociationsMixin<Choice_Ingredient>;
  setChoice_Ingredients!: Sequelize.HasManySetAssociationsMixin<Choice_Ingredient, Choice_IngredientId>;
  addChoice_Ingredient!: Sequelize.HasManyAddAssociationMixin<Choice_Ingredient, Choice_IngredientId>;
  addChoice_Ingredients!: Sequelize.HasManyAddAssociationsMixin<Choice_Ingredient, Choice_IngredientId>;
  createChoice_Ingredient!: Sequelize.HasManyCreateAssociationMixin<Choice_Ingredient>;
  removeChoice_Ingredient!: Sequelize.HasManyRemoveAssociationMixin<Choice_Ingredient, Choice_IngredientId>;
  removeChoice_Ingredients!: Sequelize.HasManyRemoveAssociationsMixin<Choice_Ingredient, Choice_IngredientId>;
  hasChoice_Ingredient!: Sequelize.HasManyHasAssociationMixin<Choice_Ingredient, Choice_IngredientId>;
  hasChoice_Ingredients!: Sequelize.HasManyHasAssociationsMixin<Choice_Ingredient, Choice_IngredientId>;
  countChoice_Ingredients!: Sequelize.HasManyCountAssociationsMixin;
  // Recipe belongsToMany Ingredient via Recipe.id and Ingredient.id
  Ingredient.id_Ingredients!: Ingredient[];
  getIngredient.id_Ingredients!: Sequelize.BelongsToManyGetAssociationsMixin<Ingredient>;
  setIngredient.id_Ingredients!: Sequelize.BelongsToManySetAssociationsMixin<Ingredient, IngredientId>;
  addIngredient.id_Ingredient!: Sequelize.BelongsToManyAddAssociationMixin<Ingredient, IngredientId>;
  addIngredient.id_Ingredients!: Sequelize.BelongsToManyAddAssociationsMixin<Ingredient, IngredientId>;
  createIngredient.id_Ingredient!: Sequelize.BelongsToManyCreateAssociationMixin<Ingredient>;
  removeIngredient.id_Ingredient!: Sequelize.BelongsToManyRemoveAssociationMixin<Ingredient, IngredientId>;
  removeIngredient.id_Ingredients!: Sequelize.BelongsToManyRemoveAssociationsMixin<Ingredient, IngredientId>;
  hasIngredient.id_Ingredient!: Sequelize.BelongsToManyHasAssociationMixin<Ingredient, IngredientId>;
  hasIngredient.id_Ingredients!: Sequelize.BelongsToManyHasAssociationsMixin<Ingredient, IngredientId>;
  countIngredient.id_Ingredients!: Sequelize.BelongsToManyCountAssociationsMixin;
  // Recipe hasMany Rating(Comment) via Combination_id
  Rating(Comment)s!: Rating(Comment)[];
  getRating(Comment)s!: Sequelize.HasManyGetAssociationsMixin<Rating(Comment)>;
  setRating(Comment)s!: Sequelize.HasManySetAssociationsMixin<Rating(Comment), Rating(Comment)Id>;
  addRating(Comment)!: Sequelize.HasManyAddAssociationMixin<Rating(Comment), Rating(Comment)Id>;
  addRating(Comment)s!: Sequelize.HasManyAddAssociationsMixin<Rating(Comment), Rating(Comment)Id>;
  createRating(Comment)!: Sequelize.HasManyCreateAssociationMixin<Rating(Comment)>;
  removeRating(Comment)!: Sequelize.HasManyRemoveAssociationMixin<Rating(Comment), Rating(Comment)Id>;
  removeRating(Comment)s!: Sequelize.HasManyRemoveAssociationsMixin<Rating(Comment), Rating(Comment)Id>;
  hasRating(Comment)!: Sequelize.HasManyHasAssociationMixin<Rating(Comment), Rating(Comment)Id>;
  hasRating(Comment)s!: Sequelize.HasManyHasAssociationsMixin<Rating(Comment), Rating(Comment)Id>;
  countRating(Comment)s!: Sequelize.HasManyCountAssociationsMixin;
  // Recipe belongsToMany User via Combination_id and User_id
  User_id_Users!: User[];
  getUser_id_Users!: Sequelize.BelongsToManyGetAssociationsMixin<User>;
  setUser_id_Users!: Sequelize.BelongsToManySetAssociationsMixin<User, UserId>;
  addUser_id_User!: Sequelize.BelongsToManyAddAssociationMixin<User, UserId>;
  addUser_id_Users!: Sequelize.BelongsToManyAddAssociationsMixin<User, UserId>;
  createUser_id_User!: Sequelize.BelongsToManyCreateAssociationMixin<User>;
  removeUser_id_User!: Sequelize.BelongsToManyRemoveAssociationMixin<User, UserId>;
  removeUser_id_Users!: Sequelize.BelongsToManyRemoveAssociationsMixin<User, UserId>;
  hasUser_id_User!: Sequelize.BelongsToManyHasAssociationMixin<User, UserId>;
  hasUser_id_Users!: Sequelize.BelongsToManyHasAssociationsMixin<User, UserId>;
  countUser_id_Users!: Sequelize.BelongsToManyCountAssociationsMixin;
  // Recipe belongsTo User via User_id
  User!: User;
  getUser!: Sequelize.BelongsToGetAssociationMixin<User>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<User>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Recipe {
    Recipe.init({
    Recipe_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Recipe_name: {
      type: DataTypes.STRING(18),
      allowNull: false
    },
    User_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'User',
        key: 'User_id'
      }
    },
    Menu_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Menu',
        key: 'Menu_id'
      }
    },
    Bread_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Bread',
        key: 'Bread_id'
      }
    },
    Recipe_dateCreated: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Recipe',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Recipe_id" },
          { name: "User_id" },
          { name: "Menu_id" },
          { name: "Bread_id" },
        ]
      },
      {
        name: "fk_Combination_Bread_Bread.id",
        using: "BTREE",
        fields: [
          { name: "Bread_id" },
        ]
      },
      {
        name: "fk_Combination_Menu_Menu.id",
        using: "BTREE",
        fields: [
          { name: "Menu_id" },
        ]
      },
      {
        name: "fk_Combination_User_User.id",
        using: "BTREE",
        fields: [
          { name: "User_id" },
        ]
      },
    ]
  });
  return Recipe;
  }
}
