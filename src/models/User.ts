import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Rating, RatingId } from './Rating(Comment)';
import type { Recipe, RecipeId } from './Recipe';

export interface UserAttributes {
  User_id: number;
  User_email: string;
  User_password: string;
  User_nickname: string;
}

export type UserPk = "User_id";
export type UserId = User[UserPk];
export type UserCreationAttributes = Optional<UserAttributes, UserPk>;

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  User_id!: number;
  User_email!: string;
  User_password!: string;
  User_nickname!: string;

  // User hasMany Rating via User_id
  Ratings!: Rating[];
  getRatings!: Sequelize.HasManyGetAssociationsMixin<Rating>;
  setRatings!: Sequelize.HasManySetAssociationsMixin<Rating, RatingId>;
  addRating!: Sequelize.HasManyAddAssociationMixin<Rating, RatingId>;
  addRatings!: Sequelize.HasManyAddAssociationsMixin<Rating, RatingId>;
  createRating!: Sequelize.HasManyCreateAssociationMixin<Rating>;
  removeRating!: Sequelize.HasManyRemoveAssociationMixin<Rating, RatingId>;
  removeRatings!: Sequelize.HasManyRemoveAssociationsMixin<Rating, RatingId>;
  hasRating!: Sequelize.HasManyHasAssociationMixin<Rating, RatingId>;
  hasRatings!: Sequelize.HasManyHasAssociationsMixin<Rating, RatingId>;
  countRatings!: Sequelize.HasManyCountAssociationsMixin;
  // User belongsToMany Recipe via User_id and Combination_id
  Combination_id_Recipes!: Recipe[];
  getCombination_id_Recipes!: Sequelize.BelongsToManyGetAssociationsMixin<Recipe>;
  setCombination_id_Recipes!: Sequelize.BelongsToManySetAssociationsMixin<Recipe, RecipeId>;
  addCombination_id_Recipe!: Sequelize.BelongsToManyAddAssociationMixin<Recipe, RecipeId>;
  addCombination_id_Recipes!: Sequelize.BelongsToManyAddAssociationsMixin<Recipe, RecipeId>;
  createCombination_id_Recipe!: Sequelize.BelongsToManyCreateAssociationMixin<Recipe>;
  removeCombination_id_Recipe!: Sequelize.BelongsToManyRemoveAssociationMixin<Recipe, RecipeId>;
  removeCombination_id_Recipes!: Sequelize.BelongsToManyRemoveAssociationsMixin<Recipe, RecipeId>;
  hasCombination_id_Recipe!: Sequelize.BelongsToManyHasAssociationMixin<Recipe, RecipeId>;
  hasCombination_id_Recipes!: Sequelize.BelongsToManyHasAssociationsMixin<Recipe, RecipeId>;
  countCombination_id_Recipes!: Sequelize.BelongsToManyCountAssociationsMixin;
  // User hasMany Recipe via User_id
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


  static initModel(sequelize: Sequelize.Sequelize): typeof User {
    User.init({
    User_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    User_email: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    User_password: {
      type: DataTypes.STRING(18),
      allowNull: false
    },
    User_nickname: {
      type: DataTypes.STRING(10),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'User',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "User_id" },
        ]
      },
    ]
  });
  return User;
  }
}
