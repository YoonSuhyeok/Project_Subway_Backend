import { sequelize } from '../models/index';
import { DataTypes,Model,Optional,Sequelize } from 'sequelize';
import Bread from './Bread';


export interface MenuAttributes {
  Menu_id: number;
  Menu_category: number;
  Menu_name: string;
  Menu_calorie: number;
  Menu_price15: number;
  Menu_price30: number;
  Menu_describe: string;
  Menu_imageUrl: string;
}

export type MenuPk = "Menu_id";
//export type MenuId = Menu[MenuPk];
interface MenuCreationAttributes extends Optional<MenuAttributes, MenuPk>{};
export class Menu extends Model<MenuAttributes, MenuCreationAttributes>
 implements MenuAttributes {
  Menu_id!: number;
  Menu_category!: number;
  Menu_name!: string;
  Menu_calorie!: number;
  Menu_price15!: number;
  Menu_price30!: number;
  Menu_describe!: string;
  Menu_imageUrl!: string;
}

Menu.init(
{
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
    sequelize,
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