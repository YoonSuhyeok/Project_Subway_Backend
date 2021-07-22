import { sequelize } from '../models/index';
import { DataTypes, Model, Optional } from 'sequelize';

export interface ExtraAttributes {
  Extra_id: number;
  Extra_name: string;
  Extra_price15: number;
  Extra_price30: number;
  Extra_describe: string;
  Extra_imageUrl: string;
}

export type ExtraPk = "Extra_id";
//export type BreadId = Bread[BreadPk];
interface ExtraCreationAttributes extends Optional<ExtraAttributes, ExtraPk>{};
export class Extra extends Model<ExtraAttributes, ExtraCreationAttributes>
 implements ExtraAttributes {
  Extra_id!: number;
  Extra_name!: string;
  Extra_price15!: number;
  Extra_price30!: number;
  Extra_describe!: string;
  Extra_imageUrl!: string;
}

Extra.init(
  {
    Extra_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    Extra_name:{
        type: DataTypes.STRING(45),
        allowNull: false
    },
    Extra_price15:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Extra_price30:{
        type: DataTypes.INTEGER,
        allowNull: false
      },
    Extra_describe:{
        type: DataTypes.STRING(300),
        allowNull: false
    },
    Extra_imageUrl:{
        type: DataTypes.STRING(300),
        allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'Extra',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Extra_id" },
        ]
      },
    ]
  }
);