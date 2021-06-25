import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Recipe, RecipeId } from './Recipe';
import type { User, UserId } from './User';

export interface Rating(Comment)Attributes {
  User_id: number;
  Combination_id: number;
  Rating_score: number;
  Rating_dateCreated: string;
}

export type Rating(Comment)Pk = "User_id" | "Combination_id";
export type Rating(Comment)Id = Rating(Comment)[Rating(Comment)Pk];
export type Rating(Comment)CreationAttributes = Optional<Rating(Comment)Attributes, Rating(Comment)Pk>;

export class Rating(Comment) extends Model<Rating(Comment)Attributes, Rating(Comment)CreationAttributes> implements Rating(Comment)Attributes {
  User_id!: number;
  Combination_id!: number;
  Rating_score!: number;
  Rating_dateCreated!: string;

  // Rating(Comment) belongsTo Recipe via Combination_id
  Combination!: Recipe;
  getCombination!: Sequelize.BelongsToGetAssociationMixin<Recipe>;
  setCombination!: Sequelize.BelongsToSetAssociationMixin<Recipe, RecipeId>;
  createCombination!: Sequelize.BelongsToCreateAssociationMixin<Recipe>;
  // Rating(Comment) belongsTo User via User_id
  User!: User;
  getUser!: Sequelize.BelongsToGetAssociationMixin<User>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<User>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Rating(Comment) {
    Rating(Comment).init({
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
    tableName: 'Rating(Comment)',
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
  return Rating(Comment);
  }
}
