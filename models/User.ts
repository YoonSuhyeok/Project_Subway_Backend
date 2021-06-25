import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Rating(Comment), Rating(Comment)Id } from './Rating(Comment)';
import type { Recipe, RecipeId } from './Recipe';
import type { UserToAllergy, UserToAllergyId } from './UserToAllergy';

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

  // User hasMany Rating(Comment) via User_id
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
  // User hasMany UserToAllergy via User_id
  UserToAllergies!: UserToAllergy[];
  getUserToAllergies!: Sequelize.HasManyGetAssociationsMixin<UserToAllergy>;
  setUserToAllergies!: Sequelize.HasManySetAssociationsMixin<UserToAllergy, UserToAllergyId>;
  addUserToAllergy!: Sequelize.HasManyAddAssociationMixin<UserToAllergy, UserToAllergyId>;
  addUserToAllergies!: Sequelize.HasManyAddAssociationsMixin<UserToAllergy, UserToAllergyId>;
  createUserToAllergy!: Sequelize.HasManyCreateAssociationMixin<UserToAllergy>;
  removeUserToAllergy!: Sequelize.HasManyRemoveAssociationMixin<UserToAllergy, UserToAllergyId>;
  removeUserToAllergies!: Sequelize.HasManyRemoveAssociationsMixin<UserToAllergy, UserToAllergyId>;
  hasUserToAllergy!: Sequelize.HasManyHasAssociationMixin<UserToAllergy, UserToAllergyId>;
  hasUserToAllergies!: Sequelize.HasManyHasAssociationsMixin<UserToAllergy, UserToAllergyId>;
  countUserToAllergies!: Sequelize.HasManyCountAssociationsMixin;

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
