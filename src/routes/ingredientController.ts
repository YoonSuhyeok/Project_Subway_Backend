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

const ingredientController: express.Router = express.Router();

ingredientController.get('/', (req: express.Request, res: express.Response) => {
    connection.query('SELECT * from Ingredient', function (error:String, rows:String, fields:String) {
        if (error) throw error;
        res.json(rows);
    });
})

ingredientController.get('/:id', (req: express.Request, res: express.Response) => {
    connection.query(`SELECT * FROM Ingredient WHERE Ingredient_id = ${req.params.id};`, function (error:String, rows:String, fields:String) {
        if (error) throw error;
        res.json(rows);
    });
})

ingredientController.post('/', (req: express.Request, res: express.Response) => {
    // DB에 auto_increment로 했음 좋겠습니다.
    connection.query(`INSERT INTO Ingredient VALUES ( ${req.body.id}, ${req.body.type}, ${req.body.name}, ${req.body.calorie}, ${req.body.price}, ${req.body.url} );`, function (error:String, rows:String, fields:String) {
        if (error) throw error;
    });
    res.send(`${req.body.name}을 넣었습니다.`);
})

ingredientController.put('/', (req: express.Request, res: express.Response) => {
    connection.query(`UPDATE Ingredient SET Ingredient_name = ${req.body.name}, Ingredient_calorie = ${req.body.calorie}, Ingredient_price = ${req.body.price}, Ingredient_imageUrl = ${req.body.url} WHERE Ingredient_id = ${req.body.id};`, function (error:String, rows:String, fields:String) {
        if (error) throw error;
    });
    res.send(`${req.body.name}를 수정하였습니다.`);
})

ingredientController.delete('/:id', (req: express.Request, res: express.Response) => {
    connection.query("DELETE FROM Ingredient WHERE Ingredient_id = " + `${req.params.id};`, function (error:String, rows:String, fields:String) {
        if (error) throw error;
    });
    res.send(`${req.params.id}를 삭제했습니다!`);
})
//connection.end();

export default ingredientController;