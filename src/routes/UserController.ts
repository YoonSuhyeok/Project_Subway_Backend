import express from 'express';
import * as dotenv from 'dotenv';
let mysql = require('mysql');
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database:process.env.DB_NAME
 });
//connection.connect();

import { sequelize } from '../models/index';
import { URLSearchParams } from 'node:url';
import { timeStamp } from 'node:console';
const {Sequelize,DataTypes} =require('sequelize');

const User = sequelize.define('User', {
    // Model attributes are defined here
    User_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      User_email: {
        type: DataTypes.STRING(45),
        allowNull: false
      },
      User_password: {
        type: DataTypes.STRING(18),
        allowNull: false
      },
      User_nickname: {
        type: DataTypes.STRING(10),
        allowNull: false
      }
    }, {
      tableName: 'User',
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "User_id" },
          ]
        },
      ]
  });

const UserController: express.Router = express.Router();
//User에 있는 모든 정보를 가져옵니다.
UserController.get('/', (req: express.Request, res: express.Response) => {
    User.findAll().then( client =>
        res.json(client)
    );
})
//User중 선택한 User_id의 정보를 가져옵니다.
UserController.get('/:id', (req: express.Request, res: express.Response) => {
    User.findOne({
        where: {User_id : req.params.id}
    }).then( client =>
        res.json(client)
    );
})
//User에 데이터를 추가합니다.
UserController.post('/', (req: express.Request, res: express.Response) => {
    User.create({
        User_id:req.body.id, User_email:req.body.email, User_password:req.body.password, User_nickname:req.body.nickname
   }).then(client =>
        res.json(client)
   );    
})

// 선택한 User의 정보(비밀번호)를 수정합니다. 
UserController.patch('/:id', (req: express.Request, res: express.Response) => {
    User.update({User_password: req.body.password},{where: {User_ID:req.params.id}})
    .then(client => {
        res.json(client)
    }); 
})
//선택한 User의 정보를 삭제합니다.
UserController.delete('/:id', (req: express.Request, res: express.Response) => {
    User.destroy({
        where: {User_id : req.params.id}
    }).then(client =>
        res.json(client)
    );
})
//connection.end();

export default UserController;
