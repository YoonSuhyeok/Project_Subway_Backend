import * as Sequelize from 'sequelize';
import { sequelize } from '../models/index';
import { DataTypes, Model, Optional } from 'sequelize';
import { Recipe, RecipeId } from './Recipe';
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

}

User.init({
  User_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  User_email: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  User_password: {
    type: DataTypes.STRING(18),
    allowNull: true
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