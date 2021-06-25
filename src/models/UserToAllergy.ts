import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { User, UserId } from './User';

export interface UserToAllergyAttributes {
  Allergy_id: number;
  User_id: number;
}

export type UserToAllergyCreationAttributes = UserToAllergyAttributes;

export class UserToAllergy extends Model<UserToAllergyAttributes, UserToAllergyCreationAttributes> implements UserToAllergyAttributes {
  Allergy_id!: number;
  User_id!: number;

  // UserToAllergy belongsTo User via User_id
  User!: User;
  getUser!: Sequelize.BelongsToGetAssociationMixin<User>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<User>;

  static initModel(sequelize: Sequelize.Sequelize): typeof UserToAllergy {
    UserToAllergy.init({
    Allergy_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    User_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'User_id'
      }
    }
  }, {
    sequelize,
    tableName: 'UserToAllergy',
    timestamps: false,
    indexes: [
      {
        name: "fk_UserToAllergy_User_User.id",
        using: "BTREE",
        fields: [
          { name: "User_id" },
        ]
      },
    ]
  });
  return UserToAllergy;
  }
}
