import { sequelize } from '../models/index';
import { DataTypes, Model, Optional } from 'sequelize';

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
}

Ingredient.init(
  {
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
  },
  {
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
  }
)