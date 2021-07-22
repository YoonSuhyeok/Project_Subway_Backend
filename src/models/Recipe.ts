import { sequelize } from '../models/index';
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Bread, BreadId } from './Bread';
import type { Ingredient, IngredientId } from './Ingredient';
import type { Menu, MenuId } from './Menu';
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

  // Recipe belongsToMany Ingredient via Recipe.id and Ingredient.id
  Ingredient_id_Ingredients!: Ingredient[];
  getIngredient_id_Ingredients!: Sequelize.BelongsToManyGetAssociationsMixin<Ingredient>;
  setIngredient_id_Ingredients!: Sequelize.BelongsToManySetAssociationsMixin<Ingredient, IngredientId>;
  addIngredient_id_Ingredient!: Sequelize.BelongsToManyAddAssociationMixin<Ingredient, IngredientId>;
  addIngredient_id_Ingredients!: Sequelize.BelongsToManyAddAssociationsMixin<Ingredient, IngredientId>;
  createIngredient_id_Ingredient!: Sequelize.BelongsToManyCreateAssociationMixin<Ingredient>;
  removeIngredient_id_Ingredient!: Sequelize.BelongsToManyRemoveAssociationMixin<Ingredient, IngredientId>;
  removeIngredient_id_Ingredients!: Sequelize.BelongsToManyRemoveAssociationsMixin<Ingredient, IngredientId>;
  hasIngredient_id_Ingredient!: Sequelize.BelongsToManyHasAssociationMixin<Ingredient, IngredientId>;
  hasIngredient_id_Ingredients!: Sequelize.BelongsToManyHasAssociationsMixin<Ingredient, IngredientId>;
  countIngredient_id_Ingredients!: Sequelize.BelongsToManyCountAssociationsMixin;
  
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
}

Recipe.init({
  Recipe_id: {
    autoIncrement: true,
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
      name: "fk_Recipe_Bread_id",
      using: "BTREE",
      fields: [
        { name: "Bread_id" },
      ]
    },
    {
      name: "fk_Recipe_Menu_id",
      using: "BTREE",
      fields: [
        { name: "Menu_id" },
      ]
    },
    {
      name: "fk_Recipe_User_id",
      using: "BTREE",
      fields: [
        { name: "User_id" },
      ]
    },
  ]
});