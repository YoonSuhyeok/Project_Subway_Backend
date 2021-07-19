import { sequelize } from '../models/index';
import { DataTypes } from 'sequelize';

const Menu = sequelize.define('Menu', {
  // Model attributes are defined here
  Menu_id: {
      type: DataTypes.INTEGER,
      autoIncrement:true,
      allowNull: false,
      primaryKey: true
    },
    Menu_category: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Menu_name: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    Menu_calorie: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Menu_price15: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Menu_price30: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Menu_describe: {
      type: DataTypes.STRING(300),
      allowNull: false
    },
    Menu_imageUrl: {
      type: DataTypes.STRING(300),
      allowNull: false
    }
  }, {
    tableName: 'Menu',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Menu_id" },
        ]
      },
    ]
});

export default Menu;