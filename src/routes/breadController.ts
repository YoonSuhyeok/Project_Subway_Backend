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

const breadController: express.Router = express.Router();

breadController.get('/', (req: express.Request, res: express.Response) => {
    connection.query('SELECT * from Bread', function (error:String, rows:String, fields:String) {
        if (error) throw error;
        res.json(rows);
    });
})

breadController.get('/:name', (req: express.Request, res: express.Response) => {
    connection.query("SELECT * FROM Bread WHERE Bread_name = " + `${req.params.name};`, function (error:String, rows:String, fields:String) {
        if (error) throw error;
        res.json(rows);
    });
})

breadController.post('/', (req: express.Request, res: express.Response) => {
    // DB에 auto_increment로 했음 좋겠습니다.
    connection.query("INSERT INTO Bread VALUES(" + `${req.body.id}, '${req.body.name}'` +");", function (error:String, rows:String, fields:String) {
        if (error) throw error;
    });
    res.send(`${req.body.name}을 넣었습니다.`);
})

breadController.put('/', (req: express.Request, res: express.Response) => {
    connection.query("UPDATE Bread SET Bread_name ="+ `${req.body.name}` + "WHERE Bread_id = " + `${req.body.id}` + ";", function (error:String, rows:String, fields:String) {
        if (error) throw error;
    });
    res.send(`${req.body.id}번째를 수정하였습니다.`);
})

breadController.delete('/:id', (req: express.Request, res: express.Response) => {
    connection.query("DELETE FROM Allergy WHERE Allergy_id = " + `${req.params.id};`, function (error:String, rows:String, fields:String) {
        if (error) throw error;
    });
    res.send(`${req.params.id}를 삭제했습니다!`);
})
//connection.end();

export default breadController;