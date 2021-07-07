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

const Recipe = sequelize.define('Recipe', {
    // Model attributes are defined here
    Recipe_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      Recipe_name: {
        type: DataTypes.STRING(18),
        allowNull: false
      },
      User_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'User',
          key: 'User_id'
        }
      },
      Menu_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Menu',
          key: 'Menu_id'
        }
      },
      Bread_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Bread',
          key: 'Bread_id'
        }
      },
      Recipe_dateCreated: {
        type: DataTypes.DATEONLY,
        allowNull: false
      }
    }, {
      tableName: 'Recipe',
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "Recipe_id" },
            { name: "User_id" },
            { name: "Menu_id" },
            { name: "Bread_id" },
          ]
        },
        {
          name: "fk_Combination_Bread_Bread.id",
          using: "BTREE",
          fields: [
            { name: "Bread_id" },
          ]
        },
        {
          name: "fk_Combination_Menu_Menu.id",
          using: "BTREE",
          fields: [
            { name: "Menu_id" },
          ]
        },
        {
          name: "fk_Combination_User_User.id",
          using: "BTREE",
          fields: [
            { name: "User_id" },
          ]
        },
      ]
  });

const recipeCntroller: express.Router = express.Router();

// 모든 유저의 조합식을 본다.
recipeCntroller.get('/', (req: express.Request, res: express.Response) => {
    Recipe.findAll().then( client =>
        res.json(client)
    );
})
//asdasdasdasd
// userID로 한 유저의 레시피 정보만 가져와 본다.    연구가필요합니다.
recipeCntroller.get('/:userId', (req: express.Request, res: express.Response) => {
    Recipe.findOne({
        where: {Recipe_id : req.params.id}
    }).then( client =>
        res.json(client)
    );
})

// 한 유저가 하나의 레시피 조회한다. /userId?name=에그마요   연구연구
recipeCntroller.get('/:userId', (req: express.Request, res: express.Response) => {
    connection.query(`SELECT * from Recipe WHERE User_id = ${req.params.userId} AND Recipe_name = ${req.query.name}; `, function (error:String, rows:String, fields:String) {
        if (error) throw error;
        res.json(rows);
    });
})
// 새로운 레시피의 정보를 추가합니다.
recipeCntroller.post('/', (req: express.Request, res: express.Response) => {
    Recipe.create({
        Recipe_id:req.body.id, Recipe_name:req.body.name, User_id:req.body.id, Menu_id:req.body.id, Bread_id:req.body.id, Recipe_datecreated:req.body.date
   }).then(client =>
        res.json(client)
   );    
})

// 한 유저가 하나의 레시피 메뉴의 이름을 수정한다.    연구연구
recipeCntroller.patch('/:userId', (req: express.Request, res: express.Response) => {
    Recipe.update({Recipe_name: 'recipe_name'},{where: {Recipe_ID:req.params.id}})
    .then(client => {
        res.json(client)
    }); 
})

// 한 유저가 하나의 레시피의 빵 수정한다. ?recipeName=에그마요   연구연구
recipeCntroller.put('/:userId', (req: express.Request, res: express.Response) => {
    Recipe.update({Recipe_name: 'Wheet'},{where: {Recipe_ID:req.params.id}})
    .then(client => {
        res.json(client)
    }); 
})
//선택한 레시피의 정보를 삭제합니다.
recipeCntroller.delete('/:recipeId', (req: express.Request, res: express.Response) => {
    Recipe.destroy({
        where: {Recipe_id : req.params.id}
    }).then(client =>
        res.json(client)
    );
})
//connection.end();

export default recipeCntroller;