import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Recipe, RecipeId } from './Recipe';

export interface MenuAttributes {
  Menu_id: number;
  Menu_category: number;
  Menu_name: string;
  Menu_calorie: number;
  Menu_price15: number;
  Menu_price30: number;
  Menu_describe: string;
  Menu_imageUrl: string;
}

export type MenuPk = "Menu_id";
export type MenuId = Menu[MenuPk];
export type MenuCreationAttributes = Optional<MenuAttributes, MenuPk>;

export class Menu extends Model<MenuAttributes, MenuCreationAttributes> implements MenuAttributes {
  Menu_id!: number;
  Menu_category!: number;
  Menu_name!: string;
  Menu_calorie!: number;
  Menu_price15!: number;
  Menu_price30!: number;
  Menu_describe!: string;
  Menu_imageUrl!: string;

  // Menu hasMany Recipe via Menu_id
  Recipes!: Recipe[];
  getRecipes!: Sequelize.HasManyGetAssociationsMixin<Recipe>;
  setRecipes!: Sequelize.HasManySetAssociationsMixin<Recipe, RecipeId>;
  addRecipe!: Sequelize.HasManyAddAssociationMixin<Recipe, RecipeId>;
  addRecipes!: Sequelize.HasManyAddAssociationsMixin<Recipe, RecipeId>;
  createRecipe!: Sequelize.HasManyCreateAssociationMixin<Recipe>;
  removeRecipe!: Sequelize.HasManyRemoveAssociationMixin<Recipe, RecipeId>;
  removeRecipes!: Sequelize.HasManyRemoveAssociationsMixin<Recipe, RecipeId>;
  hasRecipe!: Sequelize.HasManyHasAssociationMixin<Recipe, RecipeId>;
  hasRecipes!: Sequelize.HasManyHasAssociationsMixin<Recipe, RecipeId>;
  countRecipes!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof Menu {
    Menu.init({
    Menu_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Menu_category: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Menu_name: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    Menu_calorie: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Menu_price15: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Menu_price30: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Menu_describe: {
      type: DataTypes.STRING(300),
      allowNull: false
    },
    Menu_imageUrl: {
      type: DataTypes.STRING(300),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Menu',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Menu_id" },
        ]
      },
    ]
  });
  return Menu;
  }
}
