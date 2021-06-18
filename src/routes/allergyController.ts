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

const alleryController: express.Router = express.Router();

alleryController.get('/', (req: express.Request, res: express.Response) => {
    connection.query('SELECT * from Allergy', function (error:String, rows:String, fields:String) {
        if (error) throw error;
        res.json(rows);
    });
})

alleryController.get('/:id', (req: express.Request, res: express.Response) => {
    connection.query("SELECT * FROM Allergy WHERE Allergy_id = " + `${req.params.id};`, function (error:String, rows:String, fields:String) {
        if (error) throw error;
        res.json(rows);
    });
})

alleryController.post('/', (req: express.Request, res: express.Response) => {
    // DB에 auto_increment로 했음 좋겠습니다.
    connection.query("INSERT INTO Allergy VALUES(" + `${req.body.id}, '${req.body.name}'` +");", function (error:String, rows:String, fields:String) {
        if (error) throw error;
    });
    res.send(`${req.body.name}을 넣었습니다.`);
})

alleryController.put('/', (req: express.Request, res: express.Response) => {
    connection.query("UPDATE Allergy SET Allergy_name ="+ `${req.body.name}` + "WHERE Allergy_id = " + `${req.body.id}` + ";", function (error:String, rows:String, fields:String) {
        if (error) throw error;
    });
    res.send(`${req.body.id}번째를 수정하였습니다.`);
})

alleryController.delete('/:id', (req: express.Request, res: express.Response) => {
    connection.query("DELETE FROM Allergy WHERE Allergy_id = " + `${req.params.id};`, function (error:String, rows:String, fields:String) {
        if (error) throw error;
    });
    res.send(`${req.params.id}를 삭제했습니다!`);
})
//connection.end();

export default alleryController;