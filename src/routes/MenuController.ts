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

const Menu = sequelize.define('Menu', {
    // Model attributes are defined here
    Menu_id: {
        type: DataTypes.INTEGER,
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

const MenuController: express.Router = express.Router();
//Menu에 있는 모든 정보를 가져옵니다.
MenuController.get('/', (req: express.Request, res: express.Response) => {
    Menu.findAll().then( client =>
        res.json(client)
    );
})
//Menu중 선택한 Menu_id의 정보를 가져옵니다.
MenuController.get('/:id', (req: express.Request, res: express.Response) => {
    Menu.findAll({
        where: {Menu_category : req.params.id}
    }).then( client =>
        res.json(client)
    );
})
//Menu에 데이터를 추가합니다.
MenuController.post('/', (req: express.Request, res: express.Response) => {
    Menu.create({
        Menu_id:req.body.id,Menu_category:req.body.category, Menu_name:req.body.name, Menu_calorie:req.body.calorie,Menu_price15:req.body.price15,Menu_price30:req.body.price30,Menu_describe:req.body.describe, Menu_imageUrl:req.body.url
   }).then(client =>
        res.json(client)
   ); 
})

// 선택한 Menu의 정보(이름)를 수정합니다.
MenuController.patch('/:id', (req: express.Request, res: express.Response) => {
    Menu.update({Menu_name: 'Menu'},{where: {Menu_ID:req.params.id}})
    .then(client => {
        res.json(client)
    }); 
})
// 선택한 Menu의 정보를 삭제합니다.
MenuController.delete('/:id', (req: express.Request, res: express.Response) => {
    Menu.destroy({
        where: {Menu_id : req.params.id}
    }).then(client =>
        res.json(client)
    );
})
//connection.end();

export default MenuController;