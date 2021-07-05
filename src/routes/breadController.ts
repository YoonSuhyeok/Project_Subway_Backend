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
    // Other model options go here
    timestamps: false,
  });

const breadController: express.Router = express.Router();

breadController.get('/', (req: express.Request, res: express.Response) => {
    Bread.findAll().then( client =>
        res.json(client)
    );
    
})

breadController.get('/:name', (req: express.Request, res: express.Response) => {
    connection.query(`SELECT * FROM Bread WHERE Bread_name = ${req.params.name};`, function (error:String, rows:String, fields:String) {
        if (error) throw error;
        res.json(rows);
    });
})

breadController.post('/', (req: express.Request, res: express.Response) => {
    // DB에 auto_increment로 했음 좋겠습니다. INSERT INTO Bread VALUES ( 1, "name", 123, 245, "df", 123);
    connection.query(`INSERT INTO Bread VALUES ( ${req.body.id}, "${req.body.name}", ${req.body.calorie},"${req.body.url}");`, function (error:String, rows:String, fields:String) {
        if (error) throw error;
    });
    res.send(`${req.body.name}을 넣었습니다.`);
})

breadController.put('/', (req: express.Request, res: express.Response) => {
    connection.query(`UPDATE Bread SET Bread_name = "${req.body.name}", Bread_calorie = ${req.body.calorie}, Bread_imageUrl = "${req.body.url}"  WHERE Bread_id = ${req.body.id};`, function (error:String, rows:String, fields:String) {
        if (error) throw error;
    });
    res.send(`${req.body.id}번째를 수정하였습니다.`);
})

breadController.delete('/:id', (req: express.Request, res: express.Response) => {
    connection.query("DELETE FROM Bread WHERE Bread_id = " + `${req.params.id};`, function (error:String, rows:String, fields:String) {
        if (error) throw error;
    });
    res.send(`${req.params.id}를 삭제했습니다!`);
})
//connection.end();

export default breadController;