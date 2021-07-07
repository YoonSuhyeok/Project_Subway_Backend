import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Recipe, RecipeId } from './Recipe';
import type { User, UserId } from './User';

export interface RatingAttributes {
  User_id: number;
  Combination_id: number;
  Rating_score: number;
  Rating_dateCreated: string;
}

export type RatingPk = "User_id" | "Combination_id";
export type RatingId = Rating[RatingPk];
export type RatingCreationAttributes = Optional<RatingAttributes, RatingPk>;

export class Rating extends Model<RatingAttributes, RatingCreationAttributes> implements RatingAttributes {
  User_id!: number;
  Combination_id!: number;
  Rating_score!: number;
  Rating_dateCreated!: string;

  // Rating belongsTo Recipe via Combination_id
  Combination!: Recipe;
  getCombination!: Sequelize.BelongsToGetAssociationMixin<Recipe>;
  setCombination!: Sequelize.BelongsToSetAssociationMixin<Recipe, RecipeId>;
  createCombination!: Sequelize.BelongsToCreateAssociationMixin<Recipe>;
  // Rating belongsTo User via User_id
  User!: User;
  getUser!: Sequelize.BelongsToGetAssociationMixin<User>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<User>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Rating {
    Rating.init({
    User_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'User',
        key: 'User_id'
      }
    },
    Combination_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Recipe',
        key: 'Recipe_id'
      }
    },
    Rating_score: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Rating_dateCreated: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Rating',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "User_id" },
          { name: "Combination_id" },
        ]
      },
      {
        name: "fk_Rating_Combination_Combination.id",
        using: "BTREE",
        fields: [
          { name: "Combination_id" },
        ]
      },
    ]
  });
  return Rating;
  }
}
