import { sequelize } from './index';
import { DataTypes, Model, Optional } from 'sequelize';
import type { User, UserId } from './User';
import * as Sequelize from 'sequelize';

export interface MailAttributes {
  id: number;
  key: string;
  User_id: number;
  Mail_dateCreated: string;
}

export type MailPk = "id";
export type MailId = Mail[MailPk];
interface MailCreationAttributes extends Optional<MailAttributes, MailPk>{};

export class Mail extends Model<MailAttributes, MailCreationAttributes>
 implements MailAttributes {
  id!: number;
  key!: string;
  User_id!: number;
  Mail_dateCreated!: string;

  User!: User;
  getUser!: Sequelize.BelongsToGetAssociationMixin<User>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<User>;
}

Mail.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    key:{
      type: DataTypes.STRING(6),
      allowNull: false
    },
    User_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Menu',
        key: 'Menu_id'
      }
    },
    Mail_dateCreated: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  },
  {
    sequelize,
    tableName: 'Mail',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
          { name: "Menu_id" },
        ]
      },
      {
        name: "fk_Mail_User_id",
        using: "BTREE",
        fields: [
          { name: "User_id" },
        ]
      },
    ]
  });

  
export default Mail;