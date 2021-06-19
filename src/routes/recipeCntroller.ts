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

const recipeCntroller: express.Router = express.Router();

// 모든 유저의 조합식을 본다.
recipeCntroller.get('/', (req: express.Request, res: express.Response) => {
    connection.query('SELECT * from Recipe', function (error:String, rows:String, fields:String) {
        if (error) throw error;
        res.json(rows);
    });
})

// userID로 한 유저의 레시피 정보만 가져와 본다.
recipeCntroller.get('/:userId', (req: express.Request, res: express.Response) => {
    connection.query(`SELECT * FROM Recipe WHERE User_id = ${req.params.userId};`, function (error:String, rows:String, fields:String) {
        if (error) throw error;
        res.json(rows);
    });
})

// 한 유저가 하나의 레시피 조회한다. /userId?name=에그마요
recipeCntroller.get('/:userId', (req: express.Request, res: express.Response) => {
    connection.query(`SELECT * from Recipe WHERE User_id = ${req.params.userId} AND Recipe_name = ${req.query.name}; `, function (error:String, rows:String, fields:String) {
        if (error) throw error;
        res.json(rows);
    });
})

recipeCntroller.post('/', (req: express.Request, res: express.Response) => {
    connection.query(`INSERT INTO Recipe VALUES ( ${req.body.id}, "${req.body.name}", ${req.body.userId}, ${req.body.menuId}, ${req.body.breadId}, ${req.body.dateCreated});`, function (error:String, rows:String, fields:String) {
        if (error) throw error;
    });
    res.send(`${req.body.name}을 넣었습니다.`);
})

// 한 유저가 하나의 레시피 메뉴의 이름을 수정한다.
recipeCntroller.put('/:userId', (req: express.Request, res: express.Response) => {
    connection.query(`UPDATE Recipe SET Recipe_name = "${req.query.name}", Recipe_dateCreated = ${req.query.dateCreate} WHERE Recipe_id = ${req.params.id};`, function (error:String, rows:String, fields:String) {
        if (error) throw error;
    });
    res.send(`${req.body.id}번째를 수정하였습니다.`);
})

// 한 유저가 하나의 레시피의 빵 수정한다. ?recipeName=에그마요
recipeCntroller.put('/:userId', (req: express.Request, res: express.Response) => {
    connection.query(`UPDATE Recipe SET Bread_id = "${req.query.name}", Recipe_dateCreated = ${req.query.dateCreate} WHERE User_id = ${req.params.userId} AND Recipe_name = ${req.query.recipeName};`, function (error:String, rows:String, fields:String) {
        if (error) throw error;
    });
    res.send(`${req.query.recipeName}번째를 수정하였습니다.`);
})

recipeCntroller.delete('/:userId/:recipeId', (req: express.Request, res: express.Response) => {
    connection.query(`DELETE FROM Recipe WHERE Recipe_id = ${req.params.recipeId} AND User_id = ${req.params.userId};`, function (error:String, rows:String, fields:String) {
        if (error) throw error;
    });
    res.send(`${req.params.id}를 삭제했습니다!`);
})
//connection.end();

export default recipeCntroller;