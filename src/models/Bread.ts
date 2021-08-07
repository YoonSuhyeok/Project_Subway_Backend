import { sequelize } from '../models/index';
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export interface BreadAttributes {
  Bread_id: number;
  Bread_name: string;
  Bread_calorie: number;
  Bread_imageUrl: string;
}

export type BreadPk = "Bread_id";
export type BreadId = Bread[BreadPk];
interface BreadCreationAttributes extends Optional<BreadAttributes, BreadPk>{};
export class Bread extends Model<BreadAttributes, BreadCreationAttributes>
 implements BreadAttributes {
  Bread_id!: number;
  Bread_name!: string;
  Bread_calorie!: number;
  Bread_imageUrl!: string;
}

Bread.init(
  {
    Bread_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    Bread_name:{
      type: DataTypes.STRING(45),
      allowNull: false
    },
    Bread_calorie:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Bread_imageUrl:{
      type: DataTypes.STRING(300),
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'Bread',
    timestamps: false,indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Bread_id" },
        ]
      },
    ]
  });

  
export default Bread;