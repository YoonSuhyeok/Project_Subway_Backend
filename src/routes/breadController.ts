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
const { Sequelize, DataTypes } = require('sequelize');

const Bread = sequelize.define('Bread', {
    // Model attributes are defined here
    Bread_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    Bread_name: {
        type: DataTypes.STRING(45),
        allowNull: false
      },
    Bread_calorie: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Bread_imageUrl: {
        type: DataTypes.STRING(300),
        allowNull: false
    }
  }, {
    tableName: 'Bread',
    timestamps: false,
    indexes: [
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

const breadController: express.Router = express.Router();
//모든 빵의 정보를 가져옵니다.
breadController.get('/', (req: express.Request, res: express.Response) => {
    Bread.findAll().then( client =>
            res.json(client)
        );
})
//특정한 빵의 id를 검색하여 그 정보를 가져옵니다.
breadController.get('/:id', (req: express.Request, res: express.Response) => {
    Bread.findOne({
        where: {Bread_id : req.params.id}
    }).then( client =>
        res.json(client)
    );
})
//새로운 빵의 정보를 입력합니다.
breadController.post('/', (req: express.Request, res: express.Response) => {
   Bread.create({
        Bread_id:req.body.id, Bread_name:req.body.name, Bread_calorie:req.body.calorie, Bread_imageUrl:req.body.url
   }).then(client =>
        res.json(client)
   );    
})
//빵의 정보(이름)를 수정합니다. 
breadController.patch('/:id', (req: express.Request, res: express.Response) => {
    Bread.update({Bread_name: 'bread'},{where: {Bread_ID:req.params.id}})
    .then(client => {
        res.json(client)
    }); 
})
//선택한 id의 빵의 정보를 제거합니다. 
breadController.delete('/:id', (req: express.Request, res: express.Response) => {
    Bread.destroy({
        where: {Bread_id : req.params.id}
    }).then(client =>
        res.json(client)
    );
})
//connection.end();

export default breadController;