import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Ingredient, IngredientId } from './Ingredient';
import type { Recipe, RecipeId } from './Recipe';

export interface Choice_IngredientAttributes {
  'Recipe.id': number;
  'Ingredient.id': number;
}

export type Choice_IngredientPk = "Recipe.id" | "Ingredient.id";
export type Choice_IngredientId = Choice_Ingredient[Choice_IngredientPk];
export type Choice_IngredientCreationAttributes = Optional<Choice_IngredientAttributes, Choice_IngredientPk>;

export class Choice_Ingredient extends Model<Choice_IngredientAttributes, Choice_IngredientCreationAttributes> implements Choice_IngredientAttributes {
  'Recipe.id'!: number;
  'Ingredient.id'!: number;

  // Choice_Ingredient belongsTo Ingredient via Ingredient.id
  Ingredient.!: Ingredient;
  getIngredient.!: Sequelize.BelongsToGetAssociationMixin<Ingredient>;
  setIngredient.!: Sequelize.BelongsToSetAssociationMixin<Ingredient, IngredientId>;
  createIngredient.!: Sequelize.BelongsToCreateAssociationMixin<Ingredient>;
  // Choice_Ingredient belongsTo Recipe via Recipe.id
  Recipe.!: Recipe;
  getRecipe.!: Sequelize.BelongsToGetAssociationMixin<Recipe>;
  setRecipe.!: Sequelize.BelongsToSetAssociationMixin<Recipe, RecipeId>;
  createRecipe.!: Sequelize.BelongsToCreateAssociationMixin<Recipe>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Choice_Ingredient {
    Choice_Ingredient.init({
    'Recipe.id': {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Recipe',
        key: 'Recipe_id'
      }
    },
    'Ingredient.id': {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Ingredient',
        key: 'Ingredient_id'
      }
    }
  }, {
    sequelize,
    tableName: 'Choice_Ingredient',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Recipe.id" },
          { name: "Ingredient.id" },
        ]
      },
      {
        name: "fk_ChoiceIngredient_Ingredient_Ingredient.id",
        using: "BTREE",
        fields: [
          { name: "Ingredient.id" },
        ]
      },
    ]
  });
  return Choice_Ingredient;
  }
}
