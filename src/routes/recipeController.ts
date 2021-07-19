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
import { User } from '../models/User';
import { HasMany } from 'sequelize-typescript';

const {Sequelize,DataTypes} =require('sequelize');

const Recipe = sequelize.define('Recipe', {
    // Model attributes are defined here
    Recipe_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
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
          name: "fk_Recipe_Bread_id",
          using: "BTREE",
          fields: [
            { name: "Bread_id" },
          ]
        },
        {
          name: "fk_Recipe_Menu_id",
          using: "BTREE",
          fields: [
            { name: "Menu_id" },
          ]
        },
        {
          name: "fk_Recipe_User_id",
          using: "BTREE",
          fields: [
            { name: "User_id" },
          ]
        },
      ]
  });
//Recipe.hasOne(User)   
  
const recipeController: express.Router = express.Router();

// 모든 유저의 조합식을 본다.
recipeController.get('/', (req: express.Request, res: express.Response) => {
    Recipe.findAll().then( client =>
        res.json(client)
    );
})

// userID로 그 유저의 모든 레시피정보를 가져온다.
recipeController.get('/:id', (req: express.Request, res: express.Response) => {
  
  Recipe.findAll({
    where: {User_id : req.params.id}
  }).then( client =>
    res.json(client)
  );
  /*
    Recipe.findAll({
    include: [{
      where: { User_id :req.params.id}
    }]
    }).then( client =>
    res.json(client)
    );  
  
    Recipe.findOne({
    where: {
      'User.name$': {User_id :req.params.id}
    },
    include: [{
      model : User
    }]
    }).then( client =>
    res.json(client)
    );  
*/
})
/*
// 한 유저가 하나의 레시피 조회한다. /userId?name=에그마요   연구연구
recipeController.get('/:userId', (req: express.Request, res: express.Response) => {
    connection.query(`SELECT * from Recipe WHERE User_id = ${req.params.userId} AND Recipe_name = ${req.query.name}; `, function (error:String, rows:String, fields:String) {
        if (error) throw error;
        res.json(rows);
    });
})
*/
// 새로운 레시피의 정보를 추가합니다.    ??왜 안됨??? fk있으면 fk문제 저거 지우면 UnhandledPromiseRejectionWarning로 뜸 
recipeController.post('/', (req: express.Request, res: express.Response) => {
    Recipe.create({
        Recipe_id:req.body.Recipe_id, Recipe_name:req.body.Recipe_name, User_id:req.body.User_id, Menu_id:req.body.Menu_id, Bread_id:req.body.Bread_id, Recipe_dateCreated:req.body.Recipe_dateCreated
   }).then(client =>
        res.json(client)
   );    
})

// 한 유저가 하나의 레시피 메뉴의 이름을 수정한다. 
recipeController.patch('/:userId/:RecipeId', (req: express.Request, res: express.Response) => {
    Recipe.update({Recipe_name: 'recipe_name'},{where: {User_ID:req.params.id, Recipe_ID:req.params.id}})
    .then(client => {
        res.json(client)
    }); 
})

// 한 유저가 하나의 레시피의 빵 수정한다. 
recipeController.put('/:userId', (req: express.Request, res: express.Response) => {
    Recipe.update({Recipe_name: 'Wheet'},{where: {Recipe_ID:req.params.id}})
    .then(client => {
        res.json(client)
    }); 
})
//선택한 레시피의 정보를 삭제합니다.
recipeController.delete('/:recipeId', (req: express.Request, res: express.Response) => {
    Recipe.destroy({
        where: {Recipe_id : req.params.id}
    }).then(client =>
        res.json(client)
    );
})
//connection.end();

export default recipeController;