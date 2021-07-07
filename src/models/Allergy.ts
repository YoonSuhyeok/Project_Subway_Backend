import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface AllergyAttributes {
  Allergy_id: number;
  Allergy_name: string;
}

export type AllergyPk = "Allergy_id";
export type AllergyId = Allergy[AllergyPk];
export type AllergyCreationAttributes = Optional<AllergyAttributes, AllergyPk>;

export class Allergy extends Model<AllergyAttributes, AllergyCreationAttributes> implements AllergyAttributes {
  Allergy_id!: number;
  Allergy_name!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof Allergy {
    Allergy.init({
    Allergy_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Allergy_name: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Allergy',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Allergy_id" },
        ]
      },
    ]
  });
  return Allergy;
  }
}
