import { sequelize } from '../models/index';
import { DataTypes } from 'sequelize';

const Recipe = sequelize.define('Recipe', {
  // Model attributes are defined here
  Recipe_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Recipe_name: {
      type: DataTypes.STRING(18),
      allowNull: false
    },
    User_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'User',
        key: 'User_id'
      }
    },
    Bread_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Bread',
        key: 'Bread_id'
      }
    },
    Menu_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Menu',
        key: 'Menu_id'
      }
    },
    Recipe_dateCreated: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    tableName: 'Recipe',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Recipe_id" },
          { name: "User_id" },
          { name: "Bread_id" },
          { name: "Menu_id" }
        ]
      },
      {
        name: "fk_Recipe_Bread_id",
        using: "BTREE",
        fields: [
          { name: "Bread_id" },
        ]
      },
      {
        name: "fk_Recipe_User_id",
        using: "BTREE",
        fields: [
          { name: "User_id" },
        ]
      },
      {
        name: "fk_Recipe_Menu_id",
        using: "BTREE",
        fields: [
          { name: "Menu_id" },
        ]
      },
    ]
});

export default Recipe;