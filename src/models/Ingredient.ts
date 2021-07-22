import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Choice_Ingredient, Choice_IngredientId } from './Choice_Ingredient';
import type { Recipe, RecipeId } from './Recipe';

export interface IngredientAttributes {
  Ingredient_id: number;
  Ingredient_type: number;
  Ingredient_name: string;
  Ingredient_calorie: number;
  Ingredient_price: number;
  Ingredient_imageUrl: string;
}

export type IngredientPk = "Ingredient_id";
export type IngredientId = Ingredient[IngredientPk];
export type IngredientCreationAttributes = Optional<IngredientAttributes, IngredientPk>;

export class Ingredient extends Model<IngredientAttributes, IngredientCreationAttributes> implements IngredientAttributes {
  Ingredient_id!: number;
  Ingredient_type!: number;
  Ingredient_name!: string;
  Ingredient_calorie!: number;
  Ingredient_price!: number;
  Ingredient_imageUrl!: string;

  // Ingredient hasMany Choice_Ingredient via Ingredient.id
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
  // Ingredient belongsToMany Recipe via Ingredient.id and Recipe.id
  Recipe_id_Recipes!: Recipe[];
  getRecipe_id_Recipes!: Sequelize.BelongsToManyGetAssociationsMixin<Recipe>;
  setRecipe_id_Recipes!: Sequelize.BelongsToManySetAssociationsMixin<Recipe, RecipeId>;
  addRecipe_id_Recipe!: Sequelize.BelongsToManyAddAssociationMixin<Recipe, RecipeId>;
  addRecipe_id_Recipes!: Sequelize.BelongsToManyAddAssociationsMixin<Recipe, RecipeId>;
  createRecipe_id_Recipe!: Sequelize.BelongsToManyCreateAssociationMixin<Recipe>;
  removeRecipe_id_Recipe!: Sequelize.BelongsToManyRemoveAssociationMixin<Recipe, RecipeId>;
  removeRecipe_id_Recipes!: Sequelize.BelongsToManyRemoveAssociationsMixin<Recipe, RecipeId>;
  hasRecipe_id_Recipe!: Sequelize.BelongsToManyHasAssociationMixin<Recipe, RecipeId>;
  hasRecipe_id_Recipes!: Sequelize.BelongsToManyHasAssociationsMixin<Recipe, RecipeId>;
  countRecipe_id_Recipes!: Sequelize.BelongsToManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof Ingredient {
    Ingredient.init({
    Ingredient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Ingredient_type: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Ingredient_name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    Ingredient_calorie: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Ingredient_price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Ingredient_imageUrl: {
      type: DataTypes.STRING(300),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Ingredient',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Ingredient_id" },
        ]
      },
    ]
  });
  return Ingredient;
  }
}

export default Ingredient;