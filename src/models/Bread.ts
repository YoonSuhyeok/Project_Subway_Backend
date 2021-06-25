import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Recipe, RecipeId } from './Recipe';

export interface BreadAttributes {
  Bread_id: number;
  Bread_name: string;
  Bread_calorie: number;
  Bread_imageUrl: string;
}

export type BreadPk = "Bread_id";
export type BreadId = Bread[BreadPk];
export type BreadCreationAttributes = Optional<BreadAttributes, BreadPk>;

export class Bread extends Model<BreadAttributes, BreadCreationAttributes> implements BreadAttributes {
  Bread_id!: number;
  Bread_name!: string;
  Bread_calorie!: number;
  Bread_imageUrl!: string;

  // Bread hasMany Recipe via Bread_id
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

  static initModel(sequelize: Sequelize.Sequelize): typeof Bread {
    Bread.init({
    Bread_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Bread_name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    Bread_calorie: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Bread_imageUrl: {
      type: DataTypes.STRING(300),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Bread',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Bread_id" },
        ]
      },
    ]
  });
  return Bread;
  }
}
